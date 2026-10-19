# QUD ARCHIVES // 1-Bit Pixel Art Portfolio

A **Caves of Qud**-inspired 1-bit pixel art portfolio built with **React**, **TypeScript**, and **Vite**.

## Features

- **1-Bit Terminal Aesthetic**: ASCII double-line glyph borders (`╔══╗`), CRT scanline toggle, and 6 switchable retro phosphor palettes (*Green Phosphor, Amber Tube, High-Contrast 1-Bit Monochrome, Chrome Terminal, DMG-01 Game Boy, and Rust Wells Crimson*).
- **The Codex (Gallery)**: Filterable archive of your 1-bit pixel art with crisp `image-rendering: pixelated` scaling and an interactive **Artifact Inspector Modal** (`1x`, `2x`, `4x` magnification + lore).
- **The Wanderer (Playable Overworld)**: An interactive 2D ASCII tilemap where visitors move a `@` nomad across salt dunes and fungal groves (`WASD` / Arrows / Mobile Touch D-Pad) to discover your art shrines in-universe.
- **Character Dossier & Transmission Array**: Caves of Qud RPG-styled artist bio, skill tree, equipment loadout, and subspace contact terminal.
- **Silent & Self-Contained**: No annoying autoplay audio, no pre-generated AI art—ready for your own authentic pixel art.

---

## How to Supply Your Own Art

1. Place your `.png`, `.gif`, or `.svg` pixel art files into the [`public/art/`](./public/art/) folder.
2. Open [`src/data/art.ts`](./src/data/art.ts) and update the `ARTWORKS` array with your filenames, titles, dimensions, tags, and lore:

```ts
{
  id: 'my-piece',
  title: 'THE DUNE APOSTLE',
  category: 'Characters', // 'Characters' | 'Relics' | 'Biomes' | 'Machines' | 'Creatures'
  year: '2026',
  dimensions: '48x48 px',
  imagePath: 'art/your_file.png',
  tags: ['NOMAD', '1-BIT'],
  technique: '1-bit ordered dithering',
  lore: 'Your flavor text or description here.',
}
```

*(Note: Any entry whose file isn't in `public/art/` yet automatically displays a clean 1-bit wireframe placeholder box showing where to drop the file.)*

---

## Free Hosting & Deployment with GitHub + PAT

This repository is pre-configured with **GitHub Actions** (`.github/workflows/deploy.yml`) and relative asset paths (`base: './'` in `vite.config.ts`) so it hosts **100% free on GitHub Pages**.

### 1. Create a GitHub Personal Access Token (PAT)
1. Go to **GitHub Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**:
   `https://github.com/settings/tokens`
2. Click **Generate new token (classic)**.
3. Check the **`repo`** and **`workflow`** scopes.
4. Copy your generated token (`ghp_...`).

### 2. One-Command Push & Deploy
Run the included deployment script with your PAT:

```bash
GITHUB_PAT=ghp_YOUR_TOKEN_HERE bash scripts/deploy-github.sh qud-1bit-portfolio Chakeyy
```

This script will automatically:
1. Create the `qud-1bit-portfolio` repository on your GitHub account (`Chakeyy`).
2. Push the `main` branch.
3. Enable **GitHub Pages** via the included GitHub Actions workflow.
4. Publish your live site at: `https://chakeyy.github.io/qud-1bit-portfolio/`

### Alternative Free Hosts
- **Vercel (Free)**: Import your GitHub repository at [vercel.com/new](https://vercel.com/new) — zero configuration needed, auto-deploys on every `git push`.
- **Cloudflare Pages / Netlify (Free)**: Connect your GitHub repo, set build command to `npm run build` and output directory to `dist`.
