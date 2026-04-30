import { Box, Button, Card, CardContent, FormControlLabel, Stack, Switch, TextField, Typography } from '@mui/material';
import { createElement, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import 'trix';
import 'trix/dist/trix.css';
import { CopyButton } from '../../shared/components/CopyButton';
import { ToolWorkspace } from '../../shared/components/ToolWorkspace';
import { ToolPageLayout } from '../../shared/components/ToolPageLayout';
import { convertHtmlToMarkdown, sanitizeInputHtml } from './lib/convert';
import { metadata } from './metadata';

const sampleHtml = `<h1>Launch Note</h1>
<p><strong>Everything converts locally.</strong> Paste rich HTML anywhere on the page, tune it in the rich editor, then copy Markdown.</p>
<ul><li>Headings</li><li>Links like <a href="https://example.com">example</a></li><li><code>inline code</code></li></ul>
<blockquote>HTML is treated as untrusted input.</blockquote>`;

export default function HtmlToMarkdownTool() {
  const editorId = useId();
  const editorRef = useRef<TrixEditorElement | null>(null);
  const [html, setHtml] = useState(sampleHtml);
  const [showSource, setShowSource] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const markdown = useMemo(() => convertHtmlToMarkdown(html), [html]);
  const sanitizedHtml = useMemo(() => sanitizeInputHtml(html), [html]);

  const replaceEditorHtml = useCallback((nextHtml: string) => {
    const safeHtml = sanitizeInputHtml(nextHtml);
    setHtml(safeHtml);
    editorRef.current?.editor?.loadHTML(safeHtml);
  }, []);

  const syncEditorHtml = useCallback(() => {
    const nextHtml = editorRef.current?.innerHTML;

    if (nextHtml) {
      const safeHtml = sanitizeInputHtml(nextHtml);
      setHtml(safeHtml);

      if (safeHtml !== nextHtml) {
        editorRef.current?.editor?.loadHTML(safeHtml);
      }
    }
  }, []);

  const handleEditorPaste = useCallback((event: ClipboardEvent) => {
    const pastedHtml = event.clipboardData?.getData('text/html');
    const pastedText = event.clipboardData?.getData('text/plain');

    if (!pastedHtml && !pastedText) return;

    event.preventDefault();
    replaceEditorHtml(pastedHtml ?? `<p>${escapeHtml(pastedText ?? '').replaceAll('\n', '<br>')}</p>`);
    editorRef.current?.focus();
    window.setTimeout(syncEditorHtml);
  }, [replaceEditorHtml, syncEditorHtml]);


  useEffect(() => {
    const handleWindowPaste = (event: ClipboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest('textarea,input,trix-editor')) {
        return;
      }

      const pastedHtml = event.clipboardData?.getData('text/html');
      const pastedText = event.clipboardData?.getData('text/plain');

      if (pastedHtml) {
        event.preventDefault();
        replaceEditorHtml(pastedHtml);
        editorRef.current?.focus();
        window.setTimeout(syncEditorHtml);
        return;
      }

      if (pastedText) {
        event.preventDefault();
        replaceEditorHtml(`<p>${escapeHtml(pastedText).replaceAll('\n', '<br>')}</p>`);
        editorRef.current?.focus();
        window.setTimeout(syncEditorHtml);
      }
    };

    window.addEventListener('paste', handleWindowPaste);
    return () => {
      window.removeEventListener('paste', handleWindowPaste);
    };
  }, [replaceEditorHtml, syncEditorHtml]);

  useEffect(() => {
    const editor = editorRef.current;
    editor?.addEventListener('paste', handleEditorPaste);

    const toolbar = editor?.toolbarElement;
    toolbar?.setAttribute('aria-hidden', 'true');
    toolbar?.querySelectorAll('button,input').forEach((element) => {
      element.setAttribute('tabindex', '-1');
    });

    return () => {
      editor?.removeEventListener('paste', handleEditorPaste);
    };
  }, [handleEditorPaste]);

  const sourcePane = (
    <Stack spacing={2}>
      <Card
        variant="outlined"
        sx={{
          '& trix-toolbar': {
            display: 'none',
          },
          '& trix-editor': {
            minHeight: 260,
            borderColor: 'divider',
            borderRadius: 2,
            bgcolor: 'background.paper',
            color: 'text.primary',
            fontFamily: 'inherit',
            fontSize: '1rem',
            lineHeight: 1.65,
            p: 2,
          },
        }}
      >
        <CardContent>
          <input id={editorId} type="hidden" value={sanitizedHtml} readOnly />
          {createElement('trix-editor', {
            ref: editorRef,
            input: editorId,
            'aria-label': 'Rich HTML editor',
            onTrixChange: syncEditorHtml,
          })}
        </CardContent>
      </Card>
      {showSource ? (
        <Card variant="outlined" sx={{ height: '100%' }}>
          <CardContent sx={{ height: '100%' }}>
            <TextField
              value={html}
              onChange={(event) => { replaceEditorHtml(event.target.value); }}
              multiline
              minRows={8}
              fullWidth
              slotProps={{ htmlInput: { 'aria-label': 'Sanitized HTML source' } }}
            />
          </CardContent>
        </Card>
      ) : null}
    </Stack>
  );

  const outputPane = (
    <Card className="print-surface" variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        {showPreview ? (
          <Box
            aria-label="Sanitized HTML preview"
            sx={{ '& pre': { p: 2, overflow: 'auto', borderRadius: 2, bgcolor: 'action.hover' } }}
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        ) : (
          <TextField value={markdown} multiline minRows={22} fullWidth slotProps={{ htmlInput: { 'aria-label': 'Markdown output' }, input: { readOnly: true } }} />
        )}
      </CardContent>
    </Card>
  );

  return (
    <ToolPageLayout title={metadata.title} description={metadata.description} keywords={metadata.keywords}>
      <Stack className="no-print" direction="row" spacing={{ xs: 0.75, sm: 1.5 }} useFlexGap sx={{ position: { xs: 'sticky', sm: 'static' }, top: { xs: 45, sm: 'auto' }, zIndex: 1, py: { xs: 0.5, sm: 0 }, bgcolor: 'background.default', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="contained" size="small" onClick={() => { editorRef.current?.focus(); }}>
          Paste HTML
        </Button>
        <CopyButton label="Copy Markdown" size="small" getText={() => markdown} />
        <CopyButton label="Copy HTML" size="small" getText={() => html} />
        <FormControlLabel
          control={<Switch checked={showSource} onChange={(event) => { setShowSource(event.target.checked); }} />}
          label={showSource ? 'Hide source' : 'Show source'}
        />
        <Button
          size="small"
          onClick={() => { setShowPreview((value) => !value); }}
        >
          {showPreview ? 'Show Markdown' : 'Preview sanitized HTML'}
        </Button>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
        Paste rich HTML, copy clean Markdown. Everything stays local and sanitized.
      </Typography>
      <ToolWorkspace
        left={sourcePane}
        right={outputPane}
        leftLabel="HTML editor"
        rightLabel={showPreview ? 'Sanitized HTML preview' : 'Markdown output'}
      />
    </ToolPageLayout>
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

type TrixEditorElement = HTMLElement & {
  editor?: {
    loadHTML(html?: string): void;
  };
  toolbarElement?: HTMLElement;
};
