import { useState, useEffect } from 'react'
import { getAppointments, getChatTranscripts, updateAppointmentStatus, isSupabaseConfigured } from '../lib/supabaseClient'
import SEO from '../components/SEO'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([])
  const [transcripts, setTranscripts] = useState([])
  const [activeTab, setActiveTab] = useState('appointments') // appointments, transcripts, telemetry
  const [selectedTranscript, setSelectedTranscript] = useState(null)
  const [filterQuery, setFilterQuery] = useState('')
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    async function loadData() {
      const apps = await getAppointments()
      const trans = await getChatTranscripts()
      setAppointments(apps)
      setTranscripts(trans)
    }
    loadData()
  }, [refreshTrigger])

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAppointmentStatus(id, newStatus)
      setRefreshTrigger(prev => prev + 1)
    } catch (err) {
      console.error('Failed to update status:', err)
    }
  }

  const exportToJSON = (data, filename) => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', jsonString)
    downloadAnchor.setAttribute('download', `${filename}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  // Filter lists based on search queries
  const filteredAppointments = appointments.filter(app => 
    app.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    app.email.toLowerCase().includes(filterQuery.toLowerCase()) ||
    app.service.toLowerCase().includes(filterQuery.toLowerCase())
  )

  const filteredTranscripts = transcripts.filter(t => 
    t.user_name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    t.user_email.toLowerCase().includes(filterQuery.toLowerCase())
  )

  // Compute key telemetry statistics
  const stats = {
    totalBookings: appointments.length,
    pendingBookings: appointments.filter(a => a.status === 'pending').length,
    approvedBookings: appointments.filter(a => a.status === 'approved').length,
    totalChats: transcripts.length,
    totalMessages: transcripts.reduce((sum, t) => sum + (t.messages?.length || 0), 0)
  }

  return (
    <div className="admin-page">
      <SEO 
        title="Admin Control Desk — HanovaDevs"
        description="Review scheduled bookings, audit AI chatbot transcripts, and monitor system telemetry."
        url="/admin"
      />

      <header className="admin-hero">
        <div className="container">
          <div className="admin-hero__content">
            <span className="admin-badge">Admin Desk</span>
            <h1>Operations Control <br /><span className="admin-gradient">Portal.</span></h1>
            <p>Review real-time client consultations, audit dynamic AI conversation logs, and verify database sync integrations.</p>
          </div>
        </div>
      </header>

      <section className="admin-dashboard-section">
        <div className="container">
          {/* Key Metric Strip */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card card card-glass">
              <span className="admin-stat-icon">📅</span>
              <div className="admin-stat-info">
                <h3>{stats.totalBookings}</h3>
                <span>Total Bookings</span>
              </div>
            </div>
            <div className="admin-stat-card card card-glass">
              <span className="admin-stat-icon">⏳</span>
              <div className="admin-stat-info">
                <h3>{stats.pendingBookings}</h3>
                <span>Pending Review</span>
              </div>
            </div>
            <div className="admin-stat-card card card-glass">
              <span className="admin-stat-icon">💬</span>
              <div className="admin-stat-info">
                <h3>{stats.totalChats}</h3>
                <span>Aria AI Sessions</span>
              </div>
            </div>
            <div className="admin-stat-card card card-glass">
              <span className="admin-stat-icon">📡</span>
              <div className="admin-stat-info">
                <h3 style={{ fontSize: '1.1rem', color: isSupabaseConfigured ? '#22c55e' : '#f59e0b' }}>
                  {isSupabaseConfigured ? 'Supabase Sync' : 'Local Storage'}
                </h3>
                <span>Active Datastore</span>
              </div>
            </div>
          </div>

          {/* Navigation Controls & Search */}
          <div className="admin-controls-row">
            <div className="admin-tabs">
              <button 
                className={`admin-tab-btn ${activeTab === 'appointments' ? 'admin-tab-btn--active' : ''}`}
                onClick={() => { setActiveTab('appointments'); setSelectedTranscript(null) }}
              >
                Appointments
              </button>
              <button 
                className={`admin-tab-btn ${activeTab === 'transcripts' ? 'admin-tab-btn--active' : ''}`}
                onClick={() => { setActiveTab('transcripts'); setSelectedTranscript(null) }}
              >
                Chat Logs
              </button>
              <button 
                className={`admin-tab-btn ${activeTab === 'telemetry' ? 'admin-tab-btn--active' : ''}`}
                onClick={() => { setActiveTab('telemetry'); setSelectedTranscript(null) }}
              >
                Telemetry Info
              </button>
            </div>

            <div className="admin-search-wrap">
              <input 
                type="text" 
                placeholder={`Search ${activeTab === 'appointments' ? 'bookings' : 'transcripts'}...`}
                value={filterQuery} 
                onChange={e => setFilterQuery(e.target.value)} 
                className="admin-search-input"
              />
              {appointments.length > 0 && (
                <button 
                  className="btn btn-outline btn-export"
                  onClick={() => exportToJSON(appointments, 'hanovadevs_appointments')}
                >
                  Export Data
                </button>
              )}
            </div>
          </div>

          {/* Dashboard Main Workspace */}
          <div className="admin-workspace-grid">
            <div className="admin-main-panel">
              {activeTab === 'appointments' && (
                <div className="admin-appointments-list">
                  {filteredAppointments.length === 0 ? (
                    <div className="admin-empty-state card">
                      <span>📡</span>
                      <h4>No appointments recorded</h4>
                      <p>Try clearing filters or book a consultation via the AI chatbot bubble.</p>
                    </div>
                  ) : (
                    filteredAppointments.map(app => (
                      <div key={app.id} className={`admin-app-card card card-glass admin-app-card--${app.status}`}>
                        <div className="admin-app-card__header">
                          <div>
                            <h4>{app.name}</h4>
                            <span className="admin-app-card__email">{app.email}</span>
                            {app.phone && <span className="admin-app-card__phone"> • {app.phone}</span>}
                          </div>
                          <span className={`status-badge status-badge--${app.status}`}>{app.status}</span>
                        </div>

                        <div className="admin-app-card__details">
                          <div className="detail-pill">
                            <strong>Service:</strong> {app.service.replace('-', ' ')}
                          </div>
                          <div className="detail-pill">
                            <strong>Slot:</strong> {app.date} @ {app.time}
                          </div>
                          {app.budget && (
                            <div className="detail-pill">
                              <strong>Budget:</strong> {app.budget}
                            </div>
                          )}
                        </div>

                        {app.message && (
                          <div className="admin-app-card__message">
                            <strong>Client Message:</strong>
                            <p>"{app.message}"</p>
                          </div>
                        )}

                        <div className="admin-app-card__actions">
                          {app.status === 'pending' && (
                            <>
                              <button 
                                onClick={() => handleStatusChange(app.id, 'approved')} 
                                className="btn btn-sm btn-approve"
                              >
                                Approve Slot
                              </button>
                              <button 
                                onClick={() => handleStatusChange(app.id, 'cancelled')} 
                                className="btn btn-sm btn-reject"
                              >
                                Decline
                              </button>
                            </>
                          )}
                          {app.status === 'approved' && (
                            <button 
                              onClick={() => handleStatusChange(app.id, 'completed')} 
                              className="btn btn-sm btn-complete"
                            >
                              Mark Completed
                            </button>
                          )}
                          {(app.status === 'cancelled' || app.status === 'completed') && (
                            <button 
                              onClick={() => handleStatusChange(app.id, 'pending')} 
                              className="btn btn-sm btn-reset"
                            >
                              Reset status
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'transcripts' && (
                <div className="admin-transcripts-layout">
                  <div className="admin-transcripts-list">
                    {filteredTranscripts.length === 0 ? (
                      <div className="admin-empty-state card">
                        <span>💬</span>
                        <h4>No transcripts found</h4>
                        <p>Have a conversation with Aria chatbot first to populate this section.</p>
                      </div>
                    ) : (
                      filteredTranscripts.map(t => (
                        <div 
                          key={t.id} 
                          className={`admin-transcript-row card card-glass ${selectedTranscript?.id === t.id ? 'admin-transcript-row--active' : ''}`}
                          onClick={() => setSelectedTranscript(t)}
                        >
                          <div className="transcript-row-header">
                            <strong>{t.user_name}</strong>
                            <span>{new Date(t.created_at).toLocaleDateString()}</span>
                          </div>
                          <span className="transcript-row-email">{t.user_email}</span>
                          <span className="transcript-row-count">{t.messages?.length || 0} messages exchanged</span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Transcript Viewer Sidebar Panel */}
                  <div className="admin-transcript-viewer">
                    {selectedTranscript ? (
                      <div className="transcript-viewer-inner card card-glass">
                        <div className="viewer-header">
                          <div>
                            <h4>Conversation Audit</h4>
                            <span>Session ID: {selectedTranscript.id}</span>
                          </div>
                          <button 
                            className="btn btn-sm btn-outline" 
                            onClick={() => setSelectedTranscript(null)}
                          >
                            Close
                          </button>
                        </div>

                        <div className="viewer-messages-log">
                          {selectedTranscript.messages.map((m, idx) => (
                            <div key={idx} className={`viewer-msg viewer-msg--${m.role}`}>
                              <span className="viewer-msg-tag">{m.role === 'user' ? 'Client' : 'Aria'}</span>
                              <p>{m.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="transcript-viewer-placeholder card">
                        <span>👁️</span>
                        <h4>Transcript Audit Desk</h4>
                        <p>Select a conversation session from the left column to read the complete logs and see what the client requested.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'telemetry' && (
                <div className="admin-telemetry-panel card card-glass">
                  <h4>📡 Database Configuration & Systems Telemetry</h4>
                  
                  <div className="telemetry-info-box">
                    <p>HanovaDevs leverages dynamic state checking to support serverless operations across various deployment pipelines (Vercel, AWS). Review the status parameters below:</p>
                  </div>

                  <div className="telemetry-grid">
                    <div className="telemetry-item">
                      <span className="telemetry-label">Supabase URL configured:</span>
                      <span className={`telemetry-status ${isSupabaseConfigured ? 'status--active' : 'status--inactive'}`}>
                        {isSupabaseConfigured ? 'Yes (VITE_SUPABASE_URL found)' : 'No (Using local fallback)'}
                      </span>
                    </div>

                    <div className="telemetry-item">
                      <span className="telemetry-label">Supabase Client initialized:</span>
                      <span className={`telemetry-status ${isSupabaseConfigured ? 'status--active' : 'status--inactive'}`}>
                        {isSupabaseConfigured ? 'Active' : 'Offline'}
                      </span>
                    </div>

                    <div className="telemetry-item">
                      <span className="telemetry-label">Aria System Prompt Version:</span>
                      <span className="telemetry-value">v1.2.6 (Tool Calling enabled)</span>
                    </div>

                    <div className="telemetry-item">
                      <span className="telemetry-label">Claude API endpoint:</span>
                      <span className="telemetry-value">/api/chat (Serverless Proxy Router)</span>
                    </div>

                    <div className="telemetry-item">
                      <span className="telemetry-label">Browser Storage Allocation:</span>
                      <span className="telemetry-value">localStorage (hd_appointments, hd_transcripts)</span>
                    </div>
                  </div>

                  <div className="telemetry-footer-box">
                    <h5>💡 Connection Tips:</h5>
                    <p>To wire up your production Supabase database, simply add the following environment variables to your deployment settings or local `.env.local` file:</p>
                    <code>VITE_SUPABASE_URL=your_supabase_project_url</code>
                    <code>VITE_SUPABASE_ANON_KEY=your_supabase_anon_key</code>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
