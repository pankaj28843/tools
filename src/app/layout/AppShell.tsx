import { Box, Container } from '@mui/material';
import type { PaletteMode } from '@mui/material';
import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

type AppShellProps = {
  children: ReactNode;
  mode: PaletteMode;
  onModeChange: (mode: PaletteMode) => void;
};

export function AppShell({ children, mode, onModeChange }: AppShellProps) {
  return (
    <Box
      sx={(theme) => ({
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderTop: { xs: 0, sm: 3 },
        borderColor: theme.palette.mode === 'dark' ? 'primary.main' : 'secondary.main',
      })}
    >
      <Header mode={mode} onModeChange={onModeChange} />
      <Container component="main" maxWidth="lg" sx={{ py: { xs: 1.25, md: 4 }, px: { xs: 1.25, sm: 3 } }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
}
