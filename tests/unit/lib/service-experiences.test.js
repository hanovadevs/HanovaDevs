// @vitest-environment node
import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { services } from '../../../src/data/services.js'
import { serviceExperiences, servicesReviewedAt } from '../../../src/data/serviceExperiences.js'
import { routeModifiedAt } from '../../../src/data/routes.js'

describe('service-specific buyer guidance', () => {
  it('covers all six published services without a shared filler fallback', () => {
    expect(Object.keys(serviceExperiences).sort()).toEqual(services.map(service => service.id).sort())
    expect(new Set(services.flatMap(service => service.experience.problems.map(([problem]) => problem))).size).toBe(60)
  })

  it.each(services)('$id: has complete, distinct buyer information and local imagery', service => {
    const data = service.experience
    expect(data.problems).toHaveLength(10)
    expect(data.projects).toHaveLength(6)
    expect(data.engagements).toHaveLength(3)
    expect(data.preparation).toHaveLength(4)
    expect(data.measurement).toHaveLength(3)
    for (const triple of data.problems) {
      expect(triple).toHaveLength(3)
      expect(triple.every(value => value.length > 20)).toBe(true)
    }
    expect(new Set(data.projects.map(([title]) => title)).size).toBe(6)
    expect(existsSync(`public${data.image}`)).toBe(true)
    for (const width of [640, 1280]) expect(existsSync(`public/services/${data.editorial}-${width}.webp`)).toBe(true)
    expect(service.faqs[0].answer).toContain(data.projects[0][0].toLowerCase())
    expect(routeModifiedAt(`/services/${service.id}`)).toBe(servicesReviewedAt)
  })

  it('records generated image provenance and preserves local originals', () => {
    const provenance = JSON.parse(readFileSync('assets/source/services/generation-prompts.json', 'utf8'))
    expect(provenance.tool).toBe('built-in image_gen')
    for (const name of Object.keys(provenance.prompts)) expect(existsSync(`assets/source/services/${name}.png`)).toBe(true)
  })
})
