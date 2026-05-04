import { describe, expect, it } from 'vitest';
import { searchTools, tools } from '../tools/registry';

describe('tool registry', () => {
  it('contains unique tool slugs', () => {
    const slugs = tools.map((tool) => tool.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('keeps required routes stable', () => {
    expect(tools.map((tool) => `/tools/${tool.slug}`)).toEqual(['/tools/markdown-to-html', '/tools/html-to-markdown', '/tools/clipboard-inspector', '/tools/base64']);
  });

  it('requires discovery metadata', () => {
    expect(tools.every((tool) => tool.category && tool.added)).toBe(true);
  });

  it('searches title, slug, description, category, and keywords', () => {
    expect(searchTools('gfm')).toHaveLength(1);
    expect(searchTools('html-to-markdown')[0]?.slug).toBe('html-to-markdown');
    expect(searchTools('html')).toHaveLength(3);
    expect(searchTools('diagnostics')[0]?.slug).toBe('clipboard-inspector');
    expect(searchTools('base64')[0]?.slug).toBe('base64');
    expect(searchTools('encode')[0]?.slug).toBe('base64');
    expect(searchTools('text').map((tool) => tool.slug)).toContain('base64');
  });
});
