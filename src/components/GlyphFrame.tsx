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
      {/* Subtle 1px Corner Ticks */}
      <span className="pointer-events-none absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-[var(--color-fg)]" />
      <span className="pointer-events-none absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-[var(--color-fg)]" />
      <span className="pointer-events-none absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-[var(--color-fg)]" />
      <span className="pointer-events-none absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-[var(--color-fg)]" />

      {(title || badge || headerRight) && (
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-2.5 text-xs select-none gap-2">
          <div className="flex items-center space-x-2 min-w-0">
            {index && (
              <span className="text-[10px] text-[var(--color-dim)]">
                {index}
              </span>
            )}
            {title && (
              <h3 className="font-medium tracking-wider text-[var(--color-fg)] truncate text-xs">
                {title}
              </h3>
            )}
            {badge && (
              <span className="text-[10px] text-[var(--color-dim)] shrink-0">
                {badge}
              </span>
            )}
          </div>
          {headerRight && <div className="flex items-center">{headerRight}</div>}
        </div>
      )}

      <div className={noPadding ? '' : 'p-5 sm:p-6'}>{children}</div>
    </section>
  );
};
