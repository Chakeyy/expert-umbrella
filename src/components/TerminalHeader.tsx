import React from 'react';
import { PALETTES } from '../theme/palettes';

export type NavigationTab = 'works' | 'profile' | 'contact';

interface TerminalHeaderProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  currentPalette: string;
  onPaletteChange: (paletteKey: string) => void;
  inverted: boolean;
  onToggleInvert: () => void;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  activeTab,
  onTabChange,
  currentPalette,
  onPaletteChange,
  inverted,
  onToggleInvert,
}) => {
  const tabs: { key: NavigationTab; label: string }[] = [
    { key: 'works', label: 'Work' },
    { key: 'profile', label: 'About' },
    { key: 'contact', label: 'Contact' },
  ];

  const paletteKeys = Object.keys(PALETTES);
  const nextPalette = () => {
    const idx = paletteKeys.indexOf(currentPalette);
    const next = paletteKeys[(idx + 1) % paletteKeys.length];
    onPaletteChange(next);
  };

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg)] select-none">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Minimal Brand Mark */}
        <button
          onClick={() => onTabChange('works')}
          className="flex items-center space-x-2.5 text-left focus:outline-none group"
        >
          <span className="w-3.5 h-3.5 border border-[var(--color-fg)] grid grid-cols-2 grid-rows-2 shrink-0">
            <span className="bg-[var(--color-fg)]" />
            <span />
            <span />
            <span className="bg-[var(--color-fg)]" />
          </span>
          <span className="text-sm font-bold tracking-[0.18em] uppercase">
            Chakeyy
          </span>
        </button>

        {/* Minimal Navigation & Theme Toggles */}
        <div className="flex items-center space-x-6">
          <nav className="flex items-center space-x-5 text-xs tracking-wider">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => onTabChange(tab.key)}
                  className={`py-1 transition-colors ${
                    isActive
                      ? 'text-[var(--color-fg)] font-bold border-b border-[var(--color-fg)]'
                      : 'text-[var(--color-dim)] hover:text-[var(--color-fg)]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2 border-l border-[var(--color-border)] pl-4">
            <button
              onClick={onToggleInvert}
              className="w-7 h-7 flex items-center justify-center border border-[var(--color-border)] hover:border-[var(--color-fg)] text-xs transition-colors"
              title={inverted ? 'Switch to Dark' : 'Switch to Light'}
              aria-label="Toggle Light/Dark Mode"
            >
              ◐
            </button>
            <button
              onClick={nextPalette}
              className="px-2 h-7 flex items-center justify-center border border-[var(--color-border)] hover:border-[var(--color-fg)] text-[10px] tracking-wider uppercase text-[var(--color-dim)] hover:text-[var(--color-fg)] transition-colors"
              title="Cycle 1-Bit Palette"
            >
              {PALETTES[currentPalette]?.name || 'ink'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
