import React, { useState } from 'react';

interface PixelArtCanvasProps {
  src: string;
  alt: string;
  index?: string;
  className?: string;
  dimensions?: string;
  scale?: number;
  showGrid?: boolean;
}

export const PixelArtCanvas: React.FC<PixelArtCanvasProps> = ({
  src,
  alt,
  index = '00',
  className = '',
  dimensions = '64×64 PX',
  scale = 1,
  showGrid = false,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-[var(--color-bg)] p-6 text-center select-none overflow-hidden ${className}`}
        style={{ minHeight: '200px' }}
      >
        {/* Subtle Dither Background Frame */}
        <div className="absolute inset-2 border border-dashed border-[var(--color-border)] pointer-events-none" />
        <div className="absolute top-2 left-2 text-[9px] text-[var(--color-dim)] font-mono tracking-widest">
          SLOT // {index}
        </div>
        <div className="absolute top-2 right-2 text-[9px] text-[var(--color-dim)] font-mono tracking-widest">
          {dimensions}
        </div>

        {/* Crisp 1-Bit Reticle Graphic (Not AI art, pure geometric reticle) */}
        <div className="w-12 h-12 border border-[var(--color-fg)] flex items-center justify-center mb-3 relative">
          <div className="w-6 h-6 dither-50 border border-[var(--color-border)]" />
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-[var(--color-fg)]" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-[var(--color-fg)]" />
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 h-[1px] w-2 bg-[var(--color-fg)]" />
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 h-[1px] w-2 bg-[var(--color-fg)]" />
        </div>

        <div className="text-[var(--color-fg)] font-bold text-xs uppercase tracking-[0.16em] mb-1">
          {alt}
        </div>
        <div className="text-[10px] text-[var(--color-dim)] tracking-wider px-2 py-0.5 border border-[var(--color-border)] bg-[var(--color-surface)] mt-1">
          public/{src}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center bg-[var(--color-bg)] ${
        showGrid ? 'pixel-grid-overlay' : ''
      } ${className}`}
    >
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        className="pixel-crisp transition-transform duration-150 object-contain"
        style={{
          transform: `scale(${scale})`,
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
};
