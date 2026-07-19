import { useState, useEffect, useRef } from 'react'
import { saveAppointment, saveChatTranscript, getAppointments } from '../lib/supabaseClient'
import './AIChatbot.css'

// Simulated local intelligence engine for local testing offline/without key
const generateSimulatedResponse = async (userText, history, bookingState, setBookingState, bookingData, setBookingData) => {
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
    setBookingData(prev => ({ ...prev, email: userText.trim() }))
    setBookingState('collecting_service')
    return {
      content: "Thank you! What service area are you interested in? (e.g. AI Automation, Web Design, Shopify Store Setup, UGC Ads, Branding, SEO)"
    }
  }

  if (bookingState === 'collecting_service') {
    let matchedService = 'ai-automation'
    if (text.includes('design') || text.includes('web') || text.includes('dev')) matchedService = 'web-design'
    else if (text.includes('shopify') || text.includes('store') || text.includes('commerce')) matchedService = 'shopify-development'
    else if (text.includes('ugc') || text.includes('ad') || text.includes('marketing')) matchedService = 'ugc-ads'
    else if (text.includes('brand') || text.includes('logo')) matchedService = 'branding'
    else if (text.includes('seo') || text.includes('search')) matchedService = 'seo'

    setBookingData(prev => ({ ...prev, service: matchedService }))
    setBookingState('collecting_datetime')
    return {
      content: `Got it! Let's choose a date and time slot. Please provide your preferred date in YYYY-MM-DD format (e.g., 2026-07-20) and time (e.g. 10:00, 14:00, 16:00).`
    }
  }

  if (bookingState === 'collecting_datetime') {
    // Basic date/time parser
    const dateMatch = userText.match(/\d{4}-\d{2}-\d{2}/)
    const timeMatch = userText.match(/\d{2}:\d{2}/)

    const dateStr = dateMatch ? dateMatch[0] : ''
    const timeStr = timeMatch ? timeMatch[0] : ''

    if (!dateStr || !timeStr) {
      return {
        content: "I couldn't quite catch the date and time. Please type the date in YYYY-MM-DD format (e.g., 2026-07-20) and time slot in HH:MM format (e.g. 14:00)."
      }
    }

    // Check availability against local mock db/Supabase
    try {
      const currentAppointments = await getAppointments()
      const isTaken = currentAppointments.some(
        a => a.date === dateStr && a.time === timeStr && a.status !== 'cancelled'
      )
      if (isTaken) {
        return {
          content: `I'm sorry, the slot on ${dateStr} at ${timeStr} is already booked. Could you please select another date or time slot?`
        }
      }
    } catch (e) {
      console.warn("DB check bypassed in simulation:", e)
    }

    const finalBookingData = {
      ...bookingData,
      date: dateStr,
      time: timeStr
    }

    try {
      await saveAppointment(finalBookingData)
      setBookingData(finalBookingData)
      setBookingState('confirmed')
      return {
        content: `🎉 **Booking Confirmed!**\n\nThank you, **${finalBookingData.name}**. I have registered your discovery call on **${finalBookingData.date}** at **${finalBookingData.time}** for your **${finalBookingData.service.replace('-', ' ')}** project. A meeting confirmation has been sent to **${finalBookingData.email}**.`
      }
    } catch (err) {
      console.error(err)
      return {
        content: "I processed your request, but was unable to write it to our database. Could you please try again?"
      }
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

    // Pre-fill booking details from message text if matching name/email patterns in simulated mode
    if (bookingState === 'collecting_name') {
      setBookingData(prev => ({ ...prev, name: text }))
      setBookingState('collecting_email')
    } else if (bookingState === 'collecting_email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(text.trim())) {
        setBookingData(prev => ({ ...prev, email: text }))
        setBookingState('collecting_service')
      }
    }

    // Fetch active bookings context from database
    let bookedSlots = []
    try {
      const currentAppointments = await getAppointments()
      if (Array.isArray(currentAppointments)) {
        bookedSlots = currentAppointments.map(app => ({
          date: app.date,
          time: app.time,
          status: app.status
        }))
      }
    } catch (dbErr) {
      console.warn("Could not load appointments for context:", dbErr)
    }

    try {
      // First attempt to call the serverless API proxy (Vercel Serverless Function)
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          bookedSlots: bookedSlots
        })
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
            const fullBookingData = {
              name: args.name || bookingData.name || 'Valued Client',
              email: args.email || bookingData.email || 'no-email@example.com',
              phone: args.phone || '',
              service: args.service || 'ai-automation',
              date: args.date || '',
              time: args.time || '',
              message: args.message || '',
              budget: args.budget || 'Not Specified'
            }

            try {
              // Save to database
              await saveAppointment(fullBookingData)
              setBookingData(fullBookingData)
              setBookingState('confirmed')

              const confirmationMsg = `🎉 **Booking Confirmed!**\n\nThank you, **${fullBookingData.name}**. I have registered your discovery call on **${fullBookingData.date}** at **${fullBookingData.time}** for your **${fullBookingData.service.replace('-', ' ')}** project. A meeting confirmation has been dispatched to **${fullBookingData.email}**.`
              
              setMessages(prev => [...prev, {
                role: 'assistant',
                content: botText ? `${botText}\n\n${confirmationMsg}` : confirmationMsg
              }])
            } catch (dbErr) {
              console.error("Failed to save booking:", dbErr)
              setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I processed your booking details, but encountered an error saving it to our database. Please try again."
              }])
            }
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
    setTimeout(async () => {
      const response = await generateSimulatedResponse(
        text, 
        messages, 
        bookingState, 
        setBookingState, 
        bookingData, 
        setBookingData
      )
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.content }])
      setIsLoading(false)
    }, 800)
  }

  const startBookingFlow = () => {
    setBookingState('collecting_name')
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

      {/* Floating Chat Panel */}
      <div className={`ai-chatbot-panel ${isOpen ? 'ai-chatbot-panel--open' : ''}`}>
        
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
              className="ai-chatbot-reset-btn" 
              onClick={handleResetChat}
              title="Reset Chat"
            >
              🔄
            </button>
          </div>
        </div>

        {/* Body containing chat pane */}
        <div className="ai-chatbot-body">
          {/* Chat Pane */}
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
        </div>

      </div>
    </div>
  )
}
