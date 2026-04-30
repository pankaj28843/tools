import type { LazyExoticComponent, ComponentType } from 'react';

export type ToolMetadata = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  added: string;
  updated?: string;
};

export type ToolDefinition = ToolMetadata & {
  Component: LazyExoticComponent<ComponentType>;
};
