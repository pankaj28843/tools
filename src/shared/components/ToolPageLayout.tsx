import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type ToolPageLayoutProps = {
  title: string;
  description: string;
  keywords: string[];
  children: ReactNode;
};

export function ToolPageLayout({ title, description, keywords, children }: ToolPageLayoutProps) {
  return (
    <Stack spacing={{ xs: 1.5, md: 4 }}>
      <Box>
        <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap', mb: { xs: 0.5, md: 2 } }}>
          <Button component={RouterLink} to="/" size="small">
            Back
          </Button>
          <Stack direction="row" spacing={0.75} useFlexGap sx={{ display: { xs: 'none', sm: 'flex' }, flexWrap: 'wrap' }}>
            {keywords.map((keyword) => (
              <Chip key={keyword} label={keyword} size="small" variant="outlined" />
            ))}
          </Stack>
        </Stack>
        <Typography variant="h2" component="h1" sx={{ maxWidth: 900, fontSize: { xs: '1.75rem', sm: '2.25rem', md: '4rem' }, lineHeight: { xs: 1.05, md: 1.08 } }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mt: { xs: 0.5, md: 1 }, display: { xs: 'none', sm: 'block' } }}>
          {description}
        </Typography>
      </Box>
      {children}
    </Stack>
  );
}
