import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Contact.css'

const budgetOptions = [
  'Select budget range',
  'Under $1,000',
  '$1,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000+',
]

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Most projects take 4–12 weeks depending on scope and complexity. We provide a detailed timeline during our discovery phase.',
  },
  {
    q: 'Do you work with startups?',
    a: 'Absolutely! We work with businesses of all sizes — from early-stage startups to established enterprises looking to scale.',
  },
  {
    q: 'What happens after the project is delivered?',
    a: 'We offer ongoing maintenance and support packages to keep your product running smoothly and growing with your business.',
  },
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/hanovadevs@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone || "Not provided",
            company: form.company || "Not provided",
            budget: form.budget !== 'Select budget range' ? form.budget : "Not provided",
            message: form.message,
            _subject: `New Lead: ${form.name} from HanovaDevs Website`
        })
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert("Something went wrong with the submission. Please try again later.")
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again later.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero" id="contact-hero">
        <div className="contact-hero__bg" />
        <div className="container">
          <div className="contact-hero__content reveal">
            <span className="section-label">Get in Touch</span>
            <h1>Let's build something <span className="gradient-text">great.</span></h1>
            <p className="contact-hero__subtitle">
              Have a project in mind? We'd love to hear about it. Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section section" id="contact-form-section">
        <div className="container">
          <div className="contact-layout">
            {/* Form */}
            <div className="contact-form-wrap reveal">
              <div className="contact-form-header">
                <h3>Send us a message</h3>
                <p>Fill in the details and we'll be in touch soon.</p>
              </div>
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success__icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button className="btn btn-ghost" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', company: '', budget: '', message: '' }) }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label htmlFor="contact-name">Full Name *</label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="contact-form__field">
                      <label htmlFor="contact-email">Email Address *</label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label htmlFor="contact-phone">Phone Number</label>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="contact-form__field">
                      <label htmlFor="contact-company">Company</label>
                      <input
                        type="text"
                        id="contact-company"
                        name="company"
                        placeholder="Your Company"
                        value={form.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="contact-form__field">
                    <label htmlFor="contact-budget">Budget Range *</label>
                    <select
                      id="contact-budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      required
                    >
                      {budgetOptions.map((opt, i) => (
                        <option key={i} value={i === 0 ? '' : opt} disabled={i === 0}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="contact-form__field">
                    <label htmlFor="contact-message">Project Description *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Tell us about your project, goals, and timeline..."
                      rows="5"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary contact-form__submit" disabled={sending}>
                    {sending ? (
                      <>
                        <span className="contact-form__spinner" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="contact-sidebar reveal reveal-delay-2">
              {/* Response time badge */}
              <div className="contact-response-badge">
                <div className="contact-response-badge__dot" />
                <span>Avg. response time: <strong>under 4 hours</strong></span>
              </div>

              <div className="contact-info-card card card-glass">
                <h4>Contact Information</h4>
                <div className="contact-info-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--royal-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <div>
                    <span className="contact-info-label">Email</span>
                    <a href="mailto:hanovadevs@gmail.com">hanovadevs@gmail.com</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--royal-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <div>
                    <span className="contact-info-label">Phone</span>
                    <a href="tel:+19177355385">+1 (917) 735-5385</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--royal-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  <div>
                    <span className="contact-info-label">Instagram</span>
                    <a href="https://instagram.com/hanovadevs" target="_blank" rel="noopener noreferrer">@hanovadevs</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--royal-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <div>
                    <span className="contact-info-label">Location</span>
                    <span>Global — Remote First</span>
                  </div>
                </div>
              </div>

              {/* Office hours */}
              <div className="contact-hours-card card card-glass">
                <h4>Office Hours</h4>
                <div className="contact-hours-list">
                  <div className="contact-hours-row">
                    <span>Monday – Friday</span>
                    <strong>9:00 AM – 6:00 PM EST</strong>
                  </div>
                  <div className="contact-hours-row">
                    <span>Saturday</span>
                    <strong>10:00 AM – 2:00 PM EST</strong>
                  </div>
                  <div className="contact-hours-row">
                    <span>Sunday</span>
                    <strong>Closed</strong>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="contact-social-card card card-glass">
                <h4>Follow Us</h4>
                <div className="contact-social-links">
                  <a href="https://instagram.com/hanovadevs" target="_blank" rel="noopener noreferrer" className="contact-social-link hoverable" aria-label="Instagram">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    <span>Instagram</span>
                  </a>
                  <a href="https://linkedin.com/company/hanovadevs" target="_blank" rel="noopener noreferrer" className="contact-social-link hoverable" aria-label="LinkedIn">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    <span>LinkedIn</span>
                  </a>
                  <a href="https://twitter.com/hanovadevs" target="_blank" rel="noopener noreferrer" className="contact-social-link hoverable" aria-label="Twitter">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                    <span>Twitter / X</span>
                  </a>
                  <a href="https://github.com/hanovadevs" target="_blank" rel="noopener noreferrer" className="contact-social-link hoverable" aria-label="GitHub">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="contact-faq reveal">
            <h3 className="contact-faq__title">Frequently Asked Questions</h3>
            <div className="contact-faq__list">
              {faqs.map((faq, i) => (
                <div key={i} className={`contact-faq__item ${openFaq === i ? 'contact-faq__item--open' : ''}`}>
                  <button className="contact-faq__question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-faq__chevron">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className="contact-faq__answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
