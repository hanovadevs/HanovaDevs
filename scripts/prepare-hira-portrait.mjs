import sharp from 'sharp'

// Preserve the supplied master; frame the face consistently across portrait sizes.
const source = 'public/people/Hira.jpeg'
const crop = { left: 40, top: 0, width: 897, height: 897 }

for (const size of [800, 480]) {
  const suffix = size === 480 ? '-480' : ''
  await sharp(source)
    .rotate()
    .extract(crop)
    .resize(size, size)
    .webp({ quality: 86, effort: 6 })
    .toFile(`public/people/hira-maqsood${suffix}.webp`)
}
