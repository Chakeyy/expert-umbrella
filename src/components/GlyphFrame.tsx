import React from 'react';

interface GlyphFrameProps {
  title?: string;
  badge?: string;
  index?: string;
  className?: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  noPadding?: boolean;
}

export const GlyphFrame: React.FC<GlyphFrameProps> = ({
  title,
  badge,
  index,
  className = '',
  children,
  headerRight,
  noPadding = false,
}) => {
  return (
    <section
      className={`relative border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg)] transition-colors ${className}`}
    >
      {/* Corner Registration Marks */}
      <span className="pointer-events-none absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-[var(--color-fg)]" />
      <span className="pointer-events-none absolute -top-[1px] -right-[1px] w-2 h-2 border-t-2 border-r-2 border-[var(--color-fg)]" />
      <span className="pointer-events-none absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b-2 border-l-2 border-[var(--color-fg)]" />
      <span className="pointer-events-none absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-[var(--color-fg)]" />

      {/* Header Bar */}
      {(title || badge || headerRight) && (
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-3.5 py-2 bg-[var(--color-bg)] text-xs select-none gap-2">
          <div className="flex items-center space-x-2.5 min-w-0">
            {index && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[var(--color-fg)] text-[var(--color-bg)] leading-none">
                {index}
              </span>
            )}
            {!index && (
              <span className="inline-block w-1.5 h-1.5 bg-[var(--color-fg)] shrink-0" />
            )}
            {title && (
              <h3 className="font-bold uppercase tracking-[0.14em] text-[var(--color-fg)] truncate text-[11px]">
                {title}
              </h3>
            )}
            {badge && (
              <span className="text-[10px] px-1.5 py-0.5 border border-[var(--color-border)] text-[var(--color-dim)] uppercase tracking-wider shrink-0">
                {badge}
              </span>
            )}
          </div>

          {/* Dither Accent Strip + Right Controls */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="hidden sm:block w-12 h-2.5 dither-50 opacity-50" />
            {headerRight && <div className="flex items-center">{headerRight}</div>}
          </div>
        </div>
      )}

      {/* Body */}
      <div className={noPadding ? '' : 'p-4 sm:p-5'}>{children}</div>
    </section>
  );
};
