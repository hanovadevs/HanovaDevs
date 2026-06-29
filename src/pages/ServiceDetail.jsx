import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SEO from '../components/SEO'
import { journalPosts } from './Journal'
import './ServiceDetail_v2.css'

const servicesData = {
  'web-design': {
    title: 'Web Design & Development',
    category: 'Engineering',
    tagline: 'We build digital experiences that perform and convert.',
    heroImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1600&q=80',
    intro: 'Your website is the digital storefront of your business. We engineer lightning-fast, highly responsive, and visually stunning websites that capture attention and drive measurable growth. Using modern frameworks like React and Next.js, we ensure your site is secure, scalable, and built for the future. Our development philosophy centers on performance-first engineering, ensuring that every byte of code serves a purpose and every interaction feels fluid and intuitive.',
    features: [
      {
        title: 'Custom UI/UX Design',
        desc: 'Pixel-perfect, user-centric interfaces tailored to your brand identity.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
      },
      {
        title: 'High-Performance Frontend',
        desc: 'Optimized code splitting, caching, and server-side rendering for speed.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
      },
      {
        title: 'CMS Integration',
        desc: 'Seamless integration with Sanity, WordPress, or custom backends.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
      }
    ],
    technicalSpecs: [
      { key: 'Frameworks', value: 'React, Next.js, Vite' },
      { key: 'Styling', value: 'Vanilla CSS, Tailwind, Styled Components' },
      { key: 'Performance', value: '100/100 Lighthouse Scores' },
      { key: 'Accessibility', value: 'WCAG 2.1 Compliant' },
      { key: 'Deployment', value: 'Vercel, Netlify, AWS' }
    ],
    deliverables: [
      { title: 'Interactive High-Fidelity Prototypes', desc: 'Complete interactive Figma wireframes and visual UI mockups highlighting precise brand spacing guidelines.' },
      { title: 'Core Web Vitals Optimizations', desc: '100% optimized image delivery pipelines, static site generation mechanisms, and sub-second caching routing.' },
      { title: 'Automated Accessibility Scans', desc: 'Full compliance checking meeting WCAG 2.1 AA parameters for semantic screen readers and keyboards.' },
      { title: 'Modern CI/CD Deployment Sync', desc: 'Automated continuous integration and deployment pipelines syncing code updates directly onto Vercel or AWS.' },
      { title: 'Interactive Client Asset Handover', desc: 'Structured handover packages including code files, custom component sets, and localized styling assets.' }
    ],
    caseStudy: {
      clientName: 'Terra Sol Grounding',
      logo: '/projects/terrasol.png',
      summary: 'Re-engineered an immersive grounding sheet product showcase that bridges education and instant purchasing.',
      metrics: [
        { label: 'Conversion Lift', value: '+142%' },
        { label: 'Bounce Rate Reduction', value: '-38%' },
        { label: 'Lighthouse Page Speed', value: '100/100' }
      ],
      challenge: 'Slow load speeds and weak educational copywriting failed to build trust with curious buyers, causing high cart abandonment.',
      solution: 'Engineered a bespoke React frontend with localized edge rendering, glassmorphic interactive benefit maps, and friction-free direct Amazon checkouts.',
      link: '/projects'
    },
    process: [
      { step: '01', title: 'Strategy', desc: 'Deep dive into your business goals and user personas.' },
      { step: '02', title: 'Design', desc: 'Crafting the visual identity and user experience flow.' },
      { step: '03', title: 'Engineering', desc: 'Writing clean, scalable, and high-performance code.' },
      { step: '04', title: 'Launch', desc: 'Final testing, optimization, and production deployment.' }
    ],
    blogs: ['future-of-web-dev'],
    advancements: [
      'Server-Side Rendering (SSR) for ultimate SEO',
      'Advanced Edge caching networks (Cloudflare/Vercel)',
      'Headless architecture separating frontend from backend',
      'Micro-animations for superior user engagement'
    ],
    relatedLinks: [
      { title: 'Custom Software Development', path: '/services/software-development' },
      { title: 'SEO & Performance Marketing', path: '/services/seo' }
    ],
    faqs: [
      {
        question: 'How do you ensure 100/100 Lighthouse performance scores?',
        answer: 'We write custom semantic HTML and minimize client-side Javascript. By using modern frameworks like React and Next.js, along with server-side rendering, specialized edge caching networks, and automated next-gen image compression, we ensure page loads are virtually instantaneous on all cellular connections.'
      },
      {
        question: 'Will I own the source code and designs once the site launches?',
        answer: 'Absolutely. We believe in complete IP sovereignty. You own 100% of the custom code, raw assets, Figma designs, and configurations. We host everything directly under your accounts with no recurring developer maintenance locks.'
      },
      {
        question: 'Do you build on standard templates or customize every page?',
        answer: 'Every page is hand-crafted from scratch based on custom UI/UX design tokens tailored strictly to your brand messaging. We never utilize generic WordPress templates or pre-made drag-and-drop frameworks.'
      },
      {
        question: 'How long does a custom web design and development project take?',
        answer: 'A typical comprehensive project ranges between 4 to 8 weeks, covering complete competitive discovery, responsive layout prototyping, engineering, quality testing, and SEO launching.'
      }
    ]
  },
  'social-media': {
    title: 'Social Media Marketing',
    category: 'Marketing',
    tagline: 'Grow your brand organically and engage your community.',
    heroImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=80',
    intro: 'Social media is more than just posting — it’s about starting conversations. We create data-driven content strategies that resonate with your target audience across Instagram, LinkedIn, TikTok, and Twitter. We turn passive scrollers into active brand advocates. Our team focuses on high-impact storytelling and visual excellence, ensuring that your brand doesn\'t just exist on social media, but dominates it.',
    features: [
      {
        title: 'Content Strategy',
        desc: 'Comprehensive planning, ideation, and content calendars.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
      },
      {
        title: 'Community Management',
        desc: 'Active engagement, comment moderation, and brand voice consistency.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
      },
      {
        title: 'Analytics & Reporting',
        desc: 'Monthly insights, engagement metrics, and growth tracking.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
      }
    ],
    technicalSpecs: [
      { key: 'Channels', value: 'Instagram, LinkedIn, TikTok, X' },
      { key: 'Tools', value: 'Hootsuite, Buffer, Canva Pro' },
      { key: 'Ad Formats', value: 'Reels, Carousels, Static Posts' },
      { key: 'Reporting', value: 'Weekly Sentiment Analysis' },
      { key: 'Growth', value: 'Organic & Paid Integration' }
    ],
    deliverables: [
      { title: 'Competitor Brand Sentiment Audit', desc: 'Thorough landscape evaluation of competitors, keyword engagement gaps, and messaging style guides.' },
      { title: 'Comprehensive Content Pillar Blueprint', desc: 'A multi-tier guide mapping your themes directly to viral hooks and structural platform trends.' },
      { title: 'Custom Assets & Graphics Creation', desc: 'Bespoke high-quality graphics, branded templates, and motion video assets tailored for engagement.' },
      { title: 'Active Community Outreach System', desc: 'Coordinated proactive messaging and engagement strategies with developers and wellness personas.' },
      { title: 'Monthly Insights Pipeline', desc: 'Detailed tracking dashboards breaking down conversion paths, follower expansion, and real ROI.' }
    ],
    caseStudy: {
      clientName: 'EarthSync Wellness',
      logo: '/projects/earthsync.png',
      summary: 'Cultivated a highly engaged spatial community around modern lifestyle grounding and wellness routines.',
      metrics: [
        { label: 'Organic Engagement', value: '+210%' },
        { label: 'Viral Impressions', value: '1.2M+' },
        { label: 'Brand Trust Score', value: '+85%' }
      ],
      challenge: 'Struggled to gain organic traction in the saturated fitness market, relying solely on expensive paid search ads.',
      solution: 'Launched micro-narrative video series showcasing grounding products in real-world scenarios, paired with an active developer community outreach plan.',
      link: '/projects'
    },
    process: [
      { step: '01', title: 'Audit', desc: 'Analyzing your current social presence and competitors.' },
      { step: '02', title: 'Strategy', desc: 'Defining content pillars and channel priorities.' },
      { step: '03', title: 'Creation', desc: 'Producing high-quality visuals and storytelling copy.' },
      { step: '04', title: 'Growth', desc: 'Daily engagement and performance scaling.' }
    ],
    blogs: [],
    advancements: [
      'AI-driven sentiment analysis',
      'Cross-platform audience retargeting',
      'Automated social listening pipelines',
      'A/B tested viral content hooks'
    ],
    relatedLinks: [
      { title: 'Brand Identity & Strategy', path: '/services/branding' },
      { title: 'Digital Advertising', path: '/services/digital-advertising' }
    ],
    faqs: [
      {
        question: 'What channels do you specialize in for B2B and B2C brands?',
        answer: 'We customize platforms to match consumer behavior. For B2C brands we focus heavily on high-engagement visual hooks across Instagram and TikTok. For complex B2B enterprises we build authoritative thought leadership scripts on LinkedIn.'
      },
      {
        question: 'How do you define organic brand voice guidelines?',
        answer: 'We hold discovery sessions to map your target audience personas. We then define structured content pillars, visual assets guides, brand sentiment responses, and vocabulary sheets to align all content under a unified brand tone.'
      },
      {
        question: 'Do you provide full video scripting and creative editing?',
        answer: 'Yes. Our multidisciplinary team handles the full content lifecycle, including professional storyboarding, scripts, custom transitions, voiceovers, and post-production scaling optimized for modern attention spans.'
      },
      {
        question: 'How do you measure campaign success and organic growth?',
        answer: 'We focus on valuable engagement metrics (shares, saves, direct comments) and brand traffic growth over vanity metrics. You receive a monthly data pipeline illustrating lead generation and customer attribution.'
      }
    ]
  },
  'seo': {
    title: 'SEO & Performance Marketing',
    category: 'Growth',
    tagline: 'Rank higher, get found, and dominate search results.',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80',
    intro: 'Visibility is everything. Our SEO and performance marketing strategies are designed to put your business in front of the people actively searching for it. Through technical optimization, targeted keyword strategies, and high-quality backlinking, we ensure long-term organic growth. We treat SEO as a continuous engineering challenge, monitoring thousands of data points to stay ahead of algorithm shifts.',
    features: [
      {
        title: 'Technical SEO',
        desc: 'Site speed optimization, schema markup, and mobile readiness.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
      },
      {
        title: 'Keyword Research',
        desc: 'Identifying high-intent keywords to drive qualified traffic.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
      },
      {
        title: 'Content Optimization',
        desc: 'Updating and structuring your content to align with search intent.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
      }
    ],
    technicalSpecs: [
      { key: 'Audits', value: 'Core Web Vitals, Tech Debt' },
      { key: 'Schema', value: 'JSON-LD, Microdata, RDFa' },
      { key: 'Analytics', value: 'GA4, GSC, SEMrush, Ahrefs' },
      { key: 'Content', value: 'Semantic Clustering' },
      { key: 'Backlinking', value: 'Authority-Based White-Hat' }
    ],
    deliverables: [
      { title: 'Core Web Vitals Technical Remediation', desc: 'Rewriting critical asset loading mechanisms and adjusting code bloat to hit sub-second LCP speeds.' },
      { title: 'Semantic Keyword Silo Maps', desc: 'Comprehensive structures targeting high-intent clusters and eliminating keyword cannibalization friction.' },
      { title: 'Rich Schema JSON-LD Deployments', desc: 'Bespoke markup definitions communicating your product, organization, and FAQ sets directly to Google search bots.' },
      { title: 'Niche Authority Editorial Links', desc: 'Manual white-hat backlink campaigns sourcing natural anchor-text placements from high-DR websites.' },
      { title: 'Competitive Ranking Dashboard', desc: 'Live monitoring setup mapping your keyword trajectory against major direct competitors.' }
    ],
    caseStudy: {
      clientName: 'Crown Accumulator Corp',
      logo: '/projects/crown.png',
      summary: 'Dominated industrial energy and heavy machinery search queries with strategic content clustering.',
      metrics: [
        { label: 'Organic Traffic', value: '+340%' },
        { label: 'Page 1 Rankings', value: '180+' },
        { label: 'Inbound Sales Pipe', value: '+122%' }
      ],
      challenge: 'B2B pipeline was highly dependent on field sales reps. Visual brand search was virtually non-existent for key heavy equipment queries.',
      solution: 'Engineered a semantic keyword silo structure coupled with advanced Schema JSON-LD, driving their technical specs to Google rich snippets.',
      link: '/projects'
    },
    process: [
      { step: '01', title: 'Analyze', desc: 'Technical audit and competitor landscape mapping.' },
      { step: '02', title: 'Optimize', desc: 'Fixing technical debt and on-page structures.' },
      { step: '03', title: 'Build', desc: 'Creating authority via content and high-quality links.' },
      { step: '04', title: 'Iterate', desc: 'Data-driven refinements based on ranking trends.' }
    ],
    blogs: ['seo-trap-2026'],
    advancements: [
      'Core Web Vitals auditing and remediation',
      'Programmatic SEO at scale',
      'Competitor backlink gap analysis',
      'Advanced semantic schema structuring'
    ],
    relatedLinks: [
      { title: 'Web Design & Development', path: '/services/web-design' },
      { title: 'Digital Advertising', path: '/services/digital-advertising' }
    ],
    faqs: [
      {
        question: "What is 'The SEO Trap' and how do you bypass it?",
        answer: 'Traditional agencies focus purely on high-volume keyword stuffing. We focus on semantic keyword clustering, high-intent user search alignment, and rich schema markup. This drives high-quality organic traffic that actually wants to buy.'
      },
      {
        question: 'What tools do you use to map out industry trends and search intents?',
        answer: 'We run enterprise research pipelines using Google Analytics 4, Search Console, Ahrefs, SEMrush, and custom scripts to map search volume gaps before producing content.'
      },
      {
        question: 'How long before we start seeing organic ranking results on Google?',
        answer: 'Technical optimizations (speed, schema, indexing) yield improvements in 2-4 weeks. Extensive semantic content campaigns typically compound authority and double traffic over a 3 to 6-month timeline.'
      },
      {
        question: 'Do you conduct manual authority link building?',
        answer: 'Yes, we only participate in white-hat authority outreach. We construct high-quality, relevant editorial mentions from high-domain-rating publications in your specific niche.'
      }
    ]
  },
  'branding': {
    title: 'Brand Identity & Strategy',
    category: 'Design',
    tagline: 'Craft a memorable brand that tells your unique story.',
    heroImage: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1600&q=80',
    intro: 'A great brand is more than just a logo — it is the feeling people get when they interact with your business. We craft cohesive brand identities encompassing logos, typography, color palettes, and messaging strategies that stand out in crowded markets. Our approach is deeply psychological, ensuring that your visual identity triggers the right emotions and builds long-term trust with your audience.',
    features: [
      {
        title: 'Logo & Visual Identity',
        desc: 'Timeless, versatile logos and complete brand asset guidelines.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
      },
      {
        title: 'Brand Voice & Messaging',
        desc: 'Defining how you speak to your audience for maximum impact.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
      },
      {
        title: 'Brand Guidelines',
        desc: 'Comprehensive rulebooks ensuring consistency everywhere.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
      }
    ],
    technicalSpecs: [
      { key: 'Deliverables', value: 'Vector Logos, Font Kits' },
      { key: 'Color Modes', value: 'CMYK, RGB, HEX, Pantone' },
      { key: 'Strategy', value: 'Competitive Mapping' },
      { key: 'Psychology', value: 'Emotional Resonance Mapping' },
      { key: 'Assets', value: 'Social Kits, Stationeries' }
    ],
    deliverables: [
      { title: 'Signature Adaptive Vector Mark', desc: 'Highly scalable custom-engineered vector logo configurations tailored perfectly for responsive digital layouts and layouts.' },
      { title: 'Design System & Typography Token Book', desc: 'Handpicked typography hierarchies and CSS variable mappings that anchor layouts consistently across devices.' },
      { title: 'Omnichannel Brand Voice Blueprint', desc: 'Comprehensive messaging sheets defining syntax rules, active vocabulary, and targeted emotional response hooks.' },
      { title: 'Interactive Web Brand Guidelines', desc: 'A pristine live or digital handbook presenting styling tokens, do-and-do-not parameters, and layouts.' },
      { title: 'Social & Stationery Asset Kits', desc: 'Ready-to-use vector shapes, banners, letterheads, and business card layouts matching the target brand tokens.' }
    ],
    caseStudy: {
      clientName: 'Eunoia Spatial Systems',
      logo: '/projects/earthsync.png',
      summary: 'Rebranded an emerging spatial platform to stand out as a highly credible premium enterprise tool.',
      metrics: [
        { label: 'Enterprise Pipeline', value: '+180%' },
        { label: 'Brand Recall Score', value: '+95%' },
        { label: 'Valuation Increase', value: '+45%' }
      ],
      challenge: 'A generic crypto design style made them look like a speculative asset rather than a serious enterprise-ready infrastructure software.',
      solution: 'Crafted a premium, mathematical brand identity, styled around subtle gradients, clean geometric letterforms, and solid brand voice guidelines.',
      link: '/projects'
    },
    process: [
      { step: '01', title: 'Discovery', desc: 'Understanding your mission, values, and vision.' },
      { step: '02', title: 'Ideation', desc: 'Exploring visual concepts and naming strategies.' },
      { step: '03', title: 'Refinement', desc: 'Perfecting the final mark and supporting systems.' },
      { step: '04', title: 'Handover', desc: 'Delivering full asset kits and usage guides.' }
    ],
    blogs: [],
    advancements: [
      'Psychological color mapping',
      'Interactive digital brand books',
      'Motion identity and UI animation guidelines',
      'Omnichannel voice synchronization'
    ],
    relatedLinks: [
      { title: 'Web Design & Development', path: '/services/web-design' },
      { title: 'Social Media Marketing', path: '/services/social-media' }
    ],
    faqs: [
      {
        question: 'What exactly is included in a complete Brand Identity kit?',
        answer: 'Our standard kit contains vector signature logos, full typography systems, a responsive color palette book, a brand voice tone guide, localized asset templates, and digital-ready design token guides.'
      },
      {
        question: 'How do you execute psychological color mapping?',
        answer: 'We analyze consumer psychological behaviors, competitor color palettes, and cultural references to curate custom color combinations that evoke trust, premium security, or vibrant innovation.'
      },
      {
        question: 'Can you help us refresh our existing brand without losing legacy equity?',
        answer: 'Yes. We specialize in strategic brand refreshes, preserving your recognizable legacy visual elements while modernizing typography grids, contrast guidelines, and digital readability layers.'
      },
      {
        question: 'How long is the discovery and concept phase?',
        answer: 'It takes 2-3 weeks, during which we explore parallel moodboards, visual concepts, and competitor landscape mapping to anchor your brand identity.'
      }
    ]
  },
  'software-development': {
    title: 'Custom Software Development',
    category: 'Engineering',
    tagline: 'Bespoke applications designed to scale your operations.',
    heroImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80',
    intro: 'Off-the-shelf software rarely fits perfectly. We design and engineer bespoke web and mobile applications that solve your specific business challenges. From complex dashboards to native mobile apps, we build tools that make your business faster and more efficient. Our team specializes in high-availability systems that can handle massive throughput while maintaining bank-grade security.',
    features: [
      {
        title: 'Web Applications',
        desc: 'Scalable, secure, and intuitive web-based software solutions.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
      },
      {
        title: 'API Development',
        desc: 'Robust REST and GraphQL APIs to connect your digital ecosystem.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
      },
      {
        title: 'Cloud Architecture',
        desc: 'Reliable infrastructure deployment on AWS, Google Cloud, or Azure.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg>
      }
    ],
    technicalSpecs: [
      { key: 'Languages', value: 'Node.js, Python, Rust, Go' },
      { key: 'Databases', value: 'PostgreSQL, MongoDB, Redis' },
      { key: 'Cloud', value: 'AWS, GCP, Kubernetes' },
      { key: 'Security', value: 'SOC2, Zero-Trust, OAuth2' },
      { key: 'Testing', value: 'Jest, Playwright, Cypress' }
    ],
    deliverables: [
      { title: 'Interactive High-Availability Diagrams', desc: 'Visual blueprints mapped to multi-region cloud servers displaying microservice layers and failover paths.' },
      { title: 'Robust Custom API Nodes', desc: 'Secure, production-grade endpoints documented via Swagger, optimizing transactional latency below 30ms.' },
      { title: 'Automated Infrastructure Setup', desc: 'Infrastructure as Code scripts (Terraform/Docker) initializing cloud databases, storage nodes, and caching relays.' },
      { title: 'Rigorous Security Assessments', desc: 'Comprehensive penetration validation maps checking for XSS, SQLi, and authentication bypass vulnerabilities.' },
      { title: 'Rigorous Automated Test Coverage', desc: 'Complete test suites (Jest/Playwright) covering core patient/user routes to ensure long-term runtime reliability.' }
    ],
    caseStudy: {
      clientName: 'Nexus Health Systems',
      logo: '/projects/nexus.png',
      summary: 'Engineered a real-time hospital inventory and patient intake cloud dashboard.',
      metrics: [
        { label: 'Intake Wait Times', value: '-52%' },
        { label: 'Uptime Reliability', value: '99.99%' },
        { label: 'Data Sync Latency', value: '<15ms' }
      ],
      challenge: 'An outdated legacy database system caused lag spikes and synchronization conflicts across parallel nursing stations.',
      solution: 'Designed a custom Node.js and Rust backend powered by WebSockets, microservices, and absolute SOC2 data compliance layouts.',
      link: '/projects'
    },
    process: [
      { step: '01', title: 'Architecture', desc: 'Designing the data flow and system structure.' },
      { step: '02', title: 'Development', desc: 'Agile sprints with regular milestone reviews.' },
      { step: '03', title: 'Security', desc: 'Rigorous testing and penetration auditing.' },
      { step: '04', title: 'Deployment', desc: 'Zero-downtime scaling and cloud setup.' }
    ],
    blogs: ['ai-privacy-first', 'custom-software-advantage'],
    advancements: [
      'Serverless function deployment',
      'Real-time WebSocket integrations',
      'CI/CD pipeline automation',
      'Containerization via Docker & Kubernetes'
    ],
    relatedLinks: [
      { title: 'Web Design & Development', path: '/services/web-design' },
      { title: 'SEO & Performance Marketing', path: '/services/seo' }
    ],
    faqs: [
      {
        question: 'Which backend languages and cloud infrastructure do you rely on?',
        answer: 'We build high-availability backends using Node.js, Python, and Rust, supported by PostgreSQL or Redis databases. Our cloud environments are automated via Docker containers and Kubernetes on AWS or Google Cloud.'
      },
      {
        question: 'How do you audit custom software for SOC2 and security compliance?',
        answer: 'We enforce Zero-Trust architecture, secure JWT session management, input validation, parameter sanitization, TLS/HTTPS data transport encryption, and integrate Automated E2E testing systems (Jest/Playwright).'
      },
      {
        question: 'Can you integrate legacy third-party APIs and old database structures?',
        answer: 'Yes, we specialize in building highly resilient API proxy layers and secure data migrations to bridge old legacy hardware with modern cloud frameworks.'
      },
      {
        question: 'How do you support custom software post-launch?',
        answer: 'We provide flexible, long-term Service Level Agreements (SLAs) including weekly cloud telemetry checks, database backup automations, and immediate security patch updates.'
      }
    ]
  },
  'digital-advertising': {
    title: 'Digital Advertising',
    category: 'Growth',
    tagline: 'Maximize ROI with precision-targeted ad campaigns.',
    heroImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1600&q=80',
    intro: 'Stop wasting budget on ads that don\'t convert. Our digital advertising team creates high-converting campaigns across Google, Meta, TikTok, and LinkedIn. We constantly A/B test creatives and refine audiences to ensure every dollar you spend generates measurable return. We use advanced machine-learning algorithms to predict high-performing segments before you even spend a dollar.',
    features: [
      {
        title: 'PPC Campaigns',
        desc: 'Google Ads management focusing on high-intent search queries.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
      },
      {
        title: 'Social Ads',
        desc: 'Engaging video and image ads on Meta, Instagram, and TikTok.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
      },
      {
        title: 'Conversion Optimization',
        desc: 'Landing page design and split testing to maximize ad performance.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
      }
    ],
    technicalSpecs: [
      { key: 'Platforms', value: 'Google, Meta, TikTok, LinkedIn' },
      { key: 'Attribution', value: 'Multi-Touch, First-Click' },
      { key: 'Pixels', value: 'CAPI, Pixel, GTM' },
      { key: 'Creatives', value: 'Dynamic, A/B Tested' },
      { key: 'Optimization', value: 'LTV-Based Bidding' }
    ],
    deliverables: [
      { title: 'High-Resolution Visual Creative Packs', desc: 'Bespoke high-converting design layouts and custom video cuts optimized strictly to platform algorithms.' },
      { title: 'Conversions API (CAPI) Pixel Setup', desc: 'Advanced server-to-server connection bypassing ad-blockers and capturing 100% accurate buyer event mapping.' },
      { title: 'Rigorous Structured A/B Pipelines', desc: 'Weekly testing schedules checking copy variations, benefit highlights, and targeted hooks.' },
      { title: 'Targeted Lead Magnet Funnel Design', desc: 'Frictionless, fully-responsive lead capture forms and conversion-ready landing designs.' },
      { title: 'LTV-Based Scaling Map', desc: 'Precise financial models displaying how to optimize budgets cleanly as customer acquisition costs scale.' }
    ],
    caseStudy: {
      clientName: 'TechVault Enterprise',
      logo: '/projects/crown.png',
      summary: 'Scaled search and native ad campaigns targeting enterprise data managers.',
      metrics: [
        { label: 'Cost-Per-Acquisition', value: '-45%' },
        { label: 'Return On Ad Spend', value: '4.8x' },
        { label: 'Qualified Lead Vol', value: '+300%' }
      ],
      challenge: 'Inefficient keyword targeting led to high ad costs with unqualified consumer clicks instead of high-value business leads.',
      solution: 'Built precision-targeted LinkedIn and Meta ad structures coupled with server-side Conversions API (CAPI) tracking to feed absolute attribution models.',
      link: '/projects'
    },
    process: [
      { step: '01', title: 'Targeting', desc: 'Defining granular audience segments.' },
      { step: '02', title: 'Creatives', desc: 'Developing high-impact visual and copy assets.' },
      { step: '03', title: 'Testing', desc: 'Small-scale tests to identify winning patterns.' },
      { step: '04', title: 'Scaling', desc: 'Increasing budget on high-performing segments.' }
    ],
    blogs: [],
    advancements: [
      'Machine-learning bid optimization',
      'Dynamic creative testing (DCT)',
      'Advanced pixel tracking & server-side API',
      'Multi-touch attribution modeling'
    ],
    relatedLinks: [
      { title: 'SEO & Performance Marketing', path: '/services/seo' },
      { title: 'Social Media Marketing', path: '/services/social-media' }
    ],
    faqs: [
      {
        question: 'How do you prevent client budgets from being wasted on cold ads?',
        answer: 'We enforce strict dynamic A/B creative testing (DCT) with low testing budgets, analyzing initial engagement before scaling up budgets on verified high-ROI ad groups.'
      },
      {
        question: 'What is the Conversions API (CAPI) and why is it mandatory?',
        answer: 'Traditional browser pixels are blocked by modern browsers (iOS 14+, ad blockers). CAPI sends conversion events directly from our servers to platforms (Meta/Google), restoring complete conversion tracking accuracy.'
      },
      {
        question: 'Do you write and produce the visual assets for the ad groups?',
        answer: 'Yes, we design all ad assets, including custom conversion hooks, responsive vector layout graphics, dynamic video cuts, and target-audience-centric copywriting.'
      },
      {
        question: 'What metrics do you prioritize in monthly ad reports?',
        answer: 'We focus strictly on business growth numbers: Cost-Per-Acquisition (CPA), Return On Ad Spend (ROAS), and final Marketing Qualified Leads (MQL).'
      }
    ]
  },
  'graphic-design': {
    title: 'Graphic Design Services',
    category: 'Creative',
    tagline: 'Visual storytelling that makes your brand impossible to ignore.',
    heroImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1600&q=80',
    intro: 'Great design is the silent ambassador of your brand. At HanovaDevs, we don\'t just create graphics — we engineer visual systems that communicate your brand\'s DNA at every touchpoint. From premium logo marks and business identity kits to eye-catching social media posts, packaging designs, apparel graphics, and large-format marketing collateral, our design studio delivers production-ready assets that feel alive and demand attention. Every pixel is intentional, every composition is strategically crafted, and every deliverable is print-ready and digital-optimized from day one.',
    gallery: [
      {
        title: 'Aether AI Identity',
        category: 'Logo Design',
        image: '/projects/design_logo.png',
        desc: 'A premium minimalist geometric logo mark and branding system developed for a next-generation AI platform.'
      },
      {
        title: 'Cypher Exhibition Poster',
        category: 'Poster Design',
        image: '/projects/design_poster.png',
        desc: 'A high-impact Swiss-punk fusion design poster highlighting spatial typography and neon color contrasts.'
      },
      {
        title: 'Bloom Botanical Packaging',
        category: 'Packaging Design',
        image: '/projects/design_packaging.png',
        desc: 'Premium sustainable amber glass cosmetics bottle labeling with minimalist botanical illustration line art.'
      }
    ],
    features: [
      {
        title: 'Logo & Brand Identity',
        desc: 'Custom logo marks, wordmarks, monograms, and complete brand identity kits with usage guidelines.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
      },
      {
        title: 'Marketing Collateral',
        desc: 'Posters, flyers, social media graphics, business cards, infographics, and presentation decks.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
      },
      {
        title: 'Packaging & Apparel',
        desc: 'Product packaging, label design, T-shirt graphics, merchandise mockups, and retail-ready assets.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
      }
    ],
    technicalSpecs: [
      { key: 'Design Tools', value: 'Adobe Illustrator, Photoshop, InDesign' },
      { key: 'Prototyping', value: 'Figma, Adobe XD' },
      { key: 'Motion', value: 'After Effects, Lottie' },
      { key: 'File Formats', value: 'AI, EPS, SVG, PDF, PNG, PSD' },
      { key: 'Print Standards', value: 'CMYK, 300 DPI, Bleed-Ready' }
    ],
    deliverables: [
      { title: 'Complete Logo Identity Suite', desc: 'Primary logo, secondary marks, icon variations, monochrome versions, and a comprehensive brand guidelines document covering spacing, sizing, and usage rules.' },
      { title: 'Social Media Asset Library', desc: 'Custom-designed templates for Instagram posts, stories, LinkedIn banners, Facebook covers, and TikTok thumbnails — all sized and exported for immediate publishing.' },
      { title: 'Print-Ready Marketing Kit', desc: 'Professional posters, flyers, brochures, business cards, letterheads, and presentation decks formatted to CMYK print standards with proper bleed and crop marks.' },
      { title: 'Product Packaging & Label Design', desc: 'Retail-quality packaging dielines, label artwork, and unboxing presentation designs with photorealistic 3D mockup renders for stakeholder review.' },
      { title: 'Apparel & Merchandise Graphics', desc: 'High-resolution T-shirt prints, hoodie graphics, cap embroidery files, and promotional merchandise designs with garment-specific color separations.' }
    ],
    caseStudy: {
      clientName: 'Bloom Botanicals',
      logo: '/projects/crown.png',
      summary: 'Created a complete visual identity system for a premium plant-based wellness brand launch.',
      metrics: [
        { label: 'Brand Recognition', value: '+185%' },
        { label: 'Retail Shelf Standout', value: 'Top 3' },
        { label: 'Social Engagement', value: '+240%' }
      ],
      challenge: 'Generic templated packaging failed to differentiate products on crowded retail shelves, while inconsistent social media graphics diluted the brand message.',
      solution: 'Engineered a cohesive botanical illustration system spanning logo, packaging, social templates, and in-store signage — creating instant brand recognition and premium shelf appeal.',
      link: '/projects'
    },
    process: [
      { step: '01', title: 'Discovery', desc: 'Understanding your brand vision, audience, and competitive landscape.' },
      { step: '02', title: 'Concepts', desc: 'Exploring multiple creative directions with mood boards and sketches.' },
      { step: '03', title: 'Refinement', desc: 'Iterating on the chosen direction with pixel-perfect precision.' },
      { step: '04', title: 'Delivery', desc: 'Exporting production-ready files across all required formats and sizes.' }
    ],
    blogs: [],
    advancements: [
      'AI-assisted generative design exploration',
      'Variable font systems for responsive brand identities',
      '3D packaging visualization with photorealistic rendering',
      'Motion design tokens for animated brand guidelines'
    ],
    relatedLinks: [
      { title: 'Brand Identity & Strategy', path: '/services/branding' },
      { title: 'Social Media Marketing', path: '/services/social-media' }
    ],
    faqs: [
      {
        question: 'How many logo concepts will I receive before we finalize the design?',
        answer: 'We present 3 to 5 unique creative directions in the initial round, each fully explored with mock applications. After you select a direction, we provide 2 to 3 iterative refinement rounds to perfect every detail — from kerning and weight to colorway and icon proportions.'
      },
      {
        question: 'What file formats do you deliver, and are they print-ready?',
        answer: 'Every project includes vector-based source files (AI, EPS, SVG), raster exports (PNG, JPEG at 72 DPI for web and 300 DPI for print), and fully layered PSD/PDF files. Print assets are prepared in CMYK color mode with proper bleed margins and crop marks for commercial offset printing.'
      },
      {
        question: 'Can you design packaging for products that require specific dieline templates?',
        answer: 'Absolutely. We work with your manufacturer\'s dieline specifications or create custom dielines from scratch. Our packaging designs include 3D mockup renders so you can see exactly how the product will look on shelf before committing to production runs.'
      },
      {
        question: 'Do you create social media content calendars alongside the design assets?',
        answer: 'Yes — if paired with our Social Media Marketing service, we provide a complete content strategy with themed visual templates, caption copy, hashtag clusters, and a monthly publishing calendar. Standalone design clients receive ready-to-use template packs with editable Figma/Canva files for in-house content teams.'
      },
      {
        question: 'What is included in a complete brand identity kit?',
        answer: 'Our brand identity kits include primary and secondary logos, approved color palettes with HEX/RGB/CMYK codes, typography pairings with licensing guidance, iconography systems, business cards, email signatures, social media templates, letterhead and envelope designs, and a comprehensive brand guidelines PDF covering spacing rules, minimum sizing, and do\'s and don\'ts for usage.'
      },
      {
        question: 'Can you design T-shirt graphics and apparel-ready artwork?',
        answer: 'Yes, we specialize in high-resolution apparel graphics optimized for DTG (direct-to-garment), screen printing, and embroidery production. We provide color-separated files, placement guides, and garment mockups so you can visualize the final product before going to print.'
      },
      {
        question: 'How do you ensure design consistency across all brand touchpoints?',
        answer: 'We build unified design systems with shared color tokens, typographic scales, and component libraries stored in Figma. Every asset — from social posts to packaging — references these shared tokens, ensuring visual cohesion no matter where your brand appears.'
      },
      {
        question: 'Do you offer infographic and data visualization design?',
        answer: 'Yes, we create visually compelling infographics, report layouts, and data dashboards that transform complex information into clean, shareable visual stories. These are optimized for both digital sharing (social media, presentations) and high-resolution print output.'
      }
    ]
  },
  'ai-automation': {
    title: 'AI Automation & Business Bots',
    category: 'AI & Automation',
    tagline: 'Intelligent systems that work for you around the clock.',
    heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80',
    intro: 'The businesses that thrive in the next decade won\'t just use technology — they\'ll be powered by it. HanovaDevs builds custom AI-powered automation systems designed to eliminate repetitive manual tasks, accelerate decision-making, and unlock operational efficiency that was previously impossible. From intelligent chatbots that handle customer support 24/7 to workflow automation pipelines that process documents, route leads, manage inventory, and generate reports — we implement AI where it matters most. Our solutions aren\'t theoretical; they\'re production-grade systems deployed into your existing tech stack, delivering measurable ROI from week one.',
    features: [
      {
        title: 'Conversational AI Bots',
        desc: 'Custom chatbots and virtual assistants for customer support, lead qualification, and sales.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
      },
      {
        title: 'Workflow Automation',
        desc: 'End-to-end process automation for data entry, document processing, and task routing.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" /></svg>
      },
      {
        title: 'Predictive Analytics',
        desc: 'ML-driven forecasting dashboards for sales, inventory, and customer behavior.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
      }
    ],
    technicalSpecs: [
      { key: 'AI Models', value: 'GPT-4o, Claude, Gemini, Custom Fine-Tuned' },
      { key: 'Frameworks', value: 'LangChain, LlamaIndex, CrewAI' },
      { key: 'Automation', value: 'n8n, Zapier, Make, Custom APIs' },
      { key: 'Languages', value: 'Python, Node.js, TypeScript' },
      { key: 'Deployment', value: 'AWS Lambda, GCP Cloud Run, Docker' }
    ],
    deliverables: [
      { title: 'Custom AI Chatbot Deployment', desc: 'A production-ready conversational AI bot trained on your business data, integrated with your website, WhatsApp, Slack, or internal tools — handling customer queries, lead qualification, and appointment booking autonomously.' },
      { title: 'Workflow Automation Pipeline', desc: 'Fully automated multi-step business workflows connecting your CRM, email, spreadsheets, databases, and third-party APIs — eliminating manual data entry and human bottlenecks with intelligent routing logic.' },
      { title: 'Predictive Analytics Dashboard', desc: 'Real-time ML-powered dashboards forecasting sales trends, customer churn probability, inventory demands, and revenue projections based on your historical business data.' },
      { title: 'Document Processing Engine', desc: 'AI-powered document ingestion system that extracts, classifies, and routes information from invoices, contracts, forms, and emails — reducing manual processing time by up to 90%.' },
      { title: 'Intelligent Lead Scoring System', desc: 'Machine learning model trained on your conversion data that scores and prioritizes incoming leads, automatically routing high-value prospects to your sales team with enriched context and recommended actions.' }
    ],
    caseStudy: {
      clientName: 'LogiTrack Solutions',
      logo: '/projects/crown.png',
      summary: 'Deployed an AI-powered logistics optimization system that automated order routing and inventory forecasting.',
      metrics: [
        { label: 'Manual Work Reduction', value: '-78%' },
        { label: 'Order Processing Speed', value: '3x Faster' },
        { label: 'Forecast Accuracy', value: '94%' }
      ],
      challenge: 'Staff spent 6+ hours daily manually routing orders, updating spreadsheets, and generating fulfillment reports — leading to bottlenecks and costly errors.',
      solution: 'Built an intelligent automation pipeline combining GPT-4o document extraction, custom ML inventory forecasting, and n8n workflow orchestration — turning 6 hours of manual work into a 15-minute automated process.',
      link: '/projects'
    },
    process: [
      { step: '01', title: 'Audit', desc: 'Mapping your current workflows and identifying high-impact automation opportunities.' },
      { step: '02', title: 'Architect', desc: 'Designing the AI system architecture and integration points.' },
      { step: '03', title: 'Build & Train', desc: 'Developing custom models, bots, and automation pipelines.' },
      { step: '04', title: 'Deploy & Optimize', desc: 'Launching into production with monitoring and continuous improvement.' }
    ],
    blogs: [],
    advancements: [
      'Retrieval-Augmented Generation (RAG) for business knowledge',
      'Multi-agent AI orchestration (CrewAI, AutoGen)',
      'Real-time anomaly detection with streaming ML',
      'Edge AI for low-latency on-premise processing'
    ],
    relatedLinks: [
      { title: 'Custom Software Development', path: '/services/software-development' },
      { title: 'Web Design & Development', path: '/services/web-design' }
    ],
    faqs: [
      {
        question: 'What kind of AI chatbot can you build for my business?',
        answer: 'We build custom conversational AI bots powered by models like GPT-4o, Claude, or Gemini — trained specifically on your business data, product catalogs, and support documentation. These bots can handle customer inquiries, qualify leads, book appointments, process returns, and escalate complex cases to human agents — all through your website, WhatsApp, Slack, or any messaging platform.'
      },
      {
        question: 'How do you ensure AI automation doesn\'t break our existing workflows?',
        answer: 'We start with a non-invasive audit of your current tech stack and processes. Our automations are designed as modular additions that integrate through APIs and webhooks — not replacements. We deploy with monitoring dashboards and human-in-the-loop checkpoints so your team maintains oversight while the AI handles the repetitive execution.'
      },
      {
        question: 'What types of repetitive business tasks can AI automation eliminate?',
        answer: 'The most impactful automations include: data entry and spreadsheet updates, invoice and document processing, email classification and routing, lead scoring and CRM updates, report generation, inventory monitoring, social media scheduling, meeting notes summarization, and customer support ticket triage. If a task follows a pattern, we can likely automate it.'
      },
      {
        question: 'How long does it take to deploy an AI automation system?',
        answer: 'Simple automations like chatbots and workflow triggers can be deployed in 2 to 3 weeks. More complex systems involving custom ML models, multi-tool integrations, and predictive analytics typically take 4 to 8 weeks depending on data availability and system complexity. We deliver in iterative sprints so you see value early.'
      },
      {
        question: 'Do you use no-code tools or write custom automation code?',
        answer: 'We use the right tool for the job. For simpler integrations, we leverage platforms like n8n, Zapier, or Make for rapid deployment. For complex, high-volume, or security-sensitive workflows, we write custom Python/Node.js automation code deployed on scalable cloud infrastructure (AWS Lambda, GCP Cloud Run). Most projects combine both approaches for maximum efficiency.'
      },
      {
        question: 'Can you build AI tools that work with our existing CRM and databases?',
        answer: 'Absolutely. We integrate with all major CRMs (Salesforce, HubSpot, Pipedrive), databases (PostgreSQL, MongoDB, MySQL), productivity suites (Google Workspace, Microsoft 365), and communication tools (Slack, Teams, WhatsApp). Our automation pipelines connect these systems through secure API integrations with proper authentication and error handling.'
      },
      {
        question: 'How do you handle data privacy and security in AI deployments?',
        answer: 'Security is foundational to our approach. All data is encrypted in transit and at rest. We can deploy models on your private infrastructure for maximum data sovereignty. For cloud-based solutions, we use enterprise-grade providers (AWS, GCP) with role-based access controls, audit logging, and GDPR/SOC 2 compliance frameworks. Your data is never used to train third-party models.'
      },
      {
        question: 'What ROI can I expect from AI automation implementation?',
        answer: 'Our clients typically see 40% to 80% reduction in manual processing time, 2x to 5x faster task completion, and measurable error rate reduction within the first month. The specific ROI depends on your automation scope, but we provide a detailed impact projection during the initial audit phase and track actual performance metrics post-deployment to demonstrate real value.'
      }
    ]
  },
  'ugc-ads': {
    title: 'UGC Ads & Marketing',
    category: 'Marketing',
    tagline: 'Crush ad fatigue and scale your ROAS with high-converting user-generated content.',
    heroImage: '/projects/ugc_ad_skincare.png',
    intro: 'In the digital marketing landscape of 2026, traditional high-production commercial ads are no longer effective. Consumers have developed banner blindness, immediately scrolling past anything that feels like a corporate pitch. The solution is User-Generated Content (UGC) — raw, authentic, native-style videos created by real people that blend seamlessly into social feeds. At HanovaDevs, we treat UGC as a data-driven science. We script, cast, shoot, edit, and A/B test high-impact creatives engineered to capture attention in the first 3 seconds and drive immediate conversions.',
    features: [
      {
        title: 'Creator Sourcing & Casting',
        desc: 'Access to a curated network of creators matching your brand demographics.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><circle cx="9" cy="7" r="4" /><path d="M9 21v-2a4 4 0 0 0-4-4H1v2" /></svg>
      },
      {
        title: 'Data-Driven Scripting',
        desc: 'Every video is structured with psychological hooks, benefit callouts, and high-intent CTAs.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
      },
      {
        title: 'A/B Hook & Angle Testing',
        desc: 'We produce and test multiple hook variants to maximize CTR and lower customer acquisition costs.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" /><path d="M12 8v8" /><path d="M8 12h8" /></svg>
      }
    ],
    technicalSpecs: [
      { key: 'Platforms', value: 'TikTok, Instagram Reels, YouTube Shorts' },
      { key: 'Ad Formats', value: 'Spark Ads, Reels Ads, Dark Posts, Whitelisting' },
      { key: 'Key Metrics', value: '3-Sec Hook Rate, Hold Rate, CTR, ROAS' },
      { key: 'Deliverables', value: 'Raw Footage, Polished Edits, Hook Variations' },
      { key: 'Testing Cycles', value: 'Rapid 7-Day Creative Iteration' }
    ],
    deliverables: [
      { title: 'High-Converting UGC Video Creatives', desc: '6 fully-edited, high-converting social ad creatives ready for launch on TikTok, Meta, or YouTube.' },
      { title: 'A/B Hook Variations', desc: '3 distinct hook variants for each concept to optimize the crucial first 3 seconds of watch time.' },
      { title: 'Custom Scripting & Visual Storyboards', desc: 'Psychology-backed scripts written by conversion experts before filming begins.' },
      { title: 'Professional Creator Sourcing', desc: 'Demographic-targeted casting, contract management, and creative direction.' },
      { title: 'Post-Campaign Performance Analysis', desc: 'Detailed feedback loop analyzing hook rates, hold rates, and conversion metrics to guide the next batch.' }
    ],
    caseStudy: {
      clientName: 'RAQS Clothing Brand',
      logo: '/projects/raqs.png',
      summary: 'Engineered a pre-launch UGC campaign that accumulated over 15,000 email signups with a 4.2x projected return on ad spend.',
      metrics: [
        { label: 'Hook Rate (3s)', value: '+48.3%' },
        { label: 'Cost Per Acquisition', value: '-34%' },
        { label: 'Email Signups', value: '15,240+' }
      ],
      challenge: 'New clothing brand with zero organic presence needing to build trust and gather pre-launch subscribers on a tight budget.',
      solution: 'Sourced 5 diverse fashion creators to film authentic "unboxing & styling" mirror vlogs. A/B tested 4 different visual hooks, routing winning creatives to high-intent sign-up landing pages.',
      link: '/projects'
    },
    process: [
      { step: '01', title: 'Concept', desc: 'Analyzing product benefits and writing high-impact scripts.' },
      { step: '02', title: 'Casting', desc: 'Sourcing and briefing the perfect creators for your brand.' },
      { step: '03', title: 'Production', desc: 'Filming, editing, and adding native social overlays.' },
      { step: '04', title: 'Optimization', desc: 'Testing hooks and iterating based on real performance data.' }
    ],
    blogs: ['ugc-ads-conversion-science'],
    advancements: [
      '3-Second attention hook optimization',
      'Creator whitelisting and dark post setups',
      'Dynamic captions and native engagement overlays',
      'Looming hook analysis for TikTok & Meta algorithms'
    ],
    relatedLinks: [
      { title: 'Digital Advertising', path: '/services/digital-advertising' },
      { title: 'Social Media Marketing', path: '/services/social-media' }
    ],
    faqs: [
      {
        question: 'What is UGC and why is it outperforming traditional studio ads?',
        answer: 'User-Generated Content (UGC) is content created by everyday consumers or content creators that looks organic and native to the platform. Unlike traditional studio ads which trigger "ad fatigue" and skepticism, UGC blends into a user\'s social feed like a recommendation from a friend. This lowers the viewer\'s defensive guard, resulting in significantly higher click-through rates (CTR) and lower acquisition costs (CAC).'
      },
      {
        question: 'Do we have to find the content creators ourselves?',
        answer: 'No, we handle the entire process end-to-end. We cast, vet, contract, and manage creators from our curated network who match your target audience demographics. You simply approve the creators and the scripts before we begin production.'
      },
      {
        question: 'Can we use these videos for organic posts as well as paid ads?',
        answer: 'Absolutely. You receive full usage rights for all edited videos. You can post them organically on TikTok, Instagram, and YouTube, or use them as paid creatives. We can also set up "Creator Whitelisting" (Spark Ads) where we run ads directly through the creator\'s social handle for maximum authenticity.'
      },
      {
        question: 'How many hook variations do you provide?',
        answer: 'By default, we provide 3 distinct hook variations (the first 3 seconds) for each video concept. Since the hook is responsible for over 70% of an ad\'s performance, A/B testing different hooks allows us to find the absolute highest-performing creative angle without paying for entirely new videos.'
      },
      {
        question: 'What is the typical turnaround time for a batch of UGC videos?',
        answer: 'Our standard turnaround time is 14 days from script approval to final delivered assets. This includes creator sourcing, shipping products, filming, editing, and adding native text overlays/captions.'
      },
      {
        question: 'How do you measure the success of a UGC ad campaign?',
        answer: 'We analyze key diagnostic metrics: the 3-Second Hook Rate (what % of people watch past 3 seconds), the Hold Rate (average watch time), the Click-Through Rate (CTR), and ultimately, the Return on Ad Spend (ROAS). We use these insights to continuously optimize and script the next batch of creatives.'
      }
    ],
    gallery: [
      {
        image: '/projects/ugc_ad_skincare.png',
        category: 'CREATOR SPARK AD',
        title: 'SkinGlow Hydration Serum',
        desc: 'Product review & demonstration by beauty creator. Focused on hydration, texture, and organic morning routine integration.',
        creator: '@sophia_glows',
        caption: 'My absolute holy grail for glass skin! ✨ If you want that dewy glow all day, this is your sign. #glassskin #skincaretips #glow',
        likes: '12.4K',
        comments: '342',
        cta: 'Shop Now'
      },
      {
        image: '/projects/ugc_ad_candle.png',
        category: 'BRAND SPARK AD',
        title: 'Aura Home Soy Scented Candle',
        desc: 'Aesthetic mood-setting video showcasing warm atmosphere, premium packaging, and crackling wood-wick sensory experience.',
        creator: '@cozy_spaces',
        caption: 'Sundays are for cozy vibes and fresh scents. 🕯️ The new Vanilla Amber candle is literally heaven in a jar. #cozyhome #candlelovers #relax',
        likes: '8.9K',
        comments: '184',
        cta: 'Shop Now'
      },
      {
        image: '/projects/ugc_ad_raqs.png',
        category: 'CREATOR SPARK AD',
        title: 'RAQS Minimalist Streetwear',
        desc: 'Mirror selfie styling guide featuring the upcoming organic cotton oversized tee. Highlights fit, fabric weight, and drape.',
        creator: '@jaden_styles',
        caption: 'RAQS is dropping soon and this heavyweight tee is a 10/10. Drape is perfect. Stay tuned for the launch! 🔥 #streetwear #minimalistfashion #raqs',
        likes: '15.6K',
        comments: '512',
        cta: 'Learn More'
      },
      {
        image: '/projects/ugc_ad_terrasol.png',
        category: 'BRAND SPARK AD',
        title: 'Terra Sol Grounding Bed Sheet',
        desc: 'Educational bedroom vlog explaining the science of grounding sheets, showing the silver conductive grid and sleep improvements.',
        creator: '@mindful_living',
        caption: 'Honestly, my sleep quality has been on another level since trying out this grounding sheet. Here is how it works. ⚡ #grounding #wellnessjourney #deepsleep',
        likes: '7.2K',
        comments: '219',
        cta: 'Learn More'
      },
      {
        image: '/projects/ugc_ad_tech.png',
        category: 'CREATOR SPARK AD',
        title: 'AeroPods Pro Wireless Earbuds',
        desc: 'Fast-paced street interview & active noise cancellation reaction video. Showcases style, fit, and audio clarity.',
        creator: '@tech_reviews',
        caption: 'Testing the ANC on these new AeroPods Pro in the middle of NYC traffic... I am actually shocked. 🤯 #techreview #earbuds #audiophile',
        likes: '24.1K',
        comments: '683',
        cta: 'Shop Now'
      },
      {
        image: '/projects/ugc_ad_fitness.png',
        category: 'CREATOR SPARK AD',
        title: 'IronHydrate Insulated Water Bottle',
        desc: 'Gym bag check & workout hydration vlog. Emphasizes temperature retention, leak-proof lid, and sleek design.',
        creator: '@fit_life_clara',
        caption: 'Cold water after a heavy leg day hits different. 💦 Keeping my water ice-cold for 24+ hours. Link in bio! #gymessential #fitnessmotivation #hydrate',
        likes: '11.3K',
        comments: '198',
        cta: 'Shop Now'
      }
    ]
  },
  'shopify-development': {
    title: 'Shopify Store Development',
    category: 'E-Commerce',
    tagline: 'High-converting Shopify stores engineered for maximum sales.',
    heroImage: '/projects/shopify_store_showcase_1.png',
    intro: 'Your Shopify store is more than a product catalog — it is a conversion engine. We design and develop custom Shopify OS 2.0 stores that load instantly, tell your brand story, and drive friction-free checkouts. From custom Liquid programming and bespoke cart drawers to advanced app integrations (Klaviyo, Recharge, subscription models) and ERP syncing, we ensure your store is optimized for scale. Our development philosophy centers on maximizing Average Order Value (AOV) and conversion rate, turning window shoppers into loyal subscribers.',
    features: [
      {
        title: 'Custom Liquid & OS 2.0 Coding',
        desc: 'Bespoke sections and blocks tailored to your brand without slow page-builder apps.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
      },
      {
        title: 'High-Converting Checkout',
        desc: 'Optimized slide-out cart drawers, upsells, cross-sells, and quick-buy setups.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
      },
      {
        title: 'Tech Stack Integration',
        desc: 'Seamless setups for Klaviyo email flows, Recharge subscriptions, and custom APIs.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
      }
    ],
    technicalSpecs: [
      { key: 'Platform', value: 'Shopify, Shopify Plus' },
      { key: 'Architecture', value: 'Online Store 2.0 (OS 2.0)' },
      { key: 'Theme Base', value: 'Liquid, HTML5, Vanilla CSS, JS' },
      { key: 'Integrations', value: 'Klaviyo, Recharge, Loop, ERPs' },
      { key: 'Speed Benchmark', value: 'Sub-second mobile rendering' }
    ],
    deliverables: [
      { title: 'Custom Shopify OS 2.0 Theme Setup', desc: 'A clean, high-speed Shopify setup featuring custom Liquid sections and blocks built for easy client editing.' },
      { title: 'Optimized AJAX Cart Drawer', desc: 'Bespoke slide-out cart featuring integrated progress bars for free shipping and smart product upsells.' },
      { title: 'Marketing App Integrations', desc: 'Seamless setup of Klaviyo email flows, review platforms (Judge.me/Yotpo), and subscription widgets.' },
      { title: 'Bulk Product & SEO Migration', desc: 'Seamless migration of products, collections, customers, and redirect links to preserve search rankings.' },
      { title: 'Client Handover & Video Training', desc: 'Comprehensive video guides detailing how to update banners, add products, and manage discounts.' }
    ],
    caseStudy: {
      clientName: 'Aura Home Candle Co.',
      logo: '/projects/aurahome.png',
      summary: 'Re-engineered a slow e-commerce storefront into a high-speed, subscription-first brand portal.',
      metrics: [
        { label: 'Conversion Lift', value: '+58%' },
        { label: 'AOV Increase', value: '+32%' },
        { label: 'Mobile Page Speed', value: '94/100' }
      ],
      challenge: 'A bloated page-builder app and slow loading speeds caused a 78% cart abandonment rate on mobile devices.',
      solution: 'Rebuilt the store on a clean Shopify OS 2.0 framework with custom Liquid modules, optimizing assets, and integrating Recharge subscription flows.',
      link: '/projects'
    },
    process: [
      { step: '01', title: 'Strategy', desc: 'Mapping product catalogs, collection structures, and upsell logic.' },
      { step: '02', title: 'Theme Code', desc: 'Writing custom Liquid sections and high-speed CSS blocks.' },
      { step: '03', title: 'App Setup', desc: 'Integrating email, subscriptions, and analytics tools.' },
      { step: '04', title: 'Optimization', desc: 'Rigorous speed tuning, checkout testing, and live launch.' }
    ],
    blogs: ['future-of-web-dev'],
    advancements: [
      'Custom Liquid blocks replacing heavy apps',
      'Advanced e-commerce analytics tracking',
      'Mobile-first checkout layouts',
      'Frictionless subscription billing integrations'
    ],
    relatedLinks: [
      { title: 'Web Design & Development', path: '/services/web-design' },
      { title: 'SEO & Performance Marketing', path: '/services/seo' }
    ],
    faqs: [
      {
        question: 'Do you use page-builder apps like PageFly or Shogun?',
        answer: 'No. Page-builder apps inject massive amounts of bloated code that slows down your store and hurts conversion rates. We write clean, custom Liquid sections directly into the Shopify theme, giving you drag-and-drop flexibility in the Shopify customizer with zero performance drag.'
      },
      {
        question: 'Can you migrate my existing store from WooCommerce or Squarespace?',
        answer: 'Yes, we handle the entire migration process. This includes securely importing your products, customer records, order history, and setting up URL redirects to ensure your Google SEO rankings are completely preserved.'
      },
      {
        question: 'How do you optimize the store for higher Average Order Value (AOV)?',
        answer: 'We design custom AJAX cart drawers featuring progress bars (e.g. "Spend $15 more for Free Shipping") and smart cross-sells based on what is currently in the cart, making it effortless for customers to add items before checking out.'
      },
      {
        question: 'Can you integrate custom subscription programs?',
        answer: 'Yes, we specialize in integrating subscription platforms like Recharge and Loop, styling the widgets to match your brand style perfectly for a premium customer experience.'
      }
    ],
    gallery: [
      {
        image: '/projects/shopify_store_showcase_1.png',
        category: 'DESKTOP SHOWCASE',
        title: 'Bespoke Shopify OS 2.0 Storefront',
        desc: 'A clean, high-end desktop e-commerce storefront showcasing luxury products and minimalist navigation.'
      },
      {
        image: '/projects/shopify_store_showcase_2.png',
        category: 'MOBILE OPTIMIZED',
        title: 'Mobile Product Landing Page',
        desc: 'A conversion-engineered mobile interface featuring clear pricing, ratings, and a sticky Add to Cart button.'
      },
      {
        image: '/projects/shopify_dashboard.png',
        category: 'ANALYTICS ENGINE',
        title: 'Shopify E-Commerce Dashboard',
        desc: 'Real-time revenue growth, conversion rate optimization telemetry, and sales metrics tracking.'
      }
    ]
  }
}


export default function ServiceDetail() {
  const { id } = useParams()
  const service = servicesData[id]
  const relatedPosts = service ? journalPosts.filter(p => service.blogs.includes(p.slug)) : []
  const [activeFaq, setActiveFaq] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!service) {
    return (
      <div className="service-not-found">
        <SEO title="Service Not Found" />
        <div className="container text-center" style={{ paddingTop: '200px', paddingBottom: '100px' }}>
          <h2>Service not found.</h2>
          <Link to="/services" className="btn btn-primary" style={{ marginTop: '2rem' }}>Back to Services</Link>
        </div>
      </div>
    )
  }

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  // Generate Answer Engine Optimization (AEO) JSON-LD for this specific service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "provider": {
      "@type": "Organization",
      "name": "HanovaDevs"
    },
    "description": service.intro,
    "offers": {
      "@type": "Offer",
      "description": service.tagline
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Service Features",
      "itemListElement": service.features.map((feat, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": feat.title,
          "description": feat.desc
        },
        "position": index + 1
      }))
    }
  }

  return (
    <div className="service-detail-page">
      <SEO 
        title={service.title} 
        description={service.intro.substring(0, 160) + '...'}
        url={`/services/${id}`}
        schemaMarkup={serviceSchema}
      />
      
      {/* Hero Section */}
      <section className="service-detail__hero">
        <div className="service-detail__hero-bg">
          <img src={service.heroImage} alt={service.title} />
          <div className="service-detail__hero-overlay"></div>
        </div>
        <div className="container">
          <div className="service-detail__hero-content reveal">
            <div className="service-detail__breadcrumbs">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/services">Services</Link>
              <span>/</span>
              <span className="current">{service.category}</span>
            </div>
            <span className="service-detail__tag card-glass">{service.category}</span>
            <h1>{service.title}</h1>
            <p>{service.tagline}</p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="service-detail__intro section">
        <div className="container">
          <div className="service-detail__intro-grid">
            <div className="service-detail__intro-text reveal">
              <span className="section-label">Overview</span>
              <h2>Driving results through <em>expert execution.</em></h2>
              <p className="lead">{service.intro}</p>
              
              <div className="service-detail__specs-table reveal reveal-delay-1">
                <h3>Technical Specifications</h3>
                <div className="specs-grid">
                  {service.technicalSpecs.map((spec, i) => (
                    <div key={i} className="spec-item">
                      <span className="spec-label">{spec.key}</span>
                      <span className="spec-value">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="service-detail__intro-image reveal reveal-right reveal-delay-1">
              <img src={service.heroImage} alt="Service Overview" className="service-detail__showcase-img" />
              <div className="service-detail__img-backdrop"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Checklist Section (NEW) */}
      <section className="service-detail__deliverables section bg-off-white">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '3.5rem' }}>
            <span className="section-label">Scope of Work</span>
            <h2>Granular <em>Deliverables Checklist</em></h2>
            <p style={{ color: 'var(--blue-grey)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
              Every package is engineered with clear checklists and milestones. Here is exactly what we deliver.
            </p>
          </div>
          
          <div className="deliverables-grid">
            {service.deliverables.map((item, i) => (
              <div key={i} className={`deliverable-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="deliverable-check-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div className="deliverable-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio/Showcase Gallery Section (Optional) */}
      {service.gallery && (
        <section className="service-detail__gallery section">
          <div className="container">
            <div className="text-center reveal" style={{ marginBottom: '3.5rem' }}>
              <span className="section-label">
                {id === 'ugc-ads' ? 'UGC Ad Creative Examples' : 'Design Gallery'}
              </span>
              <h2>
                {id === 'ugc-ads' ? (
                  <>High-Converting <em>UGC Ad Showcase</em></>
                ) : (
                  <>Our <em>Creative Showcase</em></>
                )}
              </h2>
              <p style={{ color: 'var(--blue-grey)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
                {id === 'ugc-ads' 
                  ? 'Take a look at some of our high-converting UGC ad creatives, designed to capture attention and drive conversions.'
                  : 'Take a look at some of our recent logo design, branding systems, and premium packaging work.'
                }
              </p>
            </div>
            
            <div className={`service-detail__gallery-grid ${id === 'ugc-ads' ? 'ugc-gallery-grid' : ''}`}>
              {service.gallery.map((item, i) => (
                <div key={i} className={`service-detail__gallery-card reveal reveal-delay-${(i % 3) + 1} ${id === 'ugc-ads' ? 'ugc-gallery-card' : ''}`}>
                  {id === 'ugc-ads' ? (
                    <div className="ugc-phone-frame">
                      <div className="ugc-phone-notch"></div>
                      <div className="ugc-phone-screen">
                        <img src={item.image} alt={item.title} className="ugc-phone-image" loading="lazy" />
                        <div className="ugc-overlay-top">
                          <span className={`ugc-ad-badge ${item.category.toLowerCase().includes('creator') ? 'ugc-creator-badge' : 'ugc-brand-badge'}`}>
                            {item.category}
                          </span>
                        </div>
                        <div className="ugc-overlay-right">
                          <div className="ugc-action-btn">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="ugc-heart-icon"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            <span>{item.likes}</span>
                          </div>
                          <div className="ugc-action-btn">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
                            <span>{item.comments}</span>
                          </div>
                          <div className="ugc-action-btn">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/></svg>
                            <span>Share</span>
                          </div>
                        </div>
                        <div className="ugc-overlay-bottom">
                          <span className="ugc-creator-handle">{item.creator}</span>
                          <p className="ugc-caption">{item.caption}</p>
                          <button className="ugc-cta-button">{item.cta} ›</button>
                        </div>
                      </div>
                      <div className="ugc-phone-info-card">
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="gallery-card__image-wrapper">
                        <img src={item.image} alt={item.title} loading="lazy" />
                        <span className="gallery-card__category">{item.category}</span>
                      </div>
                      <div className="gallery-card__info">
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      <section className="service-detail__process section">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '4rem' }}>
            <span className="section-label">Workflow</span>
            <h2>Our <em>Process</em></h2>
            <p style={{ color: 'var(--blue-grey)', maxWidth: '600px', margin: '0 auto' }}>
              A systematic approach to engineering excellence and creative growth.
            </p>
          </div>
          <div className="service-detail__process-grid">
            {service.process.map((p, i) => (
              <div key={i} className={`service-detail__process-card reveal reveal-delay-${i + 1}`}>
                <div className="service-detail__process-step">{p.step}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                {i < service.process.length - 1 && <div className="process-path" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Spotlight Section (NEW) */}
      <section className="service-detail__case-study section">
        <div className="container">
          <div className="case-study-spotlight reveal">
            <div className="case-study-spotlight__grid">
              <div className="case-study-spotlight__info">
                <span className="case-study-label">Client Success Spotlight</span>
                <div className="case-study-brand">
                  <div className="case-study-brand-badge">✓</div>
                  <h3>{service.caseStudy.clientName}</h3>
                </div>
                <p className="case-study-summary">{service.caseStudy.summary}</p>
                
                <div className="case-study-challenge-solution">
                  <div className="cs-block">
                    <h4>The Challenge</h4>
                    <p>{service.caseStudy.challenge}</p>
                  </div>
                  <div className="cs-block">
                    <h4>The Solution</h4>
                    <p>{service.caseStudy.solution}</p>
                  </div>
                </div>
                
                <Link to={service.caseStudy.link} className="btn btn-secondary cs-btn">
                  View All Projects
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
              
              <div className="case-study-spotlight__metrics">
                <h3>Key Metrics Compounded</h3>
                <div className="cs-metrics-grid">
                  {service.caseStudy.metrics.map((metric, i) => (
                    <div key={i} className="cs-metric-card">
                      <span className="cs-metric-value">{metric.value}</span>
                      <span className="cs-metric-label">{metric.label}</span>
                    </div>
                  ))}
                </div>
                
                <div className="cs-badge-strip">
                  <span>✓ Verified Outcomes</span>
                  <span>✓ Real-World Impact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="service-detail__features section bg-off-white">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '3rem' }}>
            <h2>What We Offer</h2>
            <p style={{ color: 'var(--blue-grey)', maxWidth: '600px', margin: '0 auto', fontSize: '0.9rem' }}>
              Comprehensive solutions tailored to your specific business requirements.
            </p>
          </div>
          <div className="service-detail__features-grid">
            {service.features.map((feature, i) => (
              <div key={i} className={`service-detail__feature-card reveal reveal-delay-${i + 1}`}>
                <div className="service-detail__feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="service-detail__advancements-wrap reveal">
            <div className="service-detail__advancements">
              <h3>Advanced Capabilities</h3>
              <ul>
                {service.advancements.map((adv, i) => (
                  <li key={i}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="service-detail__related">
              <h3>Related Services</h3>
              <div className="service-detail__related-links">
                {service.relatedLinks.map((link, i) => (
                  <Link key={i} to={link.path} className="service-detail__r-link hoverable">
                    {link.title}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Collapsible FAQ Accordion Section (NEW) */}
      <section className="service-detail__faq section">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '4rem' }}>
            <span className="section-label">FAQ</span>
            <h2>Frequently Asked <em>Questions</em></h2>
            <p style={{ color: 'var(--blue-grey)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
              Have questions about our operations? Here are direct answers to our most common operational inquiries.
            </p>
          </div>
          
          <div className="jn-faq-accordion reveal">
            {service.faqs.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div key={i} className={`jn-faq-item ${isOpen ? 'active' : ''}`}>
                  <button 
                    className="jn-faq-trigger" 
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                  >
                    <span className="jn-faq-question">{faq.question}</span>
                    <span className="jn-faq-icon-wrap">
                      <svg 
                        className="jn-faq-icon" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" className="line-vertical"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </span>
                  </button>
                  <div className="jn-faq-content" style={{ maxHeight: isOpen ? '350px' : '0' }}>
                    <div className="jn-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Insights (Blog Links) */}
      {relatedPosts.length > 0 && (
        <section className="service-detail__insights section bg-off-white">
          <div className="container">
            <div className="text-center reveal" style={{ marginBottom: '3.5rem' }}>
              <span className="section-label">Resources</span>
              <h2>Related <em>Lab Insights</em></h2>
            </div>
            <div className="service-detail__insights-grid">
              {relatedPosts.map((post, i) => (
                <Link to={`/journal/${post.slug}`} key={i} className="service-detail__insight-card reveal reveal-delay-1">
                  <div className="insight-card__image">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="insight-card__content">
                    <h3>{post.title}</h3>
                    <div className="insight-card__link">Read Article <span>→</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* ===== INTERACTIVE CALCULATOR PROMO ===== */}
      <section className="calc-promo-section section bg-off-white" style={{ borderTop: '1px solid #f1f5f9' }}>
        <div className="container">
          <div className="calc-promo-grid">
            <div className="calc-promo-content reveal">
              <span className="section-label">Interactive Planner</span>
              <h2>Project Your <span className="gradient-text">{service.title}</span> Budget</h2>
              <p>
                Want a granular cost and timeline estimate for your {service.title.toLowerCase()} project? 
                Adjust technical stacks, features, and delivery speeds in our interactive calculator to get an instant scope sheet.
              </p>
              <Link to="/calculator" className="btn btn-primary" style={{ display: 'inline-flex', gap: '0.5rem', textDecoration: 'none' }}>
                Estimate {service.title} Cost 🚀
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
            </div>
            
            <div className="calc-promo-preview reveal reveal-right reveal-delay-1">
              <div className="calc-preview-card">
                <div className="calc-preview-header">
                  <span className="calc-preview-title">Scope Calculator</span>
                  <span className="calc-preview-badge">Live</span>
                </div>
                <div className="calc-preview-body">
                  <div className="calc-preview-row">
                    <span className="calc-preview-label">Estimated Delivery Speed</span>
                    <div className="calc-preview-slider-track">
                      <div className="calc-preview-slider-fill" style={{ width: '85%' }}></div>
                      <div className="calc-preview-slider-thumb" style={{ left: '85%' }}></div>
                    </div>
                  </div>
                  <div className="calc-preview-results">
                    <span className="calc-preview-result-val">⚡ Expedited Sprints</span>
                    <span className="calc-preview-result-lbl">Timeline Reduced by ~35%</span>
                  </div>
                  <Link to="/calculator" className="calc-preview-btn">
                    Configure Scope
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="service-detail__cta section">
        <div className="container text-center reveal">
          <h2>Ready to elevate your {service.title.toLowerCase()}?</h2>
          <p>Let's discuss how we can help your business grow.</p>
          <div style={{ marginTop: '2.5rem' }}>
            <Link to="/contact" className="btn btn-primary btn-lg">Start a Project</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
