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

  // Duplicate artworks array for continuous marquee looping
  const marqueeItems = useMemo(() => [...ARTWORKS, ...ARTWORKS], []);

  return (
    <div className="select-none space-y-12">
      {/* Infinite Horizontal Reel Strip */}
      <section className="relative overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] py-4">
        <div className="px-4 mb-3 flex items-center justify-between text-[11px] tracking-widest uppercase text-[var(--color-dim)]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[var(--color-fg)] rounded-none inline-block animate-pulse-subtle" />
            Scrolling Strip • Hover to Pause
          </span>
          <span>{ARTWORKS.length} Pieces</span>
        </div>

        <div className="overflow-hidden w-full">
          <div className="animate-marquee flex gap-4 px-2">
            {marqueeItems.map((art, idx) => (
              <button
                key={`marquee-${art.id}-${idx}`}
                onClick={() => setActiveArtwork(art)}
                className="group relative flex-shrink-0 w-36 sm:w-44 border border-[var(--color-border)] hover:border-[var(--color-fg)] bg-[var(--color-bg)] transition-all duration-200 transform hover:-translate-y-1 text-left cursor-pointer focus:outline-none"
              >
                <PixelArtCanvas
                  src={art.imagePath}
                  alt={art.title}
                  index={art.index}
                  dimensions={art.dimensions}
                  scale={1}
                  className="w-full h-32 border-b border-[var(--color-border)]"
                />
                <div className="p-2.5">
                  <div className="text-[11px] font-medium tracking-wide truncate text-[var(--color-fg)] group-hover:underline">
                    {art.title}
                  </div>
                  <div className="text-[9px] text-[var(--color-dim)] mt-0.5">
                    {art.dimensions}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Minimalist Gallery Grid with smooth stagger and hover lift animations */}
      <section>
        <div className="mb-4 flex items-center justify-between text-[11px] tracking-widest uppercase text-[var(--color-dim)]">
          <span>Catalog Grid</span>
          <span>Click to Inspect</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTWORKS.map((art) => (
            <button
              key={art.id}
              onClick={() => setActiveArtwork(art)}
              className="text-left group cursor-pointer focus:outline-none block border border-[var(--color-border)] hover:border-[var(--color-fg)] bg-[var(--color-surface)] transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-lg"
            >
              <div className="relative overflow-hidden">
                <PixelArtCanvas
                  src={art.imagePath}
                  alt={art.title}
                  index={art.index}
                  dimensions={art.dimensions}
                  scale={1}
                  className="w-full h-64 border-b border-[var(--color-border)] group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 px-1.5 py-0.5 text-[9px] font-mono bg-[var(--color-bg)]/80 border border-[var(--color-border)] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  EXPAND
                </div>
              </div>

              <div className="px-4 py-3 flex items-center justify-between text-xs">
                <span className="font-medium tracking-wider text-[var(--color-fg)] truncate">
                  {art.title}
                </span>
                <span className="text-[10px] text-[var(--color-dim)] ml-3 shrink-0 font-mono">
                  {art.dimensions}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

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
