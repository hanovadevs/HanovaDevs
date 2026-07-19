import { useState, useEffect, useRef } from 'react'
import { saveAppointment, saveChatTranscript } from '../lib/supabaseClient'
import './AIChatbot.css'

// Simulated local intelligence engine for local testing offline/without key
const generateSimulatedResponse = (userText, history, bookingState, setBookingState, bookingData, setBookingData) => {
  const text = userText.toLowerCase()
  
  // Handlers for the booking state machine in simulated mode
  if (bookingState === 'collecting_name') {
    setBookingData(prev => ({ ...prev, name: userText }))
    setBookingState('collecting_email')
    return {
      content: `Nice to meet you, ${userText}! Could you please share your email address so we can send the meeting link?`
    }
  }
  
  if (bookingState === 'collecting_email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userText.trim())) {
      return {
        content: "Hmm, that doesn't look like a valid email. Could you please double check and type it again?"
      }
    }
    setBookingData(prev => ({ ...prev, email: userText }))
    setBookingState('selecting_datetime')
    return {
      content: "Thank you! Now, let's schedule the date and time. Please pick your preferred slot using the interactive calendar booking panel on the right.",
      trigger_picker: true
    }
  }

  // General Q&A handlers
  if (text.includes('book') || text.includes('schedule') || text.includes('appointment') || text.includes('call')) {
    setBookingState('collecting_name')
    return {
      content: "I'd love to help you book a discovery call! To get started, what is your full name?"
    }
  }

  if (text.includes('price') || text.includes('cost') || text.includes('rate') || text.includes('how much')) {
    return {
      content: "At HanovaDevs, we tailormade our systems to fit your exact business goals. Our simple web layouts, Shopify builds, and UGC ad testing campaigns start from around **$300 - $500**. Custom software and advanced AI calling assistants depend on complexity. You can check our interactive **/calculator** page for an instant cost estimate, or we can schedule a consultation call to discuss your project!"
    }
  }

  if (text.includes('ai') || text.includes('bot') || text.includes('automation') || text.includes('chatbot') || text.includes('assistant')) {
    return {
      content: "AI Automation is our signature capability! We build three key solutions:\n1. **Website AI Chatbots** (just like me!) to qualify leads and answer support.\n2. **AI Calling Assistants** that handle outbound phone bookings naturally.\n3. **Unified AI dashboards** to track logs and transcripts.\nWould you like to book a call to set this up for your company?"
    }
  }

  if (text.includes('web') || text.includes('design') || text.includes('react') || text.includes('next')) {
    return {
      content: "We engineer lightning-fast websites and web applications using React, Next.js, and Vite. Our sites achieve 100/100 Lighthouse performance scores to maximize search indexing. Would you like to schedule a call to discuss a website project?"
    }
  }

  if (text.includes('shopify') || text.includes('e-commerce') || text.includes('store')) {
    return {
      content: "We design conversion-optimized Shopify stores and custom Liquid themes. We handle integrations with Klaviyo, subscription setups, and checkout customization. Would you like to schedule a call to plan your store launch?"
    }
  }

  if (text.includes('work') || text.includes('portfolio') || text.includes('project') || text.includes('done')) {
    return {
      content: "We have built some amazing systems recently! For example, **Omnai** (an AI vector document workspace), **Eunoia** (a premium digital brand showcase), and **CODATOR** (a gamified portal for a university CS society). You can browse our full portfolio on our **/projects** page!"
    }
  }

  if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('greet')) {
    return {
      content: "Hello! I am Aria, your HanovaDevs AI Guide. I can answer questions about our software development, design, and UGC marketing services, or help you book a discovery call. How can I help you today?"
    }
  }

  return {
    content: "I want to make sure I understand correctly. We specialize in custom software engineering, Shopify store setup, UGC ads, and AI automation. Would you like to know more about a specific service, estimate costs using our calculator, or book a consultation call?"
  }
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isBookingPanelOpen, setIsBookingPanelOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am Aria, your AI Guide for HanovaDevs. ⚡ How can I help you automate operations or scale your digital presence today?' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)

  // Booking states
  const [bookingState, setBookingState] = useState('idle') // idle, collecting_name, collecting_email, selecting_datetime, confirmed
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'ai-automation',
    date: '',
    time: '',
    message: '',
    budget: '$1,000 - $3,000'
  })

  const messagesEndRef = useRef(null)
  const chatSessionId = useRef(Math.random().toString(36).substr(2, 9))

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  useEffect(() => {
    // Show badge notification after 5 seconds if chat is closed
    const timer = setTimeout(() => {
      if (!isOpen) {
        setHasNewMessage(true)
      }
    }, 5000)
    return () => clearTimeout(timer)
  }, [isOpen])

  // Automatically open the booking panel when state transitions away from idle
  useEffect(() => {
    if (bookingState !== 'idle' && bookingState !== 'confirmed') {
      setIsBookingPanelOpen(true)
    }
  }, [bookingState])

  // Save/update transcript in local storage whenever message list changes
  useEffect(() => {
    if (messages.length > 1) {
      const activeName = bookingData.name || 'Anonymous Visitor'
      const activeEmail = bookingData.email || 'None'
      saveChatTranscript({
        id: chatSessionId.current,
        user_name: activeName,
        user_email: activeEmail,
        messages: messages.map(m => ({ role: m.role, content: m.content }))
      }).catch(err => console.error(err))
    }
  }, [messages, bookingData.name, bookingData.email])

  const handleSend = async (textToSend) => {
    const text = textToSend || inputValue
    if (!text.trim()) return

    const userMessage = { role: 'user', content: text }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Pre-fill booking details from message text if matching name/email patterns
    if (bookingState === 'collecting_name') {
      setBookingData(prev => ({ ...prev, name: text }))
      setBookingState('collecting_email')
    } else if (bookingState === 'collecting_email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(text.trim())) {
        setBookingData(prev => ({ ...prev, email: text }))
        setBookingState('selecting_datetime')
      }
    }

    try {
      // First attempt to call the serverless API proxy (Vercel Serverless Function)
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      })

      if (res.ok) {
        const data = await res.json()
        if (data.simulated) {
          triggerSimulationResponse(text)
        } else {
          // Process real Claude API response
          const botText = data.content?.[0]?.text || ''
          
          // Check for Claude Tool Use (function calling)
          const toolUse = data.content?.find(c => c.type === 'tool_use')
          if (toolUse && toolUse.name === 'book_appointment') {
            const args = toolUse.input
            setBookingData(prev => ({
              ...prev,
              name: args.name || prev.name || bookingData.name,
              email: args.email || prev.email || bookingData.email,
              phone: args.phone || prev.phone,
              service: args.service || prev.service,
              date: args.date || prev.date,
              time: args.time || prev.time,
              message: args.message || prev.message,
              budget: args.budget || prev.budget
            }))
            setBookingState('selecting_datetime')
            setIsBookingPanelOpen(true)
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: botText || "Awesome! Let's lock in the details for your booking on the right."
            }])
          } else {
            setMessages(prev => [...prev, { role: 'assistant', content: botText }])
          }
        }
      } else {
        triggerSimulationResponse(text)
      }
    } catch (error) {
      triggerSimulationResponse(text)
    } finally {
      setIsLoading(false)
    }
  }

  const triggerSimulationResponse = (text) => {
    setTimeout(() => {
      const response = generateSimulatedResponse(
        text, 
        messages, 
        bookingState, 
        setBookingState, 
        bookingData, 
        setBookingData
      )
      
      if (response.trigger_picker) {
        setBookingState('selecting_datetime')
        setIsBookingPanelOpen(true)
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.content }])
      setIsLoading(false)
    }, 800)
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    if (!bookingData.name || !bookingData.email || !bookingData.date || !bookingData.time) {
      alert('Please fill out all required details.')
      return
    }

    setIsLoading(true)
    try {
      await saveAppointment(bookingData)
      setBookingState('confirmed')
      setIsBookingPanelOpen(false)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `🎉 **Booking Confirmed!**\n\nThank you, **${bookingData.name}**. I have registered your discovery call on **${bookingData.date}** at **${bookingData.time}** for your **${bookingData.service.replace('-', ' ')}** project. A meeting confirmation has been dispatched to **${bookingData.email}**.`
      }])
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const startBookingFlow = () => {
    setBookingState('collecting_name')
    setIsBookingPanelOpen(true)
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: "Great! Let's schedule a discovery call. May I start with your full name?"
    }])
  }

  const handleResetChat = () => {
    if (window.confirm("Restart conversation?")) {
      setMessages([
        { role: 'assistant', content: 'Hello! I am Aria, your AI Guide for HanovaDevs. ⚡ How can I help you automate operations or scale your digital presence today?' }
      ])
      setBookingState('idle')
      setIsBookingPanelOpen(false)
      setBookingData({
        name: '',
        email: '',
        phone: '',
        service: 'ai-automation',
        date: '',
        time: '',
        message: '',
        budget: '$1,000 - $3,000'
      })
      chatSessionId.current = Math.random().toString(36).substr(2, 9)
    }
  }

  return (
    <div className="ai-chatbot-wrapper">
      {/* Minimized Toggle Bubble */}
      <button 
        className={`ai-chatbot-trigger hoverable ${isOpen ? 'ai-chatbot-trigger--active' : ''}`}
        onClick={() => {
          setIsOpen(!isOpen)
          setHasNewMessage(false)
        }}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        ) : (
          <div className="ai-chatbot-icon-container">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {hasNewMessage && <span className="ai-chatbot-badge" />}
          </div>
        )}
      </button>

      {/* Floating Chat Panel (Double width when expanded/booking panel is open) */}
      <div className={`ai-chatbot-panel ${isOpen ? 'ai-chatbot-panel--open' : ''} ${isBookingPanelOpen ? 'ai-chatbot-panel--expanded' : ''}`}>
        
        {/* Panel Header */}
        <div className="ai-chatbot-header">
          <div className="ai-chatbot-profile">
            <div className="ai-chatbot-avatar-wrap">
              <img src="/octopus.png" alt="Aria" className="ai-chatbot-avatar" />
              <span className="ai-chatbot-status-dot" />
            </div>
            <div>
              <h4>Aria</h4>
              <span>HanovaDevs AI Guide</span>
            </div>
          </div>
          
          <div className="ai-chatbot-header-actions">
            <button 
              className={`ai-chatbot-calendar-toggle ${isBookingPanelOpen ? 'ai-chatbot-calendar-toggle--active' : ''}`}
              onClick={() => setIsBookingPanelOpen(!isBookingPanelOpen)}
              title="Toggle Booking Sheet"
            >
              📅
            </button>
            <button 
              className="ai-chatbot-reset-btn" 
              onClick={handleResetChat}
              title="Reset Chat"
            >
              🔄
            </button>
          </div>
        </div>

        {/* Body containing left chat pane and right calendar pane */}
        <div className="ai-chatbot-body">
          {/* Left Chat Pane */}
          <div className="ai-chatbot-chat-pane">
            <div className="ai-chatbot-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`ai-chatbot-msg-bubble ai-chatbot-msg-bubble--${msg.role}`}>
                  <div className="ai-chatbot-msg-content">
                    {msg.content.split('\n').map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="ai-chatbot-msg-bubble ai-chatbot-msg-bubble--assistant ai-chatbot-msg-bubble--loading">
                  <div className="ai-chatbot-typing-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            {bookingState === 'idle' && (
              <div className="ai-chatbot-suggestions">
                <button className="suggestion-chip" onClick={() => handleSend("What services do you offer?")}>💼 Services</button>
                <button className="suggestion-chip" onClick={() => handleSend("How much do you charge?")}>💰 Price Estimate</button>
                <button className="suggestion-chip" onClick={startBookingFlow}>📅 Book Discovery Call</button>
              </div>
            )}

            {/* Input Form Footer */}
            <div className="ai-chatbot-input-area">
              <input 
                type="text" 
                placeholder="Ask Aria anything..." 
                value={inputValue} 
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
              />
              <button 
                onClick={() => handleSend()} 
                disabled={isLoading || !inputValue.trim()}
                className="ai-chatbot-send-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              </button>
            </div>
          </div>

          {/* Right Booking Calendar Pane */}
          <div className={`ai-chatbot-booking-pane ${isBookingPanelOpen ? 'ai-chatbot-booking-pane--open' : ''}`}>
            <div className="ai-chatbot-booking-card-wrapper">
              <div className="booking-pane-header">
                <h5>📅 Schedule Call</h5>
                <p>Fill out details to sync directly with HanovaDevs operations datastore.</p>
              </div>
              
              <form onSubmit={handleBookingSubmit} className="ai-chatbot-booking-form">
                <div className="ai-chatbot-form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={bookingData.name} 
                    onChange={e => setBookingData(prev => ({ ...prev, name: e.target.value }))} 
                    placeholder="Ali Haider"
                  />
                </div>

                <div className="ai-chatbot-form-group">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    value={bookingData.email} 
                    onChange={e => setBookingData(prev => ({ ...prev, email: e.target.value }))} 
                    placeholder="lithedetective@gmail.com"
                  />
                </div>

                <div className="ai-chatbot-form-row">
                  <div className="ai-chatbot-form-group">
                    <label>Preferred Date *</label>
                    <input 
                      type="date" 
                      required 
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingData.date} 
                      onChange={e => setBookingData(prev => ({ ...prev, date: e.target.value }))} 
                    />
                  </div>

                  <div className="ai-chatbot-form-group">
                    <label>Time Slot *</label>
                    <select 
                      required
                      value={bookingData.time}
                      onChange={e => setBookingData(prev => ({ ...prev, time: e.target.value }))}
                    >
                      <option value="">Select Time</option>
                      {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="ai-chatbot-form-group">
                  <label>Project Budget *</label>
                  <select 
                    value={bookingData.budget} 
                    onChange={e => setBookingData(prev => ({ ...prev, budget: e.target.value }))}
                  >
                    <option value="<$1,000">Less than $1,000</option>
                    <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                    <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                    <option value="$5,000+">$5,000+</option>
                  </select>
                </div>

                <div className="ai-chatbot-form-group">
                  <label>Service Area *</label>
                  <select 
                    value={bookingData.service} 
                    onChange={e => setBookingData(prev => ({ ...prev, service: e.target.value }))}
                  >
                    <option value="ai-automation">AI Automation (Featured)</option>
                    <option value="web-design">Web Design & Development</option>
                    <option value="shopify-development">Shopify Store Setup</option>
                    <option value="ugc-ads">UGC Ads & Video Creatives</option>
                    <option value="branding">Brand Design & Identity</option>
                    <option value="seo">SEO & Analytics</option>
                  </select>
                </div>

                <div className="ai-chatbot-form-group">
                  <label>Notes / Requirements</label>
                  <textarea 
                    value={bookingData.message} 
                    onChange={e => setBookingData(prev => ({ ...prev, message: e.target.value }))} 
                    placeholder="Describe your goals..."
                    rows="3"
                  />
                </div>

                <button type="submit" className="btn btn-primary btn--block">
                  Lock in Booking 🚀
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
