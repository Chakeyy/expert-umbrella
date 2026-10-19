import { describe, it, expect } from 'vitest';
import { PALETTES, getPaletteCssVariables } from '../src/theme/palettes';

describe('Palettes', () => {
  it('contains expected retro themes', () => {
    expect(PALETTES['monochrome']).toBeDefined();
    expect(PALETTES['phosphor']).toBeDefined();
    expect(PALETTES['amber']).toBeDefined();
    expect(PALETTES['cybernetic']).toBeDefined();
  });

  it('generates css variables with fg, bg, and border colors', () => {
    const vars = getPaletteCssVariables('monochrome');
    expect(vars['--color-bg']).toBe('#000000');
    expect(vars['--color-fg']).toBe('#ffffff');
    expect(vars['--color-border']).toBe('#a3a3a3');
  });

  it('falls back to default phosphor on unknown palette', () => {
    const fallback = getPaletteCssVariables('unknown_invalid_key');
    expect(fallback['--color-bg']).toBe(PALETTES.phosphor.bg);
  });
});
