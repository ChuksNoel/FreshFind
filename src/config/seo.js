import markets from '../JSON/markets.json';

export const siteUrl = 'https://freshfind-app.netlify.app';
const pages = {
  '/': ['FreshFind | Discover Lagos Markets and Fresh Produce', 'Discover local markets across Lagos, explore seasonal produce, check market schedules, and save your favourite fresh finds.'],
  '/markets': ['Lagos Market Directory | FreshFind', 'Search FreshFind’s sample Lagos market directory by area or produce. Explore regular opening days, locations and market details before planning a visit.'],
  '/produce-guide': ['Seasonal Produce Guide | FreshFind Lagos', 'Explore fresh fruits, vegetables and tubers in the FreshFind produce guide. Filter ingredients by category and discover their listed seasons.'],
  '/saved': ['Your Saved Markets and Produce | FreshFind', 'Keep your favourite Lagos markets and produce in one place. Your FreshFind saved collection stays in this browser on this device.'],
  '/about': ['About FreshFind and Team XI | Lagos Market Guide', 'Meet Team XI, the people behind FreshFind. Learn about our Lagos market discovery project and its focus on local markets and seasonal produce.'],
  '/contact': ['Contact Team FreshFind | Questions and Market Suggestions', 'Prepare a message for FreshFind, suggest a Lagos market or report a listing correction. Find answers to common questions and explore the Lagos map.'],
  '/login': ['Sign In Preview | FreshFind', 'Try the FreshFind sign-in demo using sample details. This preview does not authenticate accounts or store passwords. Continue exploring without an account.'],
  '/signup': ['Sign Up Preview | FreshFind', 'Explore the FreshFind sign-up demo using sample details. No account is created and no password is saved. Browse Lagos markets without signing up.'],
};
export const publicRoutes = [...Object.keys(pages), ...markets.map(market => `/markets/${market.id}`)];

export function pageMetadata(pathname) {
  const path = pathname.replace(/\/$/, '') || '/';
  const canonicalPath = path === '/signin' ? '/login' : path;
  const market = markets.find(item => canonicalPath === `/markets/${item.id}`);
  const entry = market ? [`${market.name} in ${market.area} | FreshFind`, `Explore the sample listing for ${market.name} in ${market.area}, Lagos. View regular opening days, listed produce and directions. Confirm details before visiting.`] : pages[canonicalPath];
  const [title, description] = entry || ['Page Not Found | FreshFind', 'This FreshFind page could not be found. Browse our Lagos market directory or return to the home page.'];
  return { title, description, canonical: `${siteUrl}${canonicalPath === '/' ? '/' : canonicalPath}`, image: `${siteUrl}/images/optimized/lagos-market-hero-960.webp`, robots: entry ? 'index, follow' : 'noindex, follow' };
}

export function structuredData(pathname) {
  const page = pageMetadata(pathname);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`, name: 'FreshFind', inLanguage: 'en-NG', description: pages['/'][1] },
      { '@type': pathname === '/about' ? 'AboutPage' : pathname === '/contact' ? 'ContactPage' : 'WebPage', '@id': `${page.canonical}#page`, url: page.canonical, name: page.title, description: page.description, isPartOf: { '@id': `${siteUrl}/#website` }, inLanguage: 'en-NG' },
    ],
  };
}
