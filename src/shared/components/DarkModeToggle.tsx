import { Button } from '@mui/material';
import type { PaletteMode } from '@mui/material';

type DarkModeToggleProps = {
  mode: PaletteMode;
  onModeChange: (mode: PaletteMode) => void;
};

export function DarkModeToggle({ mode, onModeChange }: DarkModeToggleProps) {
  const nextMode = mode === 'dark' ? 'light' : 'dark';
  return (
    <Button aria-label={`Switch to ${nextMode} mode`} color="inherit" onClick={() => { onModeChange(nextMode); }}>
      {nextMode} mode
    </Button>
  );
}
