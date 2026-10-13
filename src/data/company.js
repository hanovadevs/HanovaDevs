export const company = {
  name: 'HanovaDevs',
  alternateName: 'Hanova Devs',
  url: 'https://hanovadevs.com',
  email: 'contact@hanovadevs.com',
  founded: '2022',
  reviewedAt: '2026-10-13',
  description: 'HanovaDevs is a software company founded in 2022 by Ali Haider, with Hira Maqsood as co-founder and COO. We build custom software, websites, ecommerce and AI automation, alongside our own desktop products.',
  founder: { name: 'Ali Haider', url: 'https://ali.hanovadevs.com', image: '/people/ali-haider.webp' },
  coFounder: {
    name: 'Hira Maqsood', role: 'Co-founder & COO', jobTitle: 'Co-founder & Chief Operating Officer',
    path: '/team/hira-maqsood', url: 'https://hanovadevs.com/team/hira-maqsood', image: '/people/hira-maqsood.webp',
    description: 'Hira Maqsood is the co-founder and Chief Operating Officer of HanovaDevs. Her work focuses on original ideas, creative problem-solving, strategic planning, and coordinating operations and delivery.',
    knowsAbout: ['Creative ideation', 'Creative problem-solving', 'Strategic planning', 'Business operations', 'Project delivery'],
  },
  socials: {
    linkedin: 'https://www.linkedin.com/company/hanova-devs',
    instagram: 'https://www.instagram.com/hanovadevs/',
    github: 'https://github.com/hanovadevs/',
  },
  products: {
    eunoia: { name: 'Eunoia', status: 'Available on Microsoft Store', storeUrl: 'https://apps.microsoft.com/detail/9PJ36VD01Z4X' },
    omnai: { name: 'Omnai Browser', status: 'Launching soon' },
  },
}

// Client identities and project relationships were provided by the company owner.
// Quotes, ratings, and measured performance results require separate approval.
export const clientProjects = [
  {
    id: 'earthsync', title: 'EarthSync Essentials', owner: 'Veli', initials: 'V',
    category: 'Wellness ecommerce', theme: 'light', image: '/projects/earthsync.webp',
    url: 'https://www.earthsyncessential.com', accent: '#49765b',
    overview: 'A digital storefront for EarthSync Essentials, a brand offering grounding and earthing products.',
    challenge: 'Present the product range clearly and help visitors understand the brand before choosing a product.',
    solution: 'A nature-led shopping experience that brings product information, brand presentation, and customer enquiry paths together.',
    result: 'A dedicated online presence for product discovery and customer enquiries.',
    deliverables: ['Product discovery', 'Brand presentation', 'Customer enquiry paths'],
    quote: null, rating: null,
  },
  {
    id: 'terrasol', title: 'Terra Sol Grounding', owner: 'Sara', initials: 'S',
    category: 'Wellness ecommerce', theme: 'terrasol', image: '/projects/terrasol.webp',
    url: 'https://www.terrasolgrounding.com', accent: '#a27842',
    overview: 'A website for Terra Sol Grounding, bringing its grounding sheets, mats, and brand information into one customer-facing experience.',
    challenge: 'Organize the brand and product information into a clear journey from exploration to purchase.',
    solution: 'An earth-toned interface connecting the product catalogue, educational content, and purchase destinations.',
    result: 'A single destination for the brand, its products, and buying information.',
    deliverables: ['Product catalogue', 'Educational content', 'Purchase destinations'],
    quote: null, rating: null,
  },
  {
    id: 'crown', title: 'Crown Accumulators', owner: 'Shahid Mahmood', initials: 'SM',
    category: 'Industrial business', theme: 'dark', image: '/projects/crown.webp',
    url: 'https://www.crownaccumulator.com', accent: '#b98e22',
    overview: 'An industrial website for Crown Accumulators, presenting its battery business and product information to prospective customers.',
    challenge: 'Make a technical product business easier to explore and give customers a direct route to contact the company.',
    solution: 'A clear corporate presentation with product information and business enquiry paths.',
    result: 'A customer-facing platform for the business and its product offering.',
    deliverables: ['Corporate website', 'Product information', 'Business enquiries'],
    quote: null, rating: null,
  },
  {
    id: 'raqs', title: 'RAQS', owner: 'Noor Fatima', initials: 'NF',
    category: 'Fashion ecommerce', theme: 'raqs', image: '/projects/raqs.webp',
    url: 'https://www.raqsofficial.store', accent: '#8c7853',
    overview: 'A fashion storefront for RAQS, giving the brand a dedicated place to present its clothing and collections.',
    challenge: 'Translate the brand’s visual identity into a focused online shopping experience.',
    solution: 'An editorial storefront combining collection imagery, product discovery, and a clear shopping journey.',
    result: 'A branded digital storefront for collection and product discovery.',
    deliverables: ['Fashion storefront', 'Collection presentation', 'Shopping journey'],
    quote: null, rating: null,
  },
]

export const companyFaqs = [
  { question: 'Who founded HanovaDevs, and when?', answer: 'Ali Haider founded HanovaDevs in 2022. You can learn more about the founder at ali.hanovadevs.com.' },
  { question: 'Who is Hira Maqsood at HanovaDevs?', answer: company.coFounder.description },
  { question: 'What does HanovaDevs do?', answer: 'HanovaDevs offers custom software development, web design and development, Shopify development, AI automation, SEO and analytics, and brand identity services.' },
  { question: 'Which businesses are a good fit?', answer: 'We work with businesses that need a clearer digital presence, a custom business application, an ecommerce experience, or practical automation. Scope, budget, and support needs are discussed before a proposal.' },
  { question: 'Is Eunoia available?', answer: 'Yes. Eunoia has launched on Microsoft Store. The official listing is linked from the Eunoia product page.' },
  { question: 'Can I download Omnai Browser now?', answer: 'Omnai Browser is launching soon. A public launch date has not been announced on this website; contact us for release updates.' },
  { question: 'Can you guarantee rankings or a particular return on investment?', answer: 'No. Search rankings, revenue, and conversion improvements depend on many factors. We agree project goals, measure against a baseline, and report results supported by evidence.' },
]
