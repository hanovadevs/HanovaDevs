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

for (const root of roots) {
  for (const input of await walk(root)) {
    if (path.extname(input).toLowerCase() !== '.png') continue
    const output = input.replace(/\.png$/i, '.webp')
    const before = (await stat(input)).size
    await sharp(input).webp({ quality: 82, effort: 5 }).toFile(output)
    const after = (await stat(output)).size
    console.log(`${input}: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`)
  }
}
