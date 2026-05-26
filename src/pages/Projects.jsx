import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './Projects.css'

const featuredProjects = [
  {
    id: 'earthsync',
    title: 'EarthSync Essential',
    category: 'E-Commerce & Wellness',
    url: 'https://www.earthsyncessential.com',
    thumbnail: '/projects/earthsync.png',
    theme: 'light',
    overview: 'EarthSync is a premium e-commerce brand specializing in earthing sheets and grounding products. They needed a digital presence that balanced scientific credibility with modern wellness aesthetics.',
    challenge: 'The primary challenge was educating consumers on the medical-grade science of grounding while maintaining a calm, high-end, consumer-friendly shopping experience without overwhelming them with data.',
    solution: 'We engineered a minimal, high-fidelity UI utilizing smooth scroll mechanics, fluid typography, and a nature-inspired palette (sage & beige). We integrated a seamless e-commerce flow and an interactive scientific glossary.',
    metrics: [
      { label: 'Conversion Rate', value: '+45%' },
      { label: 'Avg Session', value: '3m 12s' },
      { label: 'Mobile UX', value: 'A+' }
    ]
  },
  {
    id: 'terrasol',
    title: 'Terra Sol Grounding',
    category: 'E-Commerce & Wellness',
    url: 'https://www.terrasolgrounding.com',
    thumbnail: '/projects/terrasol.png',
    theme: 'terrasol',
    overview: 'Terra Sol is a premium grounding products brand offering earthing sheets, mats, and accessories — all linked directly to its Amazon storefront. This was a massive, full-scale e-commerce build combining scientific authority with a serene wellness aesthetic.',
    challenge: 'Building a comprehensive platform that could house a full product catalog, peer-reviewed research library, interactive science explainers, a wellness journal, and seamless Amazon integration — all while maintaining a calm, trustworthy brand experience.',
    solution: 'We engineered a rich, multi-section ecosystem featuring dynamic product pages with real-time Amazon connectivity, an indexed research database with 20+ published studies, Gemini AI-powered content, and a conversion-optimized UX with nature-inspired earth tones and premium typography.',
    metrics: [
      { label: 'Product Pages', value: '6+' },
      { label: 'Research Studies', value: '20+' },
      { label: 'Avg. Rating', value: '4.8★' }
    ]
  },
  {
    id: 'nexus',
    title: 'Nexus Health',
    category: 'Telemedicine SaaS',
    url: 'https://www.nexushealth.io',
    thumbnail: '/projects/nexus.png',
    theme: 'nexus',
    overview: 'Nexus Health is a next-generation telemedicine dashboard connecting thousands of practitioners with remote patients in real-time.',
    challenge: 'Doctors were abandoning existing platforms due to clunky UI and poor patient-data accessibility during live calls.',
    solution: 'We developed a pristine, hyper-fast React dashboard with WebRTC video integration. Soft medical blues and extreme whitespace were utilized to reduce cognitive load for doctors during 12-hour shifts.',
    metrics: [
      { label: 'Platform Uptime', value: '99.9%' },
      { label: 'User Retention', value: '88%' },
      { label: 'Load Time', value: '0.4s' }
    ]
  },
  {
    id: 'crown',
    title: 'Crown Accumulator',
    category: 'Industrial B2B Portfolio',
    url: 'https://www.crownaccumulator.com',
    thumbnail: '/projects/crown.png',
    theme: 'dark',
    overview: 'Crown Accumulator is a leading industrial manufacturer of automotive, tractor, and solar batteries. They required a robust digital overhaul to project market dominance and technological advancement.',
    challenge: 'The industrial battery sector typically suffers from outdated, clunky web presences. Crown needed a highly performant platform that could handle hundreds of technical SKUs while driving B2B inquiries.',
    solution: 'We built a bold, striking corporate architecture using dark mode aesthetics with electric yellow accents. We engineered a lightning-fast product filtering system and integrated streamlined B2B inquiry pipelines.',
    metrics: [
      { label: 'Load Time', value: '< 0.8s' },
      { label: 'B2B Leads', value: '3x' },
      { label: 'SKUs Indexed', value: '450+' }
    ]
  },
  {
    id: 'lumiere',
    title: 'Lumière Paris',
    category: 'Luxury Fashion',
    url: 'https://www.lumiere-paris.fr',
    thumbnail: '/projects/lumiere.png',
    theme: 'lumiere',
    overview: 'Lumière Paris is an avant-garde luxury fashion house. They needed a flagship digital boutique that felt more like a high-end editorial magazine than a standard store.',
    challenge: 'Translating the tactile, premium feel of high fashion into a web browser without sacrificing e-commerce conversion rates.',
    solution: 'We crafted an ultra-premium dark mode experience. We utilized cinematic full-screen video headers, subtle gold typography, and a "lookbook" style checkout flow that redefined luxury digital shopping.',
    metrics: [
      { label: 'AOV Increase', value: '+32%' },
      { label: 'Bounce Rate', value: '-15%' },
      { label: 'Global Traffic', value: '1.2M' }
    ]
  },
  {
    id: 'aero',
    title: 'AeroSpace Dynamics',
    category: 'Logistics Analytics',
    url: 'https://www.aerospacedynamics.io',
    thumbnail: '/projects/aero.png',
    theme: 'aero',
    overview: 'AeroSpace Dynamics manages global freight and satellite logistics. They needed a powerful, data-heavy command center for their fleet operators.',
    challenge: 'Visualizing thousands of real-time data points on a single screen without causing interface lag or operator confusion.',
    solution: 'We engineered a cybernetic, high-performance WebGL dashboard. Featuring deep navy backgrounds with glowing cyan data nodes, the UI allows operators to parse complex global logistics at a single glance.',
    metrics: [
      { label: 'Data Points/Sec', value: '10k+' },
      { label: 'Response Time', value: '12ms' },
      { label: 'Task Efficiency', value: '+60%' }
    ]
  }
]

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="projects-page">
      <SEO 
        title="Client Projects — HanovaDevs" 
        description="Explore our portfolio of recent client work, including EarthSync Essential and Crown Accumulator." 
        url="/projects" 
      />

      {/* ===== HERO ===== */}
      <section className="pj-hero" id="projects-hero">
        <div className="pj-hero__bg" />
        <div className="container">
          <div className="pj-hero__content reveal-up">
            <span className="pj-label">Our Portfolio</span>
            <h1>Engineering <br /><span className="pj-gradient">Digital Reality.</span></h1>
            <p>We don't just build websites; we engineer high-performance digital ecosystems for ambitious brands. Explore our recent case studies.</p>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <div className="pj-showcases">
        {featuredProjects.map((project, index) => (
          <section key={project.id} className={`pj-case pj-case--${project.theme}`}>
            <div className="container">
              <div className={`pj-case__layout ${index % 2 !== 0 ? 'pj-case__layout--reverse' : ''}`}>
                
                <div className="pj-case__text reveal-up">
                  <div className="pj-case__meta">
                    <span className="pj-case__category">{project.category}</span>
                  </div>
                  <h2>{project.title}</h2>
                  <p className="pj-case__overview">{project.overview}</p>
                  
                  <div className="pj-case__details">
                    <div className="pj-case__detail-block">
                      <h4>The Challenge</h4>
                      <p>{project.challenge}</p>
                    </div>
                    <div className="pj-case__detail-block">
                      <h4>Our Solution</h4>
                      <p>{project.solution}</p>
                    </div>
                  </div>

                  <div className="pj-case__metrics">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="pj-case__metric">
                        <strong>{metric.value}</strong>
                        <span>{metric.label}</span>
                      </div>
                    ))}
                  </div>

                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn pj-btn">
                    Visit Live Site <span>↗</span>
                  </a>
                </div>

                <div className="pj-case__visual reveal-up reveal-delay-1">
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="pj-frame-link">
                    <div className="pj-frame">
                      <div className="pj-frame__header">
                        <div className="pj-frame__dots"><span/><span/><span/></div>
                        <div className="pj-frame__url">{project.url.replace('https://www.', '')}</div>
                      </div>
                      <img src={project.thumbnail} alt={`${project.title} Interface`} className="pj-frame__img" />
                    </div>
                  </a>
                </div>

              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ===== CTA ===== */}
      <section className="pj-cta section">
        <div className="container text-center">
          <h2 className="reveal-up">Ready for a digital transformation?</h2>
          <p className="reveal-up reveal-delay-1">Let's build a platform that scales your business and dominates your industry.</p>
          <div className="reveal-up reveal-delay-2 mt-xl">
            <Link to="/contact" className="btn btn-primary">Start Your Project</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
