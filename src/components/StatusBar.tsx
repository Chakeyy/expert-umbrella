import React from 'react';

interface StatusBarProps {
  message?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  message = '1-BIT ARCHIVE READY',
}) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg)] text-[10px] px-4 py-1.5 z-40 select-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center space-x-2.5 truncate">
          <span className="inline-block w-1.5 h-1.5 bg-[var(--color-fg)]" />
          <span className="tracking-[0.12em] uppercase text-[var(--color-dim)]">STATUS:</span>
          <span className="tracking-wider uppercase truncate">{message}</span>
        </div>

        <div className="hidden sm:flex items-center space-x-4 text-[var(--color-dim)] tracking-wider uppercase shrink-0">
          <span>[1-3] NAVIGATE</span>
          <span>[I] INVERT</span>
          <span>[ESC] CLOSE LOUPE</span>
          <span className="text-[var(--color-fg)] font-bold">1-BIT // PIXEL PERFECT</span>
        </div>
      </div>
    </footer>
  );
};
