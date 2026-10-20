import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CodexView } from '../src/components/CodexView';
import { ARTWORKS } from '../src/data/art';

describe('CodexView', () => {
  it('hides descriptions in the grid and only shows them when clicked', () => {
    render(<CodexView />);
    const firstPiece = ARTWORKS[0];

    // Title is visible on card, but description is hidden
    expect(screen.getByText(firstPiece.title)).toBeDefined();
    expect(screen.queryByText(firstPiece.description)).toBeNull();

    // Clicking the piece opens the modal and reveals the description
    fireEvent.click(screen.getByText(firstPiece.title));
    expect(screen.getByText(firstPiece.description)).toBeDefined();
  });
});
