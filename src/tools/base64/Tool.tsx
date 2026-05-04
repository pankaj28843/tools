import { Alert, Button, ButtonGroup, Card, CardContent, Chip, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { CopyButton } from '../../shared/components/CopyButton';
import { ToolPageLayout } from '../../shared/components/ToolPageLayout';
import { ToolWorkspace } from '../../shared/components/ToolWorkspace';
import { decodeBase64Text, encodeBase64Text } from './lib/convert';
import { metadata } from './metadata';

type Mode = 'encode' | 'decode';

const examples: Record<Mode, string> = {
  encode: 'Hello, Tools Workshop.',
  decode: 'SGVsbG8sIFRvb2xzIFdvcmtzaG9wLg==',
};

export default function Base64Tool() {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [activePane, setActivePane] = useState<'input' | 'output'>('input');
  const result = useMemo(() => mode === 'encode' ? { ok: true as const, text: encodeBase64Text(input) } : decodeBase64Text(input), [input, mode]);
  const output = result.ok ? result.text : '';

  function switchMode(nextMode: Mode) {
    setMode(nextMode);
    setActivePane('input');
  }

  function swapValues() {
    if (!result.ok) return;

    setInput(output);
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setActivePane('output');
  }

  const inputPane = (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent sx={{ height: '100%', display: 'grid', gap: 2 }}>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
          <Chip label={mode === 'encode' ? 'Text to Base64' : 'Base64 to text'} color="primary" variant="outlined" />
          <Chip label="Local only" variant="outlined" />
          <Chip label="UTF-8" variant="outlined" />
        </Stack>
        <TextField
          label={mode === 'encode' ? 'Text input' : 'Base64 input'}
          value={input}
          placeholder={mode === 'encode' ? 'Paste text to encode...' : 'Paste Base64 to decode...'}
          helperText={mode === 'encode' ? 'Unicode text is encoded as UTF-8 bytes.' : 'Whitespace and URL-safe Base64 are accepted.'}
          onChange={(event) => { setInput(event.target.value); }}
          multiline
          minRows={18}
          fullWidth
          slotProps={{ htmlInput: { 'aria-label': mode === 'encode' ? 'Text input' : 'Base64 input' } }}
        />
      </CardContent>
    </Card>
  );

  const outputPane = (
    <Stack spacing={2} sx={{ height: '100%' }}>
      {!result.ok ? <Alert severity="error">{result.error}</Alert> : null}
      <Card className="print-surface" variant="outlined" sx={{ height: '100%' }}>
        <CardContent sx={{ display: 'grid', gap: 2 }}>
          <TextField
            label={mode === 'encode' ? 'Base64 output' : 'Decoded text output'}
            value={output}
            placeholder={mode === 'encode' ? 'Base64 output appears here.' : 'Decoded text appears here.'}
            multiline
            minRows={18}
            fullWidth
            slotProps={{ htmlInput: { 'aria-label': mode === 'encode' ? 'Base64 output' : 'Decoded text output' }, input: { readOnly: true } }}
          />
        </CardContent>
      </Card>
    </Stack>
  );

  return (
    <ToolPageLayout title={metadata.title} description={metadata.description} keywords={metadata.keywords}>
      <Stack className="no-print" direction="row" spacing={{ xs: 0.75, sm: 1.5 }} useFlexGap sx={{ position: { xs: 'sticky', sm: 'static' }, top: { xs: 45, sm: 'auto' }, zIndex: 1, py: { xs: 0.5, sm: 0 }, bgcolor: 'background.default', flexWrap: 'wrap', alignItems: 'center' }}>
        <ButtonGroup size="small" variant="outlined" sx={{ display: { md: 'none' } }}>
          <Button variant={activePane === 'input' ? 'contained' : 'outlined'} onClick={() => { setActivePane('input'); }}>
            Input
          </Button>
          <Button variant={activePane === 'output' ? 'contained' : 'outlined'} onClick={() => { setActivePane('output'); }}>
            Output
          </Button>
        </ButtonGroup>
        <ButtonGroup size="small" variant="outlined" aria-label="Base64 mode">
          <Button variant={mode === 'encode' ? 'contained' : 'outlined'} onClick={() => { switchMode('encode'); }}>
            Encode
          </Button>
          <Button variant={mode === 'decode' ? 'contained' : 'outlined'} onClick={() => { switchMode('decode'); }}>
            Decode
          </Button>
        </ButtonGroup>
        <CopyButton label="Copy output" size="small" getText={() => output} />
        <Button size="small" onClick={swapValues} disabled={!result.ok || output.length === 0}>
          Swap
        </Button>
        <Button size="small" onClick={() => { setInput(''); }}>
          Clear
        </Button>
        <Button size="small" onClick={() => { setInput(examples[mode]); }}>
          Example
        </Button>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        Base64 is encoding, not encryption. This tool runs in your browser tab and does not store or upload input.
      </Typography>
      <ToolWorkspace
        left={inputPane}
        right={outputPane}
        leftLabel={mode === 'encode' ? 'Text editor' : 'Base64 editor'}
        rightLabel={mode === 'encode' ? 'Base64 output' : 'Decoded output'}
        activePane={activePane}
      />
    </ToolPageLayout>
  );
}
