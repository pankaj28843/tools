import { Box, Card, CardActionArea, CardContent, Chip, Link, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { searchTools, tools } from '../tools/registry';

export function HomePage() {
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const matches = useMemo(() => searchTools(query), [query]);
  const categories = useMemo(() => groupByCategory(matches), [matches]);
  const recentTools = useMemo(() => [...tools].sort((a, b) => getSortDate(b).localeCompare(getSortDate(a))).slice(0, 3), []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.target instanceof HTMLElement && event.target.closest('input,textarea,[contenteditable="true"]')) return;

      event.preventDefault();
      searchRef.current?.focus();
    };

    window.addEventListener('keydown', handleShortcut);
    return () => { window.removeEventListener('keydown', handleShortcut); };
  }, []);

  return (
    <Stack spacing={{ xs: 2, md: 3 }}>
      <Box sx={{ display: 'grid', gap: 1 }}>
        <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '.12em' }}>
          Private browser utilities
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: '2.35rem', md: '4.8rem' }, lineHeight: 0.95 }}>
          Tools Workshop
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
          {String(tools.length)} local-only tools for Markdown, HTML, clipboard diagnostics, and browser-safe conversion. Press / to search.
        </Typography>
      </Box>

      <TextField
        inputRef={searchRef}
        label="Search tools"
        placeholder="Try markdown, clipboard, sanitize, PDF..."
        value={query}
        onChange={(event) => { setQuery(event.target.value); }}
        fullWidth
      />

      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
        <Chip label={`${String(matches.length)} of ${String(tools.length)} tools`} variant="outlined" />
        {recentTools.map((tool) => (
          <Chip key={tool.slug} label={`New: ${tool.title}`} component={RouterLink} to={`/${tool.slug}`} clickable />
        ))}
      </Stack>

      {matches.length === 0 ? (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5">No tools match that search.</Typography>
            <Typography color="text.secondary">Try markdown, HTML, clipboard, preview, PDF, or converter.</Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2}>
          {categories.map(([category, categoryTools]) => (
            <Box key={category} component="section" aria-labelledby={`${category.toLowerCase()}-tools`}>
              <Typography id={`${category.toLowerCase()}-tools`} component="h2" variant="h5" sx={{ mb: 1 }}>
                {category}
              </Typography>
              <Box sx={{ display: 'grid', gap: 1 }}>
                {categoryTools.map((tool) => (
                  <Card key={tool.slug} variant="outlined">
                    <CardActionArea component={RouterLink} to={`/${tool.slug}`}>
                      <CardContent sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(14rem, 0.5fr) 1fr auto' }, gap: 1.5, alignItems: 'center', py: 1.5 }}>
                        <Box>
                          <Typography variant="h6" component="h3">
                            {tool.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            /tools/{tool.slug}
                          </Typography>
                        </Box>
                        <Typography color="text.secondary">{tool.description}</Typography>
                        <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: 'wrap', justifyContent: { md: 'flex-end' } }}>
                          {tool.keywords.slice(0, 3).map((keyword) => (
                            <Chip key={keyword} label={keyword} size="small" variant="outlined" />
                          ))}
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>
            </Box>
          ))}
        </Stack>
      )}

      <Typography variant="body2" color="text.secondary">
        Inspired by dense personal toolboxes: compact links first, with every route running in this browser tab. Browse all source content under{' '}
        <Link component={RouterLink} to="/markdown-to-html" color="inherit">/tools/</Link>.
      </Typography>
    </Stack>
  );
}

function groupByCategory(items: typeof tools) {
  const groups = new Map<string, typeof tools>();

  for (const item of items) {
    const group = groups.get(item.category) ?? [];
    group.push(item);
    groups.set(item.category, group);
  }

  return Array.from(groups.entries());
}

function getSortDate(tool: (typeof tools)[number]) {
  return tool.updated ?? tool.added;
}
