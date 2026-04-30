import { AppBar, Box, Button, Toolbar } from '@mui/material';
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
      <Toolbar sx={{ gap: { xs: 1, sm: 2 }, minHeight: { xs: 44, sm: 56 }, px: { xs: 1, sm: 3 } }}>
        <Button component={RouterLink} to="/" color="inherit" size="small">
          Tools
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <DarkModeToggle mode={mode} onModeChange={onModeChange} />
      </Toolbar>
    </AppBar>
  );
}
