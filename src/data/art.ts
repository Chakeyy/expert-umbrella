export type ArtCategory = 'Sprites' | 'Environments' | 'Icons & UI' | 'Illustrations';

export interface Artwork {
  id: string;
  index: string;
  title: string;
  category: ArtCategory;
  year: string;
  dimensions: string;
  imagePath: string;
  tags: string[];
  description: string;
  technique?: string;
}

export const ART_CATEGORIES: ArtCategory[] = [
  'Sprites',
  'Environments',
  'Icons & UI',
  'Illustrations',
];

/**
 * Portfolio catalog for user-supplied 1-bit pixel art.
 * Place your image files (.png, .gif, .svg) inside `public/art/`
 * and update the entries below.
 */
export const ARTWORKS: Artwork[] = [
  {
    id: 'piece-01',
    index: '001',
    title: 'UNTITLED SPRITE STUDY I',
    category: 'Sprites',
    year: '2026',
    dimensions: '48×48 PX',
    imagePath: 'art/piece_01.png',
    tags: ['CHARACTER', '1-BIT', 'SPRITE'],
    technique: 'Strict 2-color silhouette & negative space',
    description:
      'Character sprite study exploring high-contrast silhouette readability and compact pixel cluster shading.',
  },
  {
    id: 'piece-02',
    index: '002',
    title: 'DITHERED ARCHITECTURE',
    category: 'Environments',
    year: '2026',
    dimensions: '128×96 PX',
    imagePath: 'art/piece_02.png',
    tags: ['ENVIRONMENT', 'BAYER', 'SCENE'],
    technique: 'Ordered 4×4 Bayer matrix dithering',
    description:
      'Architectural environment scene rendered with stepped dither gradients and crisp structural linework.',
  },
  {
    id: 'piece-03',
    index: '003',
    title: 'MONOCHROME RELICS & ITEMS',
    category: 'Icons & UI',
    year: '2026',
    dimensions: '32×32 PX',
    imagePath: 'art/piece_03.png',
    tags: ['ICONS', 'INVENTORY', 'UI'],
    technique: '1px outline with stippled interior highlights',
    description:
      'Set of 1-bit inventory icons and interface glyphs designed for maximum legibility at 1x native resolution.',
  },
  {
    id: 'piece-04',
    index: '004',
    title: 'CREATURE ANATOMY',
    category: 'Sprites',
    year: '2026',
    dimensions: '64×64 PX',
    imagePath: 'art/piece_04.png',
    tags: ['CREATURE', 'ORGANIC', '1-BIT'],
    technique: 'Hand-placed checkerboard & cluster dithering',
    description:
      'Organic form and surface texture study using pure binary contrast without midtone greys.',
  },
  {
    id: 'piece-05',
    index: '005',
    title: 'NIGHT HORIZON',
    category: 'Illustrations',
    year: '2026',
    dimensions: '160×90 PX',
    imagePath: 'art/piece_05.png',
    tags: ['LANDSCAPE', 'DITHER', 'COMPOSITION'],
    technique: 'Cross-hatch and horizontal line dithering',
    description:
      'Wide-aspect 1-bit landscape composition balancing heavy ink blacks against fine atmospheric stippling.',
  },
  {
    id: 'piece-06',
    index: '006',
    title: 'INTERFACE FRAME SYSTEM',
    category: 'Icons & UI',
    year: '2026',
    dimensions: '64×64 PX',
    imagePath: 'art/piece_06.png',
    tags: ['TILESET', 'BORDERS', 'SYSTEM'],
    technique: 'Modular 8×8 corner and edge tiles',
    description:
      'Nine-slice border system, cursor set, and modular ornament tiles for retro monochrome interfaces.',
  },
];
