import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { HomePage } from '../pages/HomePage';
import ClipboardInspectorTool from '../tools/clipboard-inspector/Tool';
import MarkdownToHtmlTool from '../tools/markdown-to-html/Tool';
import HtmlToMarkdownTool from '../tools/html-to-markdown/Tool';

describe('rendering', () => {
  it('renders the focused home page index', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: /tools workshop/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /markdown to rich html/i }).length).toBeGreaterThan(0);
    expect(screen.getByText(/showing 3 of 3 tools/i)).toBeInTheDocument();
  });

  it('renders markdown tool controls', () => {
    render(
      <MemoryRouter>
        <MarkdownToHtmlTool />
      </MemoryRouter>,
    );
    expect(screen.getByLabelText(/markdown source/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /print/i })).toBeInTheDocument();
  });

  it('renders html tool controls', () => {
    render(
      <MemoryRouter>
        <HtmlToMarkdownTool />
      </MemoryRouter>,
    );
    expect(screen.getByLabelText(/rich html editor/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /markdown output/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy markdown/i })).toBeInTheDocument();
    expect(screen.getByText(/show source/i)).toBeInTheDocument();
  });

  it('renders clipboard inspector controls and paste diagnostics', () => {
    render(
      <MemoryRouter>
        <ClipboardInspectorTool />
      </MemoryRouter>,
    );

    const pasteTarget = screen.getByText(/paste rich content here/i).closest('.MuiCard-root');
    expect(pasteTarget).toBeInTheDocument();

    fireEvent.paste(pasteTarget as HTMLElement, {
      clipboardData: {
        types: ['text/plain', 'text/html'],
        getData: (type: string) => type === 'text/html' ? '<p><strong>Rich</strong></p>' : 'Rich',
      },
    });

    expect(screen.getByLabelText(/plain text/i)).toHaveValue('Rich');
    expect(screen.getByLabelText(/sanitized html/i)).toHaveValue('<p><strong>Rich</strong></p>');
    expect(screen.getByText('text/html')).toBeInTheDocument();
  });
});
