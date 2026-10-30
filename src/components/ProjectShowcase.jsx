import { useId, useRef, useState } from 'react'

export default function ProjectShowcase({ views }) {
  const [selected, setSelected] = useState(0)
  const tabs = useRef([])
  const id = useId()
  const selectWithKeyboard = (event, index) => {
    let next
    if (event.key === 'ArrowRight') next = (index + 1) % views.length
    if (event.key === 'ArrowLeft') next = (index - 1 + views.length) % views.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = views.length - 1
    if (next === undefined) return
    event.preventDefault()
    setSelected(next)
    tabs.current[next]?.focus()
  }

  return <section className="work-section case-showcase" id="case-screens">
    <div className="container">
      <div className="work-section-heading"><div><p className="work-eyebrow">Inside Zozo / The research journey</p><h2>Built for decisions.<br /><em>Not for checkouts.</em></h2></div><p>Explore five connected views, from the first shortlist to the finer details. These are screenshots of the delivered website, not embedded product listings.</p></div>
      <div className="case-showcase__tabs" role="tablist" aria-label="Zozo website screenshots">
        {views.map((view, index) => <button key={view.id} ref={node => { tabs.current[index] = node }} id={`${id}-tab-${view.id}`} role="tab" aria-selected={selected === index} aria-controls={`${id}-panel-${view.id}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => selectWithKeyboard(event, index)}>{view.label}</button>)}
      </div>
      {views.map((view, index) => <div key={view.id} className="case-showcase__panel" id={`${id}-panel-${view.id}`} role="tabpanel" aria-labelledby={`${id}-tab-${view.id}`} hidden={selected !== index} tabIndex={0}>
        <div className="case-showcase__context"><div><span className="work-eyebrow">0{index + 1} / Interface story</span><h3>{view.title}</h3></div><p>{view.text}</p></div>
        <a className="case-showcase__image" href={view.image} target="_blank" rel="noopener noreferrer" aria-label={`Open full ${view.label.toLowerCase()} screenshot`}><img src={view.image} alt={view.alt} width={view.id === 'compare' ? 1194 : 1600} height={view.id === 'compare' ? 938 : view.id === 'detail' ? 843 : 797} loading="lazy" /></a>
        <div className="case-showcase__footer"><p>Company-supplied screen · Prices and specifications are capture-time content.</p><a href={view.image} target="_blank" rel="noopener noreferrer" className="work-text-link">View full screenshot ↗</a></div>
      </div>)}
    </div>
  </section>
}
