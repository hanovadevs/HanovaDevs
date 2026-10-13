import { builderProgram } from '../data/programOverview.js'
import { company } from '../data/company.js'

export function studentBuilderSchema() {
  return {
    '@type': 'EducationalOccupationalProgram', '@id': `${builderProgram.url}#program`,
    name: `HanovaDevs ${builderProgram.name}`, url: builderProgram.url,
    description: builderProgram.description, provider: { '@id': `${company.url}/#organization` },
    educationalProgramMode: 'online', timeToComplete: 'P8W',
    mainEntityOfPage: { '@id': `${builderProgram.url}#webpage` },
  }
}
