import React, { useState, useEffect } from 'react';
import { Artwork } from '../data/art';
import { GlyphFrame } from './GlyphFrame';
import { PixelArtCanvas } from './PixelArtCanvas';

interface ArtInspectorModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const ArtInspectorModal: React.FC<ArtInspectorModalProps> = ({
  artwork,
  onClose,
  onNext,
  onPrev,
}) => {
  const [zoom, setZoom] = useState<number>(2);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [ditherMat, setDitherMat] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'g' || e.key === 'G') setShowGrid((prev) => !prev);
      if (e.key === 'm' || e.key === 'M') setDitherMat((prev) => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!artwork) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xs select-none">
      <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto">
        <GlyphFrame
          index={artwork.index}
          title={artwork.title}
          badge={artwork.category}
          headerRight={
            <button
              onClick={onClose}
              className="px-2.5 py-0.5 border border-[var(--color-border)] text-[var(--color-fg)] hover:border-[var(--color-fg)] hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] text-[11px] uppercase tracking-wider transition-colors"
            >
              ESC // CLOSE
            </button>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Loupe Viewport */}
            <div className="lg:col-span-7 flex flex-col justify-between border border-[var(--color-border)] bg-[var(--color-bg)]">
              {/* Viewport Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-[var(--color-border)] text-[10px]">
                <div className="flex items-center space-x-1">
                  <span className="text-[var(--color-dim)] uppercase tracking-wider mr-1">
                    SCALE:
                  </span>
                  {[1, 2, 4].map((s) => (
                    <button
                      key={s}
                      onClick={() => setZoom(s)}
                      className={`px-2 py-0.5 border transition-colors ${
                        zoom === s
                          ? 'border-[var(--color-fg)] bg-[var(--color-fg)] text-[var(--color-bg)] font-bold'
                          : 'border-[var(--color-border)] text-[var(--color-dim)] hover:text-[var(--color-fg)]'
                      }`}
                    >
                      {s}×
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => setShowGrid((prev) => !prev)}
                    className={`px-2 py-0.5 border uppercase tracking-wider transition-colors ${
                      showGrid
                        ? 'border-[var(--color-fg)] bg-[var(--color-fg)] text-[var(--color-bg)] font-bold'
                        : 'border-[var(--color-border)] text-[var(--color-dim)] hover:text-[var(--color-fg)]'
                    }`}
                  >
                    GRID [G]
                  </button>
                  <button
                    onClick={() => setDitherMat((prev) => !prev)}
                    className={`px-2 py-0.5 border uppercase tracking-wider transition-colors ${
                      ditherMat
                        ? 'border-[var(--color-fg)] bg-[var(--color-fg)] text-[var(--color-bg)] font-bold'
                        : 'border-[var(--color-border)] text-[var(--color-dim)] hover:text-[var(--color-fg)]'
                    }`}
                  >
                    MAT [M]
                  </button>
                </div>
              </div>

              {/* Canvas Area */}
              <div className={`p-4 flex items-center justify-center min-h-[280px] sm:min-h-[340px] ${ditherMat ? 'dither-dots' : ''}`}>
                <PixelArtCanvas
                  src={artwork.imagePath}
                  alt={artwork.title}
                  index={artwork.index}
                  dimensions={artwork.dimensions}
                  scale={zoom}
                  showGrid={showGrid}
                  className="w-full h-full bg-transparent"
                />
              </div>

              {/* Viewport Footer */}
              <div className="flex items-center justify-between px-3 py-1.5 border-t border-[var(--color-border)] text-[10px] text-[var(--color-dim)] uppercase tracking-wider">
                <span>LOUPE: {zoom}00%</span>
                <span>NATIVE: {artwork.dimensions}</span>
              </div>
            </div>

            {/* Right: Technical Monograph Details */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] text-[var(--color-dim)] uppercase tracking-[0.15em]">
                    PIECE #{artwork.index} // {artwork.category}
                  </div>
                  <h2 className="text-lg font-bold text-[var(--color-fg)] tracking-[0.1em] uppercase mt-1">
                    {artwork.title}
                  </h2>
                </div>

                <div className="border-t border-b border-[var(--color-border)] py-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-dim)] uppercase">RESOLUTION</span>
                    <span className="font-bold">{artwork.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-dim)] uppercase">COLOR DEPTH</span>
                    <span>1-BIT (2-TONE)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-dim)] uppercase">YEAR</span>
                    <span>{artwork.year}</span>
                  </div>
                  {artwork.technique && (
                    <div className="pt-1 border-t border-[var(--color-border)]/60">
                      <span className="text-[10px] text-[var(--color-dim)] uppercase block mb-0.5">
                        TECHNIQUE
                      </span>
                      <span className="text-[11px]">{artwork.technique}</span>
                    </div>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <div className="text-[10px] text-[var(--color-dim)] uppercase tracking-wider mb-1.5">
                    NOTES
                  </div>
                  <p className="text-xs leading-relaxed text-[var(--color-fg)] opacity-90">
                    {artwork.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {artwork.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 border border-[var(--color-border)] text-[var(--color-dim)] uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prev / Next Controls */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[var(--color-border)]">
                <button
                  onClick={onPrev}
                  className="py-2 px-3 border border-[var(--color-border)] text-xs uppercase tracking-wider hover:border-[var(--color-fg)] hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] transition-colors text-left"
                >
                  ← PREV
                </button>
                <button
                  onClick={onNext}
                  className="py-2 px-3 border border-[var(--color-border)] text-xs uppercase tracking-wider hover:border-[var(--color-fg)] hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] transition-colors text-right"
                >
                  NEXT →
                </button>
              </div>
            </div>
          </div>
        </GlyphFrame>
      </div>
    </div>
  );
};
