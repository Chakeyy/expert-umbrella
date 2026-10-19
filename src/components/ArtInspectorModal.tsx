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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === '1') setZoom(1);
      if (e.key === '2') setZoom(2);
      if (e.key === '3') setZoom(4);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!artwork) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm select-none animate-fadeIn">
      <div className="w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        <GlyphFrame
          title={`INSPECTOR // ${artwork.title}`}
          badge={artwork.category.toUpperCase()}
          headerRight={
            <button
              onClick={onClose}
              className="px-2 py-0.5 border border-[var(--color-border)] text-[var(--color-bright)] hover:bg-[var(--color-dim)] text-xs font-mono"
            >
              [ESC / ✕]
            </button>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left: Artwork Display Viewport */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center border border-[var(--color-border)] bg-black/60 p-4 relative min-h-[260px]">
              <div className="absolute top-2 right-2 flex space-x-1 z-20">
                {[1, 2, 4].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => setZoom(scale)}
                    className={`px-1.5 py-0.5 text-[10px] border ${
                      zoom === scale
                        ? 'border-[var(--color-bright)] bg-[var(--color-dim)] text-[var(--color-bright)]'
                        : 'border-[var(--color-dim)] text-[var(--color-dim)] hover:border-[var(--color-fg)]'
                    }`}
                  >
                    {scale}x
                  </button>
                ))}
              </div>

              <PixelArtCanvas
                src={artwork.imagePath}
                alt={artwork.title}
                dimensions={artwork.dimensions}
                tags={artwork.tags}
                scale={zoom}
                className="w-full max-h-[360px]"
              />

              <div className="w-full flex items-center justify-between text-[10px] text-[var(--color-dim)] mt-3 border-t border-[var(--color-dim)] pt-1">
                <span>ZOOM: {zoom}x MAGNIFICATION</span>
                <span>{artwork.dimensions}</span>
              </div>
            </div>

            {/* Right: Evocative Lore & Metadata */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="border-b border-[var(--color-dim)] pb-2">
                  <h2 className="text-base font-bold text-[var(--color-bright)] tracking-wider">
                    {artwork.title}
                  </h2>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {artwork.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-1 bg-[var(--color-dim)]/50 border border-[var(--color-dim)] text-[var(--color-fg)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lore / Description */}
                <div>
                  <div className="text-[10px] text-[var(--color-dim)] tracking-wider mb-1">
                    [CHRONICLE & FLAVOR]
                  </div>
                  <p className="text-xs leading-relaxed text-[var(--color-fg)] bg-black/30 p-2.5 border border-[var(--color-dim)] font-mono">
                    "{artwork.lore}"
                  </p>
                </div>

                {/* Technical Dossier */}
                <div className="text-xs space-y-1 font-mono border-t border-[var(--color-dim)] pt-2 text-[var(--color-fg)]">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[var(--color-dim)]">DIMENSIONS:</span>
                    <span>{artwork.dimensions}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[var(--color-dim)]">CYCLE / YEAR:</span>
                    <span>{artwork.year}</span>
                  </div>
                  {artwork.technique && (
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[var(--color-dim)]">TECHNIQUE:</span>
                      <span className="text-right truncate max-w-[180px]">{artwork.technique}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[var(--color-dim)]">STORAGE LOC:</span>
                    <span className="text-[10px] text-[var(--color-bright)]">{artwork.imagePath}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
                <button
                  onClick={onPrev}
                  className="px-3 py-1 border border-[var(--color-border)] text-xs hover:bg-[var(--color-dim)] transition-colors"
                >
                  ◄ PREV [←]
                </button>
                <button
                  onClick={onNext}
                  className="px-3 py-1 border border-[var(--color-border)] text-xs hover:bg-[var(--color-dim)] transition-colors"
                >
                  NEXT [→] ►
                </button>
              </div>
            </div>
          </div>
        </GlyphFrame>
      </div>
    </div>
  );
};
