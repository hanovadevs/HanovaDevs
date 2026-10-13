import { Link } from 'react-router-dom'
import './BuildingFeature.css'

export default function BuildingFeature({ about = false }) {
  return (
    <section className={`building-feature${about ? ' building-feature--about' : ''}`} id="company-space" aria-labelledby="company-space-heading">
      <div className="container">
        <div className="building-feature__heading">
          <div>
            <span className="building-feature__eyebrow">A shared ambition</span>
            <h2 id="company-space-heading">Room for ideas.<br /><em>Space to build.</em></h2>
          </div>
          <p>Our USA premises are part of the HanovaDevs story. What gives that story purpose is our people: bringing clear thinking, thoughtful design and practical engineering together to create useful software.</p>
        </div>
        <figure className="building-feature__visual">
          <div className="building-feature__frame">
            <img
              src="/company/building-1280.webp"
              srcSet="/company/building-640.webp 640w, /company/building-1280.webp 1280w, /company/building-1536.webp 1536w"
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1440px) 90vw, 1280px"
              width="1536"
              height="1024"
              alt="HanovaDevs USA premises, with navy and teal signage above the entrance"
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="building-feature__caption">
            <div><span className="building-feature__caption-label">HanovaDevs</span><span>USA premises</span></div>
            <span className="building-feature__caption-note">Built around people. Focused on possibility.</span>
          </figcaption>
        </figure>
        <div className="building-feature__footer">
          <p>Good ideas deserve a thoughtful team.</p>
          {about
            ? <a href="#leadership" className="building-feature__link">Meet the people behind the work</a>
            : <Link to="/about" className="building-feature__link">Get to know HanovaDevs</Link>}
        </div>
      </div>
    </section>
  )
}
