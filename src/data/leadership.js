import { company } from './company'

// Names and leadership titles supplied by the company owner.
export const leadershipTeam = [
  { id: 'ali-haider', name: 'Ali Haider', role: 'Founder & CEO', focus: 'Company direction & strategy', image: company.founder.image, smallImage: '/people/ali-haider-480.webp', alt: 'Ali Haider, founder of HanovaDevs', tone: 'teal' },
  { id: 'hira-maqsood', name: company.coFounder.name, role: company.coFounder.role, focus: 'Original ideas, strategic planning & operations', image: company.coFounder.image, smallImage: '/people/hira-maqsood-480.webp', alt: 'Hira Maqsood, co-founder and COO of HanovaDevs', tone: 'rose', profile: company.coFounder.path },
  { id: 'noor-fatima', name: 'Noor Fatima', role: 'CMO', focus: 'Brand & growth', image: null, tone: 'sage' },
  { id: 'faizan-javed', name: 'Faizan Javed', role: 'CTO', focus: 'Technology & engineering', image: '/people/faizan-javed.webp', smallImage: '/people/faizan-javed-480.webp', alt: 'Faizan Javed, CTO of HanovaDevs', tone: 'blue' },
]
