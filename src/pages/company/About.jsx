import { Link } from 'react-router-dom'
import SEO from '../../components/shared/SEO'
import LeadershipTeam from '../../components/company/LeadershipTeam'
import ProgramSpotlight from '../../components/company/ProgramSpotlight'
import BuildingFeature from '../../components/company/BuildingFeature'
import { company, companyFaqs } from '../../data/company'
import './About.css'
import '../../styles/CompanyPages.css'

export default function About() {
  return (
    <div className="about-page">
      <SEO title="About HanovaDevs — Founders & Leadership" description="Meet Ali Haider, Founder and CEO; Hira Maqsood, Co-founder and COO; and Noor Fatima, Co-founder, CMO and Business Analyst at HanovaDevs." url="/about" modifiedAt="2026-11-27" pageType="AboutPage" image={company.founder.image} faqList={companyFaqs} breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'About', item: '/about' }]} />
      <section className="about-hero about-hero--factual"><div className="container">
        <span className="section-label">Independent thinking. Practical engineering.</span>
        <h1>Built on purpose.<br /><span className="gradient-text">Growing through craft.</span></h1>
        <p>HanovaDevs is a software company founded in 2022 by <Link to="/team/ali-haider">Ali Haider, Founder and CEO</Link>. Its co-founders are <Link to={company.coFounder.path}>Hira Maqsood, COO</Link>, and <Link to="/team/noor-fatima">Noor Fatima, CMO and Business Analyst</Link>. Our leadership connects creative ideas, strategic planning and practical engineering to turn business needs into thoughtful digital products.</p>
        <div className="about-facts"><div><strong>2022</strong><span>Founded</span></div><div><strong>Ali Haider</strong><span>Founder & CEO</span></div><div><strong>Software + AI</strong><span>Our focus</span></div></div>
      </div></section>
      <LeadershipTeam />
      <ProgramSpotlight />
      <section className="section bg-off-white"><div className="container"><div className="section-header"><span className="section-label">How we work</span><h2>Clear thinking, from brief to delivery.</h2></div><div className="about-values__grid">
        {[['Understand the business', 'Start with the people, workflows, and constraints that a project needs to serve. Technology follows the purpose.'], ['Build with care', 'Connect interface design, engineering, accessibility, and testing through a scope that everyone can understand.'], ['Measure what matters', 'Agree useful measures before launch, establish a baseline, and distinguish delivered work from results that still need observation.']].map(([title, text]) => <article className="about-values__card card" key={title}><h3>{title}</h3><p>{text}</p></article>)}
      </div></div></section>
      <BuildingFeature about />
      <section className="section"><div className="container about-product-status"><div><span className="section-label">Our own products</span><h2>Ideas that have a life beyond a client brief.</h2></div><article><span className="release-label">Available now</span><h3>Eunoia</h3><p>A desktop companion for planning, notes, journaling, and focused work.</p><a href={company.products.eunoia.storeUrl} target="_blank" rel="noopener noreferrer">Find Eunoia on Microsoft Store ↗</a></article><article><span className="release-label">Launching soon</span><h3>Omnai Browser</h3><p>An AI-focused desktop browser in preparation for public release.</p><Link to="/products/omnai">Explore the Omnai preview →</Link></article></div></section>
      <section className="section bg-off-white"><div className="container company-faq"><span className="section-label">Straight answers</span><h2>Get to know HanovaDevs.</h2>{companyFaqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
      <section className="section"><div className="container text-center"><h2>Tell us what you want to build.</h2><p>We’ll discuss the scope, priorities, and a sensible next step.</p><Link to="/contact" className="btn btn-primary mt-lg">Start a conversation</Link></div></section>
    </div>
  )
}
