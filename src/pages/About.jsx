import './About.css'

const values = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="var(--royal-blue)" strokeWidth="2">
        <path d="M24 4 L30 18 L46 20 L34 32 L37 46 L24 39 L11 46 L14 32 L2 20 L18 18 Z" />
      </svg>
    ),
    title: 'Innovation',
    desc: 'We embrace emerging technologies and creative approaches to solve complex problems.'
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="var(--royal-blue)" strokeWidth="2">
        <path d="M24 44 C24 44 4 32 4 18 A10 10 0 0 1 24 12 A10 10 0 0 1 44 18 C44 32 24 44 24 44Z" />
      </svg>
    ),
    title: 'Integrity',
    desc: 'We believe in transparent communication, honest pricing, and delivering on our promises.'
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="var(--royal-blue)" strokeWidth="2">
        <circle cx="24" cy="24" r="20" />
        <path d="M24 4 Q36 20 24 44 Q12 20 24 4" />
        <path d="M4 24 h40" />
      </svg>
    ),
    title: 'Impact',
    desc: 'Everything we build is designed to create measurable, lasting impact for our clients.'
  }
]

const team = [
  { name: 'Alex Mwangi', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face' },
  { name: 'Sarah Chen', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face' },
  { name: 'David Okafor', role: 'Lead Developer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face' },
  { name: 'Maria Santos', role: 'Marketing Director', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face' },
]

const milestones = [
  { year: '2022', title: 'Founded', desc: 'HanovaDevs launches as a two-person agency.' },
  { year: '2023', title: 'First Major Client', desc: 'Secured our first enterprise partnership.' },
  { year: '2023', title: 'Team of 5', desc: 'Expanded the team with top-tier talent.' },
  { year: '2024', title: 'Omnai Browser', desc: 'Began development of our first product.' },
  { year: '2025', title: 'Eunoia Launch', desc: 'Preparing to release our AI desktop assistant.' },
]

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero" id="about-hero">
        <div className="about-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
            alt="HanovaDevs team workspace"
            loading="lazy"
          />
          <div className="about-hero__overlay" />
        </div>
        <div className="about-hero__content container">
          <img
            src="/octopus.png"
            alt="HanovaDevs"
            className="about-hero__octopus reveal"
          />
          <h1 className="reveal reveal-delay-1">We are <span className="gradient-text">HanovaDevs.</span></h1>
          <span className="about-hero__subtitle reveal reveal-delay-2">Digital Marketing Agency</span>
        </div>
      </section>

      {/* Story */}
      <section className="about-story" id="about-story">
        <div className="container">
          <div className="about-story__inner">
            <div className="about-story__quote reveal">
              <blockquote>
                "Engineering the future, one pixel at a time."
              </blockquote>
            </div>
            <div className="about-story__text reveal reveal-delay-2">
              <p>
                HanovaDevs was founded with a simple mission: to bridge the gap between businesses and the digital world. We saw too many companies struggling with outdated websites, ineffective marketing, and clunky software — and we knew we could do better.
              </p>
              <p>
                Today, we're a full-service digital agency and software studio, helping businesses of all sizes transform their online presence. From startups needing their first website to enterprises requiring custom software solutions, we deliver work that drives real results.
              </p>
              <p>
                But we don't stop at client work. We're also building our own products — tools we wish existed, designed to push the boundaries of what's possible in tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values bg-off-white" id="about-values">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Our Values</span>
            <h2>What drives us</h2>
          </div>
          <div className="about-values__grid">
            {values.map((val, i) => (
              <div key={i} className={`about-values__card card card-glass reveal reveal-delay-${i + 1}`}>
                <div className="about-values__icon">{val.icon}</div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team" id="about-team">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Our Team</span>
            <h2>The people behind the pixels</h2>
            <p>A team of designers, developers, and strategists united by a passion for great work.</p>
          </div>
          <div className="about-team__grid">
            {team.map((member, i) => (
              <div key={i} className={`about-team__card reveal reveal-delay-${i + 1}`}>
                <div className="about-team__photo">
                  <img src={member.image} alt={member.name} loading="lazy" />
                </div>
                <h4>{member.name}</h4>
                <span className="about-team__role">{member.role}</span>
                <div className="about-team__socials">
                  <a href="#" aria-label="LinkedIn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a href="#" aria-label="Twitter">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline bg-off-white" id="about-timeline">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Our Journey</span>
            <h2>Milestones</h2>
          </div>
          <div className="about-timeline__scroll">
            <div className="about-timeline__track">
              <div className="about-timeline__line" />
              {milestones.map((m, i) => (
                <div key={i} className={`about-timeline__item reveal reveal-delay-${(i % 4) + 1}`}>
                  <div className="about-timeline__dot" />
                  <span className="about-timeline__year">{m.year}</span>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
