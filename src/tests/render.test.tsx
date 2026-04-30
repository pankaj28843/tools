import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { HomePage } from '../pages/HomePage';
import MarkdownToHtmlTool from '../tools/markdown-to-html/Tool';
import HtmlToMarkdownTool from '../tools/html-to-markdown/Tool';

describe('rendering', () => {
  it('renders the home page index', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: /lean tools/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /markdown to rich html/i })).toBeInTheDocument();
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
    expect(screen.getByLabelText(/html source/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /markdown output/i })).toBeInTheDocument();
  });
});
