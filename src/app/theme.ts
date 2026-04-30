import { createTheme, type PaletteMode } from '@mui/material/styles';

export const makeTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: mode === 'dark' ? '#d8b15f' : '#5f4722' },
      secondary: { main: mode === 'dark' ? '#9fb6aa' : '#52695d' },
      background: {
        default: mode === 'dark' ? '#161512' : '#f6f1e8',
        paper: mode === 'dark' ? '#201f1b' : '#fffaf0',
      },
      text: {
        primary: mode === 'dark' ? '#f7f0df' : '#221e17',
        secondary: mode === 'dark' ? '#c9bdab' : '#665b4b',
      },
    },
    typography: {
      fontFamily: 'Georgia, "Times New Roman", serif',
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
          },
        },
      },
    },
  });
