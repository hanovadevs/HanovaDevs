import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const roots = ['public/projects', 'public/products']

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  return (await Promise.all(entries.map(async entry => {
    const target = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(target) : target
  }))).flat()
}

for (const root of process.argv.includes('--brand-only') ? [] : roots) {
  for (const input of await walk(root)) {
    if (path.extname(input).toLowerCase() !== '.png') continue
    const output = input.replace(/\.png$/i, '.webp')
    const before = (await stat(input)).size
    await sharp(input).webp({ quality: 82, effort: 5 }).toFile(output)
    const after = (await stat(output)).size
    console.log(`${input}: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`)
  }
}

const brandImages = [
  { input: 'public/Software_Agency_bg.png', output: 'public/agency-logo-360.webp', width: 360, quality: 90 },
  { input: 'public/Software_Agency_bg.png', output: 'public/agency-logo-720.webp', width: 720, quality: 90 },
  { input: 'public/white.png', output: 'public/agency-logo-white.webp', width: 128, quality: 90 },
  { input: 'public/hero-glass-bg.png', output: 'public/hero-glass-mobile.webp', width: 768, quality: 82 },
  { input: 'public/hero-glass-bg.png', output: 'public/hero-glass-bg.webp', width: 1024, quality: 84 },
]

for (const { input, output, width, quality } of brandImages) {
  const before = (await stat(input)).size
  await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 5 }).toFile(output)
  const after = (await stat(output)).size
  console.log(`${output}: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`)
}
