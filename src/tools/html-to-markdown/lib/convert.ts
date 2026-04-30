import DOMPurify from 'dompurify';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

turndown.use(gfm);

export function sanitizeInputHtml(html: string) {
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
}

export function convertHtmlToMarkdown(html: string) {
  return turndown.turndown(normalizeEditorHtml(sanitizeInputHtml(html))).trim();
}

export function normalizeEditorHtml(html: string) {
  const template = document.createElement('template');
  template.innerHTML = html;

  template.content.querySelectorAll('div').forEach((element) => {
    if (element.attributes.length === 0 && isParagraphLikeDiv(element)) {
      element.replaceWith(toElement('p', element));
    }
  });

  template.content.querySelectorAll('p').forEach((element) => {
    trimTrailingBreaks(element);
  });

  return template.innerHTML;
}

function isParagraphLikeDiv(element: Element) {
  return !element.querySelector('address,article,aside,blockquote,details,dialog,div,dl,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,main,nav,ol,p,pre,section,table,ul');
}

function toElement(tagName: string, source: Element) {
  const element = document.createElement(tagName);
  element.innerHTML = source.innerHTML;
  return element;
}

function trimTrailingBreaks(element: Element) {
  while (element.lastElementChild?.tagName === 'BR') {
    element.lastElementChild.remove();
  }
}
