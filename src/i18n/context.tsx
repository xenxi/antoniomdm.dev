import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { localizedPath, translator, type Locale } from './core';
export const LocaleContext = createContext<Locale>('es');
export function useLocale() {
  const locale = useContext(LocaleContext);
  return { locale, t: translator(locale), href: (path: string) => localizedPath(path, locale) };
}
