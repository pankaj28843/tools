import { Button, ButtonGroup, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { createElement, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import 'trix';
import 'trix/dist/trix.css';
import { CopyButton } from '../../shared/components/CopyButton';
import { ToolWorkspace } from '../../shared/components/ToolWorkspace';
import { ToolPageLayout } from '../../shared/components/ToolPageLayout';
import { convertHtmlToMarkdown, sanitizeInputHtml } from './lib/convert';
import { metadata } from './metadata';

export default function HtmlToMarkdownTool() {
  const editorId = useId();
  const editorRef = useRef<TrixEditorElement | null>(null);
  const [html, setHtml] = useState('');
  const [showSource, setShowSource] = useState(false);
  const [activePane, setActivePane] = useState<'input' | 'output'>('input');
  const markdown = useMemo(() => convertHtmlToMarkdown(html), [html]);
  const sanitizedHtml = useMemo(() => sanitizeInputHtml(html), [html]);

  const replaceEditorHtml = useCallback((nextHtml: string) => {
    const safeHtml = sanitizeInputHtml(nextHtml);
    setHtml(safeHtml);
    editorRef.current?.editor?.loadHTML(safeHtml);
    setActivePane('output');
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
            placeholder: 'Paste rich HTML here...',
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
        <TextField
          value={markdown}
          placeholder="Markdown output appears here."
          multiline
          minRows={18}
          fullWidth
          slotProps={{ htmlInput: { 'aria-label': 'Markdown output' }, input: { readOnly: true } }}
        />
      </CardContent>
    </Card>
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
        <CopyButton label="Copy Markdown" size="small" getText={() => markdown} />
        <Button size="small" onClick={() => { setShowSource((value) => !value); }}>
          {showSource ? 'Hide source' : 'Source'}
        </Button>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
        Paste rich HTML, copy clean Markdown. Everything stays local and sanitized.
      </Typography>
      <ToolWorkspace
        left={sourcePane}
        right={outputPane}
        leftLabel="HTML editor"
        rightLabel="Markdown output"
        activePane={activePane}
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
