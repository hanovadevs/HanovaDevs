import { mkdir, stat } from 'node:fs/promises'
import sharp from 'sharp'

await mkdir('public/services', { recursive: true })
for (const name of ['search-research', 'automation-workshop', 'identity-studio']) {
  for (const width of [640, 1280]) {
    const output = `public/services/${name}-${width}.webp`
    await sharp(`assets/source/services/${name}.png`).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(output)
    console.log(`${output}: ${Math.round((await stat(output)).size / 1024)} KB`)
  }
}
