import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { JSDOM } from 'jsdom'
import { render } from '../dist-ssr/entry-server.js'
import { publicRoutes } from '../src/data/routes.js'
import { company } from '../src/data/company.js'

const template = await readFile('dist/index.html', 'utf8')
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'))
const pageSource = route => {
  if (route === '/student-builder-program') return 'src/pages/StudentBuilderProgram.jsx'
  if (route === '/team/hira-maqsood') return 'src/pages/HiraProfile.jsx'
  if (route.startsWith('/team/')) return 'src/pages/TeamProfile.jsx'
  if (route.startsWith('/services/')) return 'src/pages/ServiceDetail.jsx'
  if (route.startsWith('/journal/')) return 'src/pages/JournalPost.jsx'
  return `src/pages/${({ '/': 'Home', '/services': 'Services', '/about': 'About', '/projects': 'Projects', '/reviews': 'Reviews', '/products': 'Products', '/products/eunoia': 'EunoiaDetail', '/products/omnai': 'OmnaiDetail', '/products/eunoia/privacy': 'EunoiaPrivacyPolicy', '/contact': 'Contact', '/calculator': 'Calculator', '/journal': 'Journal', '/research': 'Research', '/news': 'News', '/stack': 'TechStack', '/privacy-policy': 'PrivacyPolicy', '/terms-of-service': 'TermsOfService' })[route] || 'NotFound'}.jsx`
}
function stylesFor(source, collected = new Set()) {
  const entry = manifest[source]
  if (!entry) return collected
  for (const css of entry.css || []) collected.add(css)
  for (const dependency of entry.imports || []) stylesFor(dependency, collected)
  return collected
}
async function createPage(route, destination) {
  const result = render(route)
  const dom = new JSDOM(template)
  const { document } = dom.window
  document.head.querySelectorAll('title, meta:not([charset]):not([name="viewport"]), link[rel="canonical"], script[type="application/ld+json"]').forEach(element => element.remove())
  document.head.insertAdjacentHTML('beforeend', result.head)
  const linked = new Set([...document.querySelectorAll('link[rel="stylesheet"]')].map(link => link.getAttribute('href')))
  for (const css of stylesFor(pageSource(route))) {
    if (linked.has(`/${css}`)) continue
    const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = `/${css}`; document.head.appendChild(link)
  }
  document.getElementById('root').innerHTML = result.html
  document.getElementById('root').querySelectorAll('title, meta, link[rel="canonical"], link[rel="preload"], script[type="application/ld+json"]').forEach(element => document.head.appendChild(element))
  document.head.querySelectorAll('title, meta:not([charset]):not([name="viewport"]), link[rel="canonical"], script[type="application/ld+json"]').forEach(element => element.setAttribute('data-hanova-seo', 'true'))
  document.querySelectorAll('.reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale').forEach(element => element.classList.add('visible'))
  if (!document.querySelector('h1') || !document.querySelector('link[rel="canonical"]') || !document.querySelector('script[type="application/ld+json"]')) throw new Error(`Incomplete prerender: ${route}`)
  await mkdir(path.dirname(destination), { recursive: true })
  await writeFile(destination, dom.serialize(), 'utf8')
  dom.window.close()
}
for (const route of publicRoutes) await createPage(route, route === '/' ? 'dist/index.html' : `dist${route}/index.html`)
await createPage('/404', 'dist/404.html')
// Portal stays client-rendered and excluded from discovery. Never render admin data at build time.
await mkdir('dist/hanova-portal-2026', { recursive: true })
await writeFile('dist/hanova-portal-2026/index.html', template.replace('<head>', '<head><meta name="robots" content="noindex, nofollow">'), 'utf8')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicRoutes.map(route => `  <url><loc>${company.url}${route}</loc><lastmod>${company.reviewedAt}</lastmod></url>`).join('\n')}\n</urlset>\n`
await writeFile('dist/sitemap.xml', sitemap, 'utf8')
console.log(`Prerendered ${publicRoutes.length} public routes and a real 404 page; sitemap generated from the same inventory.`)
