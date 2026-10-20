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
  className = '',
  dimensions = '64×64',
  scale = 1,
  showGrid = false,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-[var(--color-bg)] p-6 text-center select-none overflow-hidden ${className}`}
        style={{ minHeight: '220px' }}
      >
        <div className="w-10 h-10 border border-[var(--color-border)] flex items-center justify-center mb-2">
          <div className="w-4 h-4 dither-50" />
        </div>
        <span className="text-[10px] text-[var(--color-dim)] tracking-widest">
          {dimensions}
        </span>
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
