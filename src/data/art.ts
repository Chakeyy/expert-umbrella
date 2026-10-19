export type ArtCategory = 'Characters' | 'Relics' | 'Biomes' | 'Machines' | 'Creatures';

export interface Artwork {
  id: string;
  title: string;
  category: ArtCategory;
  year: string;
  dimensions: string;
  imagePath: string;
  tags: string[];
  lore: string;
  technique?: string;
  featured?: boolean;
}

export const ART_CATEGORIES: ArtCategory[] = [
  'Characters',
  'Relics',
  'Biomes',
  'Machines',
  'Creatures',
];

/**
 * Starter catalog configured for user-supplied pixel art.
 * Drop your image files into `public/art/` and reference them here.
 * If the image is not found, a retro 1-bit procedural wireframe glyph is rendered automatically.
 */
export const ARTWORKS: Artwork[] = [
  {
    id: 'salt-nomad',
    title: 'THE DUNE APOSTLE',
    category: 'Characters',
    year: '2026',
    dimensions: '48x48 px',
    imagePath: 'art/dune_apostle.png',
    tags: ['NOMAD', 'CLOAK', '1-BIT', 'SALTS'],
    technique: '1-bit dithered monochrome, index-1 palette',
    lore: 'A traveler whose cowl is stiffened by salt encrustation. They carry two watervessels and a compass made of lodestone and silver wire.',
    featured: true,
  },
  {
    id: 'chrome-monolith',
    title: 'TERMINAL OF SPINDLE-NORTH',
    category: 'Machines',
    year: '2026',
    dimensions: '64x64 px',
    imagePath: 'art/chrome_monolith.png',
    tags: ['CHROME', 'BARATHRUM', 'CONDUIT'],
    technique: 'Bayer 4x4 matrix ordered dithering',
    lore: 'An obelisk of mirrored alloys standing unweathered in the alkali flats. When approached, internal relays click in sync with cosmic radiation.',
    featured: true,
  },
  {
    id: 'fungal-spore-shrine',
    title: 'FUNGAL CODEX: GLOWSPHERE',
    category: 'Relics',
    year: '2025',
    dimensions: '32x32 px',
    imagePath: 'art/glowsphere.png',
    tags: ['RELIC', 'MYCELIUM', 'LIGHT'],
    technique: 'Hand-placed checkerboard stippling',
    lore: 'A calcified orb emitting cold luminescence. The spores inside have entered a state of crystalline stasis that defies natural decay.',
    featured: false,
  },
  {
    id: 'rust-wells-crawler',
    title: 'GIRDER GOLIATH',
    category: 'Creatures',
    year: '2025',
    dimensions: '64x48 px',
    imagePath: 'art/girder_goliath.png',
    tags: ['MUTATION', 'CHITIN', 'RUST'],
    technique: 'Clustered dither shade gradients',
    lore: 'An eight-legged scavenger adapted to subsist on oxidation flaking from subterranean conduits. Its shell clatters like falling cutlery.',
    featured: true,
  },
  {
    id: 'subterranean-spindle',
    title: 'VISTA OF THE LOWER REACHES',
    category: 'Biomes',
    year: '2026',
    dimensions: '96x48 px',
    imagePath: 'art/lower_reaches.png',
    tags: ['LANDSCAPE', 'DEPTHS', 'STRATA'],
    technique: 'Cross-hatch dither horizons',
    lore: 'Cross-section of the buried strata fifty parasangs below the surface. Subterranean brine waterfalls cascade past dormant dynamos.',
    featured: false,
  },
  {
    id: 'water-ritual-token',
    title: 'SIGIL OF SIBHOOD',
    category: 'Relics',
    year: '2026',
    dimensions: '32x32 px',
    imagePath: 'art/sigil_sibhood.png',
    tags: ['CEREMONY', 'TOKEN', 'COPPER'],
    technique: '1-bit outline and inverted negative space',
    lore: 'Presented across a shallow bowl of shared drams. "Live and drink, traveler, and may the salt preserve your bones."',
    featured: false,
  },
];
