import { Language } from '../types';

// Адрес узла: ?node=<id>&lang=<ru|en>.
export interface DeepLink {
  node?: string;
  lang?: Language;
}

export function parseDeepLink(search: string): DeepLink {
  const params = new URLSearchParams(search);
  const link: DeepLink = {};
  const node = params.get('node');
  if (node) link.node = node;
  const lang = params.get('lang');
  if (lang === 'ru' || lang === 'en') link.lang = lang;
  return link;
}

export function buildDeepLinkSearch(nodeId: string | null, lang: Language): string {
  const params = new URLSearchParams();
  if (nodeId) params.set('node', nodeId);
  params.set('lang', lang);
  return `?${params.toString()}`;
}

export const readDeepLink = (): DeepLink => parseDeepLink(window.location.search);

export const writeDeepLink = (nodeId: string | null, lang: Language): void => {
  const url = `${window.location.pathname}${buildDeepLinkSearch(nodeId, lang)}${window.location.hash}`;
  window.history.replaceState(null, '', url);
};
