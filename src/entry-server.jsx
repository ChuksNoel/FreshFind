import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Site } from './App';
import { preparePage } from './routePages';
export { routePageName } from './routePages';
export { pageMetadata, publicRoutes, siteUrl, structuredData } from './config/seo';

export async function render(path, initialTime) {
  await preparePage(path);
  return renderToString(<StaticRouter location={path}><Site initialTime={initialTime} /></StaticRouter>);
}
