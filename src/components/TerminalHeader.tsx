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
  crtEnabled: boolean;
  onToggleCrt: () => void;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  activeTab,
  onTabChange,
  currentPalette,
  onPaletteChange,
  inverted,
  onToggleInvert,
  crtEnabled,
  onToggleCrt,
}) => {
  const tabs: { key: NavigationTab; label: string; shortcut: string }[] = [
    { key: 'works', label: 'WORKS', shortcut: '01' },
    { key: 'profile', label: 'PROFILE', shortcut: '02' },
    { key: 'contact', label: 'CONTACT', shortcut: '03' },
  ];

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg)] select-none sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Row: Identity & Display Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3.5 gap-3 border-b border-[var(--color-border)]">
          {/* Artist Identity */}
          <div className="flex items-center space-x-3">
            {/* 1-Bit Checker Mark */}
            <div className="w-6 h-6 border border-[var(--color-fg)] grid grid-cols-2 grid-rows-2 shrink-0">
              <div className="bg-[var(--color-fg)]" />
              <div className="bg-transparent" />
              <div className="bg-transparent" />
              <div className="bg-[var(--color-fg)]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
                  CHAKEYY
                </span>
                <span className="text-[10px] px-1.5 py-0.5 border border-[var(--color-border)] text-[var(--color-dim)]">
                  1-BIT STUDIO
                </span>
              </div>
              <p className="text-[10px] text-[var(--color-dim)] tracking-wider uppercase mt-0.5">
                BINARY PIXEL ART · DITHERING · SPRITES
              </p>
            </div>
          </div>

          {/* Display Calibration Controls */}
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            {/* Invert Polarity Button */}
            <button
              onClick={onToggleInvert}
              className={`px-2.5 py-1 border tracking-wider uppercase transition-colors ${
                inverted
                  ? 'border-[var(--color-fg)] bg-[var(--color-fg)] text-[var(--color-bg)] font-bold'
                  : 'border-[var(--color-border)] text-[var(--color-fg)] hover:border-[var(--color-fg)]'
              }`}
              title="Invert 1-Bit Polarity (Dark / Light)"
            >
              ◐ POLARITY
            </button>

            {/* Scanlines Toggle */}
            <button
              onClick={onToggleCrt}
              className={`px-2.5 py-1 border tracking-wider uppercase transition-colors ${
                crtEnabled
                  ? 'border-[var(--color-fg)] bg-[var(--color-fg)] text-[var(--color-bg)] font-bold'
                  : 'border-[var(--color-border)] text-[var(--color-dim)] hover:border-[var(--color-fg)] hover:text-[var(--color-fg)]'
              }`}
              title="Toggle Monitor Scanlines"
            >
              CRT: {crtEnabled ? 'ON' : 'OFF'}
            </button>

            {/* Palette Selector */}
            <select
              aria-label="Color Palette"
              value={currentPalette}
              onChange={(e) => onPaletteChange(e.target.value)}
              className="bg-[var(--color-bg)] text-[var(--color-fg)] border border-[var(--color-border)] text-[11px] px-2.5 py-1 outline-none cursor-pointer hover:border-[var(--color-fg)] tracking-wider uppercase"
            >
              {Object.entries(PALETTES).map(([key, p]) => (
                <option key={key} value={key} className="bg-black text-white">
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bottom Row: Navigation & Dither Strip */}
        <div className="flex items-center justify-between py-2">
          <nav className="flex items-center space-x-1 sm:space-x-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => onTabChange(tab.key)}
                  className={`px-3 py-1.5 text-xs tracking-[0.15em] uppercase transition-all flex items-center space-x-2 border ${
                    isActive
                      ? 'border-[var(--color-fg)] bg-[var(--color-fg)] text-[var(--color-bg)] font-bold'
                      : 'border-transparent text-[var(--color-dim)] hover:text-[var(--color-fg)] hover:border-[var(--color-border)]'
                  }`}
                >
                  <span className="text-[10px] opacity-70">{tab.shortcut}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center space-x-3 text-[10px] text-[var(--color-dim)] tracking-widest">
            <div className="w-24 h-2 dither-dots" />
            <span>INDEX // 2-TONE MATRIX</span>
          </div>
        </div>
      </div>
    </header>
  );
};
