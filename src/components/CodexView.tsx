import React, { useState, useMemo } from 'react';
import { ARTWORKS, Artwork } from '../data/art';
import { PixelArtCanvas } from './PixelArtCanvas';
import { ArtInspectorModal } from './ArtInspectorModal';

export const CodexView: React.FC = () => {
  const [activeArtwork, setActiveArtwork] = useState<Artwork | null>(null);

  const activeIndex = useMemo(() => {
    if (!activeArtwork) return -1;
    return ARTWORKS.findIndex((a) => a.id === activeArtwork.id);
  }, [activeArtwork]);

  const handleNext = () => {
    if (ARTWORKS.length === 0) return;
    const nextIdx = (activeIndex + 1) % ARTWORKS.length;
    setActiveArtwork(ARTWORKS[nextIdx]);
  };

  const handlePrev = () => {
    if (ARTWORKS.length === 0) return;
    const prevIdx = (activeIndex - 1 + ARTWORKS.length) % ARTWORKS.length;
    setActiveArtwork(ARTWORKS[prevIdx]);
  };

  return (
    <div className="select-none">
      {/* Minimalist Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTWORKS.map((art) => (
          <button
            key={art.id}
            onClick={() => setActiveArtwork(art)}
            className="text-left group cursor-pointer focus:outline-none block border border-[var(--color-border)] hover:border-[var(--color-fg)] bg-[var(--color-surface)] transition-colors"
          >
            <PixelArtCanvas
              src={art.imagePath}
              alt={art.title}
              index={art.index}
              dimensions={art.dimensions}
              scale={1}
              className="w-full h-64 border-b border-[var(--color-border)]"
            />
            <div className="px-4 py-3 flex items-center justify-between text-xs">
              <span className="font-medium tracking-wider text-[var(--color-fg)] truncate">
                {art.title}
              </span>
              <span className="text-[10px] text-[var(--color-dim)] ml-3 shrink-0">
                {art.dimensions}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal (Details shown only when clicked) */}
      <ArtInspectorModal
        artwork={activeArtwork}
        onClose={() => setActiveArtwork(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};
