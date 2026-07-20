import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import './Calculator.css'

export default function Calculator() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('growth') // 'growth' or 'estimator'

  // --- Growth Calculator States ---
  const [adSpend, setAdSpend] = useState(10000)
  const [aov, setAov] = useState(60)
  const [currentConvRate, setCurrentConvRate] = useState(1.5)
  const [currentCpc, setCurrentCpc] = useState(1.20)
  
  // Hanova Optimizations
  const [targetCpc, setTargetCpc] = useState(0.80) // Lower CPC via higher CTR / Hook Rate
  const [targetConvRate, setTargetConvRate] = useState(3.0) // Higher CR via performance Web Design

  // --- Estimator States ---
  const [serviceType, setServiceType] = useState('web-design')
  
  // Web Design Options
  const [webPages, setWebPages] = useState(5)
  const [webComplexity, setWebComplexity] = useState('custom') // 'clean', 'custom', 'cinematic'
  const [webCms, setWebCms] = useState(false)
  const [webStack, setWebStack] = useState('react') // 'vanilla', 'react', 'nextjs'

  // Custom Software Options
  const [softwareScale, setSoftwareScale] = useState('professional') // 'mvp', 'professional', 'enterprise'
  const [softwareDb, setSoftwareDb] = useState(true)
  const [softwareType, setSoftwareType] = useState('web') // 'web', 'mobile', 'desktop'

  // UGC Ads Options
  const [ugcVideos, setUgcVideos] = useState(6)
  const [ugcCreators, setUgcCreators] = useState(2)
  const [ugcPlatforms, setUgcPlatforms] = useState({
    tiktok: true,
    instagram: true,
    youtube: false
  })
  const [ugcScripting, setUgcScripting] = useState(true)

  // AI Automation Options
  const [aiWorkflows, setAiWorkflows] = useState(3)
  const [aiIntegrations, setAiIntegrations] = useState('medium') // 'simple', 'medium', 'complex'
  const [aiType, setAiType] = useState('chatbot') // 'chatbot', 'workflows', 'rag'

  // Graphic Design Options
  const [designLogos, setDesignLogos] = useState(true)
  const [designPosters, setDesignPosters] = useState(false)
  const [designPackaging, setDesignPackaging] = useState(false)
  const [designApparel, setDesignApparel] = useState(false)

  // Social Media Options
  const [smPlatforms, setSmPlatforms] = useState(2)
  const [smFrequency, setSmFrequency] = useState('medium') // 'low', 'medium', 'high'

  // Shopify Store Options
  const [shopifyTheme, setShopifyTheme] = useState('standard') // 'standard', 'custom'
  const [shopifyKlaviyo, setShopifyKlaviyo] = useState(true)
  const [shopifyRecharge, setShopifyRecharge] = useState(false)
  const [shopifyReviews, setShopifyReviews] = useState(true)
  const [shopifyProducts, setShopifyProducts] = useState(20)

  // General Estimator Options
  const [projectSpeed, setProjectSpeed] = useState('standard') // 'standard', 'expedited'
  const [projectSupport, setProjectSupport] = useState('none') // 'none', 'basic', 'partnership'

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // --- Growth Math Calculations ---
  const currentClicks = adSpend / currentCpc
  const currentPurchases = currentClicks * (currentConvRate / 100)
  const currentRevenue = currentPurchases * aov
  const currentCpa = currentPurchases > 0 ? adSpend / currentPurchases : 0
  const currentRoas = adSpend > 0 ? currentRevenue / adSpend : 0

  const targetClicks = adSpend / targetCpc
  const targetPurchases = targetClicks * (targetConvRate / 100)
  const targetRevenue = targetPurchases * aov
  const targetCpa = targetPurchases > 0 ? adSpend / targetPurchases : 0
  const targetRoas = adSpend > 0 ? targetRevenue / adSpend : 0

  const revenueLift = targetRevenue - currentRevenue
  const cpaSavings = currentCpa - targetCpa
  const roasLift = targetRoas - currentRoas

  // Toggle helper for platforms checkbox
  const handlePlatformToggle = (platform) => {
    setUgcPlatforms(prev => ({ ...prev, [platform]: !prev[platform] }))
  }

  // --- Estimator Price & Timeline Calculations ---
  const calculateEstimate = () => {
    let basePrice = 0
    let timelineWeeks = '2-3'

    if (serviceType === 'web-design') {
      basePrice = 390
      basePrice += webPages * 45
      
      if (webComplexity === 'custom') basePrice *= 1.10
      if (webComplexity === 'cinematic') basePrice *= 1.20
      if (webCms) basePrice += 120

      // Tech stack adjustments
      if (webStack === 'nextjs') basePrice += 150
      if (webStack === 'vanilla') basePrice -= 80

      // Timeline (Reduced according to user's high speed: 5 weeks -> 2 weeks)
      timelineWeeks = webPages <= 5 ? '1-2' : webPages <= 15 ? '2-3' : '3-4'
    } else if (serviceType === 'software-development') {
      if (softwareScale === 'mvp') {
        basePrice = 950
        timelineWeeks = '2-3'
      } else if (softwareScale === 'professional') {
        basePrice = 2200
        timelineWeeks = '3-5'
      } else {
        basePrice = 4900
        timelineWeeks = '5-8'
      }
      if (softwareDb) basePrice += 200

      // Platform type adjustment
      if (softwareType === 'mobile') basePrice += 400
      if (softwareType === 'desktop') basePrice += 300
    } else if (serviceType === 'ugc-ads') {
      basePrice = ugcVideos * 50
      basePrice += ugcCreators * 30
      
      // Counting active platforms
      const activePlatformsCount = Object.values(ugcPlatforms).filter(Boolean).length
      if (activePlatformsCount > 1) basePrice += (activePlatformsCount - 1) * 40
      if (ugcScripting) basePrice += 60

      timelineWeeks = '5-10 Days'
    } else if (serviceType === 'ai-automation') {
      basePrice = 490
      basePrice += aiWorkflows * 90
      
      if (aiIntegrations === 'medium') basePrice += 120
      if (aiIntegrations === 'complex') basePrice += 350

      if (aiType === 'rag') basePrice += 180
      if (aiType === 'chatbot') basePrice += 120

      timelineWeeks = aiWorkflows <= 3 ? '1-2' : '2-4'
    } else if (serviceType === 'graphic-design') {
      basePrice = 90 // Base for design consultation
      if (designLogos) basePrice += 80
      if (designPosters) basePrice += 45
      if (designPackaging) basePrice += 120
      if (designApparel) basePrice += 60

      timelineWeeks = '3-7 Days'
    } else if (serviceType === 'social-media') {
      // Calculated as a setup/first-month fee
      basePrice = 150
      basePrice += smPlatforms * 45
      
      if (smFrequency === 'medium') basePrice += 45
      if (smFrequency === 'high') basePrice += 90

      timelineWeeks = 'Setup in 1 Week'
    } else if (serviceType === 'shopify-development') {
      basePrice = 490
      if (shopifyTheme === 'custom') basePrice += 200
      if (shopifyKlaviyo) basePrice += 60
      if (shopifyRecharge) basePrice += 80
      if (shopifyReviews) basePrice += 40
      
      if (shopifyProducts <= 20) basePrice += 40
      else if (shopifyProducts <= 100) basePrice += 80
      else basePrice += 150

      timelineWeeks = '5-10 Days'
    }

    // Adjust for speed
    if (projectSpeed === 'expedited') {
      basePrice *= 1.25
      if (timelineWeeks.includes('Week')) {
        const [start, end] = timelineWeeks.replace(' Weeks', '').replace('Week', '').split('-').map(Number)
        timelineWeeks = `${Math.max(1, Math.round(start * 0.65))}-${Math.max(2, Math.round(end * 0.65))} Weeks`
      } else if (timelineWeeks.includes('Days')) {
        const [start, end] = timelineWeeks.replace(' Days', '').split('-').map(Number)
        timelineWeeks = `${Math.max(3, Math.round(start * 0.65))}-${Math.max(4, Math.round(end * 0.65))} Days`
      }
    }

    let minPrice = Math.round(basePrice * 0.95)
    let maxPrice = Math.round(basePrice * 1.05)

    // Round to nearest hundred
    minPrice = Math.round(minPrice / 100) * 100
    maxPrice = Math.round(maxPrice / 100) * 100

    return {
      range: `$${minPrice.toLocaleString()} – $${maxPrice.toLocaleString()}`,
      timeline: timelineWeeks.includes('Days') || timelineWeeks.includes('Setup') ? timelineWeeks : `${timelineWeeks} Weeks`,
      minPrice
    }
  }

  const estimate = calculateEstimate()

  const handleSecureQuote = () => {
    let details = ''
    const { range, timeline, minPrice } = calculateEstimate()

    if (serviceType === 'web-design') {
      details = `${webPages} pages, ${webComplexity} design complexity, Stack: ${webStack}${webCms ? ', with CMS' : ''}`
    } else if (serviceType === 'software-development') {
      details = `${softwareScale} scale ${softwareType} software${softwareDb ? ' with database' : ''}`
    } else if (serviceType === 'ugc-ads') {
      const platformsList = Object.keys(ugcPlatforms).filter(k => ugcPlatforms[k]).join('/')
      details = `${ugcVideos} videos, ${ugcCreators} creators, Platforms: ${platformsList}${ugcScripting ? ', with Scripting' : ''}`
    } else if (serviceType === 'ai-automation') {
      details = `${aiWorkflows} automated workflows, Type: ${aiType}, Integrations: ${aiIntegrations}`
    } else if (serviceType === 'graphic-design') {
      const assets = []
      if (designLogos) assets.push('Logo Suite')
      if (designPosters) assets.push('Posters/Banners')
      if (designPackaging) assets.push('Packaging')
      if (designApparel) assets.push('Apparel')
      details = `Graphic Design for: ${assets.join(', ') || 'None'}`
    } else if (serviceType === 'social-media') {
      details = `Social Media Setup: ${smPlatforms} platforms, Posting Frequency: ${smFrequency}`
    } else if (serviceType === 'shopify-development') {
      const integrations = []
      if (shopifyKlaviyo) integrations.push('Klaviyo')
      if (shopifyRecharge) integrations.push('Recharge')
      if (shopifyReviews) integrations.push('Reviews')
      details = `Shopify: ${shopifyTheme} theme, ${shopifyProducts} products, Integrations: ${integrations.join('/') || 'None'}`
    }

    details += `, Speed: ${projectSpeed}, Support: ${projectSupport}`

    // Map minPrice to standard Contact form budget options
    let budgetParam = ''
    if (minPrice < 1000) {
      budgetParam = 'Under $1,000'
    } else if (minPrice < 5000) {
      budgetParam = '$1,000 – $5,000'
    } else if (minPrice < 15000) {
      budgetParam = '$5,000 – $15,000'
    } else if (minPrice < 50000) {
      budgetParam = '$15,000 – $50,000'
    } else {
      budgetParam = '$50,000+'
    }

    const serviceName = serviceType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

    // Dispatch event to open AI Chatbot with pre-fed quote parameters
    window.dispatchEvent(new CustomEvent('hanova_secure_quote', {
      detail: {
        service: serviceName,
        details,
        range,
        timeline,
        minPrice
      }
    }))
  }

  return (
    <div className="calculator-page">
      <SEO 
        title="Interactive Growth & Cost Estimator Hub — HanovaDevs"
        description="Calculate your potential revenue lift with optimized UGC ads and high-performance web design, or estimate your custom project budget."
        url="/calculator"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Cost Calculator', item: '/calculator' }
        ]}
      />

      {/* Cinematic Hero */}
      <section className="calc-hero">
        <div className="calc-hero__bg" />
        <div className="calc-hero__glow-1" />
        <div className="calc-hero__glow-2" />
        <div className="container">
          <div className="calc-hero__content reveal">
            <span className="section-label">Interactive Tools</span>
            <h1>Data-Driven <br /><span className="gradient-text">Projections.</span></h1>
            <p>Calculate your potential marketing ROI lift or estimate your custom project timeline and budget instantly.</p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="calc-interface section">
        <div className="container">
          <div className="calc-tabs">
            <button 
              className={`calc-tab-btn ${activeTab === 'growth' ? 'active' : ''}`}
              onClick={() => setActiveTab('growth')}
            >
              🚀 ROAS & Growth Calculator
            </button>
            <button 
              className={`calc-tab-btn ${activeTab === 'estimator' ? 'active' : ''}`}
              onClick={() => setActiveTab('estimator')}
            >
              📋 Custom Project Estimator
            </button>
          </div>

          {activeTab === 'growth' ? (
            <div className="calc-grid reveal">
              {/* Inputs */}
              <div className="calc-card calc-card--inputs">
                <h2>Current Marketing Metrics</h2>
                <p className="calc-card-subtitle">Input your current performance to see how optimizing creatives and site speeds compounds profit.</p>

                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <label htmlFor="ad-spend">Monthly Ad Spend</label>
                    <span className="calc-value-display">${adSpend.toLocaleString()}</span>
                  </div>
                  <input 
                    id="ad-spend"
                    type="range" 
                    min="1000" 
                    max="100000" 
                    step="1000" 
                    value={adSpend} 
                    onChange={(e) => setAdSpend(Number(e.target.value))} 
                  />
                  <div className="calc-range-bounds"><span>$1,000</span><span>$100,000+</span></div>
                </div>

                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <label htmlFor="aov">Average Order Value (AOV)</label>
                    <span className="calc-value-display">${aov}</span>
                  </div>
                  <input 
                    id="aov"
                    type="range" 
                    min="10" 
                    max="500" 
                    step="5" 
                    value={aov} 
                    onChange={(e) => setAov(Number(e.target.value))} 
                  />
                  <div className="calc-range-bounds"><span>$10</span><span>$500</span></div>
                </div>

                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <label htmlFor="current-cpc">Current Cost Per Click (CPC)</label>
                    <span className="calc-value-display">${currentCpc.toFixed(2)}</span>
                  </div>
                  <input 
                    id="current-cpc"
                    type="range" 
                    min="0.10" 
                    max="5.00" 
                    step="0.05" 
                    value={currentCpc} 
                    onChange={(e) => {
                      setCurrentCpc(Number(e.target.value))
                      if (targetCpc > Number(e.target.value)) setTargetCpc(Number(e.target.value))
                    }} 
                  />
                  <div className="calc-range-bounds"><span>$0.10</span><span>$5.00</span></div>
                </div>

                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <label htmlFor="current-cr">Current Store Conversion Rate</label>
                    <span className="calc-value-display">{currentConvRate.toFixed(1)}%</span>
                  </div>
                  <input 
                    id="current-cr"
                    type="range" 
                    min="0.1" 
                    max="10.0" 
                    step="0.1" 
                    value={currentConvRate} 
                    onChange={(e) => {
                      setCurrentConvRate(Number(e.target.value))
                      if (targetConvRate < Number(e.target.value)) setTargetConvRate(Number(e.target.value))
                    }} 
                  />
                  <div className="calc-range-bounds"><span>0.1%</span><span>10.0%</span></div>
                </div>

                <h2 style={{ marginTop: '2.5rem' }}>HanovaDevs Optimization Targets</h2>
                <p className="calc-card-subtitle">Adjust the sliders to simulate the impact of high-hook UGC ads (lower CPC) and performance engineering (higher CR).</p>

                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <label htmlFor="target-cpc">Target Cost Per Click (with UGC Ads)</label>
                    <span className="calc-value-display text-green">${targetCpc.toFixed(2)}</span>
                  </div>
                  <input 
                    id="target-cpc"
                    type="range" 
                    min="0.10" 
                    max={currentCpc} 
                    step="0.05" 
                    value={targetCpc} 
                    onChange={(e) => setTargetCpc(Number(e.target.value))} 
                  />
                  <div className="calc-range-bounds"><span>$0.10</span><span>Current (${currentCpc.toFixed(2)})</span></div>
                </div>

                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <label htmlFor="target-cr">Target Conversion Rate (with Custom Web Design)</label>
                    <span className="calc-value-display text-green">{targetConvRate.toFixed(1)}%</span>
                  </div>
                  <input 
                    id="target-cr"
                    type="range" 
                    min={currentConvRate} 
                    max="12.0" 
                    step="0.1" 
                    value={targetConvRate} 
                    onChange={(e) => setTargetConvRate(Number(e.target.value))} 
                  />
                  <div className="calc-range-bounds"><span>Current ({currentConvRate.toFixed(1)}%)</span><span>12.0%</span></div>
                </div>
              </div>

              {/* Outputs */}
              <div className="calc-card calc-card--outputs">
                <h2>Projected Growth Metrics</h2>
                <p className="calc-card-subtitle">The compound effect of combining optimized creatives with a fast, high-converting landing page.</p>

                <div className="calc-lift-highlight">
                  <span className="calc-lift-label">Estimated Monthly Revenue Lift</span>
                  <span className="calc-lift-value">${Math.round(revenueLift).toLocaleString()}</span>
                  <p className="calc-lift-subtext">Compounded extra revenue generated from the same monthly ad budget.</p>
                </div>

                <div className="calc-metrics-grid">
                  <div className="calc-metric-compare-card">
                    <h3>Revenue</h3>
                    <div className="metric-bar-group">
                      <div className="metric-bar-label">Current: <span>${Math.round(currentRevenue).toLocaleString()}</span></div>
                      <div className="metric-bar-track">
                        <div className="metric-bar-fill current" style={{ width: `${Math.max(10, Math.min(100, (currentRevenue / targetRevenue) * 100))}%` }}></div>
                      </div>
                    </div>
                    <div className="metric-bar-group">
                      <div className="metric-bar-label text-green">Projected: <span>${Math.round(targetRevenue).toLocaleString()}</span></div>
                      <div className="metric-bar-track">
                        <div className="metric-bar-fill target" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="calc-metric-compare-card">
                    <h3>ROAS</h3>
                    <div className="metric-compare-row">
                      <div className="compare-item">
                        <span className="compare-label">Current</span>
                        <span className="compare-value">{currentRoas.toFixed(2)}x</span>
                      </div>
                      <div className="compare-arrow">→</div>
                      <div className="compare-item">
                        <span className="compare-label text-green">Projected</span>
                        <span className="compare-value text-green">{targetRoas.toFixed(2)}x</span>
                      </div>
                    </div>
                    <div className="compare-badge">+{roasLift.toFixed(1)}x ROAS Increase</div>
                  </div>

                  <div className="calc-metric-compare-card">
                    <h3>Cost Per Acquisition (CPA)</h3>
                    <div className="metric-compare-row">
                      <div className="compare-item">
                        <span className="compare-label">Current</span>
                        <span className="compare-value">${currentCpa.toFixed(2)}</span>
                      </div>
                      <div className="compare-arrow">→</div>
                      <div className="compare-item">
                        <span className="compare-label text-green">Projected</span>
                        <span className="compare-value text-green">${targetCpa.toFixed(2)}</span>
                      </div>
                    </div>
                    {cpaSavings > 0 && (
                      <div className="compare-badge compare-badge--green">Save ${cpaSavings.toFixed(2)} per Customer</div>
                    )}
                  </div>
                </div>

                <div className="calc-cta-section">
                  <h3>Unlock this growth today</h3>
                  <p>Our multidisciplinary approach connects ad creatives directly with high-converting web engineering to eliminate conversion friction.</p>
                  <button onClick={handleSecureQuote} className="btn btn-primary w-100">
                    Discuss This Strategy 🚀
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="calc-grid reveal">
              {/* Inputs */}
              <div className="calc-card calc-card--inputs">
                <h2>Project Parameters</h2>
                <p className="calc-card-subtitle">Select your service and configure options to estimate your project budget and development timeline.</p>

                <div className="estimator-service-select">
                  <label htmlFor="service-select">Select Service Type</label>
                  <div className="service-options" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px' }}>
                    <button 
                      className={`service-opt-btn ${serviceType === 'web-design' ? 'active' : ''}`}
                      onClick={() => setServiceType('web-design')}
                    >
                      💻 Web Dev
                    </button>
                    <button 
                      className={`service-opt-btn ${serviceType === 'shopify-development' ? 'active' : ''}`}
                      onClick={() => setServiceType('shopify-development')}
                    >
                      🛍️ Shopify
                    </button>
                    <button 
                      className={`service-opt-btn ${serviceType === 'software-development' ? 'active' : ''}`}
                      onClick={() => setServiceType('software-development')}
                    >
                      ⚙️ Software
                    </button>
                    <button 
                      className={`service-opt-btn ${serviceType === 'ugc-ads' ? 'active' : ''}`}
                      onClick={() => setServiceType('ugc-ads')}
                    >
                      📸 UGC Ads
                    </button>
                    <button 
                      className={`service-opt-btn ${serviceType === 'ai-automation' ? 'active' : ''}`}
                      onClick={() => setServiceType('ai-automation')}
                    >
                      🤖 AI Bots
                    </button>
                    <button 
                      className={`service-opt-btn ${serviceType === 'graphic-design' ? 'active' : ''}`}
                      onClick={() => setServiceType('graphic-design')}
                    >
                      🎨 Design
                    </button>
                    <button 
                      className={`service-opt-btn ${serviceType === 'social-media' ? 'active' : ''}`}
                      onClick={() => setServiceType('social-media')}
                    >
                      📱 Social
                    </button>
                  </div>
                </div>

                <div className="estimator-dynamic-fields">
                  {/* Web Design Fields */}
                  {serviceType === 'web-design' && (
                    <>
                      <div className="calc-input-group">
                        <div className="calc-input-header">
                          <label htmlFor="web-pages">Number of Pages</label>
                          <span className="calc-value-display">{webPages} Pages</span>
                        </div>
                        <input 
                          id="web-pages"
                          type="range" 
                          min="1" 
                          max="30" 
                          step="1" 
                          value={webPages} 
                          onChange={(e) => setWebPages(Number(e.target.value))} 
                        />
                        <div className="calc-range-bounds"><span>1 Page</span><span>30 Pages</span></div>
                      </div>

                      <div className="calc-input-group">
                        <label>Technical Stack</label>
                        <div className="toggle-options toggle-options--half" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                          <button 
                            className={`toggle-opt-btn ${webStack === 'vanilla' ? 'active' : ''}`}
                            onClick={() => setWebStack('vanilla')}
                            style={{ padding: '0.8rem', fontSize: '0.8rem' }}
                          >
                            Vanilla HTML/JS
                            <span style={{ fontSize: '0.7rem' }}>Simple, ultra-lightweight</span>
                          </button>
                          <button 
                            className={`toggle-opt-btn ${webStack === 'react' ? 'active' : ''}`}
                            onClick={() => setWebStack('react')}
                            style={{ padding: '0.8rem', fontSize: '0.8rem' }}
                          >
                            React (Vite)
                            <span style={{ fontSize: '0.7rem' }}>Highly interactive SPA</span>
                          </button>
                          <button 
                            className={`toggle-opt-btn ${webStack === 'nextjs' ? 'active' : ''}`}
                            onClick={() => setWebStack('nextjs')}
                            style={{ padding: '0.8rem', fontSize: '0.8rem' }}
                          >
                            Next.js (SSR)
                            <span style={{ fontSize: '0.7rem' }}>Enterprise, optimal SEO</span>
                          </button>
                        </div>
                      </div>

                      <div className="calc-input-group">
                        <label>Design & Motion Complexity</label>
                        <div className="toggle-options">
                          <button 
                            className={`toggle-opt-btn ${webComplexity === 'clean' ? 'active' : ''}`}
                            onClick={() => setWebComplexity('clean')}
                          >
                            Clean & Minimalist
                            <span>Focus on raw speed, clear typography</span>
                          </button>
                          <button 
                            className={`toggle-opt-btn ${webComplexity === 'custom' ? 'active' : ''}`}
                            onClick={() => setWebComplexity('custom')}
                          >
                            Premium Custom
                            <span>Creative micro-interactions, custom layouts</span>
                          </button>
                          <button 
                            className={`toggle-opt-btn ${webComplexity === 'cinematic' ? 'active' : ''}`}
                            onClick={() => setWebComplexity('cinematic')}
                          >
                            Immersive Cinematic
                            <span>Premium GSAP timelines, WebGL, scroll-driven narratives</span>
                          </button>
                        </div>
                      </div>

                      <div className="calc-input-group calc-input-group--checkbox">
                        <input 
                          id="web-cms"
                          type="checkbox" 
                          checked={webCms} 
                          onChange={(e) => setWebCms(e.target.checked)} 
                        />
                        <label htmlFor="web-cms">CMS Integration (Sanity, WordPress, or custom headless backend)</label>
                      </div>
                    </>
                  )}

                  {/* Custom Software Fields */}
                  {serviceType === 'software-development' && (
                    <>
                      <div className="calc-input-group">
                        <label>Platform Target</label>
                        <div className="toggle-options toggle-options--half" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                          <button 
                            className={`toggle-opt-btn ${softwareType === 'web' ? 'active' : ''}`}
                            onClick={() => setSoftwareType('web')}
                          >
                            Web Application
                            <span>SaaS, internal portal</span>
                          </button>
                          <button 
                            className={`toggle-opt-btn ${softwareType === 'mobile' ? 'active' : ''}`}
                            onClick={() => setSoftwareType('mobile')}
                          >
                            Mobile App
                            <span>iOS & Android native</span>
                          </button>
                          <button 
                            className={`toggle-opt-btn ${softwareType === 'desktop' ? 'active' : ''}`}
                            onClick={() => setSoftwareType('desktop')}
                          >
                            Desktop App
                            <span>Windows/Mac client</span>
                          </button>
                        </div>
                      </div>

                      <div className="calc-input-group">
                        <label>Project Scale & Architecture</label>
                        <div className="toggle-options">
                          <button 
                            className={`toggle-opt-btn ${softwareScale === 'mvp' ? 'active' : ''}`}
                            onClick={() => setSoftwareScale('mvp')}
                          >
                            Basic MVP
                            <span>Core user flow, single database, validate market</span>
                          </button>
                          <button 
                            className={`toggle-opt-btn ${softwareScale === 'professional' ? 'active' : ''}`}
                            onClick={() => setSoftwareScale('professional')}
                          >
                            Professional Platform
                            <span>Multi-tenant SaaS, billing integrations, user roles</span>
                          </button>
                          <button 
                            className={`toggle-opt-btn ${softwareScale === 'enterprise' ? 'active' : ''}`}
                            onClick={() => setSoftwareScale('enterprise')}
                          >
                            Enterprise Solution
                            <span>Docker/AWS, high-volume caching, custom API pipelines</span>
                          </button>
                        </div>
                      </div>

                      <div className="calc-input-group calc-input-group--checkbox">
                        <input 
                          id="soft-db"
                          type="checkbox" 
                          checked={softwareDb} 
                          onChange={(e) => setSoftwareDb(e.target.checked)} 
                        />
                        <label htmlFor="soft-db">Requires Custom Database & API backend development</label>
                      </div>
                    </>
                  )}

                  {/* UGC Ads Fields */}
                  {serviceType === 'ugc-ads' && (
                    <>
                      <div className="calc-input-group">
                        <div className="calc-input-header">
                          <label htmlFor="ugc-vids">Number of Ad Creatives</label>
                          <span className="calc-value-display">{ugcVideos} Videos</span>
                        </div>
                        <input 
                          id="ugc-vids"
                          type="range" 
                          min="3" 
                          max="24" 
                          step="3" 
                          value={ugcVideos} 
                          onChange={(e) => setUgcVideos(Number(e.target.value))} 
                        />
                        <div className="calc-range-bounds"><span>3 Videos</span><span>24 Videos</span></div>
                      </div>

                      <div className="calc-input-group">
                        <div className="calc-input-header">
                          <label htmlFor="ugc-creators">Number of Content Creators</label>
                          <span className="calc-value-display">{ugcCreators} Creators</span>
                        </div>
                        <input 
                          id="ugc-creators"
                          type="range" 
                          min="1" 
                          max="6" 
                          step="1" 
                          value={ugcCreators} 
                          onChange={(e) => setUgcCreators(Number(e.target.value))} 
                        />
                        <div className="calc-range-bounds"><span>1 Creator</span><span>6 Creators</span></div>
                      </div>

                      <div className="calc-input-group">
                        <label>Target Social Networks</label>
                        <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', cursor: 'pointer' }}>
                            <input type="checkbox" checked={ugcPlatforms.tiktok} onChange={() => handlePlatformToggle('tiktok')} />
                            TikTok Spark Ads
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', cursor: 'pointer' }}>
                            <input type="checkbox" checked={ugcPlatforms.instagram} onChange={() => handlePlatformToggle('instagram')} />
                            Instagram Reels
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', cursor: 'pointer' }}>
                            <input type="checkbox" checked={ugcPlatforms.youtube} onChange={() => handlePlatformToggle('youtube')} />
                            YouTube Shorts
                          </label>
                        </div>
                      </div>

                      <div className="calc-input-group calc-input-group--checkbox">
                        <input 
                          id="ugc-script"
                          type="checkbox" 
                          checked={ugcScripting} 
                          onChange={(e) => setUgcScripting(e.target.checked)} 
                        />
                        <label htmlFor="ugc-script">Include psychology-backed ad concept scripting & hook writing</label>
                      </div>
                    </>
                  )}

                  {/* AI Automation Fields */}
                  {serviceType === 'ai-automation' && (
                    <>
                      <div className="calc-input-group">
                        <label>AI Implementation Type</label>
                        <div className="toggle-options toggle-options--half" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                          <button 
                            className={`toggle-opt-btn ${aiType === 'chatbot' ? 'active' : ''}`}
                            onClick={() => setAiType('chatbot')}
                          >
                            Conversational Bot
                            <span>Lead gen / Customer support bot</span>
                          </button>
                          <button 
                            className={`toggle-opt-btn ${aiType === 'workflows' ? 'active' : ''}`}
                            onClick={() => setAiType('workflows')}
                          >
                            Workflow Automation
                            <span>API automation, data sync pipelines</span>
                          </button>
                          <button 
                            className={`toggle-opt-btn ${aiType === 'rag' ? 'active' : ''}`}
                            onClick={() => setAiType('rag')}
                          >
                            Custom RAG Knowledge
                            <span>Train AI models on business docs</span>
                          </button>
                        </div>
                      </div>

                      <div className="calc-input-group">
                        <div className="calc-input-header">
                          <label htmlFor="ai-wf">Number of Core Workflows</label>
                          <span className="calc-value-display">{aiWorkflows} Workflows</span>
                        </div>
                        <input 
                          id="ai-wf"
                          type="range" 
                          min="1" 
                          max="10" 
                          step="1" 
                          value={aiWorkflows} 
                          onChange={(e) => setAiWorkflows(Number(e.target.value))} 
                        />
                        <div className="calc-range-bounds"><span>1 Workflow</span><span>10 Workflows</span></div>
                      </div>

                      <div className="calc-input-group">
                        <label>Integration Complexity</label>
                        <div className="toggle-options">
                          <button 
                            className={`toggle-opt-btn ${aiIntegrations === 'simple' ? 'active' : ''}`}
                            onClick={() => setAiIntegrations('simple')}
                          >
                            Simple (1-2 standard APIs)
                            <span>e.g., Slack triggers, Email notifications</span>
                          </button>
                          <button 
                            className={`toggle-opt-btn ${aiIntegrations === 'medium' ? 'active' : ''}`}
                            onClick={() => setAiIntegrations('medium')}
                          >
                            Medium (3-5 APIs or CRM sync)
                            <span>e.g., HubSpot / Salesforce integration, OpenAI assistants</span>
                          </button>
                          <button 
                            className={`toggle-opt-btn ${aiIntegrations === 'complex' ? 'active' : ''}`}
                            onClick={() => setAiIntegrations('complex')}
                          >
                            Complex (Enterprise integrations)
                            <span>e.g., Database triggers, custom LLM fine-tuning, security audits</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Graphic Design Fields */}
                  {serviceType === 'graphic-design' && (
                    <>
                      <div className="calc-input-group">
                        <label>Select Design Assets Required</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                            <input type="checkbox" checked={designLogos} onChange={(e) => setDesignLogos(e.target.checked)} />
                            Logo & Brand Identity Suite
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                            <input type="checkbox" checked={designPosters} onChange={(e) => setDesignPosters(e.target.checked)} />
                            Marketing Banners, Flyers, & Digital Posters
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                            <input type="checkbox" checked={designPackaging} onChange={(e) => setDesignPackaging(e.target.checked)} />
                            Premium Product Packaging / Label Design
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                            <input type="checkbox" checked={designApparel} onChange={(e) => setDesignApparel(e.target.checked)} />
                            Custom Apparel / T-Shirt Branding (like RAQS)
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Social Media Fields */}
                  {serviceType === 'social-media' && (
                    <>
                      <div className="calc-input-group">
                        <div className="calc-input-header">
                          <label htmlFor="sm-plat">Number of Social Channels</label>
                          <span className="calc-value-display">{smPlatforms} Platforms</span>
                        </div>
                        <input 
                          id="sm-plat"
                          type="range" 
                          min="1" 
                          max="4" 
                          step="1" 
                          value={smPlatforms} 
                          onChange={(e) => setSmPlatforms(Number(e.target.value))} 
                        />
                        <div className="calc-range-bounds"><span>1 (e.g. Instagram)</span><span>4+ (Multi-channel)</span></div>
                      </div>

                      <div className="calc-input-group">
                        <label>Posting Frequency & Content Sourcing</label>
                        <div className="toggle-options">
                          <button 
                            className={`toggle-opt-btn ${smFrequency === 'low' ? 'active' : ''}`}
                            onClick={() => setSmFrequency('low')}
                          >
                            Light Presence (1-2 posts per week)
                            <span>Core brand updates, basic templates</span>
                          </button>
                          <button 
                            className={`toggle-opt-btn ${smFrequency === 'medium' ? 'active' : ''}`}
                            onClick={() => setSmFrequency('medium')}
                          >
                            Active Growth (3-4 posts per week)
                            <span>Custom graphics, carousel slides, organic outreach</span>
                          </button>
                          <button 
                            className={`toggle-opt-btn ${smFrequency === 'high' ? 'active' : ''}`}
                            onClick={() => setSmFrequency('high')}
                          >
                            Aggressive Scaling (Daily posts / Reels)
                            <span>Daily content calendar, video edits, active community management</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Shopify Store Fields */}
                  {serviceType === 'shopify-development' && (
                    <>
                      <div className="calc-input-group">
                        <label>Theme Implementation</label>
                        <div className="toggle-options toggle-options--half">
                          <button 
                            className={`toggle-opt-btn ${shopifyTheme === 'standard' ? 'active' : ''}`}
                            onClick={() => setShopifyTheme('standard')}
                          >
                            Shopify OS 2.0 Theme
                            <span>Standard high-speed theme setup</span>
                          </button>
                          <button 
                            className={`toggle-opt-btn ${shopifyTheme === 'custom' ? 'active' : ''}`}
                            onClick={() => setShopifyTheme('custom')}
                          >
                            Custom Liquid Theme
                            <span>Bespoke custom-coded Liquid templates</span>
                          </button>
                        </div>
                      </div>

                      <div className="calc-input-group">
                        <div className="calc-input-header">
                          <label htmlFor="shop-prod">Number of Products</label>
                          <span className="calc-value-display">{shopifyProducts} Products</span>
                        </div>
                        <input 
                          id="shop-prod"
                          type="range" 
                          min="1" 
                          max="250" 
                          step="5" 
                          value={shopifyProducts} 
                          onChange={(e) => setShopifyProducts(Number(e.target.value))} 
                        />
                        <div className="calc-range-bounds"><span>1 Product</span><span>250+ Products</span></div>
                      </div>

                      <div className="calc-input-group">
                        <label>Select App Integrations & Setups</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                            <input type="checkbox" checked={shopifyKlaviyo} onChange={(e) => setShopifyKlaviyo(e.target.checked)} />
                            Klaviyo Email Flows Setup (+Welcome, +Abandoned Cart)
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                            <input type="checkbox" checked={shopifyRecharge} onChange={(e) => setShopifyRecharge(e.target.checked)} />
                            Recharge / Loop Subscriptions Setup
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                            <input type="checkbox" checked={shopifyReviews} onChange={(e) => setShopifyReviews(e.target.checked)} />
                            Judge.me / Yotpo Review Widgets Setup
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <h2 style={{ marginTop: '2.5rem' }}>Speed & Support Preferences</h2>
                <p className="calc-card-subtitle">Tune the delivery timeline and post-launch maintenance settings.</p>

                <div className="calc-input-group">
                  <label>Development Timeline</label>
                  <div className="toggle-options toggle-options--half">
                    <button 
                      className={`toggle-opt-btn ${projectSpeed === 'standard' ? 'active' : ''}`}
                      onClick={() => setProjectSpeed('standard')}
                    >
                      Standard Speed
                      <span>Our regular high-quality agile sprints</span>
                    </button>
                    <button 
                      className={`toggle-opt-btn ${projectSpeed === 'expedited' ? 'active' : ''}`}
                      onClick={() => setProjectSpeed('expedited')}
                    >
                      ⚡ Expedited Delivery
                      <span>Priority resources, timeline reduced by ~35%</span>
                    </button>
                  </div>
                </div>

                <div className="calc-input-group">
                  <label>Post-Launch Care</label>
                  <div className="toggle-options">
                    <button 
                      className={`toggle-opt-btn ${projectSupport === 'none' ? 'active' : ''}`}
                      onClick={() => setProjectSupport('none')}
                    >
                      No Support Needed
                      <span>100% IP Handover, self-hosted</span>
                    </button>
                    <button 
                      className={`toggle-opt-btn ${projectSupport === 'basic' ? 'active' : ''}`}
                      onClick={() => setProjectSupport('basic')}
                    >
                      Monthly Maintenance
                      <span>Security patches, speed audits, minor updates</span>
                    </button>
                    <button 
                      className={`toggle-opt-btn ${projectSupport === 'partnership' ? 'active' : ''}`}
                      onClick={() => setProjectSupport('partnership')}
                    >
                      Growth Partnership
                      <span>Continuous A/B testing, design sprints, scaling support</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Outputs */}
              <div className="calc-card calc-card--outputs">
                <h2>Estimated Project Outline</h2>
                <p className="calc-card-subtitle">An investment estimate based on our competitive hourly rates and production benchmarks.</p>

                <div className="estimator-summary-card">
                  <div className="summary-section">
                    <span className="summary-label">Estimated Budget Range</span>
                    <span className="summary-value gradient-text">{estimate.range}</span>
                  </div>
                  <div className="summary-section">
                    <span className="summary-label">Estimated Timeline</span>
                    <span className="summary-value">{estimate.timeline}</span>
                  </div>
                </div>

                <div className="estimator-checklist">
                  <h3>What is included in this estimate?</h3>
                  <ul>
                    <li>✓ <strong>100% IP Sovereignty:</strong> You own all source code and design tokens.</li>
                    <li>✓ <strong>100/100 Lighthouse Speed:</strong> Engineered to load instantly.</li>
                    <li>✓ <strong>Fully Responsive Layouts:</strong> Pixel-perfect on mobile, tablet, and desktop.</li>
                    <li>✓ <strong>Dedicated Project Dashboard:</strong> Real-time sprint tracking and staging links.</li>
                    <li>✓ <strong>SEO & Schema Setup:</strong> Structured metadata configured for Google rankings.</li>
                  </ul>
                </div>

                <div className="calc-cta-section">
                  <h3>Lock in this estimate</h3>
                  <p>Submit your parameters directly to our team. We will review your configuration and schedule a brief technical alignment call.</p>
                  <button onClick={handleSecureQuote} className="btn btn-primary w-100">
                    Secure this Quote & Book Call 🔒
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
