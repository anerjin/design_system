import { useEffect, useState } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'layout'; id?: string }
  | { name: 'catalog' }
  | { name: 'docs' }
  | { name: 'detail'; id: string };
function parse(hash: string): Route {
  const path = hash.replace(/^#/, '').split('?')[0];
  const match = /^\/c\/([\w-]+)$/.exec(path);
  if (match) return { name: 'detail', id: match[1] };
  if (path === '/components') return { name: 'catalog' };
  if (path === '/docs') return { name: 'docs' };
  if (path === '/layout') {
    const query = new URLSearchParams(hash.split('?')[1]);
    return { name: 'layout', id: query.get('layout') ?? undefined };
  }
  if (path === '/modules') return { name: 'home' };
  return { name: 'home' };
}
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));
  useEffect(() => {
    const onChange = () => {
      setRoute(parse(window.location.hash));
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}
export const detailHref = (id: string) => '#/c/' + id;
export const catalogHref = '#/components';
export const homeHref = '#/';
export const modulesHref = '#/modules';
export const layoutHref = '#/layout';
export const docsHref = '#/docs';
// Section navigation must not overwrite the fragment used by the router.
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
