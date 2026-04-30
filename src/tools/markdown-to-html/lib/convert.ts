import DOMPurify from 'dompurify';

export function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
}

export function htmlDocumentFragment(innerHtml: string) {
  return `<article class="markdown-body">\n${innerHtml}\n</article>`;
}
