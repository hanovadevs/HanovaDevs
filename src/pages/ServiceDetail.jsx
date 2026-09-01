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
      logo: '/projects/terrasol.webp',
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
      logo: '/projects/crown.webp',
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
      { title: 'Custom Software Development', path: '/services/software-development' }
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
      logo: '/projects/earthsync.webp',
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
      { title: 'Custom Software Development', path: '/services/software-development' }
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
      logo: '/projects/nexus.webp',
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
  'ai-automation': {
    title: 'AI Automation & Calling Assistants',
    category: 'Featured Niche',
    tagline: 'AI Chatbots, Smart calling assistants, & business automation.',
    heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80',
    intro: 'The businesses that thrive in the next decade won\'t just use technology — they\'ll be powered by it. HanovaDevs builds custom AI-powered automation systems designed to eliminate repetitive manual tasks, accelerate booking funnels, and unlock operational efficiency. From intelligent chatbots that handle website customer support 24/7, to conversational AI voice assistants that call prospects and book meetings automatically, to unified AI management dashboards that run your business operations — we implement AI where it matters most. Our solutions aren\'t theoretical; they\'re production-grade systems deployed into your existing tech stack, delivering measurable ROI from week one.',
    features: [
      {
        title: 'Website AI Chatbots',
        desc: 'Intelligent, context-aware website chatbots trained on your business data to convert visitors, answer support queries, and qualify leads 24/7.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
      },
      {
        title: 'AI Voice Calling Assistants',
        desc: 'Human-like conversational voice agents that automatically call prospects, handle booking inquiries, and schedule meetings on autopilot.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
      },
      {
        title: 'Unified AI Management',
        desc: 'Custom management dashboards and dashboards to oversee AI agents, track call transcripts, view chat logs, and automate workflows.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /></svg>
      }
    ],
    technicalSpecs: [
      { key: 'AI Models', value: 'GPT-4o, Claude 3.5 Sonnet, Custom Fine-Tuned LLMs' },
      { key: 'Voice & Speech', value: 'VAPI, Retell AI, ElevenLabs, Deepgram' },
      { key: 'Orchestration', value: 'n8n, LangChain, Flowise, Custom APIs' },
      { key: 'Languages', value: 'Python, Node.js, TypeScript' },
      { key: 'Compliance', value: 'SOC 2, GDPR, Encrypted Data Pipelines' }
    ],
    deliverables: [
      { title: 'Interactive Website AI Chatbot', desc: 'A production-ready conversational AI bot trained on your business data, integrated with your website, WhatsApp, Slack, or internal tools — handling customer queries, lead qualification, and appointment booking autonomously.' },
      { title: 'AI Voice Calling & Booking Assistant', desc: 'Human-like voice synthesis and low-latency speech recognition configured to call leads, answer inquiries, resolve schedules, and automatically book meetings directly into your calendar.' },
      { title: 'Unified AI Management Portal', desc: 'A custom web dashboard where you can see all your AI agent activities, review call recordings, read chat transcripts, update knowledge bases, and control workflows in one central workspace.' },
      { title: 'Workflow Automation Pipelines', desc: 'Fully automated multi-step business workflows connecting your CRM, email, databases, and third-party APIs — eliminating manual data entry and routing leads dynamically.' },
      { title: 'Intelligent Lead Scoring System', desc: 'Machine learning model trained on your conversion data that scores and prioritizes incoming leads, automatically routing high-value prospects to your sales team with enriched context.' }
    ],
    caseStudy: {
      clientName: 'Aura Wellness Group',
      logo: '/projects/crown.webp',
      summary: 'Deployed an AI-powered voice assistant and website chatbot that automated lead triage, call booking, and database synchronization.',
      metrics: [
        { label: 'Manual Work Reduction', value: '-82%' },
        { label: 'Booking Rate Lift', value: '+45%' },
        { label: 'Response Time', value: 'Instant' }
      ],
      challenge: 'Staff spent hours daily manually qualification calling, updating spreadsheets, and scheduling discovery calls, leading to delays and missed booking leads.',
      solution: 'Built an intelligent automation system combining GPT-4o conversational chatbot on the site, a human-like voice calling assistant for phone booking, and a custom dashboard tracking transcripts.',
      link: '/projects'
    },
    process: [
      { step: '01', title: 'Audit', desc: 'Mapping your current booking channels and workflow bottlenecks.' },
      { step: '02', title: 'Architect', desc: 'Designing the chatbot paths, voice scripts, and database integrations.' },
      { step: '03', title: 'Build & Train', desc: 'Training LLMs on your company data and setting up voice models.' },
      { step: '04', title: 'Deploy & Sync', desc: 'Launching into production with CRM synchronization and live dashboard tracking.' }
    ],
    blogs: [],
    advancements: [
      'Retrieval-Augmented Generation (RAG) for business knowledge',
      'Multi-agent AI orchestration (CrewAI, AutoGen)',
      'Real-time speech-to-text with EleventLabs integration',
      'Unified admin logging & telemetry data'
    ],
    relatedLinks: [
      { title: 'Custom Software Development', path: '/services/software-development' },
      { title: 'Web Design & Development', path: '/services/web-design' }
    ],
    faqs: [
      {
        question: 'What kind of AI chatbot can you build for my website?',
        answer: 'We build custom conversational AI bots powered by models like GPT-4o or Claude 3.5 Sonnet — trained specifically on your business data, product catalogs, and support documentation. These bots can handle customer inquiries, qualify leads, book appointments, process returns, and escalate complex cases to human agents — all through your website, WhatsApp, Slack, or any messaging platform.'
      },
      {
        question: 'How does the AI calling assistant book calls?',
        answer: 'Our AI calling assistants utilize human-like voice synthesis and low-latency speech recognition to call leads, answer inquiries, resolve schedules, and automatically book calls directly into your calendar (like Google Calendar or Outlook) and update your CRM with the call status and detailed logs.'
      },
      {
        question: 'What is the AI management system?',
        answer: 'An AI management system is a custom web dashboard where you can see all your AI agent activities, review call recordings, read chat transcripts, update knowledge bases, and control workflows in one central workspace.'
      },
      {
        question: 'How long does it take to deploy an AI automation system?',
        answer: 'Simple automations like chatbots and workflow triggers can be deployed in 2 to 3 weeks. More complex systems involving voice assistants, custom databases, and predictive analytics dashboards typically take 4 to 6 weeks. We deliver in iterative sprints so you see value early.'
      },
      {
        question: 'Do you use no-code tools or write custom automation code?',
        answer: 'We use the right tool for the job. For simpler integrations, we leverage platforms like n8n or Make. For complex, high-volume, or security-sensitive workflows, we write custom Python/Node.js automation code deployed on scalable cloud infrastructure (AWS Lambda, GCP Cloud Run) to guarantee peak performance and security.'
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
  'shopify-development': {
    title: 'Shopify Store Development',
    category: 'E-Commerce',
    tagline: 'High-converting Shopify stores engineered for maximum sales.',
    heroImage: '/projects/shopify_store_showcase_1.webp',
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
      logo: '/projects/aurahome.webp',
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
        image: '/projects/shopify_store_showcase_1.webp',
        category: 'DESKTOP SHOWCASE',
        title: 'Bespoke Shopify OS 2.0 Storefront',
        desc: 'A clean, high-end desktop e-commerce storefront showcasing luxury products and minimalist navigation.'
      },
      {
        image: '/projects/shopify_store_showcase_2.webp',
        category: 'MOBILE OPTIMIZED',
        title: 'Mobile Product Landing Page',
        desc: 'A conversion-engineered mobile interface featuring clear pricing, ratings, and a sticky Add to Cart button.'
      },
      {
        image: '/projects/shopify_dashboard.webp',
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
        faqList={service.faqs}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Services', item: '/services' },
          { name: service.title, item: `/services/${id}` }
        ]}
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

      {/* Portfolio/Showcase Gallery Section */}
      {service.gallery && (
        <section className="service-detail__gallery section">
          <div className="container">
            <div className="text-center reveal" style={{ marginBottom: '3.5rem' }}>
              <span className="section-label">Design Gallery</span>
              <h2>Our <em>Creative Showcase</em></h2>
              <p style={{ color: 'var(--blue-grey)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
                Take a look at some of our recent logo design, branding systems, and premium packaging work.
              </p>
            </div>
            
            <div className="service-detail__gallery-grid">
              {service.gallery.map((item, i) => (
                <div key={i} className={`service-detail__gallery-card reveal reveal-delay-${(i % 3) + 1}`}>
                  <div className="gallery-card__image-wrapper">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <span className="gallery-card__category">{item.category}</span>
                  </div>
                  <div className="gallery-card__info">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
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
