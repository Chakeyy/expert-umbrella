import React, { useState } from 'react';

interface PixelArtCanvasProps {
  src: string;
  alt: string;
  className?: string;
  dimensions?: string;
  tags?: string[];
  scale?: number;
}

export const PixelArtCanvas: React.FC<PixelArtCanvasProps> = ({
  src,
  alt,
  className = '',
  dimensions = '64x64',
  tags = [],
  scale = 1,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    // 1-Bit In-Universe Placeholder Wireframe
    return (
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-dim)] bg-black/60 p-4 text-center font-mono select-none ${className}`}
        style={{ minHeight: '160px' }}
      >
        <div className="text-[var(--color-bright)] text-2xl mb-1 tracking-widest font-mono">
          [ ░▒▓ ◊ ▓▒░ ]
        </div>
        <div className="text-[var(--color-fg)] font-bold text-xs uppercase tracking-wider mb-1">
          {alt}
        </div>
        <div className="text-[10px] text-[var(--color-dim)] mb-2">
          TARGET: {src} [{dimensions}]
        </div>
        <div className="text-[9px] px-2 py-0.5 border border-[var(--color-dim)] text-[var(--color-dim)]">
          DROP FILE IN public/{src}
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden flex items-center justify-center bg-black/40 ${className}`}>
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        className="pixel-crisp transition-transform duration-100 object-contain"
        style={{
          transform: `scale(${scale})`,
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
};
