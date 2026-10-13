import { company } from '../data/company'
import { leadershipTeam } from '../data/leadership'

export function canonicalUrl(path = '/') {
  const pathname = new URL(path || '/', company.url).pathname.replace(/\/+$/, '') || '/'
  return `${company.url}${pathname}`
}

export function organizationGraph() {
  return [
    {
      '@type': 'Organization', '@id': `${company.url}/#organization`,
      name: company.name, alternateName: company.alternateName, url: `${company.url}/`,
      description: company.description, foundingDate: company.founded,
      logo: `${company.url}/agency-logo-720.webp`, email: company.email,
      founder: [{ '@id': `${company.founder.url}/#person` }, { '@id': `${company.coFounder.url}#person` }], sameAs: Object.values(company.socials),
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer enquiries', email: company.email, availableLanguage: 'English' },
      knowsAbout: ['Custom software', 'Web development', 'Ecommerce', 'AI automation', 'Technical SEO', 'Brand identity'],
    },
    ...leadershipTeam.map(member => ({ '@type': 'Person', '@id': member.entityId, name: member.name, url: `${company.url}${member.profile}`, ...(member.illustration ? {} : { image: `${company.url}${member.image}` }), jobTitle: member.jobTitle, description: member.description, knowsAbout: member.knowsAbout, worksFor: { '@id': `${company.url}/#organization` }, mainEntityOfPage: { '@id': `${company.url}${member.profile}#webpage` }, ...(member.externalProfile ? { sameAs: [member.externalProfile] } : {}) })),
    { '@type': 'WebSite', '@id': `${company.url}/#website`, url: `${company.url}/`, name: company.name, alternateName: company.alternateName, inLanguage: 'en', publisher: { '@id': `${company.url}/#organization` } },
  ]
}

export function pageGraph({ url, title, description, pageType = 'WebPage', breadcrumbs, faqList, schemaMarkup, mainEntity }) {
  const graph = [...organizationGraph(), { '@type': pageType, '@id': `${url}#webpage`, url, name: title, description, inLanguage: 'en', isPartOf: { '@id': `${company.url}/#website` }, about: mainEntity || { '@id': `${company.url}/#organization` }, ...(mainEntity ? { mainEntity } : {}) }]
  if (breadcrumbs?.length) graph.push({ '@type': 'BreadcrumbList', '@id': `${url}#breadcrumbs`, itemListElement: breadcrumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, name: crumb.name, item: canonicalUrl(crumb.item) })) })
  if (faqList?.length) graph.push({ '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: faqList.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) })
  if (schemaMarkup) graph.push(...(Array.isArray(schemaMarkup) ? schemaMarkup : [schemaMarkup]))
  return { '@context': 'https://schema.org', '@graph': graph }
}
