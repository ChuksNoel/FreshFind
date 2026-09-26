import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { mkdir, writeFile } from 'node:fs/promises';

const baseUrl = process.env.AUDIT_URL || 'http://127.0.0.1:4173';
const routes = process.argv.slice(2);
if (!routes.length) routes.push('/', '/markets', '/markets/1', '/produce-guide', '/saved', '/about', '/contact', '/login', '/signup');
await mkdir('docs/audits', { recursive: true });
// Set CHROME_PATH to a current browser to avoid auditing with an old bundled Chromium.
const chrome = await launch({ chromePath: process.env.CHROME_PATH, chromeFlags: ['--headless=new'], logLevel: 'silent' });
const results = [];
try {
  for (const route of routes) {
    for (const mode of ['mobile', 'desktop']) {
      const result = await lighthouse(`${baseUrl}${route}`, {
        port: chrome.port,
        output: ['json', 'html'],
        logLevel: 'error',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      }, mode === 'desktop' ? desktopConfig : undefined);
      const slug = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
      await writeFile(`docs/audits/${slug}-${mode}.json`, result.report[0]);
      await writeFile(`docs/audits/${slug}-${mode}.html`, result.report[1]);
      const record = { route, mode, ...Object.fromEntries(Object.entries(result.lhr.categories).map(([key, category]) => [key, Math.round(category.score * 100)])), browser: result.lhr.environment.hostUserAgent, error: result.lhr.runtimeError };
      results.push(record);
      console.log(JSON.stringify(record));
      await writeFile('docs/audits/latest-run.json', JSON.stringify(results, null, 2));
    }
  }
} finally {
  try { await chrome.kill(); } catch (error) { console.warn(`Browser cleanup: ${error.message}`); }
}
if (results.some(row => row.error || ['performance', 'accessibility', 'best-practices', 'seo'].some(key => row[key] < 95))) process.exitCode = 1;
