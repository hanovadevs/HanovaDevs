import { stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const productSources = [
  ...Array.from({ length: 10 }, (_, index) => `eunoia/${index + 1}.png`), 'eunoia/logo.png',
  ...Array.from({ length: 5 }, (_, index) => `omnai/B${index + 1}.png`), 'omnai/logo.png',
]

if (!process.argv.includes('--brand-only')) {
  for (const file of productSources) {
    const input = path.join('assets/source/products', file)
    const output = path.join('public/products', file.replace(/\.png$/i, '.webp'))
    const before = (await stat(input)).size
    await sharp(input).webp({ quality: 82, effort: 5 }).toFile(output)
    const after = (await stat(output)).size
    console.log(`${input}: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`)
  }
}

const brandImages = [
  { input: 'assets/source/brand/Software_Agency_bg.png', output: 'public/agency-logo-360.webp', width: 360, quality: 90 },
  { input: 'assets/source/brand/Software_Agency_bg.png', output: 'public/agency-logo-720.webp', width: 720, quality: 90 },
  { input: 'assets/source/brand/white.png', output: 'public/agency-logo-white.webp', width: 128, quality: 90 },
  { input: 'assets/source/hero/hero-glass-bg.png', output: 'public/hero-glass-bg.webp', width: 1024, quality: 84 },
]

for (const { input, output, width, quality } of brandImages) {
  const before = (await stat(input)).size
  await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 5 }).toFile(output)
  const after = (await stat(output)).size
  console.log(`${output}: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`)
}
