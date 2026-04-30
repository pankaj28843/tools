import { Box, Button, Card, CardContent, FormControlLabel, Stack, Switch, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { CopyButton } from '../../shared/components/CopyButton';
import { ToolWorkspace } from '../../shared/components/ToolWorkspace';
import { ToolPageLayout } from '../../shared/components/ToolPageLayout';
import { convertHtmlToMarkdown, sanitizeInputHtml } from './lib/convert';
import { metadata } from './metadata';

const sampleHtml = `<h1>Launch Note</h1>
<p><strong>Everything converts locally.</strong> Paste rich HTML, then copy Markdown.</p>
<ul><li>Headings</li><li>Links like <a href="https://example.com">example</a></li><li><code>inline code</code></li></ul>
<blockquote>HTML is treated as untrusted input.</blockquote>`;

export default function HtmlToMarkdownTool() {
  const [html, setHtml] = useState(sampleHtml);
  const [hideSource, setHideSource] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const markdown = useMemo(() => convertHtmlToMarkdown(html), [html]);
  const sanitizedHtml = useMemo(() => sanitizeInputHtml(html), [html]);

  const sourcePane = (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent sx={{ height: '100%' }}>
        <TextField
          label="HTML source"
          value={html}
          onChange={(event) => { setHtml(event.target.value); }}
          multiline
          minRows={22}
          fullWidth
        />
      </CardContent>
    </Card>
  );

  const outputPane = (
    <Card className="print-surface" variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        {showPreview ? (
          <Box
            sx={{ '& pre': { p: 2, overflow: 'auto', borderRadius: 2, bgcolor: 'action.hover' } }}
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        ) : (
          <TextField label="Markdown output" value={markdown} multiline minRows={22} fullWidth slotProps={{ input: { readOnly: true } }} />
        )}
      </CardContent>
    </Card>
  );

  return (
    <ToolPageLayout title={metadata.title} description={metadata.description} keywords={metadata.keywords}>
      <Stack className="no-print" direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
        <CopyButton label="Copy HTML" getText={() => html} />
        <CopyButton label="Copy Markdown" getText={() => markdown} />
        <FormControlLabel
          control={<Switch checked={hideSource} onChange={(event) => { setHideSource(event.target.checked); }} />}
          label={hideSource ? 'Source hidden' : 'Show source'}
        />
        <Button
          onClick={() => { setShowPreview((value) => !value); }}
        >
          {showPreview ? 'Show Markdown' : 'Preview sanitized HTML'}
        </Button>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        Pasted HTML is sanitized before preview and conversion.
      </Typography>
      <ToolWorkspace
        left={sourcePane}
        right={outputPane}
        leftLabel="HTML editor"
        rightLabel="Markdown output"
        hideLeft={hideSource}
      />
    </ToolPageLayout>
  );
}
