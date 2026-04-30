import { describe, expect, it } from 'vitest';
import { convertHtmlToMarkdown, sanitizeInputHtml } from '../tools/html-to-markdown/lib/convert';
import { sanitizeHtml } from '../tools/markdown-to-html/lib/convert';

describe('conversion safety', () => {
  it('sanitizes script tags from markdown-derived html', () => {
    expect(sanitizeHtml('<p>Hello</p><script>alert(1)</script>')).toBe('<p>Hello</p>');
  });

  it('sanitizes pasted html before conversion', () => {
    expect(sanitizeInputHtml('<img src=x onerror="alert(1)"><p>Safe</p>')).not.toContain('onerror');
  });

  it('converts common html to markdown', () => {
    expect(convertHtmlToMarkdown('<h1>Title</h1><p><strong>Bold</strong> copy</p>')).toContain('# Title');
    expect(convertHtmlToMarkdown('<h1>Title</h1><p><strong>Bold</strong> copy</p>')).toContain('**Bold** copy');
  });
});
