// One-off, explicit filesystem/import refactor. Removed files are recoverable.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const root = fs.realpathSync(process.cwd())
if (root.toLowerCase() !== 'e:\\personal projects\\hanovadevs') throw new Error('Unexpected workspace')
const self = 'scripts/restructure-workspace.mjs'
const walk = folder => !fs.existsSync(folder) ? [] : fs.readdirSync(folder, { withFileTypes: true }).flatMap(entry => {
  const file = path.join(folder, entry.name)
  if (entry.isSymbolicLink()) throw new Error(`Refusing symlink: ${file}`)
  return entry.isDirectory() ? walk(file) : [file.replaceAll('\\', '/')]
})
const moves = new Map()
const move = (from, to) => { if (fs.existsSync(from)) moves.set(from, to) }
const removals = new Set(['src/pages/AdminDashboard.jsx', 'src/pages/AdminDashboard.css', 'src/lib/supabaseClient.js', 'src/lib/supabase_schema.sql', 'supabase_schema.sql', 'api/send-email.js', 'src/components/CustomCursor.jsx', 'src/components/ParticleMesh.jsx', 'src/assets/vite.svg', 'src/assets/react.svg', 'src/test/security.test.js'])
const files = ['src', 'api', 'server', 'scripts', 'tests', 'docs'].flatMap(walk)
const textFiles = files.filter(file => /\.(?:jsx?|mjs|css|md)$/.test(file) && file !== self)
const texts = new Map(textFiles.map(file => [file, fs.readFileSync(file, 'utf8')]))
const runtime = [...texts].filter(([file]) => !file.startsWith('scripts/') && !file.startsWith('docs/')).map(([, text]) => text).join('\n')
for (const file of walk('src/pages').filter(file => file.endsWith('.css'))) {
  const name = path.basename(file)
  if (![...texts].some(([other, text]) => other !== file && text.includes(`'./${name}'`))) removals.add(file)
}

const pageGroups = {
  home: ['Home'], company: ['About', 'HiraProfile', 'TeamProfile', 'TechStack'],
  services: ['Services', 'ServiceDetail', 'ServiceEditorial'],
  projects: ['Projects', 'CaseStudy', 'FeaturedCaseStudy', 'ProjectWorkflow'],
  products: ['Products', 'EunoiaDetail', 'OmnaiDetail', 'StepsyDetail', 'StepsyCinematic'],
  insights: ['Journal', 'JournalPost', 'JournalArticle', 'Research', 'News'],
  reviews: ['Reviews'], contact: ['Contact'], tools: ['Calculator'],
  legal: ['PrivacyPolicy', 'TermsOfService', 'EunoiaPrivacyPolicy'], errors: ['NotFound'],
}
for (const [group, names] of Object.entries(pageGroups)) for (const name of names) for (const ext of ['jsx', 'css']) move(`src/pages/${name}.${ext}`, `src/pages/${group}/${name}.${ext}`)
for (const name of ['CompanyPages', 'PageHeroes', 'WorkPages']) move(`src/pages/${name}.css`, `src/styles/${name}.css`)
const componentGroups = {
  layout: ['Navbar', 'Footer', 'ScrollToTop'],
  assistant: ['AIChatbot'], company: ['BuildingFeature', 'LeadershipTeam', 'ProgramSpotlight', 'TrustLegalSection'],
  projects: ['ProjectCard', 'ProjectShowcase'], products: ['ProductDetail'],
  shared: ['SEO', 'SiteAnalytics', 'CookieConsent', 'ErrorBoundary'],
}
for (const [group, names] of Object.entries(componentGroups)) for (const name of names) for (const ext of ['jsx', 'css']) move(`src/components/${name}.${ext}`, `src/components/${group}/${name}.${ext}`)
for (const name of ['App', 'main', 'entry-server']) move(`src/${name}.jsx`, `src/app/${name}.jsx`)
move('src/index.css', 'src/styles/globals.css')
for (const file of files.filter(file => /\.test\.(?:js|jsx)$/.test(file))) {
  const group = file.startsWith('src/pages/') ? 'pages' : file.startsWith('src/components/') ? 'components' : 'lib'
  move(file, `tests/unit/${group}/${path.basename(file)}`)
}
move('src/test/setup.js', 'tests/setup.js')
for (const file of walk('scripts').filter(file => file !== self)) {
  const name = path.basename(file)
  move(file, `scripts/${name.startsWith('check-') ? 'checks' : name === 'prerender.mjs' ? 'build' : 'assets'}/${name}`)
}
const docs = {
  ARIA_ASSISTANT: 'features/aria-assistant', CASE_STUDY_EVIDENCE: 'content/case-study-evidence',
  CLIENT_REVIEW_DRAFTS: 'content/client-review-drafts', CONTENT_ACCURACY_AND_SEO: 'content/content-accuracy-and-seo',
  MOBILE_TESTING: 'testing/mobile-testing', NEWS_EDITORIAL: 'content/news-editorial',
  SECURITY_DEPLOYMENT: 'deployment/security-deployment', SEO_READINESS: 'deployment/seo-readiness',
}
for (const [name, to] of Object.entries(docs)) move(`${name}.md`, `docs/${to}.md`)
for (const file of walk('docs').filter(file => file.endsWith('.md'))) move(file, `docs/features/${path.basename(file)}`)
for (const file of walk('designs')) move(file, `assets/source/${file}`)
move('src/assets/hero.png', 'assets/source/archive/hero.png')
move('public/hero_bg.png', 'assets/source/hero/hero-bg.png')
move('public/hero-glass-bg.png', 'assets/source/hero/hero-glass-bg.png')
move('public/Software_Agency_bg.png', 'assets/source/brand/Software_Agency_bg.png')
move('public/white.png', 'assets/source/brand/white.png')
move('public/og-image.svg', 'assets/source/social/og-image.svg')
move('public/products/eunoia/APP_FEATURES.md', 'docs/features/eunoia-app-features.md')
for (const file of walk('public/people').filter(file => /\.(?:png|jpe?g)$/i.test(file))) if (!runtime.includes(file.replace('public', ''))) move(file, file.replace('public/', 'assets/source/'))
for (const file of walk('public/products/Stepsy').filter(file => file.endsWith('.png') && !file.endsWith('/social.png'))) move(file, file.replace('public/products/Stepsy/', 'assets/source/products/stepsy/'))
for (const file of [...walk('public/products/eunoia'), ...walk('public/products/omnai'), ...walk('public/projects')].filter(file => file.endsWith('.png'))) move(file, file.replace('public/', 'assets/source/'))
// Current product galleries enumerate these URLs at runtime.
const productFiles = new Set([...Array.from({ length: 10 }, (_, i) => `public/products/eunoia/${i + 1}.webp`), ...Array.from({ length: 5 }, (_, i) => `public/products/omnai/B${i + 1}.webp`), 'public/products/eunoia/logo.webp', 'public/products/omnai/logo.webp'])
for (const file of [...walk('public/projects'), ...walk('public/products/eunoia'), ...walk('public/products/omnai'), ...walk('public/products/Stepsy')].filter(file => file.endsWith('.webp') || file.endsWith('/social.png'))) {
  if (!productFiles.has(file) && !runtime.includes(file.replace('public', ''))) removals.add(file)
}
for (const file of ['public/cute_bot_avatar.png', 'public/octopus.png', 'public/4.png', 'public/hero-glass-mobile.webp', 'public/people/noor-fatima-avatar.webp', 'public/people/noor-fatima-avatar-480.webp']) {
  if (!runtime.includes(file.replace('public', ''))) {
    if (file.endsWith('.png')) move(file, file.replace('public/', 'assets/source/archive/'))
    else removals.add(file)
  }
}
for (const file of removals) moves.delete(file)
const removed = [...removals].filter(file => fs.existsSync(file))
console.log(JSON.stringify({ moves: [...moves], removed, removedBytes: removed.reduce((sum, file) => sum + fs.statSync(file).size, 0) }, null, 2))
if (!process.argv.includes('--apply')) process.exit(0)

const backup = path.resolve(root, `../HanovaDevs-cleanup-backup-${new Date().toISOString().replace(/[:.]/g, '-')}`)
if (fs.existsSync(backup)) throw new Error('Backup already exists')
fs.mkdirSync(backup)
const guard = (file, base = root) => {
  const resolved = path.resolve(base, file)
  if (!resolved.startsWith(base + path.sep)) throw new Error(`Unsafe target: ${resolved}`)
  if (fs.existsSync(resolved) && fs.lstatSync(resolved).isSymbolicLink()) throw new Error(`Refusing symlink: ${resolved}`)
  return resolved
}
const snapshots = new Map([...moves].map(([from]) => [from, crypto.createHash('sha256').update(fs.readFileSync(guard(from))).digest('hex')]))
const originalFiles = [...textFiles, ...fs.readdirSync('.').filter(file => /\.(?:js|mjs|json|md|html)$/.test(file) && file !== 'package-lock.json')]
for (const file of originalFiles.filter(file => !removals.has(file))) {
  const source = fs.readFileSync(file, 'utf8')
  const destination = moves.get(file) || file
  let content = source.replace(/(['"])(\.\.?\/[^'"\r\n]+)\1/g, (match, quote, specifier) => {
    const original = path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier))
    const resolved = [original, original + '.js', original + '.jsx', original + '.mjs'].find(candidate => moves.has(candidate) || (fs.existsSync(candidate) && fs.statSync(candidate).isFile()))
    if (!resolved) return match
    let relative = path.posix.relative(path.posix.dirname(destination), moves.get(resolved) || resolved)
    if (!path.posix.extname(specifier)) relative = relative.replace(/\.(?:js|jsx|mjs)$/, '')
    if (!relative.startsWith('.')) relative = './' + relative
    return quote + relative + quote
  })
  // Root-relative command, documentation and filesystem-test references.
  for (const [from, to] of [...moves].sort((a, b) => b[0].length - a[0].length)) content = content.replaceAll(from, to)
  if (content !== source) fs.writeFileSync(guard(file), content)
}
for (const file of removed) {
  const target = guard(`removed/${file}`, backup)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.renameSync(guard(file), target)
}
for (const [from, to] of moves) {
  const target = guard(to)
  if (fs.existsSync(target)) throw new Error(`Destination exists: ${to}`)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.renameSync(guard(from), target)
  if (!/\.(?:jsx?|mjs|css|md|json|html)$/.test(from)) {
    const digest = crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex')
    if (digest !== snapshots.get(from)) throw new Error(`Source asset changed: ${from}`)
  }
}
for (const folder of ['dist', 'dist-ssr', 'artifacts', 'test-results']) {
  if (!fs.existsSync(folder)) continue
  try { const target = guard(`generated/${folder}`, backup); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.renameSync(guard(folder), target) }
  catch (error) { console.log(`Generated directory retained because it is in use: ${folder} (${error.code})`) }
}
function prune(folder) {
  if (!fs.existsSync(folder)) return
  for (const entry of fs.readdirSync(folder, { withFileTypes: true })) if (entry.isDirectory() && !entry.isSymbolicLink()) prune(path.join(folder, entry.name))
  if (!fs.readdirSync(folder).length) fs.rmdirSync(guard(folder))
}
for (const folder of ['src', 'public', 'scripts', 'docs', 'tests', 'designs']) prune(folder)
fs.writeFileSync(guard('manifest.json', backup), JSON.stringify({ moved: [...moves], removed, sourceHashes: [...snapshots] }, null, 2))
console.log(`BACKUP=${backup}`)
