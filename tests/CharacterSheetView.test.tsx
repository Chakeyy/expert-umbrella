import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CharacterSheetView } from '../src/components/CharacterSheetView';
import { TransmissionView } from '../src/components/TransmissionView';

describe('CharacterSheetView & TransmissionView', () => {
  it('renders artist profile and stats in CharacterSheetView', () => {
    render(<CharacterSheetView />);
    expect(screen.getByText(/CHARACTER DOSSIER/i)).toBeDefined();
  });

  it('renders contact links and transmission terminal in TransmissionView', () => {
    render(<TransmissionView />);
    expect(screen.getByText(/TRANSMISSION ARRAY/i)).toBeDefined();
  });
});
