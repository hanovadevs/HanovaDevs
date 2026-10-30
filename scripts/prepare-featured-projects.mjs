import sharp from 'sharp'

// Company-supplied screenshots. Keep originals outside public assets; omit browser chrome.
const folder = 'C:/Users/Ali Haider/Pictures/Screenshots/'
const sources = [
  ['growtech-website', 'Screenshot 2026-10-30 192043.png', 118],
  ['growtech-crm', 'Screenshot 2026-10-30 192233.png', 112],
  ['crown-crm', 'Screenshot 2026-10-30 192935.png', 108],
]
for (const [id, file, top] of sources) {
  const source = sharp(folder + file)
  const { width, height } = await source.metadata()
  let image = source.extract({ left: 0, top, width, height: height - top })
  if (id === 'crown-crm') {
    // Permanently obscure financial amounts in the generated file, not just with CSS.
    const cover = Buffer.from(`<svg width="${width}" height="${height - top}"><g fill="#e5eaf2"><rect x="480" y="450" width="270" height="62" rx="8"/><rect x="825" y="450" width="275" height="62" rx="8"/><rect x="1170" y="450" width="275" height="62" rx="8"/></g><g fill="#33465b" font-family="sans-serif" font-size="19"><text x="500" y="488">Private financial data</text><text x="845" y="488">Private financial data</text><text x="1190" y="488">Private financial data</text></g></svg>`)
    image = image.composite([{ input: cover, top: 0, left: 0 }])
  }
  const buffer = await image.png().toBuffer()
  for (const [suffix, size] of [['desktop', 1600], ['card', 960]]) {
    await sharp(buffer).resize({ width: size }).webp({ quality: 87, effort: 6 }).toFile(`public/case-studies/${id}-${suffix}.webp`)
  }
}

const modules = [
  ['growtech-planning', 'Screenshot 2026-10-30 193354.png'],
  ['growtech-teams', 'Screenshot 2026-10-30 193404.png'],
  ['growtech-knowledge', 'Screenshot 2026-10-30 193420.png'],
  ['crown-transactions', 'Screenshot 2026-10-30 193445.png'],
  ['crown-inventory', 'Screenshot 2026-10-30 193454.png'],
]
for (const [id, file] of modules) {
  const source = sharp(folder + file)
  const { width, height } = await source.metadata()
  const rectangles = id === 'crown-transactions'
    ? '<rect x="540" y="500" width="490" height="440"/><rect x="1300" y="500" width="135" height="440"/>'
    : id === 'crown-inventory'
      ? '<rect x="1110" y="375" width="420" height="555"/>'
      : id === 'growtech-teams' ? '<rect x="1300" y="735" width="585" height="200"/>' : ''
  let image = source
  if (rectangles) image = image.composite([{ input: Buffer.from(`<svg width="${width}" height="${height}"><g fill="#e8edf3">${rectangles}</g></svg>`), top: 0, left: 0 }])
  const buffer = await image.png().toBuffer()
  await sharp(buffer).resize({ width: 1600 }).webp({ quality: 87, effort: 6 }).toFile(`public/case-studies/${id}.webp`)
}
