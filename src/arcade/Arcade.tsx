export { default } from './CareerGame';
import stylesheet from '../styles/arcade.css?url';

let styles: Promise<void> | undefined;
const styleLoadTimeout = 5000;
// Astro otherwise hoists CSS from this lazy component into the initial static page.
export function loadStyles(): Promise<void> {
  return styles ??= new Promise<void>((resolve, reject) => {
    const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = stylesheet;
    let settled = false;
    const timeout = window.setTimeout(() => { settled = true; resolve(); }, styleLoadTimeout);
    link.onload = () => { if (settled) return; settled = true; window.clearTimeout(timeout); resolve(); };
    link.onerror = () => { if (settled) return; settled = true; window.clearTimeout(timeout); link.remove(); styles = undefined; reject(new Error('Career stylesheet failed')); };
    document.head.append(link);
  });
}
