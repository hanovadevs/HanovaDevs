import sharp from 'sharp'
import { mkdir, readFile } from 'node:fs/promises'

const files = {
  walking: 'Stepsy daily walking rewards dashboard-3.png',
  challenges: 'Stepsy challenges_ small goals, steady progress-5.png',
  activity: 'Stepsy weekly progress dashboard-4.png',
  rewards: 'Stepsy Rewards_ Perks worth walking for-1.png',
  wallet: 'Stepsy wallet and coffee rewards-2.png',
}
await mkdir('public/products/stepsy', { recursive: true })
for (const [name, file] of Object.entries(files)) {
  const source = `public/products/Stepsy/${file}`
  for (const width of [640, 1122]) {
    const result = await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 86 }).toFile(`public/products/stepsy/${name}-${width}.webp`)
    console.log(`${name}-${width}.webp: ${result.width} × ${result.height}, ${result.size} bytes`)
  }
}
const poster = (await readFile('public/products/stepsy/walking-1122.webp')).toString('base64')
const jpeg = (await sharp(Buffer.from(poster, 'base64')).jpeg({ quality: 90 }).toBuffer()).toString('base64')
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#f3f8f5"/><path d="M680 630V220Q680 0 900 0H1200V630Z" fill="#dcefe7"/><image href="data:image/jpeg;base64,${jpeg}" x="748" y="30" width="448" height="560"/><g font-family="Arial,sans-serif" fill="#071a2b"><text x="65" y="90" font-size="20" letter-spacing="3">HANOVADEVS · MOBILE PRODUCT</text><text x="65" y="210" font-size="78" font-weight="700">Stepsy</text><text x="65" y="320" font-size="55" font-weight="700">Every step.</text><text x="65" y="388" font-size="55" font-weight="700" fill="#087570">More possibility.</text><text x="65" y="455" font-size="24">Walking, points and partner rewards.</text><text x="65" y="555" font-size="18">Product preview · stepsyapp.com</text></g></svg>`
await sharp(Buffer.from(svg)).png().toFile('public/products/stepsy/social.png')
