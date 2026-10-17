import { Link } from 'react-router-dom'

export default function ProjectCard({ study, compact = false }) {
  return <article className={`work-card ${compact ? 'work-card--compact' : ''}`} id={compact ? undefined : study.id}>
    <Link to={study.path} className="work-card__image-link" aria-label={`Read the ${study.title} case study`}><div className="work-card__image"><img src={study.cardImage} width="800" height="556" alt={`${study.title} homepage screenshot`} loading="lazy" /><span>View case study ↗</span></div></Link>
    <div className="work-card__body"><p className="work-eyebrow">{study.category}</p><h3><Link to={study.path}>{study.title}</Link></h3><p>{study.summary}</p>{!compact && <div className="work-card__facts"><div><span>The challenge</span><p>{study.challenge}</p></div><div><span>The delivered outcome</span><p>{study.outcome}</p></div></div>}<div className="work-card__tags">{study.tags.map(tag => <span key={tag}>{tag}</span>)}</div><Link to={study.path} className="work-text-link">Read the case study <span aria-hidden="true">↗</span></Link></div>
  </article>
}
