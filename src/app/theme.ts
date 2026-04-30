import { createTheme, type PaletteMode } from '@mui/material/styles';

export const makeTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: mode === 'dark' ? '#8bd3ff' : '#24536b' },
      secondary: { main: mode === 'dark' ? '#a8c7b3' : '#4d6f5b' },
      background: {
        default: mode === 'dark' ? '#0f1317' : '#f7f4ec',
        paper: mode === 'dark' ? '#171d23' : '#fffdf7',
      },
      text: {
        primary: mode === 'dark' ? '#edf4f7' : '#211f1a',
        secondary: mode === 'dark' ? '#a9b7bf' : '#615b50',
      },
      divider: mode === 'dark' ? 'rgba(190, 210, 220, 0.18)' : 'rgba(70, 56, 32, 0.16)',
    },
    typography: {
      fontFamily: '"Aptos", "Segoe UI", sans-serif',
      h1: { fontWeight: 700, letterSpacing: '-0.055em' },
      h2: { fontWeight: 700, letterSpacing: '-0.04em' },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 500 },
      h6: { fontWeight: 500 },
      button: { textTransform: 'none', fontWeight: 700 },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: mode === 'dark'
              ? 'radial-gradient(circle at top left, rgba(139, 211, 255, 0.08), transparent 32rem)'
              : 'radial-gradient(circle at top left, rgba(95, 71, 34, 0.08), transparent 34rem)',
          },
          'code, pre, textarea': {
            fontFamily: 'ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", monospace',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 8 },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderColor: mode === 'dark' ? 'rgba(190, 210, 220, 0.18)' : 'rgba(70, 56, 32, 0.16)',
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
        },
      },
    },
  });
