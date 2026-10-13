import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { company, companyFaqs } from '../data/company'
import './CompanyPages.css'
import './HiraProfile.css'

const profile = company.coFounder
const faqs = [
  companyFaqs.find(faq => faq.question === 'Who is Hira Maqsood at HanovaDevs?'),
  { question: 'What does Hira Maqsood focus on?', answer: 'Hira focuses on original ideas, creative problem-solving, strategic planning, business operations and project delivery. She helps connect the team’s ideas with clear priorities and practical plans.' },
]

export default function HiraProfile() {
  return (
    <div className="leader-profile">
      <SEO title="Hira Maqsood — Co-founder & COO" description={profile.description} url={profile.path}
        pageType="ProfilePage" mainEntity={{ '@id': `${profile.url}#person` }} image={profile.image} faqList={faqs}
        breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'About', item: '/about' }, { name: profile.name, item: profile.path }]} />
      <section className="leader-profile__hero" aria-labelledby="profile-name">
        <div className="container leader-profile__layout">
          <div className="leader-profile__intro">
            <nav className="leader-profile__breadcrumb" aria-label="Breadcrumb"><Link to="/about">About HanovaDevs</Link><span aria-hidden="true">/</span><span>Leadership</span></nav>
            <p className="leader-profile__eyebrow">{profile.jobTitle}</p>
            <h1 id="profile-name">{profile.name}</h1>
            <p className="leader-profile__lead">{profile.description}</p>
            <p>Original thinking is most valuable when it becomes a clear plan. Hira brings a creative perspective to business challenges and helps turn ideas into priorities the team can work with.</p>
            <Link to="/contact" className="btn btn-primary">Discuss an idea with our team</Link>
          </div>
          <figure className="leader-profile__portrait"><img src={profile.image} srcSet="/people/hira-maqsood-480.webp 480w, /people/hira-maqsood.webp 800w" sizes="(max-width: 760px) 90vw, 400px" width="800" height="800" alt="Hira Maqsood, co-founder and COO of HanovaDevs" fetchPriority="high" /><figcaption>Hira Maqsood · Co-founder & COO, HanovaDevs</figcaption></figure>
        </div>
      </section>
      <section className="section" aria-labelledby="profile-focus"><div className="container">
        <p className="leader-profile__eyebrow">Her contribution</p><h2 id="profile-focus">Creative ideas. Thoughtful plans.</h2>
        <div className="leader-profile__focus">
          <article><h3>Original ideas</h3><p>Exploring fresh approaches to a business need, connecting possibilities and shaping a useful direction for discussion.</p></article>
          <article><h3>Strategic planning</h3><p>Helping turn that direction into clear priorities, a defined scope and practical next steps.</p></article>
          <article><h3>Operations & delivery</h3><p>Coordinating the people and decisions that keep ideas connected to day-to-day work.</p></article>
        </div>
      </div></section>
      <section className="section leader-profile__answers"><div className="container company-faq">
        <h2>About Hira’s role</h2>{faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        <p>HanovaDevs was founded in 2022 by <a href={company.founder.url}>Ali Haider</a>, Founder & CEO. <Link to="/about#leadership">Meet the full leadership team.</Link></p>
      </div></section>
    </div>
  )
}
