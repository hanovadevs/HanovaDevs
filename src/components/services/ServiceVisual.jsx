import { Link } from 'react-router-dom'

export default function ServiceVisual({ service }) {
  const experience = service.experience
  const photo = experience.imageKind === 'photo'
  const visual = <img src={experience.image} srcSet={photo ? `${experience.image.replace('-1280.', '-640.')} 640w, ${experience.image} 1280w` : undefined} sizes={photo ? '(max-width: 760px) 92vw, 48vw' : undefined} alt={experience.imageAlt} width={photo ? 1280 : experience.imageWidth} height={photo ? 853 : experience.imageHeight} fetchPriority="high" decoding="async" />
  return <figure className={`service-visual service-visual--${service.id} service-visual--${experience.imageKind}`}>
    <div className="service-visual__halo" aria-hidden="true" />
    <div className="service-visual__frame">
      {!photo && <div className="service-visual__bar"><span aria-hidden="true">● ● ●</span><span>Selected work / HanovaDevs</span></div>}
      {experience.imagePath ? <Link to={experience.imagePath} aria-label={`View the project: ${experience.imageLabel.split(' / ').at(-1)}`}>{visual}</Link> : visual}
    </div>
    <figcaption><span>{experience.imageLabel}</span>{experience.imagePath && <Link to={experience.imagePath}>View case study ↗</Link>}</figcaption>
  </figure>
}
