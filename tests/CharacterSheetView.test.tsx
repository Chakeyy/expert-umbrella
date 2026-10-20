import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CharacterSheetView } from '../src/components/CharacterSheetView';
import { TransmissionView } from '../src/components/TransmissionView';

describe('CharacterSheetView & TransmissionView', () => {
  it('renders minimalist About section', () => {
    render(<CharacterSheetView />);
    expect(screen.getByRole('heading', { name: /About/i })).toBeDefined();
    expect(screen.getByText('1-Bit Illustration')).toBeDefined();
  });

  it('renders minimalist Contact section', () => {
    render(<TransmissionView />);
    expect(screen.getByRole('heading', { name: /Contact/i })).toBeDefined();
    expect(screen.getByText(/github\.com\/Chakeyy/i)).toBeDefined();
  });
});
