import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { builderProgram, studentBuilders, programJourney, programBenefits, programAppreciation, programFaqs } from '../data/studentBuilderProgram'
import { leadershipTeam } from '../data/leadership'
import { studentBuilderSchema } from '../lib/studentBuilderSchema'
import './StudentBuilderProgram.css'

const sections = [['overview', 'Overview'], ['journey', 'Journey'], ['benefits', 'Benefits'], ['builders', 'Builders'], ['mentors', 'Mentors'], ['appreciation', 'Appreciation'], ['program-faq', 'FAQs']]

function SectionTitle({ eyebrow, title, text }) {
  return <header className="sbp-heading"><p className="sbp-eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p>{text}</p>}</header>
}

function EditorialImage({ name, alt, priority = false, className = '' }) {
  return <figure className={`sbp-photo ${className}`}><img src={`/program/${name}-1200.webp`} srcSet={`/program/${name}-640.webp 640w, /program/${name}-1200.webp 1200w`} sizes="(max-width: 760px) 95vw, 50vw" width="1200" height="800" alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" /></figure>
}

function ProgramShare() {
  const [message, setMessage] = useState('')
  const [copyFailed, setCopyFailed] = useState(false)
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(builderProgram.url)
      setMessage('Program link copied.'); setCopyFailed(false)
    } catch {
      setMessage('Copy the link below to share the program.'); setCopyFailed(true)
    }
  }
  return <div className="sbp-share"><button onClick={copyLink}>Copy program link</button><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(builderProgram.url)}`} target="_blank" rel="noopener noreferrer">Share on LinkedIn</a><p role="status">{message}</p>{copyFailed && <input aria-label="Program link to copy" readOnly value={builderProgram.url} onFocus={event => event.target.select()} />}</div>
}

export default function StudentBuilderProgram() {
  const [active, setActive] = useState('overview')
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(entries => {
      const section = entries.find(entry => entry.isIntersecting)
      if (section) setActive(section.target.id)
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 })
    sections.forEach(([id]) => { const element = document.getElementById(id); if (element) observer.observe(element) })
    return () => observer.disconnect()
  }, [])
  return (
    <div className="sbp-page">
      <SEO title="Student Builder Program" description={builderProgram.description} url={builderProgram.path} image="/program/student-builder-social.png" imageAlt="HanovaDevs Student Builder Program — October–December 2026, 8-week virtual program" mainEntity={{ '@id': `${builderProgram.url}#program` }} schemaMarkup={studentBuilderSchema()} faqList={programFaqs} breadcrumbs={[{ name: 'Home', item: '/' }, { name: builderProgram.name, item: builderProgram.path }]} />
      <section className="sbp-section sbp-hero" aria-labelledby="program-title">
        <div className="container sbp-editorial">
          <div className="sbp-hero__copy"><p className="sbp-eyebrow">HanovaDevs · Student Builder Program</p><span className="sbp-status">{builderProgram.status} · 2026 cohort</span><h1 id="program-title">Build something<br /><em>that matters.</em></h1><p className="sbp-lead">An eight-week virtual journey where students work on real projects, collaborate with the HanovaDevs team, and turn their learning into work they can proudly show.</p><p className="sbp-cohort">{builderProgram.cohort} <span>· {builderProgram.duration}</span></p><div className="sbp-actions"><a href="#builders" className="btn btn-primary">Meet the builders</a><a href="#journey" className="sbp-link">Explore the journey</a></div></div>
          <EditorialImage name="builder-workspace" alt="Illustrative hands typing on a laptop beside a notebook in a daylight study space" priority className="sbp-photo--hero" />
        </div>
      </section>
      <nav className="sbp-section-nav" aria-label="Program sections"><div className="container">{sections.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setActive(id)}>{label}</a>)}</div></nav>
      <section className="sbp-section sbp-purpose" id="overview" aria-labelledby="purpose-title"><div className="container sbp-editorial sbp-editorial--reverse">
        <EditorialImage name="learning-workspace" alt="Illustrative laptop, notebook and pencil on a natural wooden study desk" />
        <div><p className="sbp-eyebrow">From learning to contributing</p><h2 id="purpose-title">Learning becomes powerful <em>when you build with it.</em></h2><p className="sbp-lead">Knowing a concept is a beginning. Seeing how it helps a real project is where a different kind of learning starts.</p><p>We created the Student Builder Program to make that bridge more human: room to ask questions, meaningful work to contribute to, and a team that helps students understand how digital products are planned, built, reviewed and improved.</p><ul className="sbp-purpose__ideas"><li>A real project context, not just a tutorial.</li><li>People to learn with, not a journey to navigate alone.</li><li>Work you can reflect on and explain with confidence.</li></ul></div>
      </div></section>
      <section className="sbp-section sbp-journey" id="journey" aria-labelledby="journey-title"><div className="container">
        <SectionTitle eyebrow="The eight-week journey" title={<span id="journey-title">A shared journey.<br /><em>Real work. New possibilities.</em></span>} text="This is the shape of the experience—not a record of completed milestones or a fixed weekly timetable. We are building it together, one contribution at a time." />
        <ol className="sbp-timeline">{programJourney.map(stage => <li key={stage.stage}><span className="sbp-timeline__number" aria-hidden="true">{stage.stage}</span><div><h3>{stage.title}</h3><p>{stage.text}</p></div></li>)}</ol>
        <aside className="sbp-github"><h3>What does working together on GitHub mean?</h3><p>A branch gives you space to work on a change. A pull request brings that change to the team for discussion. Feedback helps you improve it before it becomes part of the shared project. You practise those steps with relevant program repositories and guidance from the team.</p><span>Make a change · Open a pull request · Discuss feedback · Improve together</span></aside>
      </div></section>
      <section className="sbp-section sbp-benefits" id="benefits" aria-labelledby="benefits-title"><div className="container">
        <SectionTitle eyebrow="What the experience makes possible" title={<span id="benefits-title">Your portfolio should tell the story<br /><em>of what you built.</em></span>} text="Practical exposure matters. So do the conversations, habits and confidence that grow around it." />
        <div className="sbp-benefits__grid">{programBenefits.map(([title, text], index) => <article key={title} className={`sbp-benefit sbp-benefit--${index + 1}`}><span aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <p className="sbp-permissions">A portfolio must respect project permissions. Showcase approved contributions; never expose private repositories, client code or confidential work.</p>
      </div></section>
      <section className="sbp-section sbp-recognition" aria-labelledby="recognition-title"><div className="container sbp-editorial">
        <div><p className="sbp-eyebrow">Recognition, with care</p><h2 id="recognition-title">A chapter<br /><em>worth recognising.</em></h2><p>Certificates are part of the program’s benefits, alongside small rewards that celebrate effort and contribution. The program team will communicate certificate issuance details.</p><p>This sample shows a design direction only. It is not an issued certificate, proof of completion or an externally accredited qualification.</p><a href="/program/certificate-sample.svg" className="sbp-link" target="_blank" rel="noopener noreferrer">View sample certificate design</a></div>
        <figure className="sbp-certificate"><img src="/program/certificate-sample.svg" width="1200" height="848" alt="Sample HanovaDevs Student Builder Program certificate design, not an issued credential" loading="lazy" /><figcaption>Sample design · no certificate has been issued by this preview</figcaption></figure>
      </div></section>
      <section className="sbp-section sbp-opportunity" aria-labelledby="opportunity-title"><div className="container sbp-editorial">
        <div><p className="sbp-eyebrow">Beyond these eight weeks</p><h2 id="opportunity-title">The next idea<br /><em>could be yours.</em></h2><p className="sbp-lead">An app. A platform. A tool. A game. A useful digital experience that begins with a problem you want to solve.</p><p>At the end of the program, participants can bring an exciting product idea to the HanovaDevs team. Selected promising ideas may receive guidance, development collaboration and potential investment after discussion and evaluation.</p><p>It is an opportunity to explore—not automatic funding or a promise of investment for every idea.</p><ol className="sbp-idea-path"><li>Bring an idea</li><li>Explore it together</li><li>Build a path forward</li></ol></div>
        <EditorialImage name="idea-notebook" alt="Illustrative hands sketching a simple interface beside a laptop and notebook" className="sbp-photo--idea" />
      </div></section>
      <section className="sbp-section sbp-builders" id="builders" aria-labelledby="builders-title"><div className="container">
        <SectionTitle eyebrow="The people who give this journey its purpose" title={<span id="builders-title">Meet the student builders.</span>} text={`${studentBuilders.length} people. A shared willingness to learn, contribute and keep building. Every name here is part of the story.`} />
        <div className="sbp-builders__grid">{studentBuilders.map((builder, index) => (
          <article className={`sbp-builder sbp-builder--${index % 3}`} key={builder.id} data-builder-id={builder.id} aria-labelledby={`builder-${builder.id}`}>
            <span className="sbp-initials" aria-hidden="true">{builder.initials}</span>
            <p className="sbp-builder__id"><span className="sr-only">Participant ID: </span>{builder.id}</p>
            <p className="sbp-builder__role">Student Builder</p>
            <h3 id={`builder-${builder.id}`}>{builder.name}</h3>
            <p className="sbp-builder__thanks">{builder.thanks}</p>
            {builder.linkedin && <a href={builder.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`View ${builder.name} on LinkedIn`}>View LinkedIn<span className="sr-only"> (opens in a new tab)</span></a>}
          </article>
        ))}</div>
      </div></section>
      <section className="sbp-section sbp-mentors" id="mentors" aria-labelledby="mentors-title"><div className="container">
        <SectionTitle eyebrow="Experience shared, not kept to ourselves" title={<span id="mentors-title">Guided by the people<br /><em>who build every day.</em></span>} text="Our full leadership team supports the program, connecting students with practical experience, feedback and collaborative ways of working." />
        <div className="sbp-mentors__grid">{leadershipTeam.map(member => <article className={`sbp-mentor sbp-mentor--${member.tone}`} key={member.id} aria-labelledby={`mentor-${member.id}`}><figure><img src={member.image} srcSet={`${member.smallImage} 480w, ${member.image} 800w`} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 40vw, 260px" width="800" height="800" alt={member.alt} loading="lazy" /></figure><div><p className="sbp-eyebrow">{member.role}</p><h3 id={`mentor-${member.id}`}>{member.name}</h3><p>{member.focus}</p><Link to={member.profile}>Meet {member.name}</Link>{member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer">View LinkedIn</a>}</div></article>)}</div>
      </div></section>
      <section className="sbp-section sbp-progress" aria-labelledby="progress-title"><div className="container"><p className="sbp-eyebrow">The journey so far</p><h2 id="progress-title">Progress worth<br /><em>celebrating.</em></h2><p className="sbp-progress__statement">What makes this journey meaningful is the people behind it: students willing to learn, a team willing to guide, and a shared belief that useful work grows through collaboration.</p><p>The experience so far has been positive for HanovaDevs. We are proud to make space for this community—and grateful for the people who are building it with us. The journey is still in progress.</p></div></section>
      <section className="sbp-section sbp-appreciation" id="appreciation" aria-labelledby="appreciation-title"><div className="container">
        <SectionTitle eyebrow="A message from HanovaDevs" title={<span id="appreciation-title">For the builders<br /><em>who showed up.</em></span>} />
        <div className="sbp-appreciation__messages">{programAppreciation.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><div className="sbp-mentor-thanks"><h3>To our mentors</h3><p>Thank you to the HanovaDevs team for supporting this program and helping create space for students to learn through practical work.</p></div><p className="sbp-appreciation__closing">To every student builder: we appreciate your participation. We are glad you chose to share this part of your journey with HanovaDevs, and we look forward to seeing what you build next.</p>
      </div></section>
      <section className="sbp-section sbp-faq" id="program-faq" aria-labelledby="faq-title"><div className="container sbp-faq__layout"><SectionTitle eyebrow="A little more clarity" title={<span id="faq-title">Questions,<br /><em>thoughtfully answered.</em></span>} /><div>{programFaqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>
      <section className="sbp-section sbp-closing" aria-labelledby="closing-title"><div className="container"><p className="sbp-eyebrow">This is one chapter. Keep going.</p><h2 id="closing-title">Keep building.<br /><em>Your next chapter starts<br />with what you create.</em></h2><p>To our students, mentors and everyone following the journey: thank you for being here. Useful work starts with people who care enough to try.</p><Link to="/contact" className="btn btn-primary">Connect with our team</Link><ProgramShare /></div></section>
    </div>
  )
}
