import assert from 'node:assert/strict'
import { readFile, access, readdir } from 'node:fs/promises'
import { JSDOM } from 'jsdom'
import { publicRoutes, legacyRedirects } from '../src/data/routes.js'
import { company } from '../src/data/company.js'
import { leadershipProfiles, leadershipFaqs } from '../src/data/leadershipProfiles.js'
import { builderProgram, studentBuilders, programFaqs } from '../src/data/studentBuilderProgram.js'
import { stepsy, stepsyScenes, stepsyFaqs } from '../src/data/stepsy.js'
import { services } from '../src/data/services.js'
import { caseStudies } from '../src/data/caseStudies.js'
import { projectWorkflows } from '../src/data/projectWorkflows.js'
import { homeAnswers } from '../src/data/homeAnswers.js'

const config = JSON.parse(await readFile('vercel.json', 'utf8'))
const checkedAssets = new Set()
async function checkAsset(url) {
  const cleanPath = decodeURIComponent(url.split('?')[0])
  if (checkedAssets.has(cleanPath)) return
  let directory = 'dist'
  for (const segment of cleanPath.split('/').filter(Boolean)) {
    assert((await readdir(directory)).includes(segment), `${url}: missing asset or case mismatch at ${directory}/${segment}`)
    directory += `/${segment}`
  }
  await access(directory)
  checkedAssets.add(cleanPath)
}
const seenTitles = new Set()
for (const route of publicRoutes) {
  const html = await readFile(route === '/' ? 'dist/index.html' : `dist${route}/index.html`, 'utf8')
  const dom = new JSDOM(html), document = dom.window.document
  assert.equal(document.querySelectorAll('h1').length, 1, `${route}: one main heading`)
  assert.equal(document.querySelectorAll('title').length, 1, `${route}: one title`)
  assert.equal(document.querySelectorAll('meta[name="description"]').length, 1, `${route}: one description`)
  assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1, `${route}: one canonical`)
  assert.equal(document.querySelector('link[rel="canonical"]').href, `${company.url}${route}`, `${route}: correct canonical`)
  assert.equal(new URL(document.querySelector('meta[property="og:url"]').content).origin, company.url, `${route}: consistent preferred host`)
  assert(!seenTitles.has(document.title), `${route}: unique title`); seenTitles.add(document.title)
  const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map(node => JSON.parse(node.textContent))
  assert.equal(schemas.length, 1, `${route}: one JSON-LD graph`)
  assert.equal(schemas[0]['@graph'].find(node => node['@type'] === 'Organization').foundingDate, '2022')
  const organization = schemas[0]['@graph'].find(node => node['@type'] === 'Organization')
  const hira = schemas[0]['@graph'].find(node => node['@type'] === 'Person' && node.name === 'Hira Maqsood')
  assert(hira, `${route}: co-founder entity`)
  assert.equal(hira.jobTitle, 'Co-founder & Chief Operating Officer')
  assert(organization.founder.some(founder => founder['@id'] === hira['@id']), `${route}: co-founder relationship`)
  const member = leadershipProfiles.find(person => person.profile === route)
  if (member) {
    const profile = schemas[0]['@graph'].find(node => node['@type'] === 'ProfilePage')
    assert.equal(profile.mainEntity['@id'], member.entityId)
    assert.equal(document.querySelector('h1').textContent, member.name)
    assert(document.querySelector('main').textContent.includes(member.description), 'Profile schema matches visible bio')
    assert.equal(document.querySelector('meta[property="og:image"]').content, `${company.url}${member.image}`)
    assert.equal(schemas[0]['@graph'].find(node => node['@type'] === 'FAQPage').mainEntity.length, 7)
    for (const faq of leadershipFaqs(member)) assert(document.querySelector('main').textContent.includes(faq.answer), `${route}: visible FAQ answer`)
    assert.equal(schemas[0]['@graph'].filter(node => node['@id'] === member.entityId).length, 1)
    if (member.illustration) assert(!schemas[0]['@graph'].find(node => node['@id'] === member.entityId).image, 'Do not present fictional avatar as an actual likeness in Person schema')
  }
  assert(!JSON.stringify(schemas).match(/aggregateRating|ratingValue|streetAddress|"award"/), `${route}: evidence-safe schema`)
  if (route === '/') {
    assert.equal(document.querySelector('.hero__glass-img').getAttribute('src'), '/hero-scene-1774.webp')
    assert.equal(document.querySelector('.hero__glass-img').getAttribute('fetchpriority'), 'high')
    assert.equal(document.querySelectorAll('.hero__headline-line').length, 2)
    assert.equal(document.querySelectorAll('.home-answers details').length, homeAnswers.length)
    for (const answer of homeAnswers) assert(document.querySelector('.home-answers').textContent.includes(answer.answer), 'Visible answers match structured answers')
    for (const study of caseStudies) assert(document.querySelector(`#featured-projects a[href="${study.path}"]`), 'Homepage links directly to each case study')
    assert.equal(schemas[0]['@graph'].find(node => node['@type'] === 'FAQPage').mainEntity.length, homeAnswers.length)
  }
  if (route === '/projects' || route === '/services') {
    const items = route === '/projects' ? caseStudies : services
    const list = schemas[0]['@graph'].find(node => node['@type'] === 'ItemList')
    assert.equal(list.numberOfItems, items.length)
    for (const item of list.itemListElement) assert(document.querySelector(`main a[href="${new URL(item.url).pathname}"]`), 'Collection schema links to visible destinations')
    if (route === '/projects') assert.equal(document.querySelectorAll('.work-card--featured').length, caseStudies.length)
  }
  const service = services.find(item => route === `/services/${item.id}`)
  if (service) {
    const entity = schemas[0]['@graph'].find(node => node['@type'] === 'Service')
    assert.equal(entity.name, service.title)
    assert(!entity.offers && !entity.aggregateRating, `${route}: no unsupported price or rating`)
    assert.equal(document.querySelectorAll('.work-faq-list details').length, service.faqs.length)
    for (const faq of service.faqs) assert(document.querySelector('main').textContent.includes(faq.answer), `${route}: visible FAQ answer`)
    assert.equal(document.querySelectorAll('.service-capabilities article').length, 4)
    assert(document.querySelector('main a[href*="source=service"]'), `${route}: contextual enquiry path`)
  }
  const study = caseStudies.find(item => item.path === route)
  if (study) {
    const entity = schemas[0]['@graph'].find(node => node['@type'] === 'CreativeWork')
    assert.equal(entity.name, `${study.title} ${study.featured ? 'project' : 'website'} case study`)
    assert.equal(document.querySelector('.case-desktop-capture img').getAttribute('src'), study.image)
    if (study.mobileImage) assert.equal(document.querySelector('.case-mobile-capture img').getAttribute('src'), study.mobileImage)
    else assert(!document.querySelector('.case-mobile-capture'), 'No invented mobile screenshot')
    assert(document.querySelector('#case-evidence').textContent.includes('No verified before-and-after revenue'), `${route}: honest measurement status`)
    assert.equal(document.querySelector('time').getAttribute('datetime'), study.reviewedAt)
    assert(document.querySelector('main a[href*="source=case-study"]'), `${route}: case enquiry context`)
  }
  const workflow = projectWorkflows.find(item => item.path === route)
  if (workflow) {
    assert.equal(document.querySelector('h1').textContent, workflow.title)
    assert.equal(document.querySelector('.workflow-hero-figure img').getAttribute('src'), workflow.image)
    assert.equal(document.querySelectorAll('.work-faq-list details').length, workflow.faqs.length)
    assert(document.querySelector('.workflow-switcher a[aria-current="page"]'))
    assert(!document.querySelector('iframe'), 'Private applications must not be embedded')
  }
  if (route === builderProgram.path) {
    const program = schemas[0]['@graph'].find(node => node['@type'] === 'EducationalOccupationalProgram')
    assert.equal(program.timeToComplete, 'P8W')
    assert.equal(program.educationalProgramMode, 'online')
    assert(!program.startDate && !program.endDate && !program.offers, 'No invented program dates or fees')
    const cards = [...document.querySelectorAll('.sbp-builder')]
    assert.equal(cards.length, 13)
    assert.deepEqual(cards.map(card => card.dataset.builderId), Array.from({ length: 13 }, (_, index) => `HD-SB-${String(index + 1).padStart(3, '0')}`))
    for (const builder of studentBuilders) {
      const card = document.querySelector(`[data-builder-id="${builder.id}"]`)
      assert(card.querySelector('h3').textContent === builder.name, `${builder.id}: participant identity`)
      assert(card.querySelector('.sbp-builder__id').textContent.includes(builder.id), `${builder.id}: visible ID`)
      if (builder.linkedin) assert(card.querySelector(`a[href="${builder.linkedin}"]`), `${builder.name}: LinkedIn destination`)
      else if (builder.github) assert(card.querySelector(`a[href="${builder.github}"]`), `${builder.name}: GitHub destination`)
      else assert(!card.querySelector('a'), `${builder.name}: do not invent a profile link`)
    }
    assert.equal(document.querySelectorAll('.sbp-mentor').length, 4)
    assert.equal(document.querySelectorAll('.sbp-faq details').length, programFaqs.length)
    assert(!document.querySelector('.sbp-page').textContent.includes('@'), 'No public participant emails')
    await access(`dist/program/student-builder-social.png`)
    assert(document.querySelector('.sbp-recognition').textContent.includes('not an issued certificate'))
  }
  if (route === stepsy.path) {
    assert.equal(document.querySelectorAll('.stepsy-scene').length, stepsyScenes.length)
    assert.equal(document.querySelectorAll('.stepsy-faq details').length, stepsyFaqs.length)
    for (const scene of stepsyScenes) assert(document.querySelector(`#stepsy-${scene.id} img`).getAttribute('src').includes(scene.image), `${scene.id}: source image in static HTML`)
    assert(!document.querySelector('[data-cinematic]'), 'No animation-dependent content in prerendered HTML')
    assert(!document.querySelector('a[href*="apps.apple.com"], a[href*="play.google.com"]'), 'No invented store listing')
    assert(document.querySelector('.stepsy-page').textContent.includes('not live deals or signed merchant partnerships'))
    const product = schemas[0]['@graph'].find(node => node['@type'] === 'CreativeWork' && node.name === 'Stepsy')
    assert(product && !product.offers && !product.aggregateRating && !product.operatingSystem, 'Factual preview schema')
    await checkAsset('/media/stepsy/social.png')
  }
  assert(!document.querySelector('script[src*="googletagmanager"], script[src*="_vercel/insights"], iframe[src*="googletagmanager"]'), `${route}: no optional trackers in HTML`)
  assert(!html.includes('\uFFFD'), `${route}: no replacement characters`)
  for (const image of document.querySelectorAll('img[src^="/"]')) {
    await checkAsset(image.getAttribute('src'))
    for (const source of (image.getAttribute('srcset') || '').split(',').filter(Boolean)) {
      const url = source.trim().split(/\s+/)[0]
      if (url.startsWith('/')) await checkAsset(url)
    }
  }
  for (const link of document.querySelectorAll('link[rel="stylesheet"][href^="/"]')) await access(`dist${link.getAttribute('href')}`)
  assert(config.routes.some(rule => rule.src && new RegExp(rule.src).test(route) && rule.dest?.endsWith('index.html')), `${route}: deployment route`)
  dom.window.close()
}
const sitemap = new JSDOM(await readFile('dist/sitemap.xml', 'utf8'), { contentType: 'text/xml' })
assert.deepEqual([...sitemap.window.document.getElementsByTagNameNS('http://www.sitemaps.org/schemas/sitemap/0.9', 'loc')].map(node => node.textContent), publicRoutes.map(route => `${company.url}${route}`))
const imageEntries = [...sitemap.window.document.getElementsByTagNameNS('http://www.google.com/schemas/sitemap-image/1.1', 'loc')]
assert.equal(imageEntries.length, caseStudies.length + projectWorkflows.length)
for (const entry of imageEntries) {
  assert.equal(new URL(entry.textContent).origin, company.url)
  await checkAsset(new URL(entry.textContent).pathname)
}
assert((await readFile('dist/robots.txt', 'utf8')).includes(`Sitemap: ${company.url}/sitemap.xml`))
sitemap.window.close()
const missing = new JSDOM(await readFile('dist/404.html', 'utf8'))
assert(missing.window.document.querySelector('meta[name="robots"]').content.includes('noindex'))
assert(missing.window.document.querySelector('h1').textContent.includes('doesn’t exist'))
missing.window.close()
assert.equal(config.routes.at(-1).status, 404)
for (const [from, to] of legacyRedirects) assert(config.routes.some(rule => rule.src && new RegExp(rule.src).test(from) && rule.headers?.Location === to && rule.status === 308))
const guide = new JSDOM(await readFile('dist/journal/hanovadevs-software-company-guide/index.html', 'utf8'))
assert(guide.window.document.querySelectorAll('.article-content h2').length >= 18)
assert(guide.window.document.querySelector('.article-content').textContent.length > 18000)
guide.window.close()
console.log(`PASS: ${publicRoutes.length} JavaScript-free pages, unique metadata, factual schema, local assets, sitemap, consent defaults, redirects and 404 configuration.`)
