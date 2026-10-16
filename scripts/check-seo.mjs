import assert from 'node:assert/strict'
import { readFile, access, readdir } from 'node:fs/promises'
import { JSDOM } from 'jsdom'
import { publicRoutes, legacyRedirects } from '../src/data/routes.js'
import { company } from '../src/data/company.js'
import { leadershipProfiles, leadershipFaqs } from '../src/data/leadershipProfiles.js'
import { builderProgram, studentBuilders, programFaqs } from '../src/data/studentBuilderProgram.js'
import { stepsy, stepsyScenes, stepsyFaqs } from '../src/data/stepsy.js'

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
assert.deepEqual([...sitemap.window.document.querySelectorAll('loc')].map(node => node.textContent), publicRoutes.map(route => `${company.url}${route}`))
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
