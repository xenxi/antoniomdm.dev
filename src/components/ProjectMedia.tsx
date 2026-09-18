import type { getPortfolio } from '../data/portfolio';
import { useLocale } from '../i18n/context';

export type DisplayProject = ReturnType<typeof getPortfolio>['projects'][number];

export function ProjectGallery({ images = [] }: { images?: DisplayProject['images'] }) {
  const { locale } = useLocale();
  if (!images.length) return null;
  return <section class="project-gallery" aria-label={locale === 'es' ? 'Capturas del proyecto' : 'Project screenshots'}>
    {images.map((image, index) => <figure key={image.src}>
      <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`${locale === 'es' ? 'Abrir captura' : 'Open screenshot'}: ${image.alt} ↗`}>
        <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading={index ? 'lazy' : 'eager'} decoding="async" />
      </a>
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>)}
  </section>;
}

export function ProjectLinks({ project }: { project: DisplayProject }) {
  const { locale } = useLocale();
  const links = project.links.filter(link => link.kind !== 'detail');
  if (!links.length) return null;
  return <nav class="actions project-links" aria-label={locale === 'es' ? 'Enlaces del proyecto' : 'Project links'}>
    {links.map(link => <a data-project-destination={link.kind === 'repository' ? 'github' : 'website'} class={link.kind === 'live' ? 'button primary' : 'button'} href={link.url} target="_blank" rel="noopener noreferrer" key={link.url}>{link.label} <span aria-hidden="true">↗</span><span class="sr-only">{locale === 'es' ? ' (abre otra pestaña)' : ' (opens a new tab)'}</span></a>)}
  </nav>;
}
