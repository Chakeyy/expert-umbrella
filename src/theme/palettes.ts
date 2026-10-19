export interface PaletteTheme {
  name: string;
  label: string;
  bg: string;
  fg: string;
  dim: string;
  bright: string;
  border: string;
  accent: string;
}

export const PALETTES: Record<string, PaletteTheme> = {
  phosphor: {
    name: 'phosphor',
    label: 'GREEN PHOSPHOR [QUD]',
    bg: '#050a06',
    fg: '#4ade80',
    dim: '#166534',
    bright: '#bbf7d0',
    border: '#22c55e',
    accent: '#86efac',
  },
  amber: {
    name: 'amber',
    label: 'AMBER TUBE [SOLAR]',
    bg: '#0c0702',
    fg: '#fbbf24',
    dim: '#78350f',
    bright: '#fef3c7',
    border: '#f59e0b',
    accent: '#fde68a',
  },
  monochrome: {
    name: 'monochrome',
    label: 'HIGH CONTRAST [1-BIT]',
    bg: '#000000',
    fg: '#ffffff',
    dim: '#525252',
    bright: '#ffffff',
    border: '#a3a3a3',
    accent: '#e5e5e5',
  },
  cybernetic: {
    name: 'cybernetic',
    label: 'CHROME TERMINAL [BARATHRUM]',
    bg: '#03080e',
    fg: '#38bdf8',
    dim: '#075985',
    bright: '#e0f2fe',
    border: '#0ea5e9',
    accent: '#7dd3fc',
  },
  gameboy: {
    name: 'gameboy',
    label: 'DMG-01 LCD [ANCIENT]',
    bg: '#0f380f',
    fg: '#9bbc0f',
    dim: '#306230',
    bright: '#8bac0f',
    border: '#8bac0f',
    accent: '#9bbc0f',
  },
  bloodmoss: {
    name: 'bloodmoss',
    label: 'RUST WELLS [CRIMSON]',
    bg: '#0d0404',
    fg: '#f87171',
    dim: '#7f1d1d',
    bright: '#fecaca',
    border: '#ef4444',
    accent: '#fca5a5',
  },
};

export function getPaletteCssVariables(paletteKey: string): Record<string, string> {
  const p = PALETTES[paletteKey] || PALETTES.phosphor;
  return {
    '--color-bg': p.bg,
    '--color-fg': p.fg,
    '--color-dim': p.dim,
    '--color-bright': p.bright,
    '--color-border': p.border,
    '--color-accent': p.accent,
  };
}

export function applyPaletteToDocument(paletteKey: string): void {
  const vars = getPaletteCssVariables(paletteKey);
  const root = document.documentElement;
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }
}
