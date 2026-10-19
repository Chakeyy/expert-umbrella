import React, { useState, useEffect, useCallback } from 'react';
import { MAP_LAYOUT, MAP_WIDTH, MAP_HEIGHT, TILE_DEFS } from '../game/mapData';
import { ARTWORKS, Artwork } from '../data/art';
import { GlyphFrame } from './GlyphFrame';
import { ArtInspectorModal } from './ArtInspectorModal';

interface WandererViewProps {
  onInspectArt?: (artwork: Artwork) => void;
}

export const WandererView: React.FC<WandererViewProps> = ({ onInspectArt }) => {
  const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>({ x: 9, y: 5 });
  const [logMessages, setLogMessages] = useState<string[]>([
    'You wake on the alkali flats. Dust crunches beneath your boots.',
    'Use [WASD / ARROWS] or the touch D-Pad to traverse the sector.',
  ]);
  const [activeArtwork, setActiveArtwork] = useState<Artwork | null>(null);

  const currentTileChar = MAP_LAYOUT[playerPos.y]?.[playerPos.x] || '.';
  const currentTileInfo = TILE_DEFS[currentTileChar] || {
    isSolid: false,
    name: 'UNKNOWN STRATA',
    loreHint: 'Unmapped alkali expanse.',
  };

  const nearbyArtwork = currentTileInfo.artworkId
    ? ARTWORKS.find((a) => a.id === currentTileInfo.artworkId) || null
    : null;

  const tryMove = useCallback((dx: number, dy: number) => {
    setPlayerPos((prev) => {
      const nextX = prev.x + dx;
      const nextY = prev.y + dy;

      if (nextX < 0 || nextX >= MAP_WIDTH || nextY < 0 || nextY >= MAP_HEIGHT) {
        return prev;
      }

      const targetChar = MAP_LAYOUT[nextY]?.[nextX];
      const targetTile = TILE_DEFS[targetChar];

      if (targetTile?.isSolid) {
        setLogMessages((logs) => [
          `You bump into an impassable ${targetTile.name}.`,
          ...logs.slice(0, 4),
        ]);
        return prev;
      }

      if (targetTile?.artworkId) {
        const art = ARTWORKS.find((a) => a.id === targetTile.artworkId);
        if (art) {
          setLogMessages((logs) => [
            `► RELIC DISCOVERED: ${art.title}! Press [SPACE] or tap INSPECT.`,
            ...logs.slice(0, 4),
          ]);
        }
      }

      return { x: nextX, y: nextY };
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeArtwork) return; // Modal open

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        tryMove(0, -1);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        tryMove(0, 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        tryMove(-1, 0);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        tryMove(1, 0);
      } else if ((e.key === ' ' || e.key === 'Enter') && nearbyArtwork) {
        e.preventDefault();
        setActiveArtwork(nearbyArtwork);
        if (onInspectArt) onInspectArt(nearbyArtwork);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tryMove, nearbyArtwork, activeArtwork, onInspectArt]);

  return (
    <div className="space-y-4 font-mono select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Interactive ASCII Overworld Grid */}
        <div className="lg:col-span-8">
          <GlyphFrame
            title="SECTOR EXPLORER // OVERWORLD MAP"
            badge="EXPLORATION MODE"
            headerRight={
              <span className="text-[10px] text-[var(--color-bright)]">
                LOC: [{playerPos.x},{playerPos.y}]
              </span>
            }
          >
            <div className="flex flex-col items-center justify-center p-2 bg-black/80 border border-[var(--color-dim)] overflow-x-auto">
              <div className="font-mono text-base sm:text-lg md:text-xl leading-none tracking-widest text-[var(--color-fg)] p-2">
                {MAP_LAYOUT.map((row, y) => (
                  <div key={y} className="flex">
                    {row.split('').map((char, x) => {
                      const isPlayer = playerPos.x === x && playerPos.y === y;
                      const tileInfo = TILE_DEFS[char];
                      const isLandmark = !!tileInfo?.artworkId;

                      if (isPlayer) {
                        return (
                          <span
                            key={x}
                            className="text-[var(--color-bright)] font-bold animate-pulse bg-[var(--color-dim)]"
                          >
                            @
                          </span>
                        );
                      }

                      if (isLandmark) {
                        return (
                          <span
                            key={x}
                            className="text-[var(--color-bright)] font-bold animate-bounce"
                          >
                            {char}
                          </span>
                        );
                      }

                      return (
                        <span
                          key={x}
                          className={
                            char === '^'
                              ? 'text-[var(--color-dim)]'
                              : char === '~'
                              ? 'text-cyan-400 opacity-80'
                              : char === '♣'
                              ? 'text-emerald-500'
                              : 'text-[var(--color-fg)] opacity-70'
                          }
                        >
                          {char}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Touch Directional Controls */}
            <div className="mt-4 flex flex-col items-center sm:hidden border-t border-[var(--color-dim)] pt-3">
              <div className="text-[10px] text-[var(--color-dim)] mb-1">TOUCH CONTROLS:</div>
              <div className="grid grid-cols-3 gap-1 w-36">
                <div></div>
                <button
                  onClick={() => tryMove(0, -1)}
                  className="p-3 border border-[var(--color-border)] bg-black/60 active:bg-[var(--color-dim)] text-center text-sm font-bold"
                >
                  ▲
                </button>
                <div></div>
                <button
                  onClick={() => tryMove(-1, 0)}
                  className="p-3 border border-[var(--color-border)] bg-black/60 active:bg-[var(--color-dim)] text-center text-sm font-bold"
                >
                  ◄
                </button>
                <button
                  onClick={() => {
                    if (nearbyArtwork) setActiveArtwork(nearbyArtwork);
                  }}
                  className={`p-3 border text-center text-xs font-bold ${
                    nearbyArtwork
                      ? 'border-[var(--color-bright)] bg-[var(--color-dim)] text-[var(--color-bright)]'
                      : 'border-[var(--color-dim)] text-[var(--color-dim)]'
                  }`}
                >
                  ●
                </button>
                <button
                  onClick={() => tryMove(1, 0)}
                  className="p-3 border border-[var(--color-border)] bg-black/60 active:bg-[var(--color-dim)] text-center text-sm font-bold"
                >
                  ►
                </button>
                <div></div>
                <button
                  onClick={() => tryMove(0, 1)}
                  className="p-3 border border-[var(--color-border)] bg-black/60 active:bg-[var(--color-dim)] text-center text-sm font-bold"
                >
                  ▼
                </button>
                <div></div>
              </div>
            </div>
          </GlyphFrame>
        </div>

        {/* Right: Sensor Scanner & Landmark Info */}
        <div className="lg:col-span-4 space-y-4">
          <GlyphFrame title="RADAR SCANNER // SURROUNDINGS">
            <div className="space-y-3">
              <div>
                <div className="text-[10px] text-[var(--color-dim)] uppercase">STRATUM CLASSIFICATION:</div>
                <div className="text-sm font-bold text-[var(--color-bright)] tracking-wider">
                  {currentTileInfo.name}
                </div>
                <p className="text-xs text-[var(--color-fg)] mt-1 opacity-90">
                  {currentTileInfo.loreHint}
                </p>
              </div>

              {nearbyArtwork && (
                <div className="border-2 border-[var(--color-bright)] bg-[var(--color-dim)]/40 p-3 space-y-2 animate-pulse">
                  <div className="text-xs font-bold text-[var(--color-bright)]">
                    [!] RELIC IN REACH
                  </div>
                  <div className="text-sm font-mono text-[var(--color-bright)] font-bold">
                    {nearbyArtwork.title}
                  </div>
                  <div className="text-[10px] text-[var(--color-fg)]">
                    CATEGORY: {nearbyArtwork.category.toUpperCase()} | {nearbyArtwork.dimensions}
                  </div>
                  <button
                    onClick={() => setActiveArtwork(nearbyArtwork)}
                    className="w-full py-1.5 border border-[var(--color-bright)] bg-[var(--color-dim)] text-[var(--color-bright)] font-bold text-xs hover:bg-[var(--color-bright)] hover:text-black transition-colors"
                  >
                    INSPECT ARTIFACT [SPACE] ►
                  </button>
                </div>
              )}

              {/* Movement Key Guide */}
              <div className="border-t border-[var(--color-dim)] pt-2 text-[10px] text-[var(--color-dim)] space-y-1">
                <div>[W / ▲] NORTH</div>
                <div>[S / ▼] SOUTH</div>
                <div>[A / ◄] WEST</div>
                <div>[D / ►] EAST</div>
                <div>[SPACE] INTERACT / INSPECT</div>
              </div>
            </div>
          </GlyphFrame>

          {/* Chronicle Transmission Log */}
          <GlyphFrame title="CHRONICLE LOG">
            <div className="space-y-1 text-xs font-mono">
              {logMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`border-b border-[var(--color-dim)]/40 pb-1 ${
                    i === 0 ? 'text-[var(--color-bright)]' : 'text-[var(--color-fg)] opacity-70'
                  }`}
                >
                  <span className="text-[var(--color-dim)] mr-1">&gt;</span>
                  {msg}
                </div>
              ))}
            </div>
          </GlyphFrame>
        </div>
      </div>

      {/* Artifact Inspector Modal for Overworld Discovery */}
      <ArtInspectorModal
        artwork={activeArtwork}
        onClose={() => setActiveArtwork(null)}
      />
    </div>
  );
};
