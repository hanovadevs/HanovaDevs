import { Link, useParams } from 'react-router-dom'
import SEO from '../components/SEO'
import { leadershipProfiles, leadershipFaqs } from '../data/leadershipProfiles'
import NotFound from './NotFound'
import './CompanyPages.css'
import './TeamProfile.css'

export default function TeamProfile({ memberId }) {
  const { id } = useParams()
  const member = leadershipProfiles.find(person => person.id === (memberId || id))
  if (!member) return <NotFound />
  const faqs = leadershipFaqs(member)
  return (
    <div className={`leader-profile leader-profile--${member.tone}`}>
      <SEO title={`${member.name} — ${member.role}`} description={member.description} url={member.profile}
        pageType="ProfilePage" mainEntity={{ '@id': member.entityId }} image={member.image} imageAlt={member.alt} faqList={faqs}
        breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'About', item: '/about' }, { name: member.name, item: member.profile }]} />
      <section className="leader-profile__hero" aria-labelledby="profile-name" id="overview">
        <div className="container leader-profile__layout">
          <div className="leader-profile__intro">
            <nav className="leader-profile__breadcrumb" aria-label="Breadcrumb"><Link to="/about">About HanovaDevs</Link><span aria-hidden="true">/</span><span>Leadership</span></nav>
            <p className="leader-profile__eyebrow">{member.jobTitle}</p>
            <h1 id="profile-name">{member.name}</h1>
            <p className="leader-profile__lead">{member.description}</p>
            <p>{member.intro}</p>
            <Link to="/contact" className="btn btn-primary">Discuss an idea with our team</Link>
            {member.externalProfile && <a className="leader-profile__external" href={member.externalProfile} target="_blank" rel="noopener noreferrer">Visit {member.name.split(' ')[0]}’s personal website</a>}
          </div>
          <figure className="leader-profile__portrait">
            <img src={member.image} srcSet={`${member.smallImage} 480w, ${member.image} 800w`} sizes="(max-width: 760px) 90vw, 400px" width="800" height="800" alt={member.alt} fetchPriority="high" />
            <figcaption>{member.name} · {member.role}, HanovaDevs</figcaption>
          </figure>
        </div>
      </section>
      <nav className="leader-profile__sections container" aria-label="Profile sections"><a href="#overview">Overview</a><a href="#profile-focus">Areas of focus</a><a href="#profile-faqs">FAQs</a><a href="#profile-team">Meet the team</a></nav>
      <section className="section leader-profile__contribution" aria-labelledby="profile-focus"><div className="container">
        <p className="leader-profile__eyebrow">Individual strengths</p><h2 id="profile-focus">{member.headline}</h2>
        <div className="leader-profile__focus">{member.contributions.map(([title, description], index) => <article key={title}><span className="leader-profile__number" aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        <aside className="leader-profile__approach"><p className="leader-profile__eyebrow">From ideas to everyday work</p><p>{member.approach}</p></aside>
      </div></section>
      <section className="section leader-profile__answers" aria-labelledby="profile-faqs"><div className="container company-faq">
        <p className="leader-profile__eyebrow">Straight answers</p><h2 id="profile-faqs">About {member.name.split(' ')[0]}’s role</h2>
        {faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        <Link to="/about#leadership" className="leader-profile__back">Meet the full leadership team.</Link>
      </div></section>
      <section className="section leader-profile__related" aria-labelledby="profile-team"><div className="container">
        <p className="leader-profile__eyebrow">A shared direction</p><h2 id="profile-team">Meet the other people behind HanovaDevs.</h2>
        <div className="leader-profile__team-grid">{leadershipProfiles.filter(person => person.id !== member.id).map(person => <Link key={person.id} to={person.profile} className="leader-profile__team-link"><img src={person.smallImage} width="96" height="96" alt={person.alt} loading="lazy" /><span><strong>{person.name}</strong><span>{person.role}</span></span></Link>)}</div>
      </div></section>
    </div>
  )
}
