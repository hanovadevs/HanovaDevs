import { company } from './company.js'

// Leadership identities supplied by the company owner; detailed profile copy loads with the profile route.
export const leadershipTeam = [
  {
    id: 'ali-haider', name: 'Ali Haider', role: 'Founder & CEO', jobTitle: 'Founder & CEO',
    focus: 'Company direction & strategy', image: company.founder.image, smallImage: '/people/ali-haider-480.webp',
    alt: 'Ali Haider, founder of HanovaDevs', tone: 'teal', profile: '/team/ali-haider',
    entityId: `${company.founder.url}/#person`, externalProfile: company.founder.url,
    description: 'Ali Haider is the founder and CEO of HanovaDevs, which he founded in 2022. His role focuses on company direction, business strategy and connecting ideas with useful software.',
    knowsAbout: ['Company strategy', 'Product planning', 'Software business', 'Digital products'],
  },
  {
    id: 'hira-maqsood', name: company.coFounder.name, role: company.coFounder.role, jobTitle: company.coFounder.jobTitle,
    focus: 'Original ideas, strategic planning & operations', image: company.coFounder.image, smallImage: '/people/hira-maqsood-480.webp',
    alt: 'Hira Maqsood, co-founder and COO of HanovaDevs', tone: 'rose', profile: company.coFounder.path,
    entityId: `${company.coFounder.url}#person`, description: company.coFounder.description, knowsAbout: company.coFounder.knowsAbout,
  },
  {
    id: 'noor-fatima', name: 'Noor Fatima', role: 'CMO', jobTitle: 'Chief Marketing Officer', focus: 'Brand & growth',
    image: '/people/noor-fatima-avatar.webp', smallImage: '/people/noor-fatima-avatar-480.webp',
    alt: 'Faceless illustrated avatar for Noor Fatima', illustration: true, tone: 'sage', profile: '/team/noor-fatima',
    entityId: `${company.url}/team/noor-fatima#person`,
    description: 'Noor Fatima is the Chief Marketing Officer of HanovaDevs. Her role focuses on brand direction, marketing communication and connecting the company’s work with its audience.',
    knowsAbout: ['Brand direction', 'Marketing communication', 'Audience messaging'],
  },
  {
    id: 'faizan-javed', name: 'Faizan Javed', role: 'CTO', jobTitle: 'Chief Technology Officer', focus: 'Technology & engineering',
    image: '/people/faizan-javed.webp', smallImage: '/people/faizan-javed-480.webp',
    alt: 'Faizan Javed, CTO of HanovaDevs', tone: 'blue', profile: '/team/faizan-javed',
    entityId: `${company.url}/team/faizan-javed#person`,
    description: 'Faizan Javed is the Chief Technology Officer of HanovaDevs. His role focuses on technical direction, engineering decisions and connecting software implementation with project requirements.',
    knowsAbout: ['Technical direction', 'Software engineering', 'Implementation planning'],
  },
]
