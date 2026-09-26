import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { render, pageMetadata, publicRoutes, siteUrl, structuredData, routePageName } from '../dist-ssr/entry-server.js';
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'));
let template = await readFile('dist/index.html', 'utf8');
// Let first-paint images and fonts win bandwidth over hydration modules.
template = template.replace(/<script type="module"/g, '<script fetchpriority="low" type="module"').replace(/<link rel="modulepreload"/g, '<link fetchpriority="low" rel="modulepreload"');
// The small shared stylesheet is critical to every page. Inline it to remove
// a render-blocking round trip; fonts and JavaScript remain cacheable assets.
for (const match of template.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/g)) {
  template = template.replace(match[0], `<style>${await readFile(`dist${match[1]}`, 'utf8')}</style>`);
}
const assets = await readdir('dist/assets');
const fonts = assets.filter(name => /^(dm-sans-latin-wght-normal|dm-serif-display-latin-400-(normal|italic)).*\.woff2$/.test(name));
const initialTime = new Date().toISOString();
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
for (const path of [...publicRoutes, '/signin', '/404']) {
  const page = pageMetadata(path);
  const body = await render(path === '/signin' ? '/login' : path, initialTime);
  const name = routePageName(path);
  const entry = name && `src/${name === 'Bookmarks' ? 'Shared' : 'pages'}/${name}.jsx`;
  const modules = new Set();
  function preloadModule(key) {
    const item = manifest[key];
    if (!item || modules.has(item.file)) return;
    modules.add(item.file);
    item.imports?.forEach(preloadModule);
  }
  if (entry) preloadModule(entry);
  const modulePreloads = [...modules].map(file => `<link rel="modulepreload" fetchpriority="low" href="/${file}" crossorigin />`).join('');
  const fontPreloads = fonts.filter(font => !font.includes('-italic-') || body.includes('<em')).map(font => `<link rel="preload" as="font" type="font/woff2" href="/assets/${font}" crossorigin />`).join('');
  const marketId = path.match(/^\/markets\/(\d+)$/)?.[1];
  const heroName = path === '/' ? 'canopy' : path === '/produce-guide' ? 'seasonal-produce' : marketId ? (Number(marketId) % 2 === 0 ? 'lagos-market-stall' : 'lagos-market-hero') : null;
  const heroType = heroName === 'canopy' || heroName === 'seasonal-produce' ? 'avif' : 'webp';
  const heroPreloads = heroName ? [[path === '/' ? 640 : 480, '(max-width: 760px)'], [path === '/' ? 1120 : 960, '(min-width: 761px)']].map(([width, media]) => `<link rel="preload" as="image" type="image/${heroType}" href="/images/optimized/${heroName}-${width}.${heroType}" media="${media}" fetchpriority="high" />`).join('') : '';
  const head = `<title>${escape(page.title)}</title>
<meta name="description" content="${escape(page.description)}" />
<meta name="robots" content="${page.robots}" />
<link rel="canonical" href="${page.canonical}" />
<meta property="og:title" content="${escape(page.title)}" />
<meta property="og:description" content="${escape(page.description)}" />
<meta property="og:url" content="${page.canonical}" />
<meta property="og:image" content="${page.image}" />
<meta name="twitter:title" content="${escape(page.title)}" />
<meta name="twitter:description" content="${escape(page.description)}" />
<meta name="twitter:image" content="${page.image}" />
<script id="page-schema" type="application/ld+json">${JSON.stringify(structuredData(path)).replaceAll('<', '\\u003c')}</script>`;
  const html = template.replace(/<!-- route-head-start -->[\s\S]*?<!-- route-head-end -->/, head + heroPreloads + fontPreloads + modulePreloads).replace('<div id="root"></div>', () => `<div id="root" data-rendered-at="${initialTime}">${body}</div>`);
  const directory = path === '/' || path === '/404' ? 'dist' : `dist${path}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/${path === '/404' ? '404' : 'index'}.html`, html);
  // Extensionless requests in Vite preview and Netlify resolve to these files.
  if (path !== '/' && path !== '/404') await writeFile(`dist${path}.html`, html);
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicRoutes.map(path => `<url><loc>${siteUrl}${path === '/' ? '/' : path}</loc></url>`).join('')}</urlset>`);
console.log(`Prerendered ${publicRoutes.length} public routes, sign-in alias and 404 page.`);
