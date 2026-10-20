import { describe, it, expect } from 'vitest';
import { PALETTES, getPaletteCssVariables } from '../src/theme/palettes';

describe('Palettes', () => {
  it('contains expected 1-bit themes', () => {
    expect(PALETTES['ink']).toBeDefined();
    expect(PALETTES['monochrome']).toBeDefined();
    expect(PALETTES['phosphor']).toBeDefined();
    expect(PALETTES['amber']).toBeDefined();
    expect(PALETTES['cybernetic']).toBeDefined();
  });

  it('generates css variables with fg, bg, and border colors', () => {
    const vars = getPaletteCssVariables('monochrome', false);
    expect(vars['--color-bg']).toBe('#000000');
    expect(vars['--color-fg']).toBe('#ffffff');
    expect(vars['--color-border']).toBe('#383838');
  });

  it('inverts polarity when inverted is true', () => {
    const vars = getPaletteCssVariables('monochrome', true);
    expect(vars['--color-bg']).toBe('#ffffff');
    expect(vars['--color-fg']).toBe('#000000');
  });
});
