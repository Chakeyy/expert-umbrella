import React, { useState, useEffect } from 'react';
import { Artwork } from '../data/art';
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!artwork) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg)] overflow-hidden"
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] text-xs">
          <div className="flex items-center space-x-2">
            {[1, 2, 4].map((s) => (
              <button
                key={s}
                onClick={() => setZoom(s)}
                className={`px-2 py-0.5 border text-[11px] transition-colors ${
                  zoom === s
                    ? 'border-[var(--color-fg)] bg-[var(--color-fg)] text-[var(--color-bg)]'
                    : 'border-[var(--color-border)] text-[var(--color-dim)] hover:text-[var(--color-fg)]'
                }`}
              >
                {s}×
              </button>
            ))}
            <button
              onClick={() => setShowGrid((prev) => !prev)}
              className={`px-2 py-0.5 border text-[11px] transition-colors ${
                showGrid
                  ? 'border-[var(--color-fg)] bg-[var(--color-fg)] text-[var(--color-bg)]'
                  : 'border-[var(--color-border)] text-[var(--color-dim)] hover:text-[var(--color-fg)]'
              }`}
            >
              Grid
            </button>
          </div>

          <button
            onClick={onClose}
            className="text-[var(--color-dim)] hover:text-[var(--color-fg)] px-2 py-0.5 text-xs"
          >
            ✕
          </button>
        </div>

        {/* Artwork Viewport */}
        <div className="bg-[var(--color-bg)] flex items-center justify-center min-h-[300px] sm:min-h-[360px] p-6">
          <PixelArtCanvas
            src={artwork.imagePath}
            alt={artwork.title}
            index={artwork.index}
            dimensions={artwork.dimensions}
            scale={zoom}
            showGrid={showGrid}
            className="w-full h-full"
          />
        </div>

        {/* Minimal Details Footer (Only visible here when clicked) */}
        <div className="p-5 border-t border-[var(--color-border)] space-y-2">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-sm font-bold tracking-wider">
              {artwork.title}
            </h2>
            <span className="text-xs text-[var(--color-dim)] shrink-0">
              {artwork.dimensions} · {artwork.year}
            </span>
          </div>

          {artwork.description && (
            <p className="text-xs text-[var(--color-dim)] leading-relaxed">
              {artwork.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-3 text-xs text-[var(--color-dim)]">
            <button
              onClick={onPrev}
              className="hover:text-[var(--color-fg)] transition-colors"
            >
              ← Prev
            </button>
            <button
              onClick={onNext}
              className="hover:text-[var(--color-fg)] transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
