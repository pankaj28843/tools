import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { HomePage } from '../pages/HomePage';
import Base64Tool from '../tools/base64/Tool';
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
    expect(screen.getAllByRole('link', { name: /base64 encode \/ decode/i }).length).toBeGreaterThan(0);
    expect(screen.getByText(/showing 4 of 4 tools/i)).toBeInTheDocument();
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
    expect(screen.getByRole('button', { name: /source/i })).toBeInTheDocument();
  });

  it('renders Base64 controls and converts text', () => {
    render(
      <MemoryRouter>
        <Base64Tool />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole('textbox', { name: /text input/i }), { target: { value: 'Hello' } });

    expect(screen.getByRole('textbox', { name: /base64 output/i })).toHaveValue('SGVsbG8=');
    expect(screen.getByRole('button', { name: /decode/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy output/i })).toBeInTheDocument();
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
