import React from 'react';
import { GlyphFrame } from './GlyphFrame';

export const CharacterSheetView: React.FC = () => {
  const capabilities = [
    {
      title: '1-BIT & LOW-BIT PIXEL ILLUSTRATION',
      spec: '2-COLOR / 4-COLOR',
      desc: 'High-contrast scenes, portraits, and key art constructed with deliberate binary pixel placement.',
    },
    {
      title: 'ORDERED & HAND-PLACED DITHERING',
      spec: 'BAYER / STIPPLE',
      desc: 'Custom dithering textures, cross-hatching, and gradient transitions without relying on alpha transparency.',
    },
    {
      title: 'GAME SPRITES, TILESETS & ANIMATION',
      spec: '8×8 TO 128×128 PX',
      desc: 'Readable character sprites, modular environment tiles, and frame-by-frame animations for indie games.',
    },
    {
      title: 'MONOCHROME UI, ICONS & GLYPHS',
      spec: 'PIXEL-PERFECT',
      desc: 'Crisp inventory icons, nine-slice window frames, bitmap typography, and HUD elements.',
    },
  ];

  const specifications = [
    { label: 'PRIMARY MEDIUM', value: '1-Bit Pixel Art (Strict 2-Tone)' },
    { label: 'COMMON RESOLUTIONS', value: '16×16, 32×32, 64×64, 160×144, 320×180' },
    { label: 'TOOLS & WORKFLOW', value: 'Aseprite, Custom Bayer Swatches' },
    { label: 'DELIVERABLES', value: 'PNG, GIF, Sprite Sheets, Aseprite Source' },
    { label: 'AVAILABILITY', value: 'Open for Commissions & Game Projects' },
  ];

  return (
    <div className="space-y-6 select-none">
      {/* Artist Overview */}
      <GlyphFrame index="02" title="ARTIST PROFILE // CHAKEYY" badge="AVAILABLE">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: 1-Bit Geometric Emblem */}
          <div className="md:col-span-3 flex flex-col items-center justify-center border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
            <div className="w-16 h-16 border-2 border-[var(--color-fg)] p-1.5 grid grid-cols-3 grid-rows-3 gap-1">
              <div className="bg-[var(--color-fg)]" />
              <div className="dither-50" />
              <div className="bg-[var(--color-fg)]" />
              <div className="dither-50" />
              <div className="bg-transparent" />
              <div className="dither-50" />
              <div className="bg-[var(--color-fg)]" />
              <div className="dither-50" />
              <div className="bg-[var(--color-fg)]" />
            </div>
            <div className="mt-3 text-xs font-bold tracking-[0.2em] uppercase">
              CHAKEYY
            </div>
            <div className="text-[10px] text-[var(--color-dim)] uppercase tracking-wider mt-0.5">
              PIXEL ARTIST
            </div>
          </div>

          {/* Right: Statement */}
          <div className="md:col-span-9 space-y-4">
            <div className="border-b border-[var(--color-border)] pb-2 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base font-bold tracking-[0.14em] uppercase">
                STATEMENT & PRACTICE
              </h2>
              <span className="text-[10px] px-2 py-0.5 bg-[var(--color-fg)] text-[var(--color-bg)] font-bold uppercase tracking-wider">
                COMMISSIONS: OPEN
              </span>
            </div>

            <p className="text-xs leading-relaxed text-[var(--color-fg)] opacity-90">
              Focused on the discipline of 1-bit pixel art—working within the strict constraint of
              two colors to create depth, texture, and atmosphere. By stripping away colour
              gradients and anti-aliasing, every single pixel carries structural weight, whether
              carving out a 16×16 icon silhouette or weaving complex dither patterns across a full
              scene.
            </p>

            <div className="h-2 w-full dither-dots" />
          </div>
        </div>
      </GlyphFrame>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Technical Specifications */}
        <div className="lg:col-span-5">
          <GlyphFrame title="TECHNICAL SPECIFICATIONS" className="h-full">
            <div className="divide-y divide-[var(--color-border)] text-xs">
              {specifications.map((spec) => (
                <div key={spec.label} className="py-3 first:pt-0 last:pb-0">
                  <div className="text-[10px] text-[var(--color-dim)] uppercase tracking-wider mb-0.5">
                    {spec.label}
                  </div>
                  <div className="font-bold text-[var(--color-fg)]">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </GlyphFrame>
        </div>

        {/* Right: Capabilities & Focus Areas */}
        <div className="lg:col-span-7">
          <GlyphFrame title="DISCIPLINES & FOCUS AREAS" className="h-full">
            <div className="grid grid-cols-1 gap-3">
              {capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="border border-[var(--color-border)] bg-[var(--color-bg)] p-3.5 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold tracking-wider uppercase">
                      ▪ {cap.title}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 border border-[var(--color-border)] text-[var(--color-dim)] shrink-0">
                      {cap.spec}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--color-fg)] opacity-80 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              ))}
            </div>
          </GlyphFrame>
        </div>
      </div>
    </div>
  );
};
