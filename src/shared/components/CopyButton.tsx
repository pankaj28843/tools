import { Button, Snackbar } from '@mui/material';
import { useState } from 'react';

type CopyButtonProps = {
  getText: () => string;
  label: string;
};

export function CopyButton({ getText, label }: CopyButtonProps) {
  const [message, setMessage] = useState<string | null>(null);

  async function copy() {
    await navigator.clipboard.writeText(getText());
    setMessage(`${label} copied`);
  }

  return (
    <>
      <Button variant="outlined" onClick={() => void copy()}>
        {label}
      </Button>
      <Snackbar open={message !== null} autoHideDuration={1800} message={message} onClose={() => { setMessage(null); }} />
    </>
  );
}
