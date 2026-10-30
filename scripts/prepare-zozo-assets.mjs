import sharp from 'sharp'

// Preserve the company-supplied originals; trim only the browser scrollbar.
const folder = 'C:/Users/Ali Haider/Pictures/Screenshots/'
const captures = [
  ['desktop', '205000'], ['phones', '205023'], ['vehicles', '205047'],
  ['brands', '205100'], ['compare', '205152'], ['detail', '205503'],
]
for (const [id, time] of captures) {
  const source = sharp(`${folder}Screenshot 2026-10-30 ${time}.png`)
  const { width, height } = await source.metadata()
  const buffer = await source.extract({ left: 0, top: 1, width: width - 22, height: height - 1 }).toBuffer()
  const result = await sharp(buffer).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 87, effort: 6 }).toFile(`public/case-studies/zozo-${id}.webp`)
  console.log(`zozo-${id}: ${result.width} × ${result.height}, ${result.size} bytes`)
  if (id === 'desktop') await sharp(buffer).resize({ width: 960 }).webp({ quality: 87, effort: 6 }).toFile('public/case-studies/zozo-card.webp')
}
