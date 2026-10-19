import React from 'react';
import { GlyphFrame } from './GlyphFrame';

export const CharacterSheetView: React.FC = () => {
  const attributes = [
    { name: 'CONTRAST', code: 'CNT', score: 26, mod: '+5', bar: '██████████' },
    { name: 'DITHERING', code: 'DTH', score: 28, mod: '+6', bar: '██████████' },
    { name: 'PRECISION', code: 'PRC', score: 24, mod: '+4', bar: '█████████░' },
    { name: 'COMPOSITION', code: 'CMP', score: 23, mod: '+4', bar: '█████████░' },
    { name: 'ATMOSPHERE', code: 'ATM', score: 27, mod: '+5', bar: '██████████' },
    { name: 'WILLPOWER', code: 'WIL', score: 21, mod: '+3', bar: '████████░░' },
  ];

  const skills = [
    {
      title: '1-Bit Dithering Mastery',
      rank: 'LVL 10',
      desc: 'Translates complex light and form into strict two-tone binary pixel matrices.',
    },
    {
      title: 'Subterranean Worldbuilding',
      rank: 'LVL 8',
      desc: 'Creates atmospheric sprites, tilesets, relics, and strange science-fantasy environments.',
    },
    {
      title: 'Negative Space Sculpting',
      rank: 'LVL 9',
      desc: 'Carves readable silhouettes at 16x16, 32x32, and 64x64 resolutions with minimal pixels.',
    },
    {
      title: 'Retro Terminal UI Design',
      rank: 'LVL 8',
      desc: 'Constructs tactile monochrome interfaces, icon sets, and glyph borders.',
    },
  ];

  const equipment = [
    { slot: 'PRIMARY TOOL', item: 'Aseprite // Binary Brush Array', status: '[EQUIPPED]' },
    { slot: 'SECONDARY', item: 'Custom 1-Bit Bayer Swatch Matrix', status: '[ACTIVE]' },
    { slot: 'OPTICAL UNIT', item: 'Phosphor Grid Loupe (Pixel-Perfect)', status: '[CALIBRATED]' },
    { slot: 'ARCHIVE LINK', item: 'GitHub Repository Uplink', status: '[ONLINE]' },
  ];

  return (
    <div className="space-y-4 font-mono select-none">
      {/* Top Character Banner */}
      <GlyphFrame title="CHARACTER DOSSIER // ARTIST PROFILE" badge="TRUE KIN ARTIFICER">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-3 flex flex-col items-center justify-center border border-[var(--color-border)] bg-black/60 p-4">
            <pre className="text-xs leading-tight text-[var(--color-bright)] font-mono">
{`   .---.
  /     \\
 | () () |
  \\  ^  /
   |||||
  /|||||\\`}
            </pre>
            <div className="mt-2 text-xs font-bold text-[var(--color-bright)] tracking-widest">
              CHAKEYY
            </div>
            <div className="text-[10px] text-[var(--color-dim)]">
              1-BIT PIXEL ARTISAN
            </div>
          </div>

          <div className="md:col-span-9 space-y-2">
            <div className="flex flex-wrap items-center justify-between border-b border-[var(--color-dim)] pb-1">
              <div>
                <span className="text-xs text-[var(--color-dim)]">CALLING: </span>
                <span className="text-sm font-bold text-[var(--color-bright)]">
                  SCRIBE OF THE BINARY MATRIX
                </span>
              </div>
              <div className="text-xs px-2 py-0.5 bg-[var(--color-dim)] text-[var(--color-bright)] border border-[var(--color-border)]">
                STATUS: COMMISSIONS OPEN
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[var(--color-fg)]">
              Specializing in stark, high-contrast 1-bit pixel art, dithered relics, and atmospheric
              low-resolution worlds. Inspired by classic science-fantasy roguelikes, antique CRT
              terminals, and the tactile weight of every single placed pixel.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px]">
              <div className="border border-[var(--color-dim)] p-1.5 bg-black/40">
                <div className="text-[9px] text-[var(--color-dim)]">PALETTE DEPTH</div>
                <div className="font-bold text-[var(--color-bright)]">1-BIT (2 COLORS)</div>
              </div>
              <div className="border border-[var(--color-dim)] p-1.5 bg-black/40">
                <div className="text-[9px] text-[var(--color-dim)]">SPECIALTY</div>
                <div className="font-bold text-[var(--color-bright)]">SPRITES & TILES</div>
              </div>
              <div className="border border-[var(--color-dim)] p-1.5 bg-black/40">
                <div className="text-[9px] text-[var(--color-dim)]">REPUTATION</div>
                <div className="font-bold text-[var(--color-bright)]">+450 BARATHRUMITES</div>
              </div>
              <div className="border border-[var(--color-dim)] p-1.5 bg-black/40">
                <div className="text-[9px] text-[var(--color-dim)]">WATER DRAMS</div>
                <div className="font-bold text-[var(--color-bright)]">1,024 [PURE]</div>
              </div>
            </div>
          </div>
        </div>
      </GlyphFrame>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Attributes Column */}
        <div className="lg:col-span-5">
          <GlyphFrame title="PRIMARY ATTRIBUTES" className="h-full">
            <div className="space-y-2.5">
              {attributes.map((attr) => (
                <div
                  key={attr.code}
                  className="flex items-center justify-between border-b border-[var(--color-dim)]/50 pb-1.5 text-xs"
                >
                  <div className="w-28 font-bold text-[var(--color-fg)]">{attr.name}</div>
                  <div className="text-[var(--color-dim)] tracking-tighter hidden sm:block">
                    [{attr.bar}]
                  </div>
                  <div className="font-mono text-right">
                    <span className="text-[var(--color-bright)] font-bold">{attr.score}</span>
                    <span className="text-[var(--color-dim)] ml-1">({attr.mod})</span>
                  </div>
                </div>
              ))}
            </div>
          </GlyphFrame>
        </div>

        {/* Mutations & Skills Column */}
        <div className="lg:col-span-7">
          <GlyphFrame title="ACQUIRED SKILLS & MUTATIONS" className="h-full">
            <div className="space-y-3">
              {skills.map((skill) => (
                <div
                  key={skill.title}
                  className="border border-[var(--color-dim)] bg-black/40 p-2.5 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--color-bright)]">
                      ♦ {skill.title}
                    </span>
                    <span className="text-[10px] px-1.5 border border-[var(--color-border)] text-[var(--color-fg)]">
                      {skill.rank}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--color-fg)] opacity-85">{skill.desc}</p>
                </div>
              ))}
            </div>
          </GlyphFrame>
        </div>
      </div>

      {/* Equipment & Loadout */}
      <GlyphFrame title="INVENTORY & EQUIPPED ARTIFACTS">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {equipment.map((eq) => (
            <div
              key={eq.slot}
              className="flex items-center justify-between border border-[var(--color-dim)] p-2 bg-black/30"
            >
              <div>
                <div className="text-[9px] text-[var(--color-dim)]">{eq.slot}</div>
                <div className="text-[var(--color-fg)] font-bold">{eq.item}</div>
              </div>
              <span className="text-[10px] text-[var(--color-bright)]">{eq.status}</span>
            </div>
          ))}
        </div>
      </GlyphFrame>
    </div>
  );
};
