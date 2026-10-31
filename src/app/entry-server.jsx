import { renderToString } from 'react-dom/server'
import { StaticRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { CookieConsentProvider } from '../components/shared/CookieConsent'
import Home from '../pages/home/Home'
import Services from '../pages/services/Services'
import ServiceDetail from '../pages/services/ServiceDetail'
import About from '../pages/company/About'
import StudentBuilderProgram from '../pages/program/StudentBuilderProgram'
import HiraProfile from '../pages/company/HiraProfile'
import TeamProfile from '../pages/company/TeamProfile'
import Projects from '../pages/projects/Projects'
import CaseStudy from '../pages/projects/CaseStudy'
import ProjectWorkflow from '../pages/projects/ProjectWorkflow'
import Reviews from '../pages/reviews/Reviews'
import Products from '../pages/products/Products'
import EunoiaDetail from '../pages/products/EunoiaDetail'
import StepsyDetail from '../pages/products/StepsyDetail'
import OmnaiDetail from '../pages/products/OmnaiDetail'
import EunoiaPrivacyPolicy from '../pages/legal/EunoiaPrivacyPolicy'
import Contact from '../pages/contact/Contact'
import Calculator from '../pages/tools/Calculator'
import Journal from '../pages/insights/Journal'
import JournalPost from '../pages/insights/JournalPost'
import Research from '../pages/insights/Research'
import News from '../pages/insights/News'
import TechStack from '../pages/company/TechStack'
import PrivacyPolicy from '../pages/legal/PrivacyPolicy'
import TermsOfService from '../pages/legal/TermsOfService'
import NotFound from '../pages/errors/NotFound'

export function render(url) {
  const context = {}
  const html = renderToString(<HelmetProvider context={context}><StaticRouter location={url}><CookieConsentProvider>
    <Navbar /><main><Routes>
      <Route path="/" element={<Home />} /><Route path="/services" element={<Services />} />
      <Route path="/services/:id" element={<ServiceDetail />} /><Route path="/about" element={<About />} />
      <Route path="/student-builder-program" element={<StudentBuilderProgram />} />
      <Route path="/team/hira-maqsood" element={<HiraProfile />} />
      <Route path="/team/:id" element={<TeamProfile />} />
      <Route path="/projects" element={<Projects />} /><Route path="/projects/:id" element={<CaseStudy />} /><Route path="/projects/:id/:moduleId" element={<ProjectWorkflow />} /><Route path="/reviews" element={<Reviews />} />
      <Route path="/products" element={<Products />} /><Route path="/products/eunoia" element={<EunoiaDetail />} />
      <Route path="/products/omnai" element={<OmnaiDetail />} /><Route path="/products/eunoia/privacy" element={<EunoiaPrivacyPolicy />} />
      <Route path="/products/stepsy" element={<StepsyDetail />} />
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
