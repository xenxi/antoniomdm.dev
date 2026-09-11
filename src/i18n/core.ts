import { spanish } from './es';
export type Locale = 'es' | 'en';
export const locales: Locale[] = ['es', 'en'];
export const localeForPath = (path: string): Locale => /^\/en(?:\/|$)/.test(path) ? 'en' : 'es';
export const basePath = (path: string) => path.replace(/^\/en(?=\/|$)/, '') || '/';
export const localizedPath = (path: string, locale: Locale) => locale === 'en' ? `/en${basePath(path)}` : basePath(path);
export const translator = (locale: Locale) => (text: string): string => locale === 'es' ? (spanish[text] ?? text) : text;
