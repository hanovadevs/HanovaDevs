import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { stepsy, stepsyScenes, stepsyFaqs } from '../data/stepsy'
import './StepsyDetail.css'

function Preview({ scene, priority = false, decorative = false }) {
  return <img src={`/products/stepsy/${scene.image}-1122.webp`} srcSet={`/products/stepsy/${scene.image}-640.webp 640w, /products/stepsy/${scene.image}-1122.webp 1122w`} sizes="(max-width: 760px) 90vw, 45vw" width="1122" height="1402" alt={decorative ? '' : scene.alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
}

export default function StepsyDetail() {
  const storyRef = useRef(null)
  const [stillView, setStillView] = useState(false)

  useEffect(() => {
    if (stillView || !window.matchMedia) return undefined
    let cancelled = false
    let media
    async function animate() {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)
        media = gsap.matchMedia()
        const root = storyRef.current
        media.add('(min-width: 1000px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)', () => {
          root.dataset.cinematic = 'true'
          const frames = [...root.querySelectorAll('.stepsy-film__frame')]
          const chapters = [...root.querySelectorAll('.stepsy-scene')]
          gsap.set(frames, { opacity: 0 })
          gsap.set(frames[0], { opacity: 1 })
          chapters.forEach((chapter, index) => {
            if (!index) return
            gsap.timeline({ scrollTrigger: { trigger: chapter, start: 'top 85%', end: 'top 40%', scrub: .3, invalidateOnRefresh: true } })
              .to(frames[index - 1], { opacity: 0, scale: .96, y: -24, ease: 'none' }, 0)
              .fromTo(frames[index], { opacity: 0, scale: 1.04, y: 48 }, { opacity: 1, scale: 1, y: 0, ease: 'none' }, 0)
          })
          return () => { delete root.dataset.cinematic }
        }, root)
        media.add('(max-width: 999px) and (prefers-reduced-motion: no-preference)', () => {
          root.querySelectorAll('.stepsy-scene__preview').forEach(preview => {
            gsap.fromTo(preview, { y: 24, scale: .97 }, { y: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: preview, start: 'top 95%', end: 'top 45%', scrub: .3 } })
          })
        }, root)
        document.fonts?.ready.then(() => { if (!cancelled) ScrollTrigger.refresh() })
      } catch {
        // The complete still presentation remains usable if motion cannot load.
        media?.revert()
      }
    }
    animate()
    return () => { cancelled = true; media?.revert() }
  }, [stillView])

  return <div className="stepsy-page">
    <SEO title="Stepsy — Walking, Points & Partner Rewards" description={stepsy.description} url={stepsy.path} image="/products/stepsy/social.png" imageAlt="Stepsy mobile product preview by HanovaDevs" faqList={stepsyFaqs} breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Products', item: '/products' }, { name: 'Stepsy', item: stepsy.path }]} schemaMarkup={{ '@type': 'CreativeWork', '@id': 'https://hanovadevs.com/products/stepsy#product', name: 'Stepsy', url: 'https://hanovadevs.com/products/stepsy', description: stepsy.description, creator: { '@id': 'https://hanovadevs.com/#organization' } }} />
    <section className="stepsy-hero"><div className="container stepsy-hero__layout">
      <div className="stepsy-hero__copy"><Link to="/products" className="stepsy-back">HanovaDevs / Our products</Link><p className="stepsy-kicker">Meet Stepsy</p><span className="stepsy-status">{stepsy.status} · Developed by HanovaDevs</span><h1>Every step.<br /><em>More possibility.</em></h1><p className="stepsy-lead">A little more movement.<br />A little more to look forward to.</p><p>A mobile app project designed to help people build walking habits and discover savings through points, partner discounts and rewards.</p><div className="stepsy-actions"><a href="#stepsy-story" className="btn btn-primary">Experience the story</a><a href={stepsy.website} className="stepsy-text-link" target="_blank" rel="noopener noreferrer">stepsyapp.com</a></div><p className="stepsy-hero__note">Pakistan is the intended first market. Launch availability and reward terms are still being defined.</p></div>
      <figure className="stepsy-hero__visual"><Preview scene={stepsyScenes[0]} priority /></figure>
    </div></section>
    <div className="stepsy-intro-strip"><div className="container"><span>Everyday movement</span><span>Local possibilities</span><span>A HanovaDevs product</span></div></div>
    <section className="stepsy-story" id="stepsy-story" ref={storyRef} aria-labelledby="stepsy-story-title"><div className="container">
      <header className="stepsy-heading"><p className="stepsy-kicker">A day in the life of Stepsy</p><h2 id="stepsy-story-title">One simple idea.<br /><em>Five little possibilities.</em></h2><p>Scroll through the planned experience. From an ordinary walk to a reward worth discovering.</p></header>
      <div className="stepsy-story__controls"><nav aria-label="Stepsy story chapters">{stepsyScenes.map((scene, index) => <a key={scene.id} href={`#stepsy-${scene.id}`}><span aria-hidden="true">0{index + 1}</span> {scene.id === 'walking' ? 'Walking' : scene.id.charAt(0).toUpperCase() + scene.id.slice(1)}</a>)}</nav><button type="button" aria-pressed={stillView} onClick={() => setStillView(value => !value)}>{stillView ? 'Use animated view' : 'Use still view'}</button></div>
      <div className="stepsy-film">
        <div className="stepsy-film__stage" aria-hidden="true"><div className="stepsy-film__frames">{stepsyScenes.map(scene => <figure className="stepsy-film__frame" key={scene.id} data-frame={scene.id}><Preview scene={scene} decorative /></figure>)}</div><p>Stepsy · The product story</p></div>
        <div className="stepsy-film__chapters">{stepsyScenes.map((scene, index) => <article className={`stepsy-scene stepsy-scene--${scene.id}`} id={`stepsy-${scene.id}`} key={scene.id} aria-labelledby={`stepsy-title-${scene.id}`}><figure className="stepsy-scene__preview"><Preview scene={scene} /></figure><div className="stepsy-scene__copy"><p className="stepsy-kicker">Chapter 0{index + 1} / {scene.label}</p><h3 id={`stepsy-title-${scene.id}`}>{scene.title}</h3><p>{scene.text}</p><p className="stepsy-scene__detail">{scene.detail}</p><span className="stepsy-scene__note">{scene.note}</span></div></article>)}</div>
      </div>
    </div></section>
    <section className="stepsy-connection"><div className="container"><p className="stepsy-kicker">Movement meets possibility</p><h2>A useful connection.<br /><em>On both sides of the counter.</em></h2><div className="stepsy-connection__grid">{[['01', 'For people', 'A practical reason to keep walking, with the possibility of useful savings along the way.'], ['02', 'For local businesses', 'A proposed way to connect relevant offers with people who could become their next customers.'], ['03', 'For HanovaDevs', 'A product built around merchant partnerships. The exact commercial model is still being explored.']].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="stepsy-partners"><div className="container stepsy-partners__layout"><div><p className="stepsy-kicker">A conversation worth starting</p><h2>Useful offers.<br /><em>Real connections.</em></h2><p>Run a business and see a place for your offers in this story? We’d like to understand what a useful local partnership could look like.</p><Link to="/contact" className="btn btn-primary">Discuss a potential partnership</Link></div><aside className="stepsy-partners__ticket"><span>THE STEPSY IDEA</span><h3>A walk today.<br />A little possibility<br /><em>tomorrow.</em></h3><p>Designed around people.<br />Connected through local partners.</p><span>Commercial terms and participating merchants to be confirmed.</span></aside></div></section>
    <section className="stepsy-direction"><div className="container"><header className="stepsy-heading"><p className="stepsy-kicker">A clear direction. An honest preview.</p><h2>What’s taking shape.</h2></header><div className="stepsy-direction__grid"><article><span>Confirmed direction</span><h3>Walking at the heart.</h3><ul><li>Stepsy, developed by HanovaDevs</li><li>Walking, points and partner rewards as the product direction</li><li>Pakistan as the intended first market</li><li>stepsyapp.com as the official domain</li></ul></article><article><span>Still being defined</span><h3>The details that make it work.</h3><ul><li>Supported devices and step-tracking sources</li><li>Points, limits, expiry and redemption rules</li><li>Merchant onboarding and commercial terms</li><li>Launch timing, cities and international expansion</li></ul></article></div></div></section>
    <section className="stepsy-faq"><div className="container stepsy-faq__layout"><header className="stepsy-heading"><p className="stepsy-kicker">A few things to know</p><h2>Small questions.<br /><em>Clear answers.</em></h2></header><div>{stepsyFaqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>
    <section className="stepsy-closing"><div className="container"><p className="stepsy-kicker">The next step starts with a conversation</p><h2>Keep moving.<br /><em>We’re building what comes next.</em></h2><p>Follow the product direction or talk with HanovaDevs about Stepsy.</p><div className="stepsy-actions"><a href={stepsy.website} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Visit stepsyapp.com</a><Link to="/contact" className="stepsy-text-link">Talk to our team</Link></div></div></section>
  </div>
}
