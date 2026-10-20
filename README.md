# CHAKEYY — 1-Bit Pixel Art & Illustration Portfolio

A bespoke 1-bit pixel art portfolio and digital monograph built with **React**, **TypeScript**, and **Vite**.

## Features

- **1-Bit Architectural UI**: Corner registration marks, custom CSS Bayer/stipple dither patterns, `1px` hairline grid geometry, and 5 switchable 1-bit palettes (*Ink & Bone, Pure 1-Bit, Phosphor P31, Amber P3, and Blueprint CAD*).
- **Live Polarity Inverter (`◐ POLARITY` / `[I]`)**: Instantly flip foreground and background polarity (dark-on-light vs. light-on-dark) across the entire interface.
- **Works Catalog (`GRID` & `INDEX` Modes)**: Filter works by category (`Sprites`, `Environments`, `Icons & UI`, `Illustrations`) or toggle between visual cards and a compact tabular index ledger.
- **Pixel Loupe Inspector**: Inspect pieces at `1×`, `2×`, or `4×` pixel-perfect magnification (`image-rendering: pixelated`), toggle a pixel grid overlay (`[G]`), or switch the background mat (`[M]`).
- **Artist Profile & Commission Inquiry**: Technical specifications, disciplines, and direct contact channels.

---

## Supplying Your Artwork

1. Drop your `.png`, `.gif`, or `.svg` files into [`public/art/`](./public/art/).
2. Edit [`src/data/art.ts`](./src/data/art.ts) to update titles, resolutions, categories, and notes.
