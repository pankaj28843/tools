import DOMPurify from 'dompurify';

export type ClipboardInspection = {
  plainText: string;
  rawHtml: string;
  sanitizedHtml: string;
  types: string[];
  plainTextLength: number;
  rawHtmlLength: number;
  sanitizedHtmlLength: number;
  removedHtmlCharacters: number;
  linkCount: number;
  imageCount: number;
};

export function inspectClipboardData(data: Pick<DataTransfer, 'getData' | 'types'>): ClipboardInspection {
  const plainText = data.getData('text/plain');
  const rawHtml = data.getData('text/html');
  const sanitizedHtml = sanitizeClipboardHtml(rawHtml);

  return {
    plainText,
    rawHtml,
    sanitizedHtml,
    types: Array.from(data.types),
    plainTextLength: plainText.length,
    rawHtmlLength: rawHtml.length,
    sanitizedHtmlLength: sanitizedHtml.length,
    removedHtmlCharacters: Math.max(0, rawHtml.length - sanitizedHtml.length),
    linkCount: countTags(sanitizedHtml, 'a'),
    imageCount: countTags(sanitizedHtml, 'img'),
  };
}

export function sanitizeClipboardHtml(html: string) {
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
}

function countTags(html: string, tagName: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.querySelectorAll(tagName).length;
}
