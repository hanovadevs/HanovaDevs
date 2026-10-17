import { clientProjects } from './company.js'

export const caseStudyReviewedAt = '2026-10-17'
const stories = {
  earthsync: {
    headline: 'A product story with a clearer path to discovery.',
    summary: 'Connecting a grounding-product brand, its product information and the next step for a prospective customer.',
    problem: 'EarthSync Essentials needed a place to explain its product offering without making visitors piece the brand together across disconnected destinations. The website needed to accommodate product discovery, educational content and straightforward contact routes.',
    approach: [
      ['Put the offering in context', 'A prominent brand introduction sets the scene, with product discovery and educational content available through the main navigation.'],
      ['Organise the information', 'Separate product, science, research, brand and support destinations give different visitor questions a place to go.'],
      ['Keep the next step visible', 'Collection and shopping entry points sit alongside informational content, rather than leaving an interested visitor without a destination.'],
    ],
    delivered: ['A branded customer-facing website', 'Product and collection discovery entry points', 'Educational and brand-content navigation', 'Contact and warranty destinations'],
    observations: [['Brand & navigation', 'The public homepage displays the EarthSync Essentials identity and distinct product, information and contact navigation.'], ['Discovery entry points', 'An Explore Collection action and a separate shop entry point are visible in the reviewed interface.']],
    outcome: 'A single customer-facing destination connecting the brand, product discovery and supporting information.',
    services: ['web-design'], tags: ['Product discovery', 'Content structure', 'Customer journeys'],
    visualFocus: 'The homepage introduction and its navigation system',
  },
  terrasol: {
    headline: 'Bringing product information and buying destinations together.',
    summary: 'An earth-toned product website connecting brand presentation, educational information and an external purchase destination.',
    problem: 'Terra Sol Grounding needed to bring its product range and supporting information into a coherent experience. The challenge was to give visitors a clear route through exploration and education while making the purchase destination easy to identify.',
    approach: [
      ['Create a consistent presentation', 'An earth-toned visual direction brings the brand introduction and supporting content into a recognisable environment.'],
      ['Separate visitor intentions', 'Product exploration and educational reading are presented as distinct paths, so visitors can choose the information they need.'],
      ['Clarify the purchase destination', 'A visible Buy on Amazon action identifies the external buying destination rather than implying that every purchase takes place inside the website.'],
    ],
    delivered: ['A branded product-information website', 'Product, science and research navigation', 'Brand and journal content destinations', 'A visible external purchase entry point'],
    observations: [['Two discovery paths', 'Explore Products and Learn the Science actions are visible on the homepage.'], ['External buying route', 'The reviewed header includes a Buy on Amazon action. This observation does not verify an order or a checkout conversion.']],
    outcome: 'A connected destination for the brand, its product information and its buying routes.',
    services: ['web-design'], tags: ['Product information', 'Brand presentation', 'Buying routes'],
    visualFocus: 'The homepage message and product-discovery actions',
  },
  crown: {
    headline: 'Making an industrial offering easier to navigate.',
    summary: 'A corporate website connecting battery and manufacturing information with product exploration and business enquiries.',
    problem: 'Crown Accumulators needed to present a technical business to customers with different information needs. The website had to connect the corporate story, product categories and an enquiry path without relying on visitors already knowing the range.',
    approach: [
      ['Lead with the offering', 'The homepage introduces the business and directs attention to its products and industrial context.'],
      ['Give the range a structure', 'Separate product and technical destinations provide an entry into categories such as batteries, battery plates and sprockets.'],
      ['Provide a business enquiry route', 'Prominent quote-request and contact actions give prospective business customers a clear place to continue the conversation.'],
    ],
    delivered: ['A corporate and product-information website', 'Product and technical navigation', 'Company and brand-information destinations', 'Quote-request and contact entry points'],
    observations: [['Product-led structure', 'The reviewed homepage and navigation identify products and technical information, alongside the SOLO brand destination.'], ['Enquiry visibility', 'Explore Products and quote-request actions are visible in the reviewed interface. Form delivery and resulting sales were not measured in this review.']],
    outcome: 'A customer-facing platform bringing the business, its product range and enquiry destinations together.',
    services: ['web-design'], tags: ['Industrial website', 'Product structure', 'Business enquiries'],
    visualFocus: 'The corporate introduction, product action and enquiry route',
  },
  raqs: {
    headline: 'A fashion identity carried into a digital storefront.',
    summary: 'An editorial brand experience connecting collection discovery, brand storytelling and customer information.',
    problem: 'RAQS needed a dedicated online presence that could express the brand while making its collections easier to explore. The website needed to balance an editorial first impression with practical navigation and customer information.',
    approach: [
      ['Let the brand set the tone', 'A visual homepage introduction establishes the fashion direction before the collection journey begins.'],
      ['Connect story and collection', 'Collection, journal and brand destinations give the website more than one way to introduce the brand and its products.'],
      ['Keep customer information available', 'Contact, delivery and policy destinations support the practical questions that sit alongside product exploration.'],
    ],
    delivered: ['A branded fashion storefront experience', 'Collection and product-discovery destinations', 'Journal and brand-story navigation', 'Customer contact and policy destinations'],
    observations: [['Brand & collection', 'The reviewed homepage displays the RAQS identity, a Shop Now action and collection navigation.'], ['Supporting information', 'Brand-story, journal, contact and customer-policy destinations are present in the reviewed website. Purchase completion was not tested.']],
    outcome: 'A branded destination connecting collection discovery with the story and customer information around it.',
    services: ['web-design'], tags: ['Fashion storefront', 'Editorial design', 'Collection discovery'],
    visualFocus: 'The editorial homepage introduction and collection entry point',
  },
}

export const caseStudies = clientProjects.map(project => ({
  ...project, ...stories[project.id], path: `/projects/${project.id}`,
  reviewedAt: caseStudyReviewedAt, image: `/case-studies/${project.id}-desktop.webp`,
  mobileImage: `/case-studies/${project.id}-mobile.webp`, detailImage: `/case-studies/${project.id}-detail.webp`,
  cardImage: `/case-studies/${project.id}-card.webp`,
}))

export const caseStudyById = Object.fromEntries(caseStudies.map(study => [study.id, study]))
