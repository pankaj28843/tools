import { Box, Button, Chip, Collapse, Stack, Typography } from '@mui/material';
import { useState, type ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type ToolPageLayoutProps = {
  title: string;
  description: string;
  keywords: string[];
  children: ReactNode;
};

export function ToolPageLayout({ title, description, keywords, children }: ToolPageLayoutProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Stack spacing={{ xs: 1, md: 4 }}>
      <Box>
        <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap', mb: { xs: 0.5, md: 2 } }}>
          <Button component={RouterLink} to="/" size="small">
            Back
          </Button>
          <Button size="small" sx={{ display: { xs: 'inline-flex', sm: 'none' } }} onClick={() => { setShowDetails((value) => !value); }}>
            {showDetails ? 'Hide details' : 'Details'}
          </Button>
          <Stack direction="row" spacing={0.75} useFlexGap sx={{ display: { xs: 'none', sm: 'flex' }, flexWrap: 'wrap' }}>
            {keywords.map((keyword) => (
              <Chip key={keyword} label={keyword} size="small" variant="outlined" />
            ))}
          </Stack>
        </Stack>
        <Typography variant="h2" component="h1" sx={{ maxWidth: 900, fontSize: { xs: '1.45rem', sm: '2.25rem', md: '4rem' }, lineHeight: { xs: 1.05, md: 1.08 } }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mt: { xs: 0.5, md: 1 }, display: { xs: 'none', sm: 'block' } }}>
          {description}
        </Typography>
        <Collapse in={showDetails} sx={{ display: { sm: 'none' }, mt: 1 }}>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: 'wrap' }}>
              {keywords.map((keyword) => (
                <Chip key={keyword} label={keyword} size="small" variant="outlined" />
              ))}
            </Stack>
          </Stack>
        </Collapse>
      </Box>
      {children}
    </Stack>
  );
}
