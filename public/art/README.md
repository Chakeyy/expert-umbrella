# Your 1-Bit Pixel Art Directory

Place your pixel art files directly into this directory (`public/art/`).

### Supported formats
- PNG (`.png`) - Recommended for crisp 1-bit pixel art
- GIF (`.gif`) - For animated pixel loops
- SVG (`.svg`) - Scalable vector pixel grids
- JPG (`.jpg`)

### How to add your artwork:
1. Copy your art image into `public/art/`, e.g. `public/art/my_relic.png`
2. Open `src/data/art.ts`
3. Add or update the entry in the `ARTWORKS` array:
```ts
{
  id: 'my-relic',
  title: 'RELIQUARY OF THE SPINDLE',
  category: 'Relics',
  year: '2026',
  dimensions: '64x64 px',
  imagePath: 'art/my_relic.png',
  tags: ['CHROME', 'ANCIENT', '1-BIT'],
  lore: 'Recovered from the rust crevices beneath Golgotha. The metallic casing hums at 60 Hz.',
}
```
If an image file is not found or yet to be uploaded, the site automatically renders an in-universe 1-bit wireframe glyph placeholder so nothing breaks!
