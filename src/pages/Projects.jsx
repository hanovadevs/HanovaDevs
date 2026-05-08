import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Projects.css'

const categories = ['All', 'Web', 'Marketing', 'Branding', 'SEO']

const projects = [
  {
    id: 1,
    title: 'TechVault Dashboard',
    category: 'Web',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=500&fit=crop',
    metric: '+230% traffic in 3 months',
    overview: 'TechVault needed a complete dashboard redesign to improve user engagement and data visualization.',
    challenge: 'The existing dashboard was cluttered, slow, and had a 62% bounce rate.',
    solution: 'We redesigned the entire UI with a modular component system, implemented real-time data charts, and optimized load times by 70%.',
    results: '230% increase in traffic, 45% reduction in bounce rate, and 3x improvement in user session duration.',
    tall: true,
  },
  {
    id: 2,
    title: 'GreenGrow Social Campaign',
    category: 'Marketing',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
    metric: '4.2x ROI in 6 months',
    overview: 'GreenGrow wanted to establish their brand presence on social media and drive organic growth.',
    challenge: 'Zero social media presence and minimal brand awareness in a saturated market.',
    solution: 'Created a comprehensive content strategy across Instagram, LinkedIn, and TikTok with weekly content calendars and influencer partnerships.',
    results: '4.2x ROI, 15K new followers, and 340% increase in website referrals from social channels.',
  },
  {
    id: 3,
    title: 'FinEdge Rebrand',
    category: 'Branding',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop',
    metric: '98% stakeholder approval',
    overview: 'FinEdge required a complete brand overhaul to position themselves as a modern fintech leader.',
    challenge: 'Outdated brand identity that didn\'t reflect their innovative technology solutions.',
    solution: 'Developed new brand guidelines, logo system, color palette, and marketing collateral that communicated trust and innovation.',
    results: '98% stakeholder approval, successful rebrand launch, and 40% increase in qualified leads.',
  },
  {
    id: 4,
    title: 'MediCore Health App',
    category: 'Web',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=500&fit=crop',
    metric: '15K active users',
    overview: 'MediCore needed a patient-facing app to streamline appointment booking and health tracking.',
    challenge: 'Complex healthcare workflows and strict compliance requirements.',
    solution: 'Built a HIPAA-compliant React Native app with telemedicine integration, appointment scheduling, and health metric tracking.',
    results: '15K active users within 4 months, 89% patient satisfaction score.',
    tall: true,
  },
  {
    id: 5,
    title: 'NovaTech SEO Overhaul',
    category: 'SEO',
    thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop',
    metric: 'Page 1 for 28 keywords',
    overview: 'NovaTech was invisible on search engines and losing market share to competitors.',
    challenge: 'Poor site structure, thin content, and no technical SEO foundation.',
    solution: 'Conducted comprehensive SEO audit, restructured site architecture, created 40+ optimized content pieces, and built quality backlinks.',
    results: 'Page 1 rankings for 28 target keywords, 180% organic traffic increase.',
  },
  {
    id: 6,
    title: 'Pulse Fitness Brand Launch',
    category: 'Branding',
    thumbnail: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop',
    metric: '2K pre-launch signups',
    overview: 'Pulse Fitness was launching a new gym chain and needed a brand identity from scratch.',
    challenge: 'Entering a highly competitive fitness market with no brand recognition.',
    solution: 'Created an energetic brand identity with bold colors, dynamic typography, and a comprehensive launch marketing campaign.',
    results: '2K pre-launch signups, successful grand opening with 150% capacity, and strong brand recall.',
  },
]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <div className="projects-page">
      {/* Hero */}
      <section className="projects-hero" id="projects-hero">
        <div className="container">
          <div className="projects-hero__content reveal">
            <span className="section-label">Our Work</span>
            <h1>Projects that <span className="gradient-text">speak results.</span></h1>
            <p>Real work. Real metrics. Real impact for ambitious brands.</p>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="projects-grid-section section" id="projects-grid">
        <div className="container">
          <div className="projects-filters reveal">
            {categories.map(cat => (
              <button
                key={cat}
                className={`projects-filter-btn ${activeFilter === cat ? 'projects-filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="projects-masonry">
            {filtered.map((project) => (
              <div
                key={project.id}
                className={`projects-card hoverable ${project.tall ? 'projects-card--tall' : ''}`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="projects-card__img">
                  <img src={project.thumbnail} alt={project.title} loading="lazy" />
                </div>
                <div className="projects-card__overlay">
                  <span className="projects-card__tag">{project.category}</span>
                  <h3>{project.title}</h3>
                  <span className="projects-card__metric">{project.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="projects-cta section bg-off-white" id="projects-cta">
        <div className="container text-center">
          <h2 className="reveal">Start Your Project</h2>
          <p className="reveal reveal-delay-1" style={{ maxWidth: 480, margin: '0 auto var(--space-lg)' }}>
            Ready to join this list? Let's create something remarkable together.
          </p>
          <Link to="/contact" className="btn btn-primary reveal reveal-delay-2">
            Let's Talk
          </Link>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div className="project-modal" onClick={() => setSelectedProject(null)}>
          <div className="project-modal__inner" onClick={e => e.stopPropagation()}>
            <button className="project-modal__close" onClick={() => setSelectedProject(null)} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            <div className="project-modal__hero">
              <img src={selectedProject.thumbnail} alt={selectedProject.title} />
              <div className="project-modal__hero-overlay">
                <span className="projects-card__tag">{selectedProject.category}</span>
                <h2>{selectedProject.title}</h2>
                <span className="project-modal__metric">{selectedProject.metric}</span>
              </div>
            </div>

            <div className="project-modal__body">
              <div className="project-modal__section">
                <h4>Overview</h4>
                <p>{selectedProject.overview}</p>
              </div>
              <div className="project-modal__section">
                <h4>The Challenge</h4>
                <p>{selectedProject.challenge}</p>
              </div>
              <div className="project-modal__section">
                <h4>Our Solution</h4>
                <p>{selectedProject.solution}</p>
              </div>
              <div className="project-modal__section">
                <h4>Results</h4>
                <p>{selectedProject.results}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
