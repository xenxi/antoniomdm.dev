import { useState } from 'preact/hooks';
import { useLocale } from '../i18n/context';
import { endpointGroups, platform934Endpoints } from '../data/platform934-endpoints';

export default function ProjectApiReference() {
  const { locale } = useLocale();
  const [query, setQuery] = useState('');
  const es = locale === 'es';
  const needle = query.trim().toLocaleLowerCase(locale);
  const visible = platform934Endpoints.filter(endpoint => `${endpoint.method} ${endpoint.path} ${endpoint.description[locale]} ${endpointGroups.find(group => group.id === endpoint.group)?.label[locale]}`.toLocaleLowerCase(locale).includes(needle));
  return <section class="project-api-reference" aria-labelledby="api-reference-title">
    <h2 id="api-reference-title">{es ? 'Referencia de endpoints' : 'Endpoint reference'}</h2>
    <p>{es ? 'Contrato OpenAPI v1 · métodos, rutas relativas y una descripción de cada operación.' : 'OpenAPI v1 contract · methods, relative paths and a description of each operation.'}</p>
    <label class="endpoint-search">{es ? 'Buscar por ruta, método o descripción' : 'Search by path, method or description'}
      <input type="search" value={query} onInput={event => setQuery(event.currentTarget.value)} aria-controls="endpoint-groups" />
    </label>
    <p class="muted" role="status">{visible.length} / {platform934Endpoints.length} {es ? 'operaciones' : 'operations'}</p>
    <div id="endpoint-groups">{endpointGroups.map((group, index) => {
      const endpoints = visible.filter(endpoint => endpoint.group === group.id);
      if (!endpoints.length) return null;
      return <details class="endpoint-group" key={`${group.id}-${Boolean(needle)}`} open={Boolean(needle) || index === 0}>
        <summary>{group.label[locale]} <span>{endpoints.length}</span></summary>
        <dl>{endpoints.map(endpoint => <div class="endpoint" key={`${endpoint.method} ${endpoint.path}`}>
          <dt><span class={`endpoint-method method-${endpoint.method.toLowerCase()}`}>{endpoint.method}</span><code>{endpoint.path}</code></dt>
          <dd>{endpoint.description[locale]}</dd>
        </div>)}</dl>
      </details>;
    })}</div>
    {visible.length === 0 && <p>{es ? 'No hay operaciones que coincidan con la búsqueda.' : 'No operations match your search.'}</p>}
  </section>;
}
