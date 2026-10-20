export interface PaletteTheme {
  name: string;
  label: string;
  bg: string;
  fg: string;
  dim: string;
  bright: string;
  border: string;
  surface: string;
}

export const PALETTES: Record<string, PaletteTheme> = {
  ink: {
    name: 'ink',
    label: 'INK & BONE',
    bg: '#0b0b0d',
    fg: '#ece8de',
    dim: '#6e6a61',
    bright: '#ffffff',
    border: '#2c2b28',
    surface: '#131316',
  },
  monochrome: {
    name: 'monochrome',
    label: 'PURE 1-BIT',
    bg: '#000000',
    fg: '#ffffff',
    dim: '#737373',
    bright: '#ffffff',
    border: '#383838',
    surface: '#0a0a0a',
  },
  phosphor: {
    name: 'phosphor',
    label: 'PHOSPHOR P31',
    bg: '#040a06',
    fg: '#5ce69b',
    dim: '#1f6e43',
    bright: '#c2ffe0',
    border: '#14492c',
    surface: '#08130c',
  },
  amber: {
    name: 'amber',
    label: 'AMBER P3',
    bg: '#0c0702',
    fg: '#ffb642',
    dim: '#805315',
    bright: '#ffe4b5',
    border: '#4a2e09',
    surface: '#140c04',
  },
  cybernetic: {
    name: 'cybernetic',
    label: 'BLUEPRINT CAD',
    bg: '#050b14',
    fg: '#7cc4ff',
    dim: '#2d5b85',
    bright: '#e0f2fe',
    border: '#193754',
    surface: '#091322',
  },
};

export function getPaletteCssVariables(
  paletteKey: string,
  inverted: boolean = false
): Record<string, string> {
  const p = PALETTES[paletteKey] || PALETTES.ink;

  if (inverted) {
    return {
      '--color-bg': p.fg,
      '--color-fg': p.bg,
      '--color-dim': p.dim,
      '--color-bright': p.bg,
      '--color-border': p.dim,
      '--color-surface': p.bright,
    };
  }

  return {
    '--color-bg': p.bg,
    '--color-fg': p.fg,
    '--color-dim': p.dim,
    '--color-bright': p.bright,
    '--color-border': p.border,
    '--color-surface': p.surface,
  };
}

export function applyPaletteToDocument(
  paletteKey: string,
  inverted: boolean = false
): void {
  const vars = getPaletteCssVariables(paletteKey, inverted);
  const root = document.documentElement;
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }
}
