import { renderToString } from 'react-dom/server'
import { StaticRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { CookieConsentProvider } from './components/CookieConsent'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import About from './pages/About'
import HiraProfile from './pages/HiraProfile'
import TeamProfile from './pages/TeamProfile'
import Projects from './pages/Projects'
import Reviews from './pages/Reviews'
import Products from './pages/Products'
import EunoiaDetail from './pages/EunoiaDetail'
import OmnaiDetail from './pages/OmnaiDetail'
import EunoiaPrivacyPolicy from './pages/EunoiaPrivacyPolicy'
import Contact from './pages/Contact'
import Calculator from './pages/Calculator'
import Journal from './pages/Journal'
import JournalPost from './pages/JournalPost'
import Research from './pages/Research'
import News from './pages/News'
import TechStack from './pages/TechStack'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import NotFound from './pages/NotFound'

export function render(url) {
  const context = {}
  const html = renderToString(<HelmetProvider context={context}><StaticRouter location={url}><CookieConsentProvider>
    <Navbar /><main><Routes>
      <Route path="/" element={<Home />} /><Route path="/services" element={<Services />} />
      <Route path="/services/:id" element={<ServiceDetail />} /><Route path="/about" element={<About />} />
      <Route path="/team/hira-maqsood" element={<HiraProfile />} />
      <Route path="/team/:id" element={<TeamProfile />} />
      <Route path="/projects" element={<Projects />} /><Route path="/reviews" element={<Reviews />} />
      <Route path="/products" element={<Products />} /><Route path="/products/eunoia" element={<EunoiaDetail />} />
      <Route path="/products/omnai" element={<OmnaiDetail />} /><Route path="/products/eunoia/privacy" element={<EunoiaPrivacyPolicy />} />
      <Route path="/contact" element={<Contact />} /><Route path="/calculator" element={<Calculator />} />
      <Route path="/journal" element={<Journal />} /><Route path="/journal/:slug" element={<JournalPost />} />
      <Route path="/research" element={<Research />} /><Route path="/news" element={<News />} />
      <Route path="/stack" element={<TechStack />} /><Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} /><Route path="*" element={<NotFound />} />
    </Routes></main><Footer />
  </CookieConsentProvider></StaticRouter></HelmetProvider>)
  const { helmet } = context
  // React 19 emits native metadata in the rendered markup; older Helmet versions use context.
  return { html, head: helmet ? [helmet.title, helmet.meta, helmet.link, helmet.script].map(value => value.toString()).join('\n') : '' }
}
