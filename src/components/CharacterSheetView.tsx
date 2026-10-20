import React from 'react';

export const CharacterSheetView: React.FC = () => {
  return (
    <div className="max-w-xl space-y-8 py-4 select-none">
      <div className="space-y-3">
        <h1 className="text-sm font-bold tracking-[0.15em] uppercase">
          About
        </h1>
        <p className="text-xs leading-relaxed text-[var(--color-dim)]">
          Chakeyy is a pixel artist focused on 1-bit illustration, ordered dithering, and
          minimalist game assets. Working within a strict two-color palette, each piece is built
          pixel by pixel for clarity and contrast.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 border-t border-[var(--color-border)] pt-6 text-xs">
        <div className="space-y-2">
          <div className="text-[10px] text-[var(--color-dim)] uppercase tracking-widest">
            Focus
          </div>
          <ul className="space-y-1 text-[var(--color-fg)]">
            <li>1-Bit Illustration</li>
            <li>Sprites & Animation</li>
            <li>Tilesets & UI Icons</li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="text-[10px] text-[var(--color-dim)] uppercase tracking-widest">
            Tools & Status
          </div>
          <ul className="space-y-1 text-[var(--color-fg)]">
            <li>Aseprite</li>
            <li>Open for Commissions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
