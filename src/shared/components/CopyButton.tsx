import { Button, Snackbar } from '@mui/material';
import { useState } from 'react';

type CopyButtonProps = {
  getText: () => string;
  label: string;
  size?: 'small' | 'medium' | 'large';
};

export function CopyButton({ getText, label, size = 'medium' }: CopyButtonProps) {
  const [message, setMessage] = useState<string | null>(null);

  async function copy() {
    await navigator.clipboard.writeText(getText());
    setMessage(`${label} copied`);
  }

  return (
    <>
      <Button variant="outlined" size={size} onClick={() => void copy()}>
        {label}
      </Button>
      <Snackbar open={message !== null} autoHideDuration={1800} message={message} onClose={() => { setMessage(null); }} />
    </>
  );
}
