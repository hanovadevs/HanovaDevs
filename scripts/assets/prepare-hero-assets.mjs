import sharp from 'sharp'

// Preserve the supplied master; deliver appropriately sized, compressed backgrounds.
for (const width of [960, 1672]) {
  await sharp('assets/source/hero/hero-ecosystem.png')
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toFile(`public/hero-ecosystem-${width}.webp`)
}
