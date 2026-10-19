import React, { useState, useMemo } from 'react';
import { ARTWORKS, ART_CATEGORIES, Artwork } from '../data/art';
import { GlyphFrame } from './GlyphFrame';
import { PixelArtCanvas } from './PixelArtCanvas';
import { ArtInspectorModal } from './ArtInspectorModal';

interface CodexViewProps {
  onInspectArt?: (art: Artwork) => void;
}

export const CodexView: React.FC<CodexViewProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArtwork, setActiveArtwork] = useState<Artwork | null>(null);

  const filteredArtworks = useMemo(() => {
    return ARTWORKS.filter((art) => {
      const matchesCategory =
        selectedCategory === 'ALL' || art.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        art.lore.toLowerCase().includes(searchQuery.toLowerCase());
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
    const prevIdx = (activeIndex - 1 + filteredArtworks.length) % filteredArtworks.length;
    setActiveArtwork(filteredArtworks[prevIdx]);
  };

  return (
    <div className="space-y-4 font-mono select-none">
      {/* Search and Category Filter Header */}
      <GlyphFrame title="ARCHIVES CODEX // CATALOG QUERY">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-2.5 py-1 border transition-colors ${
                selectedCategory === 'ALL'
                  ? 'border-[var(--color-bright)] bg-[var(--color-dim)] text-[var(--color-bright)] font-bold'
                  : 'border-[var(--color-dim)] text-[var(--color-fg)] hover:border-[var(--color-border)]'
              }`}
            >
              [ALL ({ARTWORKS.length})]
            </button>
            {ART_CATEGORIES.map((cat) => {
              const count = ARTWORKS.filter((a) => a.category === cat).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 border transition-colors ${
                    isSelected
                      ? 'border-[var(--color-bright)] bg-[var(--color-dim)] text-[var(--color-bright)] font-bold'
                      : 'border-[var(--color-dim)] text-[var(--color-fg)] hover:border-[var(--color-border)]'
                  }`}
                >
                  [{cat.toUpperCase()} ({count})]
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="flex items-center space-x-1 border border-[var(--color-border)] px-2 py-0.5 bg-black/50 text-xs">
            <span className="text-[var(--color-dim)]">FIND:</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by tag or relic..."
              className="bg-transparent text-[var(--color-bright)] outline-none placeholder:text-[var(--color-dim)] text-xs w-40 sm:w-56 font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[var(--color-dim)] hover:text-[var(--color-bright)] px-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </GlyphFrame>

      {/* Art Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArtworks.map((art) => (
          <button
            key={art.id}
            onClick={() => setActiveArtwork(art)}
            className="text-left group cursor-pointer focus:outline-none transition-transform duration-100 hover:-translate-y-0.5"
          >
            <GlyphFrame
              title={art.title}
              badge={art.category.toUpperCase()}
              className="h-full transition-all group-hover:border-[var(--color-bright)]"
            >
              <div className="space-y-2.5">
                <div className="relative border border-[var(--color-dim)] group-hover:border-[var(--color-border)] transition-colors">
                  <PixelArtCanvas
                    src={art.imagePath}
                    alt={art.title}
                    dimensions={art.dimensions}
                    tags={art.tags}
                    scale={1}
                    className="w-full h-44"
                  />
                  <div className="absolute top-1 right-1 bg-black/80 px-1 text-[9px] border border-[var(--color-dim)] text-[var(--color-dim)] group-hover:text-[var(--color-bright)]">
                    {art.dimensions}
                  </div>
                </div>

                <div className="text-[11px] text-[var(--color-fg)] line-clamp-2 opacity-90 leading-tight">
                  "{art.lore}"
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[var(--color-dim)] text-[10px]">
                  <span className="text-[var(--color-dim)]">CYCLE {art.year}</span>
                  <span className="text-[var(--color-bright)] group-hover:underline">
                    INSPECT ARTIFACT ►
                  </span>
                </div>
              </div>
            </GlyphFrame>
          </button>
        ))}
      </div>

      {filteredArtworks.length === 0 && (
        <div className="border border-[var(--color-dim)] p-8 text-center text-sm font-mono text-[var(--color-dim)]">
          NO MATCHING RELICS FOUND IN THE SECTOR DATABASE.
        </div>
      )}

      {/* Detail Inspector Modal */}
      <ArtInspectorModal
        artwork={activeArtwork}
        onClose={() => setActiveArtwork(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};
