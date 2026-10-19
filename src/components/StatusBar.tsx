import React from 'react';

interface StatusBarProps {
  message?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ message = 'READY. WAITING FOR SECTOR INPUT.' }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-sm text-[var(--color-fg)] text-[11px] font-mono px-3 py-1 flex flex-col sm:flex-row sm:items-center sm:justify-between z-40 select-none">
      <div className="flex items-center space-x-2 truncate">
        <span className="text-[var(--color-bright)] animate-pulse">◆</span>
        <span className="text-[var(--color-dim)] font-bold">[SYS]</span>
        <span className="text-[var(--color-fg)] truncate">{message}</span>
      </div>

      <div className="flex items-center space-x-3 text-[10px] text-[var(--color-dim)] mt-0.5 sm:mt-0">
        <span className="hidden md:inline">[1-4] TABS</span>
        <span className="hidden md:inline">[ESC] BACK</span>
        <span className="hidden lg:inline">[ARROWS/WASD] MOVE</span>
        <span className="border-l border-[var(--color-dim)] pl-2 text-[var(--color-bright)]">
          1-BIT PROTOCOL
        </span>
      </div>
    </footer>
  );
};
