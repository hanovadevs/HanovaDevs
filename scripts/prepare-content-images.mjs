import { mkdir } from 'node:fs/promises'
import sharp from 'sharp'

// Keep the supplied portrait intact; resize and compress only.
const portrait = process.argv[2]
if (portrait) {
  await mkdir('public/people', { recursive: true })
  for (const width of [480, 800]) {
    const output = width === 800 ? 'public/people/ali-haider.webp' : 'public/people/ali-haider-480.webp'
    await sharp(portrait).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 88 }).toFile(output)
    console.log(`Prepared ${output}`)
  }
}
await sharp('public/og-image.svg').jpeg({ quality: 90 }).toFile('public/og-image.jpg')
console.log('Prepared public/og-image.jpg')
