import { createElement, lazy } from 'react';

const loaders = {
  Home: () => import('./pages/Home'),
  Markets: () => import('./pages/Markets'),
  MarketsDetails: () => import('./pages/MarketsDetails'),
  ProduceGuide: () => import('./pages/ProduceGuide'),
  Bookmarks: () => import('./Shared/Bookmarks'),
  About: () => import('./pages/About'),
  Contact: () => import('./pages/Contact'),
  Login: () => import('./pages/Login'),
  SignUp: () => import('./pages/SignUp'),
};
const ready = {};
const deferred = Object.fromEntries(Object.entries(loaders).map(([name, load]) => [name, lazy(load)]));

export function routePageName(pathname) {
  const path = pathname.replace(/\/$/, '') || '/';
  if (/^\/markets\/[^/]+$/.test(path)) return 'MarketsDetails';
  return { '/': 'Home', '/markets': 'Markets', '/produce-guide': 'ProduceGuide', '/saved': 'Bookmarks', '/about': 'About', '/contact': 'Contact', '/login': 'Login', '/signin': 'Login', '/signup': 'SignUp' }[path];
}

// Resolve the initial route before both static rendering and hydration. Other
// routes load on navigation; server HTML never contains a loading placeholder.
export async function preparePage(pathname) {
  const name = routePageName(pathname);
  if (name && !ready[name]) ready[name] = (await loaders[name]()).default;
}
export function pageElement(name) { return createElement(ready[name] || deferred[name]); }
