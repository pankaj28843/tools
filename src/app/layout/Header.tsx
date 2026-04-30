import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import type { PaletteMode } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { DarkModeToggle } from '../../shared/components/DarkModeToggle';

type HeaderProps = {
  mode: PaletteMode;
  onModeChange: (mode: PaletteMode) => void;
};

export function Header({ mode, onModeChange }: HeaderProps) {
  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar sx={{ gap: { xs: 1, sm: 2 }, minHeight: { xs: 48, sm: 64 }, px: { xs: 1, sm: 3 } }}>
        <Button component={RouterLink} to="/" color="inherit" size="small">
          Tools
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
          Local-only conversion
        </Typography>
        <DarkModeToggle mode={mode} onModeChange={onModeChange} />
      </Toolbar>
    </AppBar>
  );
}
