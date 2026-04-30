import { describe, expect, it } from 'vitest';
import { searchTools, tools } from '../tools/registry';

describe('tool registry', () => {
  it('contains unique tool slugs', () => {
    const slugs = tools.map((tool) => tool.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('keeps required initial routes stable', () => {
    expect(tools.map((tool) => `/tools/${tool.slug}`)).toEqual(['/tools/markdown-to-html', '/tools/html-to-markdown']);
  });

  it('searches title, slug, description, and keywords', () => {
    expect(searchTools('gfm')).toHaveLength(1);
    expect(searchTools('html-to-markdown')[0]?.slug).toBe('html-to-markdown');
    expect(searchTools('html')).toHaveLength(2);
  });
});
