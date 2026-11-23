import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/shared/SEO'
import { mojymGuide } from '../../data/mojymGuide'
import './Mojym.css'

const sections = mojymGuide.split(/^## /m).filter(Boolean).map((text, index) => {
  const [title, ...lines] = text.split('\n')
  return { title: title.trim(), body: lines.join('\n').trim(), id: `guide-${index + 1}` }
})
function Inline({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => part.startsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : <Fragment key={index}>{part}</Fragment>)
}
function Blocks({ text }) {
  return text.split(/\n\s*\n/).map((block, index) => {
    const lines = block.split('\n')
    if (block.startsWith('### ')) return <h3 key={index}>{block.slice(4)}</h3>
    if (/^\d+\. /.test(block)) return <ol key={index}>{lines.map((line, i) => <li key={i}><Inline text={line.replace(/^\d+\. /, '')} /></li>)}</ol>
    if (block.startsWith('|')) {
      const rows = lines.filter(line => !/^\|[\s:|-]+\|$/.test(line)).map(line => line.split('|').slice(1, -1).map(cell => cell.trim()))
      return <div className="mj-table" key={index}><table><thead><tr>{rows[0].map((cell, i) => <th scope="col" key={i}>{cell}</th>)}</tr></thead><tbody>{rows.slice(1).map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}><Inline text={cell} /></td>)}</tr>)}</tbody></table></div>
    }
    return <p key={index}><Inline text={block} /></p>
  })
}
export default function MojymGuide() {
  return <div className="mojym-page"><SEO title="How to Use Mojym — Gym CRM Guide" description="A practical Mojym guide to setup, members, fees, invoices, attendance, trainers, classes and salary records, with role and payment explanations." url="/products/mojym/how-to-use" modifiedAt="2026-11-23" breadcrumbs={[{ name: 'Products', item: '/products' }, { name: 'Mojym', item: '/products/mojym' }, { name: 'How to use', item: '/products/mojym/how-to-use' }]} />
    <header className="container mj-hero"><Link to="/products/mojym">← Explore Mojym</Link><p className="mj-eyebrow">The practical guide · Updated 23 November 2026</p><h1>How to use Mojym.</h1><p className="mj-lead">From the first member to the daily close. Follow the workflows, understand the records and know when to ask for help.</p><div className="mj-actions"><a className="btn btn-primary" href="https://mojym.hanovadevs.com" target="_blank" rel="noopener noreferrer">Sign in to Mojym ↗</a><Link to="/contact?source=mojym&service=Mojym&details=Setup%20and%20support">Ask the team for help</Link></div></header>
    <div className="container mj-guide-layout"><nav className="mj-guide-nav" aria-label="Guide contents"><h2 style={{ fontSize: '1.2rem' }}>On this page</h2>{sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav><article className="mj-guide-content">{sections.map(section => <section key={section.id} id={section.id}><h2>{section.title}</h2><Blocks text={section.body} /></section>)}<Link to="/products/mojym">Back to the Mojym product →</Link></article></div></div>
}
