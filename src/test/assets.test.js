// @vitest-environment node
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { JSDOM } from 'jsdom'
import sharp from 'sharp'
import { describe, expect, it } from 'vitest'

const svgFiles = readdirSync('public', { recursive: true }).filter(file => file.endsWith('.svg'))

describe('public SVG assets', () => {
  it.each(svgFiles)('%s is valid SVG XML', file => {
    const document = new JSDOM(readFileSync(path.join('public', file), 'utf8'), { contentType: 'image/svg+xml' })
    expect(document.window.document.documentElement.localName).toBe('svg')
    expect(document.window.document.documentElement.namespaceURI).toBe('http://www.w3.org/2000/svg')
    document.window.close()
  })

  it.each(svgFiles.filter(file => file.startsWith(`news${path.sep}`)))('%s decodes as a cover image', async file => {
    const { info } = await sharp(path.join('public', file)).resize(320).png().toBuffer({ resolveWithObject: true })
    expect(info.width).toBe(320)
    expect(info.height).toBe(180)
  })
})
