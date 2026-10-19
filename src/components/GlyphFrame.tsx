import React from 'react';

interface GlyphFrameProps {
  title?: string;
  badge?: string;
  className?: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
}

export const GlyphFrame: React.FC<GlyphFrameProps> = ({
  title,
  badge,
  className = '',
  children,
  headerRight,
}) => {
  return (
    <div className={`relative border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg)] font-mono ${className}`}>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-3 py-1.5 bg-black/40 text-xs tracking-wider select-none">
        <div className="flex items-center space-x-2 overflow-hidden">
          <span className="text-[var(--color-border)] font-bold">╔═</span>
          {title && (
            <span className="font-bold uppercase tracking-widest text-[var(--color-bright)] truncate">
              {title}
            </span>
          )}
          {badge && (
            <span className="text-[10px] px-1 py-0.2 bg-[var(--color-dim)] text-[var(--color-bright)] border border-[var(--color-border)]">
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2 text-[var(--color-dim)]">
          {headerRight}
          <span className="text-[var(--color-border)] font-bold">═╗</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-3 relative z-10">
        {children}
      </div>

      {/* Bottom Footer Border */}
      <div className="flex items-center justify-between border-t border-[var(--color-border)] px-3 py-0.5 text-[10px] text-[var(--color-dim)] bg-black/40 select-none">
        <span>╚════</span>
        <span className="tracking-widest">░▒▓█▓▒░</span>
        <span>════╝</span>
      </div>
    </div>
  );
};
