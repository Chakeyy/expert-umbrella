import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CharacterSheetView } from '../src/components/CharacterSheetView';
import { TransmissionView } from '../src/components/TransmissionView';

describe('CharacterSheetView & TransmissionView', () => {
  it('renders artist profile and specifications in CharacterSheetView', () => {
    render(<CharacterSheetView />);
    expect(screen.getByText(/ARTIST PROFILE \/\/ CHAKEYY/i)).toBeDefined();
    expect(screen.getByText(/TECHNICAL SPECIFICATIONS/i)).toBeDefined();
  });

  it('renders contact links and inquiry form in TransmissionView', () => {
    render(<TransmissionView />);
    expect(screen.getByText(/CONTACT & LINKS/i)).toBeDefined();
    expect(screen.getByText(/PROJECT & COMMISSION INQUIRY/i)).toBeDefined();
  });
});
