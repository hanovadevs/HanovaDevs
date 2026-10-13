import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from './SEO'
import { company } from '../data/company'
import './ProductDetail.css'

export default function ProductDetail({ product, title, description, screenshots, features }) {
  const [active, setActive] = useState(0)
  const isEunoia = product === 'eunoia'
  const prefix = isEunoia ? 'ed' : 'od'
  const details = company.products[product]
  const image = screenshots[active]
  return <div className={`product-detail ${prefix}-page`}>
    <SEO title={`${details.name} — ${details.status}`} description={description} url={`/products/${product}`}
      breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Products', item: '/products' }, { name: details.name, item: `/products/${product}` }]} />
    <header className="product-intro">
      <div className="container product-intro__layout">
        <div><Link className="product-back" to="/products">← All products</Link>
          <span className={`${prefix}-hero__badge product-powered`}>Powered by HanovaDevs</span>
          <h1>{title}</h1><p className="product-status">{details.status}</p><p className="product-intro__description">{description}</p>
          <div className="product-actions">{isEunoia ? <a className="btn btn-primary" href={details.storeUrl} target="_blank" rel="noopener noreferrer">Get Eunoia on Microsoft Store ↗</a> : <Link className="btn btn-primary" to="/contact?subject=Omnai%20launch">Ask about the launch</Link>}<a className="btn btn-outline" href="#product-preview">Explore screenshots</a></div>
          <p className="product-note">{isEunoia ? 'Check the official store listing for current pricing, availability and system requirements.' : 'A release date has not been announced. These development screenshots are a preview; features may change before release.'}</p>
        </div>
        <div className="product-intro__visual"><img src={screenshots[0].src} width="1200" height="750" alt={`${details.name} interface ${isEunoia ? '' : 'preview'}`} fetchPriority="high" /></div>
      </div>
    </header>
    <section id="product-preview" className="container product-preview" aria-labelledby="preview-heading">
      <span className="section-label">A closer look</span><h2 id="preview-heading">Explore the interface</h2>
      <div className="product-gallery">
        <figure className="product-gallery__main"><img className={`${prefix}-gallery__main-img`} src={image.src} alt={`${details.name}: ${image.caption}`} width="1200" height="750" /><figcaption aria-live="polite"><span>{active + 1} / {screenshots.length}</span><h3>{image.caption}</h3><p>{image.description}</p></figcaption></figure>
        <div className="product-gallery__controls"><button className="btn btn-outline" onClick={() => setActive((active - 1 + screenshots.length) % screenshots.length)} aria-label="Previous screenshot">← Previous</button><button className="btn btn-outline" onClick={() => setActive((active + 1) % screenshots.length)} aria-label="Next screenshot">Next →</button></div>
        <div className="product-gallery__thumbs" aria-label="Select a screenshot">{screenshots.map((shot, index) => <button key={shot.src} className={`${prefix}-gallery__thumb product-thumb ${index === active ? 'product-thumb--active' : ''}`} aria-label={`View screenshot ${index + 1}: ${shot.caption}`} aria-pressed={active === index} onClick={() => setActive(index)}><img src={shot.src} alt="" width="240" height="150" loading="lazy" /><span>{index + 1}. {shot.caption}</span></button>)}</div>
      </div>
    </section>
    <section className="product-features container" aria-labelledby="features-heading"><span className="section-label">{isEunoia ? 'The workspace' : 'Product direction'}</span><h2 id="features-heading">{isEunoia ? 'Room for your day, your ideas and your focus.' : 'An AI-focused browser, taking shape.'}</h2><div className="product-features__grid">{features.map(feature => <div key={feature.title}><h3>{feature.title}</h3><p>{feature.description}</p></div>)}</div></section>
    <section className="product-end container"><h2>{isEunoia ? 'Make space for what matters.' : 'Follow what comes next.'}</h2><p>{isEunoia ? 'Explore Eunoia through its official Microsoft Store release.' : 'For launch information and product enquiries, contact HanovaDevs.'}</p><div className="product-actions">{isEunoia ? <a className="btn btn-primary" href={details.storeUrl} target="_blank" rel="noopener noreferrer">Open Microsoft Store ↗</a> : <a className="btn btn-primary" href="mailto:contact@hanovadevs.com?subject=Omnai%20Browser">Contact the team</a>}<Link to="/about" className="btn btn-outline">Meet HanovaDevs</Link>{isEunoia && <Link to="/products/eunoia/privacy">Product privacy policy</Link>}</div></section>
  </div>
}
