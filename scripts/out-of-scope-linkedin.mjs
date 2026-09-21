export function linkedinUrl(canonicalUrl) {
  const url = new URL(canonicalUrl);
  url.search = '';
  url.hash = '';
  url.searchParams.set('utm_source', 'linkedin');
  url.searchParams.set('utm_medium', 'social');
  url.searchParams.set('utm_campaign', 'blog');
  return url.href;
}

export function formatLinkedInPost({ title, summary, canonicalUrl, locale = 'es', text }) {
  if (text?.trim()) return text.trim();
  const introduction = locale === 'en' ? 'I came back to this question in Out of Context:' : 'He vuelto a esta pregunta en Out of Context:';
  return `${summary.trim()}\n\n${introduction}\n\n${title.trim()}\n\n→ ${linkedinUrl(canonicalUrl)}`;
}

export function linkedinDedupeKey({ canonicalUrl, publishedAt }) {
  const path = new URL(canonicalUrl).pathname.replace(/^\/+|\/+$/g, '');
  return `${path}:${publishedAt.slice(0, 10)}`;
}
