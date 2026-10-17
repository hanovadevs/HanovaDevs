import { useId, useRef, useState } from 'react'

export default function ServiceScenarios({ scenarios }) {
  const [active, setActive] = useState(0)
  const id = useId()
  const tabs = useRef([])
  function keyboard(event, index) {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % scenarios.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + scenarios.length) % scenarios.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = scenarios.length - 1
    else return
    event.preventDefault(); setActive(next); tabs.current[next]?.focus()
  }
  return <div className="service-scenarios"><div role="tablist" aria-label="Choose your project starting point" className="service-scenario-tabs">{scenarios.map((scenario, index) => <button key={scenario.label} ref={node => { tabs.current[index] = node }} id={`${id}-tab-${index}`} role="tab" aria-selected={active === index} aria-controls={`${id}-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => keyboard(event, index)}>{scenario.label}<span aria-hidden="true">↗</span></button>)}</div>{scenarios.map((scenario, index) => <div role="tabpanel" key={scenario.label} id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} hidden={active !== index} tabIndex={0} className="service-scenario-panel"><span className="work-eyebrow">A possible starting point · 0{index + 1}</span><h3>{scenario.title}</h3><p>{scenario.text}</p><ul>{scenario.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div>
}
