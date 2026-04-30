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
    <Stack spacing={4}>
      <Box>
        <Button component={RouterLink} to="/" sx={{ mb: 2 }}>
          Back to tools
        </Button>
        <Typography variant="h2" component="h1" sx={{ maxWidth: 900, fontSize: { xs: '2.6rem', md: '4rem' } }}>
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 760, mt: 1 }}>
          {description}
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mt: 2 }}>
          {keywords.map((keyword) => (
            <Chip key={keyword} label={keyword} size="small" variant="outlined" />
          ))}
        </Stack>
      </Box>
      {children}
    </Stack>
  );
}
