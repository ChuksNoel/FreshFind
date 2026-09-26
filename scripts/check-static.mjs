import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { publicRoutes, pageMetadata, siteUrl } from '../dist-ssr/entry-server.js';

let checks = 0;
for (const route of publicRoutes) {
  const path = route === '/' ? 'dist/index.html' : `dist${route}.html`;
  const html = await readFile(path, 'utf8');
  assert.ok(!html.includes('<!--$?-->'), `${route}: no unresolved loading boundary`);
  const metadata = pageMetadata(route);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: one main heading`);
  assert.ok(html.includes(`<link rel="canonical" href="${metadata.canonical}"`), `${route}: canonical`);
  assert.ok(html.includes('<meta name="description" content="'), `${route}: description`);
  assert.ok(html.includes('<main id="main-content"'), `${route}: main landmark`);
  assert.ok(html.includes('aria-label="Main navigation"'), `${route}: named navigation`);
  const schema = html.match(/<script id="page-schema" type="application\/ld\+json">(.*?)<\/script>/s);
  assert.equal(JSON.parse(schema[1])['@graph'][1].url, metadata.canonical);
  for (const [, src] of html.matchAll(/<img[^>]+src="(\/[^"?]+)"/g)) await access(`dist${src}`);
  for (const [, href] of html.matchAll(/<a[^>]+href="(\/[^"?#]*)/g)) {
    if (href === '/') await access('dist/index.html');
    else await access(`dist${href}.html`);
  }
  checks += 9;
  console.log(`PASS ${route}: heading, canonical, description, landmarks, schema, images, links`);
}
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
for (const route of publicRoutes) assert.ok(sitemap.includes(`<loc>${siteUrl}${route}</loc>`));
assert.ok((await readFile('dist/robots.txt', 'utf8')).includes(`${siteUrl}/sitemap.xml`));
assert.ok((await readFile('dist/llms.txt', 'utf8')).includes(siteUrl));
assert.ok((await readFile('dist/404.html', 'utf8')).includes('noindex, follow'));
console.log(`${checks + 4} static checks passed across ${publicRoutes.length} routes. These are structural checks, not an agentic-browsing certification.`);
