import { lazy } from 'react';
import { metadata as base64 } from './base64/metadata';
import { metadata as clipboardInspector } from './clipboard-inspector/metadata';
import { metadata as htmlToMarkdown } from './html-to-markdown/metadata';
import { metadata as markdownToHtml } from './markdown-to-html/metadata';
import type { ToolDefinition } from './types';

export const tools: ToolDefinition[] = [
  {
    ...markdownToHtml,
    Component: lazy(() => import('./markdown-to-html/Tool')),
  },
  {
    ...htmlToMarkdown,
    Component: lazy(() => import('./html-to-markdown/Tool')),
  },
  {
    ...clipboardInspector,
    Component: lazy(() => import('./clipboard-inspector/Tool')),
  },
  {
    ...base64,
    Component: lazy(() => import('./base64/Tool')),
  },
];

export function searchTools(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return tools;

  return tools.filter((tool) =>
    [tool.title, tool.description, tool.slug, tool.category, ...tool.keywords].some((value) => value.toLowerCase().includes(normalized)),
  );
}
