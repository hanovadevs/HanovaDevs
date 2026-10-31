# Image sources

`assets/source/` holds editable/original images outside the public web root. Published WebP/SVG/JPEG assets live in `public/`; their URLs stay unchanged when source masters are reorganized.

Run image preparation scripts from the repository root, for example:

```sh
node scripts/assets/prepare-hero-assets.mjs
node scripts/assets/prepare-stepsy-assets.mjs
node scripts/assets/prepare-hira-portrait.mjs
npm run optimize:images
```

The program generator requires the original local artwork in `assets/source/designs/program/`. That directory stays ignored, as the original `designs/` directory was. Published program images remain tracked, so a fresh clone can build without these optional masters.

Folders are grouped by brand, hero, people, products, projects, social and design originals. Historical unused originals are retained separately from published assets; do not reference them from pages. Avoid deleting a source master merely because its filename does not appear in JSX: preparation scripts may consume it.

The October 31 cleanup moved deleted code, obsolete generated assets and old build/test output into a recoverable backup outside this repository. Keep that backup private and do not deploy it.
