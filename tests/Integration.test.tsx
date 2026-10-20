import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../src/App';
import { ARTWORKS } from '../src/data/art';

describe('Full Integration', () => {
  it('switches cleanly between Work, About, and Contact', () => {
    render(<App />);
    // Starts on Work view
    expect(screen.getByText(ARTWORKS[0].title)).toBeDefined();

    // Switch to About
    fireEvent.click(screen.getByText('About'));
    expect(screen.getByText('1-Bit Illustration')).toBeDefined();

    // Switch to Contact
    fireEvent.click(screen.getByText('Contact'));
    expect(screen.getByText(/github\.com\/Chakeyy/i)).toBeDefined();
  });
});
