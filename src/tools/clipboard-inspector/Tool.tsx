import { Alert, Box, Button, Card, CardContent, Chip, Stack, TextField, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { CopyButton } from '../../shared/components/CopyButton';
import { ToolPageLayout } from '../../shared/components/ToolPageLayout';
import { ToolWorkspace } from '../../shared/components/ToolWorkspace';
import { inspectClipboardData, type ClipboardInspection } from './lib/inspect';
import { metadata } from './metadata';

const emptyInspection: ClipboardInspection = {
  plainText: '',
  rawHtml: '',
  sanitizedHtml: '',
  types: [],
  plainTextLength: 0,
  rawHtmlLength: 0,
  sanitizedHtmlLength: 0,
  removedHtmlCharacters: 0,
  linkCount: 0,
  imageCount: 0,
};

export default function ClipboardInspectorTool() {
  const [inspection, setInspection] = useState<ClipboardInspection>(emptyInspection);
  const [hasPasted, setHasPasted] = useState(false);
  const [showRawHtml, setShowRawHtml] = useState(false);

  const handlePaste = useCallback((event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    setInspection(inspectClipboardData(event.clipboardData));
    setHasPasted(true);
  }, []);

  const diagnosticsJson = JSON.stringify(inspection, null, 2);
  const sourceHtml = showRawHtml ? inspection.rawHtml : inspection.sanitizedHtml;

  const sourcePane = (
    <Stack spacing={2}>
      <Card
        variant="outlined"
        tabIndex={0}
        onPaste={handlePaste}
        sx={{
          borderStyle: 'dashed',
          outline: 'none',
          '&:focus-visible': { borderColor: 'primary.main', boxShadow: 2 },
        }}
      >
        <CardContent>
          <Typography component="h2" variant="h5" gutterBottom>
            Paste rich content here
          </Typography>
          <Typography color="text.secondary">
            Focus this panel and paste from a web page, document, or email. The tool reads the paste event in this tab only.
          </Typography>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mb: 2 }}>
            {inspection.types.length > 0 ? inspection.types.map((type) => <Chip key={type} label={type} size="small" />) : <Chip label="No paste yet" size="small" variant="outlined" />}
          </Stack>
          <TextField label="Plain text" value={inspection.plainText} multiline minRows={8} fullWidth slotProps={{ input: { readOnly: true } }} />
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mb: 2 }}>
            <CopyButton label="Copy diagnostics" getText={() => diagnosticsJson} />
            <CopyButton label="Copy sanitized HTML" getText={() => inspection.sanitizedHtml} />
            <Button onClick={() => { setShowRawHtml((value) => !value); }}>
              {showRawHtml ? 'Show sanitized HTML' : 'Show raw HTML'}
            </Button>
          </Stack>
          <TextField label={showRawHtml ? 'Raw HTML' : 'Sanitized HTML'} value={sourceHtml} multiline minRows={12} fullWidth slotProps={{ input: { readOnly: true } }} />
        </CardContent>
      </Card>
    </Stack>
  );

  const previewPane = (
    <Stack spacing={2}>
      {!hasPasted ? (
        <Alert severity="info">Paste content into the focus panel to see clipboard diagnostics.</Alert>
      ) : null}
      <Card variant="outlined">
        <CardContent>
          <Typography component="h2" variant="h5" gutterBottom>
            Clipboard metadata
          </Typography>
          <Box
            component="dl"
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'max-content 1fr' },
              gap: 1,
              m: 0,
              '& dt': { color: 'text.secondary' },
              '& dd': { m: 0, fontFamily: 'ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", monospace' },
            }}
          >
            <dt>Plain text characters</dt><dd>{inspection.plainTextLength}</dd>
            <dt>Raw HTML characters</dt><dd>{inspection.rawHtmlLength}</dd>
            <dt>Sanitized HTML characters</dt><dd>{inspection.sanitizedHtmlLength}</dd>
            <dt>Removed HTML characters</dt><dd>{inspection.removedHtmlCharacters}</dd>
            <dt>Links</dt><dd>{inspection.linkCount}</dd>
            <dt>Images</dt><dd>{inspection.imageCount}</dd>
          </Box>
        </CardContent>
      </Card>
      <Card className="print-surface" variant="outlined">
        <CardContent>
          <Typography component="h2" variant="h5" gutterBottom>
            Sanitized HTML preview
          </Typography>
          <Box sx={{ '& img': { maxWidth: '100%' }, '& pre': { p: 2, overflow: 'auto', borderRadius: 2, bgcolor: 'action.hover' } }} dangerouslySetInnerHTML={{ __html: inspection.sanitizedHtml }} />
        </CardContent>
      </Card>
    </Stack>
  );

  return (
    <ToolPageLayout title={metadata.title} description={metadata.description} keywords={metadata.keywords}>
      <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
        Clipboard data is captured only from the paste event and is never stored, uploaded, or sent to another service.
      </Typography>
      <ToolWorkspace left={sourcePane} right={previewPane} leftLabel="Paste input" rightLabel="Diagnostics" />
    </ToolPageLayout>
  );
}
