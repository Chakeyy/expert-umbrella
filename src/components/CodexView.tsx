import React, { useState, useMemo } from 'react';
import { ARTWORKS, ART_CATEGORIES, Artwork } from '../data/art';
import { GlyphFrame } from './GlyphFrame';
import { PixelArtCanvas } from './PixelArtCanvas';
import { ArtInspectorModal } from './ArtInspectorModal';

export const CodexView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'index'>('grid');
  const [activeArtwork, setActiveArtwork] = useState<Artwork | null>(null);

  const filteredArtworks = useMemo(() => {
    return ARTWORKS.filter((art) => {
      const matchesCategory =
        selectedCategory === 'ALL' || art.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        art.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeIndex = useMemo(() => {
    if (!activeArtwork) return -1;
    return filteredArtworks.findIndex((a) => a.id === activeArtwork.id);
  }, [activeArtwork, filteredArtworks]);

  const handleNext = () => {
    if (filteredArtworks.length === 0) return;
    const nextIdx = (activeIndex + 1) % filteredArtworks.length;
    setActiveArtwork(filteredArtworks[nextIdx]);
  };

  const handlePrev = () => {
    if (filteredArtworks.length === 0) return;
    const prevIdx =
      (activeIndex - 1 + filteredArtworks.length) % filteredArtworks.length;
    setActiveArtwork(filteredArtworks[prevIdx]);
  };

  return (
    <div className="space-y-6 select-none">
      {/* Studio Intro Banner */}
      <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="text-[10px] tracking-[0.2em] text-[var(--color-dim)] uppercase">
              SELECTED WORKS // 1-BIT PIXEL ART ARCHIVE
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-[0.12em] uppercase text-[var(--color-fg)]">
              HIGH-CONTRAST PIXEL ART, SPRITES & DITHERED WORLDS.
            </h1>
          </div>
          <div className="text-[11px] text-[var(--color-dim)] uppercase tracking-wider shrink-0 border-l border-[var(--color-border)] pl-3">
            <div>TOTAL WORKS: {ARTWORKS.length}</div>
            <div>FORMAT: NATIVE 1-BIT</div>
          </div>
        </div>
        <div className="mt-4 h-2 w-full dither-50 opacity-40" />
      </div>

      {/* Filter & View Mode Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 border uppercase tracking-wider transition-colors ${
              selectedCategory === 'ALL'
                ? 'border-[var(--color-fg)] bg-[var(--color-fg)] text-[var(--color-bg)] font-bold'
                : 'border-[var(--color-border)] text-[var(--color-dim)] hover:text-[var(--color-fg)] hover:border-[var(--color-fg)]'
            }`}
          >
            ALL ({ARTWORKS.length})
          </button>
          {ART_CATEGORIES.map((cat) => {
            const count = ARTWORKS.filter((a) => a.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 border uppercase tracking-wider transition-colors ${
                  isSelected
                    ? 'border-[var(--color-fg)] bg-[var(--color-fg)] text-[var(--color-bg)] font-bold'
                    : 'border-[var(--color-border)] text-[var(--color-dim)] hover:text-[var(--color-fg)] hover:border-[var(--color-fg)]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Right: Search & Layout Toggle */}
        <div className="flex items-center gap-2 self-end lg:self-auto">
          <div className="flex items-center border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-xs">
            <span className="text-[10px] text-[var(--color-dim)] mr-2 uppercase">
              FILTER:
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title or tag..."
              className="bg-transparent text-[var(--color-fg)] outline-none placeholder:text-[var(--color-dim)] text-xs w-36 sm:w-44"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[var(--color-dim)] hover:text-[var(--color-fg)] pl-1"
              >
                ×
              </button>
            )}
          </div>

          <div className="flex border border-[var(--color-border)] text-[11px]">
            <button
              onClick={() => setLayoutMode('grid')}
              className={`px-2.5 py-1 uppercase tracking-wider ${
                layoutMode === 'grid'
                  ? 'bg-[var(--color-fg)] text-[var(--color-bg)] font-bold'
                  : 'text-[var(--color-dim)] hover:text-[var(--color-fg)]'
              }`}
              title="Grid View"
            >
              GRID
            </button>
            <button
              onClick={() => setLayoutMode('index')}
              className={`px-2.5 py-1 uppercase tracking-wider border-l border-[var(--color-border)] ${
                layoutMode === 'index'
                  ? 'bg-[var(--color-fg)] text-[var(--color-bg)] font-bold'
                  : 'text-[var(--color-dim)] hover:text-[var(--color-fg)]'
              }`}
              title="Index Table View"
            >
              INDEX
            </button>
          </div>
        </div>
      </div>

      {/* Works Display: Grid Mode */}
      {layoutMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredArtworks.map((art) => (
            <button
              key={art.id}
              onClick={() => setActiveArtwork(art)}
              className="text-left group cursor-pointer focus:outline-none block"
            >
              <GlyphFrame
                index={art.index}
                title={art.title}
                badge={art.dimensions}
                noPadding
                className="h-full flex flex-col justify-between group-hover:border-[var(--color-fg)] transition-colors"
              >
                <div>
                  <div className="border-b border-[var(--color-border)] relative overflow-hidden">
                    <PixelArtCanvas
                      src={art.imagePath}
                      alt={art.title}
                      index={art.index}
                      dimensions={art.dimensions}
                      scale={1}
                      className="w-full h-56"
                    />
                  </div>

                  <div className="p-4 space-y-2.5">
                    <p className="text-xs text-[var(--color-fg)] opacity-85 line-clamp-2 leading-relaxed">
                      {art.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {art.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] px-1.5 py-0.5 border border-[var(--color-border)] text-[var(--color-dim)] uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-4 py-2.5 border-t border-[var(--color-border)] bg-[var(--color-bg)] flex items-center justify-between text-[10px] uppercase tracking-wider">
                  <span className="text-[var(--color-dim)]">{art.category}</span>
                  <span className="text-[var(--color-fg)] font-bold group-hover:underline">
                    OPEN LOUPE →
                  </span>
                </div>
              </GlyphFrame>
            </button>
          ))}
        </div>
      ) : (
        /* Works Display: Compact Index Ledger Mode */
        <div className="border border-[var(--color-border)] bg-[var(--color-surface)] divide-y divide-[var(--color-border)]">
          <div className="grid grid-cols-12 px-4 py-2 bg-[var(--color-bg)] text-[10px] text-[var(--color-dim)] uppercase tracking-widest">
            <div className="col-span-2 sm:col-span-1">NO.</div>
            <div className="col-span-6 sm:col-span-5">TITLE</div>
            <div className="hidden sm:block sm:col-span-3">CATEGORY</div>
            <div className="col-span-4 sm:col-span-3 text-right">DIMENSIONS</div>
          </div>
          {filteredArtworks.map((art) => (
            <button
              key={art.id}
              onClick={() => setActiveArtwork(art)}
              className="w-full grid grid-cols-12 items-center px-4 py-3 text-left text-xs hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] transition-colors group"
            >
              <div className="col-span-2 sm:col-span-1 font-bold opacity-70">
                {art.index}
              </div>
              <div className="col-span-6 sm:col-span-5 font-bold uppercase tracking-wider truncate pr-2">
                {art.title}
              </div>
              <div className="hidden sm:block sm:col-span-3 text-[11px] opacity-75 uppercase">
                {art.category}
              </div>
              <div className="col-span-4 sm:col-span-3 text-right font-mono text-[11px]">
                {art.dimensions} →
              </div>
            </button>
          ))}
        </div>
      )}

      {filteredArtworks.length === 0 && (
        <div className="border border-[var(--color-border)] p-12 text-center text-xs uppercase tracking-widest text-[var(--color-dim)]">
          NO WORKS MATCHING CURRENT FILTER.
        </div>
      )}

      {/* Detail Loupe Modal */}
      <ArtInspectorModal
        artwork={activeArtwork}
        onClose={() => setActiveArtwork(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};
