import { caseStudyById, caseStudies } from './caseStudies.js'
import { company } from './company.js'

export const clientStoriesUpdatedAt = '2026-11-06'
export const clientStories = [
  {
    id: 'growtech', title: 'GrowTech Advertising', category: 'Agency & operations', tone: 'mint',
    projectIds: ['growtech-website', 'growtech-crm'],
    owner: caseStudyById['growtech-website'].owner, role: caseStudyById['growtech-website'].ownerRole,
    intro: 'A clear introduction for prospective clients. A connected workspace for the team behind it.',
    focus: 'The public website explains the agency’s Amazon PPC offering and account-review journey. The private CRM brings reporting, planning, team collaboration and operating priorities into one workspace.',
    delivered: ['Agency website', 'Internal CRM', 'Planning & collaboration'],
    review: {
      title: 'Outstanding Development Team – Highly Recommended!',
      rating: 5,
      suppliedAt: '2026-10-31',
      excerpt: 'We had an excellent experience working with Hanova Devs on two major projects for GrowTech Advertising: our company website and a custom agency management platform.',
      paragraphs: [
        'We had an excellent experience working with Hanova Devs on two major projects for GrowTech Advertising: our company website and a custom agency management platform.',
        'They did a fantastic job bringing our vision to life. The website looks modern, professional, and polished, while the management platform is thoughtfully designed with features that help us organize our daily operations, manage tasks, plan schedules, track work, and improve overall team productivity.',
        'What impressed us most was their ability to understand our business requirements and turn complex ideas into a clean, user-friendly, and functional system. Their attention to detail, technical expertise, and dedication to delivering quality work really stood out.',
        "Building a custom management platform isn't easy, but Hanova Devs handled the project professionally and delivered something genuinely valuable to our business.",
        "We're extremely satisfied with the results and would highly recommend Hanova Devs to anyone looking for a reliable, skilled, and professional development team. Five stars, well deserved!",
      ],
    },
  },
  {
    id: 'earthsync', title: 'EarthSync Essentials', category: 'Commerce & brands', tone: 'sage', projectIds: ['earthsync'],
    owner: caseStudyById.earthsync.owner, role: 'Owner',
    intro: 'A nature-led brand experience that brings product discovery and supporting information together.',
    focus: 'The website connects the grounding-product range with educational content, brand information and customer enquiry paths.',
    delivered: ['Product discovery', 'Brand presentation', 'Customer information'],
  },
  {
    id: 'crown', title: 'Crown Accumulators', category: 'Industrial business', tone: 'lavender', projectIds: ['crown', 'crown-crm'],
    owner: caseStudyById.crown.owner, role: 'Owner',
    intro: 'An industrial business, presented clearly outside and organised thoughtfully within.',
    focus: 'The corporate website introduces the product range and business enquiry routes. The admin-only CRM brings financial records, products, stock and factory-management destinations into a shared interface.',
    delivered: ['Corporate website', 'Factory-management CRM', 'Inventory & billing views'],
    feedback: 'HanovaDevs reports positive overall feedback from the owner on the CRM project. No attributed quotation or measured business improvement is published here.',
  },
  {
    id: 'terrasol', title: 'Terra Sol Grounding', category: 'Commerce & brands', tone: 'sand', projectIds: ['terrasol'],
    owner: caseStudyById.terrasol.owner, role: 'Owner',
    intro: 'A grounded visual identity, with a clearer route from product exploration to buying information.',
    focus: 'Product pages, educational reading and a visible external purchase destination give the brand’s different visitor journeys their own place.',
    delivered: ['Product information', 'Educational content', 'External buying routes'],
  },
  {
    id: 'zozo', title: 'Zozo', category: 'Discovery platforms', tone: 'blue', projectIds: ['zozo'],
    owner: null, role: null,
    intro: 'Helping people explore phones, earbuds and electric vehicles before making a decision.',
    focus: 'Search, category-specific filters, device information and side-by-side phone comparison form a research experience—not an ecommerce checkout.',
    delivered: ['Catalogue discovery', 'Specification comparison', 'Device information'],
  },
  {
    id: 'raqs', title: 'RAQS', category: 'Commerce & brands', tone: 'rose', projectIds: ['raqs'],
    owner: caseStudyById.raqs.owner, role: 'Owner',
    intro: 'An editorial digital storefront that gives a fashion brand room to express its own identity.',
    focus: 'Collection imagery, brand storytelling and customer information support the journey from discovering the label to exploring its clothing.',
    delivered: ['Fashion storefront', 'Collection discovery', 'Brand storytelling'],
  },
  {
    id: 'junko-bodie-roulette', title: 'Junko Bodie Roulette', category: 'Interactive platforms', tone: 'sand', projectIds: ['junko-bodie-roulette'],
    owner: null, role: null,
    intro: 'An interactive learning experience with a clear play-money purpose.',
    focus: 'The platform connects a simulator introduction, probability calculator and educational reading. The website identifies its audience as adults 21+ and does not offer real-money wagering or cash prizes.',
    delivered: ['Interactive learning website', 'Public odds calculator', 'Educational content'],
  },
].map(story => ({ ...story, projects: story.projectIds.map(id => caseStudyById[id]), image: caseStudyById[story.projectIds[0]].cardImage }))

export const clientStoryFilters = ['All work', ...new Set(clientStories.map(story => story.category))]

export function createReviewEmail({ name, project: id, rating, feedback }) {
  const project = caseStudies.find(item => item.id === id)
  if (!project) throw new Error('Choose a listed project before preparing feedback.')
  const body = `Name: ${name.trim()}\nProject: ${project.title}\nRating: ${rating || 'Not specified'}\n\n${feedback.trim()}\n\nPlease contact me to confirm attribution and publication permission.`
  return `mailto:${company.email}?subject=${encodeURIComponent(`Client feedback: ${project.title}`)}&body=${encodeURIComponent(body)}`
}
