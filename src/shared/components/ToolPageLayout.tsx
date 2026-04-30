import { Box, Button, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type ToolPageLayoutProps = {
  title: string;
  description: string;
  keywords: string[];
  children: ReactNode;
};

export function ToolPageLayout({ title, description, keywords, children }: ToolPageLayoutProps) {
  void keywords;

  return (
    <Stack spacing={{ xs: 1.25, md: 3 }}>
      <Box>
        <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap', mb: { xs: 0.5, md: 1.5 } }}>
          <Button component={RouterLink} to="/" size="small">
            Back
          </Button>
          <Typography variant="caption" color="text.secondary">
            Runs locally in this browser
          </Typography>
        </Stack>
        <Typography variant="h2" component="h1" sx={{ maxWidth: 900, fontSize: { xs: '1.45rem', sm: '2.25rem', md: '4rem' }, lineHeight: { xs: 1.05, md: 1.08 } }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mt: { xs: 0.5, md: 1 } }}>
          {description}
        </Typography>
      </Box>
      {children}
    </Stack>
  );
}
