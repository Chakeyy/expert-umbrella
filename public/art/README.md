# Your 1-Bit Pixel Art Directory

Place your pixel art files directly into this directory (`public/art/`).

### Supported formats
- PNG (`.png`) - Recommended for crisp 1-bit pixel art
- GIF (`.gif`) - For animated pixel loops
- SVG (`.svg`) - Scalable vector pixel grids

### How to add your artwork:
1. Copy your art image into `public/art/`, e.g. `public/art/piece_01.png`
2. Open `src/data/art.ts`
3. Add or update the entry in the `ARTWORKS` array:
```ts
{
  id: 'piece-01',
  index: '001',
  title: 'YOUR ARTWORK TITLE',
  category: 'Sprites', // 'Sprites' | 'Environments' | 'Icons & UI' | 'Illustrations'
  year: '2026',
  dimensions: '64×64 PX',
  imagePath: 'art/piece_01.png',
  tags: ['SPRITE', '1-BIT'],
  technique: '1-bit ordered dithering',
  description: 'Notes or details about the piece.',
}
```
If an image file is not yet placed in `public/art/`, the site automatically renders a crisp 1-bit calibration slot showing the target file path.
