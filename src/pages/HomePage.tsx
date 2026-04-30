import { Box, Card, CardActionArea, CardContent, Chip, Grid, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { searchTools } from '../tools/registry';

export function HomePage() {
  const [query, setQuery] = useState('');
  const matches = useMemo(() => searchTools(query), [query]);

  return (
    <Stack spacing={4}>
      <Box sx={{ maxWidth: 880 }}>
        <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '.12em' }}>
          Private browser utilities
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '5.2rem' }, lineHeight: 0.95, mt: 1 }}>
          Lean tools for Markdown and HTML.
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, mt: 2 }}>
          Everything runs locally in this tab. No uploads, no telemetry, no conversion APIs.
        </Typography>
      </Box>

      <TextField
        label="Search tools"
        value={query}
        onChange={(event) => { setQuery(event.target.value); }}
        fullWidth
      />

      {matches.length === 0 ? (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5">No tools match that search.</Typography>
            <Typography color="text.secondary">Try markdown, HTML, preview, PDF, or converter.</Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {matches.map((tool) => (
            <Grid key={tool.slug} size={{ xs: 12, md: 6 }}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardActionArea component={RouterLink} to={`/${tool.slug}`} sx={{ height: '100%', alignItems: 'stretch' }}>
                  <CardContent sx={{ display: 'flex', minHeight: 220, flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h4" component="h2">
                      {tool.title}
                    </Typography>
                    <Typography color="text.secondary">{tool.description}</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                      {tool.keywords.map((keyword) => (
                        <Chip key={keyword} label={keyword} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
}
