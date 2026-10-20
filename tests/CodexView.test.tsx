import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CodexView } from '../src/components/CodexView';
import { ARTWORKS } from '../src/data/art';

describe('CodexView', () => {
  it('hides descriptions in the grid and only shows them when clicked', () => {
    render(<CodexView />);
    const firstPiece = ARTWORKS[0];

    // Card title is visible in the grid (using getAllByText to avoid ambiguity if duplicated in previews)
    const titleElements = screen.getAllByText(firstPiece.title);
    expect(titleElements.length).toBeGreaterThan(0);
    expect(screen.queryByText(firstPiece.description)).toBeNull();

    // Clicking the piece opens the modal and reveals the description
    fireEvent.click(titleElements[0]);
    expect(screen.getByText(firstPiece.description)).toBeDefined();
  });
});
