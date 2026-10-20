import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../src/App';
import { ARTWORKS } from '../src/data/art';

describe('Full Integration', () => {
  it('switches cleanly between Work, About, and Contact', () => {
    render(<App />);
    // Starts on Work view
    expect(screen.getAllByText(ARTWORKS[0].title).length).toBeGreaterThan(0);

    // Switch to About
    fireEvent.click(screen.getByRole('button', { name: /About/i }));
    expect(screen.getByRole('heading', { name: /About/i })).toBeDefined();

    // Switch to Contact
    fireEvent.click(screen.getByRole('button', { name: /Contact/i }));
    expect(screen.getByRole('heading', { name: /Contact/i })).toBeDefined();

    // Back to Work
    fireEvent.click(screen.getByRole('button', { name: /Work/i }));
    expect(screen.getAllByText(ARTWORKS[0].title).length).toBeGreaterThan(0);
  });
});
