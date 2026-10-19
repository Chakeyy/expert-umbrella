import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../src/App';

describe('Full Integration', () => {
  it('allows switching between Codex, Wanderer, Dossier, and Transmissions', () => {
    render(<App />);
    // Starts on Codex view
    expect(screen.getByText(/ARCHIVES CODEX \/\/ CATALOG QUERY/i)).toBeDefined();

    // Switch to Wanderer
    const wandererTab = screen.getByText(/WANDERER/i);
    fireEvent.click(wandererTab);
    expect(screen.getByText('@')).toBeDefined();

    // Switch to Dossier
    const dossierTab = screen.getByText(/DOSSIER/i);
    fireEvent.click(dossierTab);
    expect(screen.getByText(/CHARACTER DOSSIER \/\/ ARTIST PROFILE/i)).toBeDefined();

    // Switch to Transmissions
    const transTab = screen.getByText(/TRANSMISSIONS/i);
    fireEvent.click(transTab);
    expect(screen.getByText(/TRANSMISSION ARRAY \/\/ BROADCAST FREQUENCIES/i)).toBeDefined();
  });
});
