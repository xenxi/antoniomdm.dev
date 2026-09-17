export { default } from './CareerGame';
import stylesheet from '../styles/arcade.css?url';

let styles: Promise<void> | undefined;
// Astro otherwise hoists CSS from this lazy component into the initial static page.
export function loadStyles(): Promise<void> {
  return styles ??= new Promise<void>((resolve, reject) => {
    const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = stylesheet;
    link.onload = () => resolve();
    link.onerror = () => { link.remove(); styles = undefined; reject(new Error('Career stylesheet failed')); };
    document.head.append(link);
  });
}
