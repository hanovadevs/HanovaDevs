import { company } from '../data/company'
import { leadershipTeam } from '../data/leadership'
import './LeadershipTeam.css'

export default function LeadershipTeam() {
  return (
    <section className="leadership section" aria-labelledby="leadership-heading" id="leadership">
      <div className="container">
        <header className="leadership__heading">
          <span className="leadership__eyebrow">The people behind HanovaDevs</span>
          <h2 id="leadership-heading">Individual strengths.<br /><em>One shared direction.</em></h2>
          <p>Meet our leadership team, connecting company direction, operations, marketing and technology.</p>
        </header>
        <div className="leadership__grid">
          {leadershipTeam.map(member => (
            <article key={member.id} className={`leader-card leader-card--${member.tone}`} aria-labelledby={`leader-${member.id}`}>
              <div className="leader-card__portrait">
                <img src={member.image} srcSet={`${member.smallImage} 480w, ${member.image} 800w`}
                  sizes="(max-width: 560px) calc(100vw - 80px), (max-width: 1100px) 40vw, 260px"
                  width="800" height="800" alt={member.alt} loading="lazy" decoding="async" />
              </div>
              <div className="leader-card__info">
                <p className="leader-card__role">{member.role}</p>
                <h3 id={`leader-${member.id}`}>{member.name}</h3>
                <p className="leader-card__focus">{member.focus}</p>
                {member.profile && <a className="leader-card__profile" href={member.profile}>Meet {member.name}</a>}
              </div>
            </article>
          ))}
        </div>
        <div className="leadership__story">
          <p>Founded in 2022 by Ali Haider, HanovaDevs brings design, engineering and business context together. Co-founder and COO Hira Maqsood connects original ideas and strategic planning with operations and delivery.</p>
          <a href={company.founder.url} target="_blank" rel="noopener noreferrer">Explore Ali’s profile</a>
        </div>
      </div>
    </section>
  )
}
