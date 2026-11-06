import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { publicRoutes } from '../../src/data/routes.js'
import { reviewSamples } from '../../src/pages/design/reviewSamples.js'

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? files(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat()
}

assert(!publicRoutes.includes('/design/reviews'))
const artifacts = (await Promise.all(['dist', 'dist-ssr'].map(files))).flat()
for (const file of artifacts.filter(file => /\.(?:js|html|json|xml)$/.test(file))) {
  const source = await readFile(file, 'utf8')
  assert(!file.includes('ReviewCardPreview'), `Preview chunk shipped: ${file}`)
  assert(!source.includes('Development-only design studio'), `Preview markup shipped: ${file}`)
  for (const review of reviewSamples) {
    assert(!source.includes(review.author), `Unverified attribution shipped: ${file}, ${review.id}`)
    assert(!source.includes(review.quote), `Sample draft shipped: ${file}, ${review.id}`)
  }
}
const base = process.argv[2]
if (base) {
  const response = await fetch(new URL('/design/reviews', base))
  assert.equal(response.status, 404)
  assert(!(await response.text()).includes(reviewSamples[0].author))
}
console.log(`Review preview excluded from ${artifacts.length} production artifacts, public routes and sitemap.${base ? ' Preview URL returns HTTP 404.' : ''}`)
