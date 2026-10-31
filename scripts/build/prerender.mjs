import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { JSDOM } from 'jsdom'
import { render } from '../../dist-ssr/entry-server.js'
import { publicRoutes, routeModifiedAt } from '../../src/data/routes.js'
import { company } from '../../src/data/company.js'
import { caseStudies } from '../../src/data/caseStudies.js'
import { projectWorkflows } from '../../src/data/projectWorkflows.js'

const template = await readFile('dist/index.html', 'utf8')
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'))
const pageSource = route => {
  if (route === '/products/stepsy') return 'src/pages/products/StepsyDetail.jsx'
  if (route === '/student-builder-program') return 'src/pages/program/StudentBuilderProgram.jsx'
  if (route === '/team/hira-maqsood') return 'src/pages/company/HiraProfile.jsx'
  if (route.startsWith('/team/')) return 'src/pages/company/TeamProfile.jsx'
  if (route.startsWith('/services/')) return 'src/pages/services/ServiceDetail.jsx'
  if (route.startsWith('/projects/')) return route.split('/').length === 4 ? 'src/pages/projects/ProjectWorkflow.jsx' : 'src/pages/projects/CaseStudy.jsx'
  if (route.startsWith('/journal/')) return 'src/pages/insights/JournalPost.jsx'
  return `src/pages/${({ '/': 'Home', '/services': 'Services', '/about': 'About', '/projects': 'Projects', '/reviews': 'Reviews', '/products': 'Products', '/products/eunoia': 'EunoiaDetail', '/products/omnai': 'OmnaiDetail', '/products/eunoia/privacy': 'EunoiaPrivacyPolicy', '/contact': 'Contact', '/calculator': 'Calculator', '/journal': 'Journal', '/research': 'Research', '/news': 'News', '/stack': 'TechStack', '/privacy-policy': 'PrivacyPolicy', '/terms-of-service': 'TermsOfService' })[route] || 'NotFound'}.jsx`
}
function stylesFor(source, collected = new Set()) {
  const entry = manifest[source]
  if (!entry) throw new Error(`Missing manifest entry: ${source}`)
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
  const pageName = path.basename(pageSource(route))
  // Vite may promote a page imported both statically and lazily to a shared chunk.
  const source = Object.keys(manifest).find(key => key.startsWith('src/pages/') && path.basename(key) === pageName)
    || Object.keys(manifest).find(key => manifest[key].name === path.basename(pageName, '.jsx'))
  if (!source) throw new Error(`Missing page source for ${route}: ${pageName}`)
  for (const css of stylesFor(source)) {
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
const portfolioImages = new Map([...caseStudies, ...projectWorkflows].map(item => [item.path, [item.image, ...(item.showcase || []).map(view => view.image)]]))
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${publicRoutes.map(route => {
  const images = portfolioImages.get(route) || []
  return `  <url><loc>${company.url}${route}</loc><lastmod>${routeModifiedAt(route) || company.reviewedAt}</lastmod>${images.map(image => `<image:image><image:loc>${company.url}${image}</image:loc></image:image>`).join('')}</url>`
}).join('\n')}\n</urlset>\n`
await writeFile('dist/sitemap.xml', sitemap, 'utf8')
await writeFile('public/sitemap.xml', sitemap, 'utf8')
console.log(`Prerendered ${publicRoutes.length} public routes and a real 404 page; sitemap generated from the same inventory.`)
