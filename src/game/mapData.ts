export interface MapTile {
  char: string;
  isSolid: boolean;
  artworkId?: string;
  name: string;
  loreHint: string;
}

export const MAP_WIDTH = 19;
export const MAP_HEIGHT = 11;

export const MAP_LAYOUT: string[] = [
  '^^^^^^^^^^^^^^^^^^^',
  '^....~.~.~...§....^',
  '^.◊..~.~.~........^',
  '^....~~~..........^',
  '^.......♣♣..Ω.....^',
  '^.......♣♣........^',
  '^..∩..............^',
  '^.......♠♠....♦...^',
  '^.......♠♠........^',
  '^.................^',
  '^^^^^^^^^^^^^^^^^^^',
];

export const TILE_DEFS: Record<string, { isSolid: boolean; artworkId?: string; name: string; loreHint: string }> = {
  '^': { isSolid: true, name: 'CRAGGY RIDGE', loreHint: 'Impassable shale and weathered bedrock.' },
  '.': { isSolid: false, name: 'SALT FLATS', loreHint: 'Coarse salt dunes under a pale subterranean glow.' },
  '~': { isSolid: false, name: 'BRINE RIVULET', loreHint: 'Shallow mineral pools reflecting green phosphor.' },
  '♣': { isSolid: false, name: 'FUNGAL GROVE', loreHint: 'Thick stalks of spore-dusted puffstools.' },
  '♠': { isSolid: false, artworkId: 'fungal-spore-shrine', name: 'GLOWSPHERE SHRINE', loreHint: 'A soft luminescent warmth emanates from this hollow.' },
  '◊': { isSolid: false, artworkId: 'salt-nomad', name: 'NOMAD ENCAMPMENT', loreHint: 'Faint smoke from a dried salt-wood fire.' },
  'Ω': { isSolid: false, artworkId: 'chrome-monolith', name: 'CHROME OBELISK', loreHint: 'A miraculous pre-collapse transmitter hums here.' },
  '§': { isSolid: false, artworkId: 'rust-wells-crawler', name: 'RUST WELL DESCENT', loreHint: 'Metallic scraping echoes from below the grates.' },
  '∩': { isSolid: false, artworkId: 'subterranean-spindle', name: 'LOWER REACHES SHAFT', loreHint: 'A vertical drop into the primordial lower strata.' },
  '♦': { isSolid: false, artworkId: 'water-ritual-token', name: 'SIBHOOD CISTERN', loreHint: 'Carved stone fonts consecrated to water-sharing.' },
};
