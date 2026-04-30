import { CssBaseline, ThemeProvider, useMediaQuery, type PaletteMode } from '@mui/material';
import { useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppShell } from './layout/AppShell';
import { AppRoutes } from './router';
import { makeTheme } from './theme';

const basename = '/tools';

export function App() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>(prefersDark ? 'dark' : 'light');
  const theme = useMemo(() => makeTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename={basename}>
        <AppShell mode={mode} onModeChange={setMode}>
          <AppRoutes />
        </AppShell>
      </BrowserRouter>
    </ThemeProvider>
  );
}
