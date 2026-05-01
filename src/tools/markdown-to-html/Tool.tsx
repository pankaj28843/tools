import { Box, Button, ButtonGroup, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { CopyButton } from '../../shared/components/CopyButton';
import { ToolWorkspace } from '../../shared/components/ToolWorkspace';
import { ToolPageLayout } from '../../shared/components/ToolPageLayout';
import { metadata } from './metadata';
import { htmlDocumentFragment, sanitizeHtml } from './lib/convert';

export default function MarkdownToHtmlTool() {
  const [markdown, setMarkdown] = useState('');
  const [activePane, setActivePane] = useState<'input' | 'output'>('input');
  const [readingMode, setReadingMode] = useState(false);
  const sanitizedSource = useMemo(() => sanitizeHtml(markdown), [markdown]);
  const copyableHtml = useMemo(() => htmlDocumentFragment(sanitizedSource), [sanitizedSource]);

  const sourcePane = (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent sx={{ height: '100%' }}>
        <TextField
          label="Markdown source"
          value={markdown}
          placeholder="Paste Markdown here..."
          onChange={(event) => { setMarkdown(event.target.value); }}
          multiline
          minRows={18}
          fullWidth
        />
      </CardContent>
    </Card>
  );

  const previewPane = (
    <Card className="print-surface" variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Box
          sx={{
            maxWidth: readingMode ? 760 : 'none',
            mx: readingMode ? 'auto' : 0,
            '& table': { borderCollapse: 'collapse', width: '100%', my: 2 },
            '& th, & td': { border: 1, borderColor: 'divider', p: 1 },
            '& pre': { p: 2, overflow: 'auto', borderRadius: 2, bgcolor: 'action.hover' },
            '& blockquote': { borderLeft: 4, borderColor: 'primary.main', pl: 2, color: 'text.secondary' },
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
            {markdown}
          </ReactMarkdown>
        </Box>
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
        <CopyButton label="Copy HTML" getText={() => copyableHtml} />
        <Button variant="contained" onClick={() => { window.print(); }}>
          Print
        </Button>
        <Button
          onClick={() => { setReadingMode((value) => !value); }}
        >
          {readingMode ? 'Desk' : 'Read'}
        </Button>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        Preview sanitized HTML and export with your browser print dialog. No uploads.
      </Typography>
      <ToolWorkspace
        left={sourcePane}
        right={previewPane}
        leftLabel="Markdown editor"
        rightLabel="HTML preview"
        activePane={activePane}
      />
    </ToolPageLayout>
  );
}
