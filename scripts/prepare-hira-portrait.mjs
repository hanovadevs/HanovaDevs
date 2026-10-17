import sharp from 'sharp'

// Preserve the supplied master; frame the face consistently across portrait sizes.
const source = 'public/people/Navy Hijab in a Soft Gray Office.png'
const crop = { left: 390, top: 0, width: 941, height: 941 }

for (const size of [800, 480]) {
  const suffix = size === 480 ? '-480' : ''
  await sharp(source)
    .rotate()
    .extract(crop)
    .resize(size, size)
    .webp({ quality: 86, effort: 6 })
    .toFile(`public/people/hira-maqsood${suffix}.webp`)
}
