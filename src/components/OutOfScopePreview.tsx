import { useMemo, useState } from 'preact/hooks';
import { useLocale } from '../i18n/context';
import type { OutOfScopeCard } from '../data/out-of-scope';
import { outOfScopeUtmPath } from '../lib/out-of-scope/urls';

/** The unified Blog app. The historic component name is kept to avoid moving user work. */
export default function BlogEditor({ articles }: { articles: OutOfScopeCard[] }) {
  const { locale } = useLocale();
  const en = locale === 'en';
  const [selectedSlug, setSelectedSlug] = useState(articles[0]?.slug ?? '');
  const [query, setQuery] = useState('');
  const selected = articles.find(article => article.slug === selectedSlug) ?? articles[0];
  const groups = useMemo(() => Object.entries(articles.reduce<Record<string, OutOfScopeCard[]>>((result, article) => {
    (result[article.category] ??= []).push(article); return result;
  }, {})), [articles]);
  const matches = (article: OutOfScopeCard) => `${article.title} ${article.summary} ${article.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase());
  const date = selected ? new Intl.DateTimeFormat(en ? 'en-GB' : 'es-ES', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(selected.date)) : '';

  return <section class="blog-editor" aria-label={en ? 'Blog code editor' : 'Editor de código del blog'}>
    <aside class="blog-editor__activity" aria-label={en ? 'Editor activity bar' : 'Barra de actividad del editor'}>
      <span class="blog-editor__mark" aria-hidden="true"><i /><i /><i /><i /></span>
      <button class="active" type="button" aria-label={en ? 'File explorer' : 'Explorador de archivos'}><span aria-hidden="true">▱</span></button>
      <button type="button" aria-label={en ? 'Search articles' : 'Buscar artículos'} onClick={() => document.querySelector<HTMLInputElement>('.blog-editor__search')?.focus()}><span aria-hidden="true">⌕</span></button>
      <a data-native-navigation href={`${en ? '/en' : ''}/blog/`} aria-label={en ? 'Open published blog' : 'Abrir blog publicado'}><span aria-hidden="true">↗</span></a>
      <span class="blog-editor__activity-spacer" />
      <span class="blog-editor__branch" aria-hidden="true">⑂</span>
    </aside>

    <aside class="blog-editor__explorer" aria-label={en ? 'Article explorer' : 'Explorador de artículos'}>
      <header><span>{en ? 'EXPLORER' : 'EXPLORADOR'}</span><b aria-hidden="true">•••</b></header>
      <label>
        <span>{en ? 'Search files' : 'Buscar archivos'}</span>
        <input class="blog-editor__search" type="search" value={query} onInput={event => setQuery(event.currentTarget.value)} placeholder={en ? 'Search articles…' : 'Buscar artículos…'} />
      </label>
      <p class="blog-editor__root"><span aria-hidden="true">⌄</span> OUT-OF-CONTEXT</p>
      <p class="blog-editor__folder"><span aria-hidden="true">⌄</span> {en ? 'articles' : 'articulos'}/</p>
      {groups.map(([category, items]) => <section key={category}>
        <h2><span aria-hidden="true">⌄</span> {category.toLowerCase().replaceAll(' ', '-')}/</h2>
        {items.filter(matches).map(article => <button type="button" class={article.slug === selected?.slug ? 'selected' : ''} aria-pressed={article.slug === selected?.slug} onClick={() => setSelectedSlug(article.slug)} key={article.slug}><span aria-hidden="true">M↓</span>{article.slug}.mdx</button>)}
      </section>)}
      {articles.every(article => !matches(article)) && <p class="blog-editor__empty">{en ? 'No matching files.' : 'No hay archivos coincidentes.'}</p>}
      <div class="blog-editor__outline"><span aria-hidden="true">›</span> {en ? 'OUTLINE' : 'ESQUEMA'}</div>
      <div class="blog-editor__outline"><span aria-hidden="true">›</span> {en ? 'TIMELINE' : 'CRONOLOGÍA'}</div>
    </aside>

    <div class="blog-editor__workbench">
      {selected ? <>
        <div class="blog-editor__tabs" role="tablist" aria-label={en ? 'Open files' : 'Archivos abiertos'}>
          <div role="tab" aria-selected="true"><span>M↓</span>{selected.slug}.mdx <i aria-hidden="true">×</i></div>
        </div>
        <div class="blog-editor__breadcrumbs"><span>{en ? 'articles' : 'articulos'}</span><b>›</b><span>{selected.category.toLowerCase()}</span><b>›</b><strong>{selected.slug}.mdx</strong></div>
        <article class="blog-editor__document">
          <div class="blog-editor__gutter" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <span>{index + 1}</span>)}</div>
          <div class="blog-editor__code">
            <p class="code-comment">{'// '}{en ? 'A question worth keeping after delivery.' : 'Una pregunta que merece sobrevivir a la entrega.'}</p>
            <p><span class="code-purple">export const</span> <span class="code-blue">article</span> = {'{'}</p>
            <p class="code-indent"><span class="code-cyan">date</span>: <span class="code-gold">'{date}'</span>,</p>
            <p class="code-indent"><span class="code-cyan">type</span>: <span class="code-gold">'{selected.type}'</span>,</p>
            <p class="code-indent"><span class="code-cyan">readingTime</span>: <span class="code-pink">{selected.readingTime}</span>,</p>
            <p>{'}'};</p>
            <div class="blog-editor__rendered">
              <p class="blog-editor__meta">OUT OF CONTEXT · {selected.category} · {selected.readingTime} {en ? 'MIN READ' : 'MIN DE LECTURA'}</p>
              <h1>{selected.title}<span aria-hidden="true">_</span></h1>
              <p class="blog-editor__summary">{selected.summary}</p>
              <div class="blog-editor__tags">{selected.tags.map(tag => <span key={tag}>#{tag}</span>)}</div>
              <a class="blog-editor__read" data-native-navigation href={outOfScopeUtmPath(selected)}>{en ? 'Open article' : 'Abrir artículo'} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <aside class="blog-editor__minimap" aria-hidden="true">{Array.from({ length: 20 }, (_, index) => <i style={{ width: `${28 + ((index * 17) % 60)}%` }} />)}</aside>
        </article>
      </> : <div class="blog-editor__welcome"><h1>{en ? 'The first article is compiling.' : 'El primer artículo está compilando.'}</h1><p>{en ? 'New explorations will appear here as MDX files.' : 'Las nuevas exploraciones aparecerán aquí como archivos MDX.'}</p></div>}
      <footer class="blog-editor__status"><span>⑂ main*</span><span>↻ 0&nbsp;&nbsp;△ 0</span><span class="blog-editor__status-spacer" /><span>Ln 1, Col 1</span><span>UTF-8</span><span>{'{ }'} MDX</span><strong>AntoñiOS</strong></footer>
    </div>
  </section>;
}
