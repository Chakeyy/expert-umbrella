import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { WandererView } from '../src/components/WandererView';

describe('WandererView', () => {
  it('renders tile grid and nomad player icon', () => {
    render(<WandererView onInspectArt={() => {}} />);
    expect(screen.getByText('@')).toBeDefined();
  });

  it('provides directional controls for movement', () => {
    render(<WandererView onInspectArt={() => {}} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
