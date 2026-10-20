import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../src/App';

describe('Full Integration', () => {
  it('allows switching between Works, Profile, and Contact views', () => {
    render(<App />);
    // Starts on Works view
    expect(screen.getByText(/SELECTED WORKS \/\/ 1-BIT PIXEL ART ARCHIVE/i)).toBeDefined();

    // Switch to Profile
    const profileTab = screen.getByText('PROFILE');
    fireEvent.click(profileTab);
    expect(screen.getByText(/ARTIST PROFILE \/\/ CHAKEYY/i)).toBeDefined();

    // Switch to Contact
    const contactTab = screen.getByText('CONTACT');
    fireEvent.click(contactTab);
    expect(screen.getByText(/CONTACT & LINKS/i)).toBeDefined();
  });
});
