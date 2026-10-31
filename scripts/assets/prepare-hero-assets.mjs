import sharp from 'sharp'

// Preserve the supplied master; deliver appropriately sized, compressed backgrounds.
for (const width of [960, 1774]) {
  await sharp('assets/source/hero/hero-bg.png')
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toFile(`public/hero-scene-${width}.webp`)
}
