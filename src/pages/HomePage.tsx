import { Box, Card, CardActionArea, CardContent, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { searchTools, tools } from '../tools/registry';

export function HomePage() {
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const matches = useMemo(() => searchTools(query), [query]);
  const categories = useMemo(() => groupByCategory(matches), [matches]);
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
    <Box sx={{ display: 'grid', gap: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'grid', gap: 1 }}>
        <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '.12em' }}>
          Browser-only utilities
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: '2.35rem', md: '4.8rem' }, lineHeight: 0.95 }}>
          Tools Workshop
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
          Paste, convert, inspect, and copy without uploads. {String(tools.length)} tools run entirely in this browser tab.
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

      <Typography variant="body2" color="text.secondary">
        Showing {String(matches.length)} of {String(tools.length)} tools. Press / to search.
      </Typography>

      {matches.length === 0 ? (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5">No tools match that search.</Typography>
            <Typography color="text.secondary">Try markdown, HTML, clipboard, preview, PDF, or converter.</Typography>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'grid', gap: 2 }}>
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
                        <Typography variant="caption" color="text.secondary" sx={{ justifySelf: { md: 'end' } }}>
                          {tool.category}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <Typography variant="body2" color="text.secondary">
        Each route is a local workbench. Start with{' '}
        <Typography component={RouterLink} to="/html-to-markdown" color="inherit" sx={{ textDecoration: 'underline' }}>
          Rich HTML to Markdown
        </Typography>
        .
      </Typography>
    </Box>
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
