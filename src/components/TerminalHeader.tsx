import React from 'react';
import { PALETTES } from '../theme/palettes';

export type NavigationTab = 'codex' | 'wanderer' | 'dossier' | 'transmission';

interface TerminalHeaderProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  currentPalette: string;
  onPaletteChange: (paletteKey: string) => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  activeTab,
  onTabChange,
  currentPalette,
  onPaletteChange,
  crtEnabled,
  onToggleCrt,
}) => {
  const tabs: { key: NavigationTab; label: string; shortcut: string }[] = [
    { key: 'codex', label: 'CODEX', shortcut: '1' },
    { key: 'wanderer', label: 'WANDERER', shortcut: '2' },
    { key: 'dossier', label: 'DOSSIER', shortcut: '3' },
    { key: 'transmission', label: 'TRANSMISSIONS', shortcut: '4' },
  ];

  return (
    <header className="border-b-2 border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg)] font-mono select-none">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-3 py-2 border-b border-[var(--color-dim)] gap-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold tracking-widest text-[var(--color-bright)]">
            █▓▒░ QUD TERMINAL // 1-BIT ARCHIVES ░▒▓█
          </span>
          <span className="text-[10px] hidden sm:inline px-1 py-0.5 border border-[var(--color-border)] text-[var(--color-dim)]">
            REC:LIVE
          </span>
        </div>

        {/* Global Controls */}
        <div className="flex items-center space-x-2 text-xs self-end md:self-auto">
          {/* CRT scanline toggle */}
          <button
            onClick={onToggleCrt}
            className={`px-2 py-0.5 border text-[11px] transition-colors ${
              crtEnabled
                ? 'border-[var(--color-border)] bg-[var(--color-dim)] text-[var(--color-bright)]'
                : 'border-[var(--color-dim)] text-[var(--color-dim)] hover:border-[var(--color-fg)]'
            }`}
            title="Toggle CRT Scanline Effect"
          >
            CRT: {crtEnabled ? '[ON]' : '[OFF]'}
          </button>

          {/* Palette Selector */}
          <div className="flex items-center space-x-1">
            <span className="text-[var(--color-dim)] text-[10px] hidden lg:inline">PALETTE:</span>
            <select
              value={currentPalette}
              onChange={(e) => onPaletteChange(e.target.value)}
              className="bg-[var(--color-bg)] text-[var(--color-fg)] border border-[var(--color-border)] text-[11px] px-1 py-0.5 outline-none cursor-pointer hover:border-[var(--color-bright)]"
            >
              {Object.entries(PALETTES).map(([key, p]) => (
                <option key={key} value={key} className="bg-black text-green-400">
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="flex flex-wrap items-center bg-black/50 text-xs px-2 py-1 gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`px-3 py-1 border transition-all text-left flex items-center space-x-1.5 ${
                isActive
                  ? 'border-[var(--color-bright)] bg-[var(--color-dim)] text-[var(--color-bright)] font-bold shadow-[0_0_8px_var(--color-dim)]'
                  : 'border-transparent text-[var(--color-fg)] hover:border-[var(--color-dim)] hover:bg-black/40'
              }`}
            >
              <span className="text-[var(--color-dim)] font-mono text-[10px]">[{tab.shortcut}]</span>
              <span>{tab.label}</span>
              {isActive && <span className="text-[var(--color-bright)] text-[10px]">◄</span>}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
