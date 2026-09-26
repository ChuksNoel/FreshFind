import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageMetadata, structuredData } from '../config/seo';

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = pageMetadata(pathname);
    document.title = page.title;
    const values = { description: page.description, robots: page.robots, 'og:title': page.title, 'og:description': page.description, 'og:url': page.canonical, 'og:image': page.image, 'twitter:title': page.title, 'twitter:description': page.description, 'twitter:image': page.image };
    for (const [key, value] of Object.entries(values)) {
      const attribute = key.startsWith('og:') ? 'property' : 'name';
      let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, key); document.head.append(element); }
      element.content = value;
    }
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
    canonical.href = page.canonical;
    let schema = document.getElementById('page-schema');
    if (!schema) { schema = document.createElement('script'); schema.id = 'page-schema'; schema.type = 'application/ld+json'; document.head.append(schema); }
    schema.textContent = JSON.stringify(structuredData(pathname));
  }, [pathname]);
  return null;
}
