import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './CompanyPages.css'
const tools = [
  { category: 'Web interfaces', name: 'React, Next.js and Vite', description: 'Interface and rendering tools selected according to the page, content and application requirements.' },
  { category: 'Applications', name: 'Node.js and Python', description: 'Application logic, APIs and integrations for agreed business workflows.' },
  { category: 'Data', name: 'PostgreSQL and Supabase', description: 'Relational data and application services with project-specific access and security controls.' },
  { category: 'Ecommerce', name: 'Shopify and Liquid', description: 'Storefront development and integrations within the capabilities of the selected Shopify plan.' },
  { category: 'AI workflows', name: 'Model APIs and automation tools', description: 'Scoped integrations over approved information, with evaluation and human-review boundaries.' },
  { category: 'Quality and delivery', name: 'Testing, accessibility and deployment', description: 'Tools such as Playwright and Lighthouse support testing; a tool alone is not proof of conformance or a guaranteed score.' },
]
export default function TechStack() {
  const [query, setQuery] = useState('')
  const visible = tools.filter(tool => `${tool.category} ${tool.name} ${tool.description}`.toLowerCase().includes(query.toLowerCase()))
  return <div className="company-page">
    <SEO title="Technology & Engineering Approach" description="How HanovaDevs selects tools for web interfaces, custom software, ecommerce, data and AI workflows. Technology follows the requirements." url="/stack" />
    <header className="company-intro container"><span className="section-label">Technology</span><h1>The right tools.<br />For the right problem.</h1><p>We select technology around the users, workflow, security needs and maintenance plan. This is an overview of our approach, not an audited certification or proficiency ranking.</p></header>
    <section className="container company-section"><label className="stack-search">Find a technology area<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search web, data, ecommerce…" /></label><p role="status">{visible.length} areas shown</p><div className="company-products">{visible.map(tool => <article key={tool.name}><span className="section-label">{tool.category}</span><h2>{tool.name}</h2><p>{tool.description}</p></article>)}</div>{visible.length === 0 && <button className="btn btn-outline" onClick={() => setQuery('')}>Clear search</button>}</section>
    <section className="container company-section"><h2>Start with your requirements.</h2><p>A project proposal defines the actual stack, deliverables, tests and operating responsibilities.</p><Link className="btn btn-primary" to="/contact">Discuss your project</Link></section>
  </div>
}
