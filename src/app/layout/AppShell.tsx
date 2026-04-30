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
        borderTop: 4,
        borderColor: theme.palette.primary.main,
      })}
    >
      <Header mode={mode} onModeChange={onModeChange} />
      <Container component="main" maxWidth="lg" sx={{ py: { xs: 1, md: 6 }, px: { xs: 1, sm: 3 } }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
}
