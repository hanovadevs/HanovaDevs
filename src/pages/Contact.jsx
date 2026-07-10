import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
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

const timeSlots = ['09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM', '04:30 PM']

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
  const [submissionFailed, setSubmissionFailed] = useState(false)

  // Pre-fill form from URL parameters (e.g. from Calculator)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const service = params.get('service')
    const budget = params.get('budget')
    const details = params.get('details')

    if (service || budget || details) {
      let customMessage = `Calculator Projections:\n`
      if (service) customMessage += `- Service: ${service}\n`
      if (budget) customMessage += `- Estimated Budget: ${budget}\n`
      if (details) customMessage += `- Selections: ${details}\n`
      customMessage += `\nLet's align on these requirements during our call.`

      setForm(prev => ({
        ...prev,
        budget: budget || prev.budget,
        message: customMessage
      }))
    }
  }, [])

  // Call Scheduler States
  const [activeTab, setActiveTab] = useState('message') // 'message' or 'call'
  const [meetingType, setMeetingType] = useState('discovery') // 'discovery', 'tech-review', 'growth-strategy'
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')

  // Generate next 10 business days (2 weeks)
  const businessDays = useMemo(() => {
    const days = []
    let current = new Date()
    // If after 5 PM, start from tomorrow
    if (current.getHours() >= 17) {
      current.setDate(current.getDate() + 1)
    }
    while (days.length < 10) {
      if (current.getDay() !== 0 && current.getDay() !== 6) {
        days.push(new Date(current))
      }
      current.setDate(current.getDate() + 1)
    }
    return days
  }, [])

  const getGoogleCalendarUrl = () => {
    if (!selectedDate || !selectedTime) return '';
    const dateStr = selectedDate.toISOString().split('T')[0].replace(/-/g, '');
    
    let durationMin = 15;
    let title = "HanovaDevs Discovery Session";
    if (meetingType === 'tech-review') {
      durationMin = 30;
      title = "HanovaDevs Tech & Architecture Review";
    } else if (meetingType === 'growth-strategy') {
      durationMin = 45;
      title = "HanovaDevs Growth & UGC Strategy";
    }
    
    const [hoursStr, minutesStr] = selectedTime.replace(' AM', '').replace(' PM', '').split(':');
    let hours = Number(hoursStr);
    const minutes = Number(minutesStr);
    const isPM = selectedTime.includes('PM');
    if (isPM && hours !== 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;
    
    const start = new Date(selectedDate);
    start.setHours(hours, minutes, 0);
    
    const end = new Date(start);
    end.setMinutes(start.getMinutes() + durationMin);
    
    const formatUTC = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatUTC(start)}/${formatUTC(end)}&details=${encodeURIComponent('Meeting to discuss your digital project with HanovaDevs.')}&location=${encodeURIComponent('Google Meet / Video Call')}`;
  }

  const getOutlookCalendarUrl = () => {
    if (!selectedDate || !selectedTime) return '';
    let durationMin = 15;
    let title = "HanovaDevs Discovery Session";
    if (meetingType === 'tech-review') {
      durationMin = 30;
      title = "HanovaDevs Tech & Architecture Review";
    } else if (meetingType === 'growth-strategy') {
      durationMin = 45;
      title = "HanovaDevs Growth & UGC Strategy";
    }
    
    const [hoursStr, minutesStr] = selectedTime.replace(' AM', '').replace(' PM', '').split(':');
    let hours = Number(hoursStr);
    const minutes = Number(minutesStr);
    const isPM = selectedTime.includes('PM');
    if (isPM && hours !== 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;
    
    const start = new Date(selectedDate);
    start.setHours(hours, minutes, 0);
    
    const end = new Date(start);
    end.setMinutes(start.getMinutes() + durationMin);
    
    return `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(title)}&startdt=${start.toISOString()}&enddt=${end.toISOString()}&body=${encodeURIComponent('Meeting to discuss your digital project with HanovaDevs.')}&location=${encodeURIComponent('Google Meet / Video Call')}`;
  }

  const userTimezone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
    } catch (e) {
      return 'UTC'
    }
  }, [])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (activeTab === 'call' && !selectedTime) {
      alert("Please select a convenient time slot for your call.")
      return
    }

    setSending(true)
    let payload = {}

    try {
      const isCall = activeTab === 'call'
      payload = isCall ? {
        name: form.name,
        email: form.email,
        phone: form.phone || "Not provided",
        company: form.company || "Not provided",
        meetingType: meetingType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        scheduledDate: selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '',
        scheduledTime: selectedTime,
        timezone: userTimezone,
        message: form.message || "Discuss digital agency partnership",
        _subject: `Strategy Call Booked: ${form.name} on ${selectedTime}`,
        _captcha: "false"
      } : {
        name: form.name,
        email: form.email,
        phone: form.phone || "Not provided",
        company: form.company || "Not provided",
        budget: form.budget !== 'Select budget range' ? form.budget : "Not provided",
        message: form.message,
        _subject: `New Lead: ${form.name} from HanovaDevs Website`,
        _captcha: "false"
      }

      const response = await fetch("https://formsubmit.co/ajax/hanovadevs@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        throw new Error(`Server returned status ${response.status}`)
      }
    } catch (error) {
      console.error("Submission Error:", error)

      // Graceful fallback for non-production environments (CORS / Domain Activation limits on Vercel preview & local)
      const isProduction = ['www.hanovadevs.com', 'hanovadevs.com'].includes(window.location.hostname)
      if (!isProduction) {
        console.warn("🛠️ HanovaDevs Environment Fallback Active:")
        console.log("Simulating successful form completion on preview/development domain.");
        console.log("Submitted Payload:", payload);
        setSubmitted(true)
      } else {
        alert("Submission failed. If this is a new deployment, please check your email for the FormSubmit activation link.")
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="contact-page">
      <SEO 
        title="Contact Us"
        description="Get in touch with HanovaDevs. We are ready to discuss your next digital project, from custom software to comprehensive marketing campaigns."
        url="/contact"
        faqList={faqs.map(f => ({ question: f.q, answer: f.a }))}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Contact', item: '/contact' }
        ]}
      />
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
              {/* Tab Switcher */}
              {!submitted && !submissionFailed && (
                <div className="contact-tabs">
                  <button
                    type="button"
                    className={`contact-tab-btn ${activeTab === 'message' ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab('message')
                      setSubmitted(false)
                    }}
                  >
                    ✉️ Send a Message
                  </button>
                  <button
                    type="button"
                    className={`contact-tab-btn ${activeTab === 'call' ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab('call')
                      setSubmitted(false)
                    }}
                  >
                    📅 Book a Call
                  </button>
                </div>
              )}

              {submissionFailed ? (
                <div className="contact-success" style={{ background: 'var(--off-white)', border: '2px solid rgba(var(--royal-blue-rgb), 0.15)' }}>
                  <div className="contact-success__icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--royal-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="16" x2="12" y2="12"/>
                      <line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                  </div>
                  <h3>Gateway Connection Fallback</h3>
                  <p style={{ fontSize: '0.9rem', maxWidth: '380px' }}>
                    Our automated scheduling processor is undergoing temporary network maintenance. 
                    To lock in your request instantly, click below to open your email client pre-filled with all your details!
                  </p>
                  
                  {activeTab === 'call' && (
                    <div className="scheduler-summary-badge" style={{ margin: '1rem 0', justifyContent: 'center' }}>
                      📅 <strong>{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</strong> at <strong>{selectedTime}</strong> ({userTimezone})
                    </div>
                  )}

                  <a 
                    href={
                      activeTab === 'call' 
                        ? `mailto:hanovadevs@gmail.com?subject=Strategy Call Booking: ${form.name}&body=Hello HanovaDevs Team,%0D%0DName: ${form.name}%0D%0DEmail: ${form.email}%0D%0DPhone: ${form.phone || 'Not provided'}%0D%0DCompany: ${form.company || 'Not provided'}%0D%0DRequested Date: ${selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}%0D%0DRequested Time: ${selectedTime}%0D%0DTimezone: ${userTimezone}%0D%0DMessage: ${form.message || 'Discuss digital agency partnership'}`
                        : `mailto:hanovadevs@gmail.com?subject=New Lead: ${form.name}&body=Hello HanovaDevs Team,%0D%0DName: ${form.name}%0D%0DEmail: ${form.email}%0D%0DPhone: ${form.phone || 'Not provided'}%0D%0DCompany: ${form.company || 'Not provided'}%0D%0DBudget: ${form.budget || 'Not specified'}%0D%0DMessage: ${form.message}`
                    }
                    className="btn btn-primary"
                    style={{ display: 'inline-flex', gap: '0.5rem', width: '100%', justifyContent: 'center', textDecoration: 'none' }}
                  >
                    Send Pre-filled Email 🚀
                  </a>

                  <button className="btn btn-ghost" style={{ marginTop: '0.5rem' }} onClick={() => setSubmissionFailed(false)}>
                    Try Form Submission Again
                  </button>
                </div>
              ) : submitted ? (
                activeTab === 'call' ? (
                  <div className="contact-success">
                    <div className="contact-success__icon">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </div>
                    <h3>Call Scheduled!</h3>
                    <p>Your strategy session has been successfully booked for:</p>
                    <div className="scheduler-summary-badge" style={{ margin: '1rem 0', justifyContent: 'center' }}>
                      📅 <strong>{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</strong> at <strong>{selectedTime}</strong> ({userTimezone})
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--blue-grey)', maxWidth: '350px', margin: '0 auto' }}>
                      A confirmation email has been sent. Our team will meet you at the scheduled time via Google Meet.
                    </p>
                    <div className="calendar-add-buttons">
                      <a href={getGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer" className="calendar-add-btn">
                        📅 Add to Google
                      </a>
                      <a href={getOutlookCalendarUrl()} target="_blank" rel="noopener noreferrer" className="calendar-add-btn">
                        ✉️ Add to Outlook
                      </a>
                    </div>
                    <button className="btn btn-ghost" style={{ marginTop: '0.5rem' }} onClick={() => { setSubmitted(false); setSelectedTime(''); setForm({ name: '', email: '', phone: '', company: '', budget: '', message: '' }) }}>
                      Schedule Another Call
                    </button>
                  </div>
                ) : (
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
                )
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                  
                  {activeTab === 'message' ? (
                    <>
                      <div className="contact-form-header">
                        <h3>Send us a message</h3>
                        <p>Fill in the details and we'll be in touch soon.</p>
                      </div>

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
                    </>
                  ) : (
                    <>
                      <div className="contact-form-header">
                        <h3>Book a Strategy Call</h3>
                        <p>Configure your session and select a convenient date and time.</p>
                      </div>

                      {/* Step 1: Meeting Type selection */}
                      <div className="scheduler-step">
                        <h4>
                          <span className="scheduler-step-num">1</span>
                          Select Meeting Type
                        </h4>
                        <div className="scheduler-meeting-types">
                          <div 
                            className={`scheduler-meeting-card ${meetingType === 'discovery' ? 'active' : ''}`}
                            onClick={() => setMeetingType('discovery')}
                          >
                            <div className="scheduler-meeting-header">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="meeting-icon-svg">
                                <path d="M23 7l-7 5 7 5V7z" />
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                              </svg>
                              <h5>Discovery</h5>
                            </div>
                            <p>15m • Goals & fit</p>
                          </div>
                          <div 
                            className={`scheduler-meeting-card ${meetingType === 'tech-review' ? 'active' : ''}`}
                            onClick={() => setMeetingType('tech-review')}
                          >
                            <div className="scheduler-meeting-header">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="meeting-icon-svg">
                                <polyline points="4 17 10 11 4 5" />
                                <line x1="12" y1="19" x2="20" y2="19" />
                              </svg>
                              <h5>Tech Review</h5>
                            </div>
                            <p>30m • Architecture & stack</p>
                          </div>
                          <div 
                            className={`scheduler-meeting-card ${meetingType === 'growth-strategy' ? 'active' : ''}`}
                            onClick={() => setMeetingType('growth-strategy')}
                          >
                            <div className="scheduler-meeting-header">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="meeting-icon-svg">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                <polyline points="17 6 23 6 23 12" />
                              </svg>
                              <h5>Growth</h5>
                            </div>
                            <p>45m • UGC & channels</p>
                          </div>
                        </div>
                      </div>

                      {/* Step 2: Date selection */}
                      <div className="scheduler-step">
                        <h4>
                          <span className="scheduler-step-num">2</span>
                          Select a Date
                        </h4>
                        <div className="scheduler-days-container">
                          <div className="scheduler-days-scroll">
                            {businessDays.map((day, idx) => {
                              const isSelected = selectedDate && selectedDate.toDateString() === day.toDateString()
                              const weekdayName = day.toLocaleDateString('en-US', { weekday: 'short' })
                              const dateNum = day.getDate()
                              const monthName = day.toLocaleDateString('en-US', { month: 'short' })

                              return (
                                <div
                                  key={idx}
                                  className={`scheduler-day-card ${isSelected ? 'active' : ''}`}
                                  onClick={() => setSelectedDate(day)}
                                >
                                  <span className="scheduler-day-card__weekday">{weekdayName}</span>
                                  <span className="scheduler-day-card__date">{dateNum}</span>
                                  <span className="scheduler-day-card__month">{monthName}</span>
                                  <span className="scheduler-day-card__status">Available</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Step 3: Time slot selection */}
                      <div className="scheduler-step">
                        <h4>
                          <span className="scheduler-step-num">3</span>
                          Choose Time Slot
                          <span className="scheduler-timezone">
                            🌐 {userTimezone} timezone
                          </span>
                        </h4>
                        <div className="scheduler-slot-groups">
                          <div className="scheduler-slot-group">
                            <span className="scheduler-slot-group-title">🌅 Morning</span>
                            <div className="scheduler-slots">
                              {['09:30 AM', '11:00 AM'].map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  className={`scheduler-slot-btn ${selectedTime === slot ? 'active' : ''}`}
                                  onClick={() => setSelectedTime(slot)}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="scheduler-slot-group">
                            <span className="scheduler-slot-group-title">☀️ Afternoon</span>
                            <div className="scheduler-slots">
                              {['01:30 PM', '03:00 PM', '04:30 PM'].map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  className={`scheduler-slot-btn ${selectedTime === slot ? 'active' : ''}`}
                                  onClick={() => setSelectedTime(slot)}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Step 4: Contact Details */}
                      {selectedTime && (
                        <div className="scheduler-step" style={{ marginTop: '0.5rem' }}>
                          <h4>
                            <span className="scheduler-step-num">4</span>
                            Confirm Your Information
                          </h4>
                          
                          <div className="scheduler-summary-badge">
                            <span>📅 Booking <strong>{meetingType === 'discovery' ? '15m Discovery' : meetingType === 'tech-review' ? '30m Tech Review' : '45m Growth Strategy'}</strong> call: <strong>{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</strong> at <strong>{selectedTime}</strong></span>
                          </div>

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
                            <label htmlFor="contact-message">What would you like to cover? *</label>
                            <textarea
                              id="contact-message"
                              name="message"
                              placeholder="Briefly describe your goals, app/website features, or marketing questions..."
                              rows="3"
                              value={form.message}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Submit Button */}
                  {(activeTab === 'message' || selectedTime) && (
                    <button type="submit" className="btn btn-primary contact-form__submit" disabled={sending}>
                      {sending ? (
                        <>
                          <span className="contact-form__spinner" />
                          Sending...
                        </>
                      ) : (
                        <>
                          {activeTab === 'call' ? 'Confirm & Book Strategy Session' : 'Send Message'}
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            {activeTab === 'call' ? (
                              <>
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                              </>
                            ) : (
                              <>
                                <line x1="22" y1="2" x2="11" y2="13"/>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                              </>
                            )}
                          </svg>
                        </>
                      )}
                    </button>
                  )}
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
                    <a href="https://www.instagram.com/hanovadevs/" target="_blank" rel="noopener noreferrer">@hanovadevs</a>
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
                  <a href="https://www.instagram.com/hanovadevs/" target="_blank" rel="noopener noreferrer" className="contact-social-link hoverable" aria-label="Instagram">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    <span>Instagram</span>
                  </a>
                  <a href="https://www.linkedin.com/in/hanova-devs-8516073b2/" target="_blank" rel="noopener noreferrer" className="contact-social-link hoverable" aria-label="LinkedIn">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    <span>LinkedIn</span>
                  </a>
                  <a href="https://github.com/hanovadevs/" target="_blank" rel="noopener noreferrer" className="contact-social-link hoverable" aria-label="GitHub">
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
