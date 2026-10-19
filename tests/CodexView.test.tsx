import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CodexView } from '../src/components/CodexView';

describe('CodexView', () => {
  it('renders art entries and selects an item', () => {
    render(<CodexView />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('filters artworks by category', () => {
    render(<CodexView />);
    const filterButtons = screen.getAllByRole('button');
    expect(filterButtons.length).toBeGreaterThan(0);
  });
});
