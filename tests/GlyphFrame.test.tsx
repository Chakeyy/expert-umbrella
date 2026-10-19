import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GlyphFrame } from '../src/components/GlyphFrame';

describe('GlyphFrame', () => {
  it('renders children with title border', () => {
    render(<GlyphFrame title="ARCHIVES"><span>Content Inside</span></GlyphFrame>);
    expect(screen.getByText('ARCHIVES')).toBeDefined();
    expect(screen.getByText('Content Inside')).toBeDefined();
  });

  it('renders without crashing when title is omitted', () => {
    render(<GlyphFrame><span>No Title</span></GlyphFrame>);
    expect(screen.getByText('No Title')).toBeDefined();
  });
});
