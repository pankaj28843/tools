import { describe, expect, it } from 'vitest';
import { decodeBase64Text, encodeBase64Text, normalizeBase64 } from '../tools/base64/lib/convert';
import { inspectClipboardData, sanitizeClipboardHtml } from '../tools/clipboard-inspector/lib/inspect';
import { convertHtmlToMarkdown, normalizeEditorHtml, sanitizeInputHtml } from '../tools/html-to-markdown/lib/convert';
import { sanitizeHtml } from '../tools/markdown-to-html/lib/convert';

describe('conversion safety', () => {
  it('encodes and decodes Base64 text', () => {
    expect(encodeBase64Text('Hello, Tools Workshop.')).toBe('SGVsbG8sIFRvb2xzIFdvcmtzaG9wLg==');
    expect(decodeBase64Text('SGVsbG8sIFRvb2xzIFdvcmtzaG9wLg==')).toEqual({ ok: true, text: 'Hello, Tools Workshop.' });
  });

  it('round-trips Unicode Base64 text as UTF-8', () => {
    const input = 'Grüße 👋 नमस्ते';
    expect(decodeBase64Text(encodeBase64Text(input))).toEqual({ ok: true, text: input });
  });

  it('normalizes whitespace and URL-safe Base64 before decoding', () => {
    expect(normalizeBase64('SGVs\nbG8s IFdvcmt\tzc2hvcC4=')).toBe('SGVsbG8sIFdvcmtzc2hvcC4=');
    expect(decodeBase64Text('SGVsbG8tXw')).toEqual({ ok: true, text: 'Hello-_' });
  });

  it('returns a friendly error for invalid Base64 input', () => {
    expect(decodeBase64Text('not base64!!!!')).toMatchObject({ ok: false });
  });

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

  it('normalizes editor div wrappers before markdown conversion', () => {
    expect(normalizeEditorHtml('<h2>Clipboard Heading</h2><div><strong>Bold paste</strong> from page body<br></div>')).toBe('<h2>Clipboard Heading</h2><p><strong>Bold paste</strong> from page body</p>');
    expect(convertHtmlToMarkdown('<h2>Clipboard Heading</h2><div><strong>Bold paste</strong> from page body<br></div>')).toBe('## Clipboard Heading\n\n**Bold paste** from page body');
  });

  it('sanitizes clipboard html diagnostics', () => {
    expect(sanitizeClipboardHtml('<p>Safe</p><img src=x onerror="alert(1)">')).not.toContain('onerror');
  });

  it('inspects clipboard text, html, and metadata', () => {
    const data = {
      types: ['text/plain', 'text/html'],
      getData: (type: string) => type === 'text/html' ? '<p><a href="https://example.com">Link</a></p>' : 'Link',
    };

    expect(inspectClipboardData(data)).toMatchObject({
      plainText: 'Link',
      rawHtmlLength: 45,
      linkCount: 1,
      types: ['text/plain', 'text/html'],
    });
  });
});
