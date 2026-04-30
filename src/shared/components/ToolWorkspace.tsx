import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import type { ReactNode } from 'react';

type ToolWorkspaceProps = {
  left: ReactNode;
  right: ReactNode;
  hideLeft?: boolean;
  leftLabel: string;
  rightLabel: string;
};

export function ToolWorkspace({ left, right, hideLeft = false, leftLabel, rightLabel }: ToolWorkspaceProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const leftHeadingId = `${leftLabel.toLowerCase().replaceAll(' ', '-')}-region`;
  const rightHeadingId = `${rightLabel.toLowerCase().replaceAll(' ', '-')}-region`;
  const leftRegion = (
    <Box aria-labelledby={leftHeadingId} role="region" sx={{ minWidth: 0 }}>
      <Typography id={leftHeadingId} component="h2" variant="h6" sx={{ mb: 2 }}>
        {leftLabel}
      </Typography>
      {left}
    </Box>
  );
  const rightRegion = (
    <Box aria-labelledby={rightHeadingId} role="region" sx={{ minWidth: 0 }}>
      <Typography id={rightHeadingId} component="h2" variant="h6" sx={{ mb: 2 }}>
        {rightLabel}
      </Typography>
      {right}
    </Box>
  );

  if (hideLeft || isMobile) {
    return (
      <Box sx={{ display: 'grid', gap: 2 }}>
        {!hideLeft && leftRegion}
        {rightRegion}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 0.9fr) 1px minmax(0, 1.1fr)',
        gap: 2,
        minHeight: 620,
      }}
    >
      {leftRegion}
      <Box aria-hidden="true" sx={{ bgcolor: 'divider' }} />
      {rightRegion}
    </Box>
  );
}
