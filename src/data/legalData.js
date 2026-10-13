/**
 * HanovaDevs Legal Data & Structured Content
 * 
 * DISCLAIMER FOR DEVELOPERS & OPERATORS:
 * This policy and terms document represents a professional baseline crafted specifically
 * for HanovaDevs' technical capabilities (custom software engineering, AI automation, 
 * web development, digital consulting). Before relying on these terms for jurisdiction-specific
 * compliance, they should be reviewed and approved by qualified legal counsel.
 */

export const legalMetadata = {
  lastUpdated: 'September 2, 2026',
  effectiveDate: 'September 2, 2026',
  companyName: 'HanovaDevs',
  websiteUrl: 'https://hanovadevs.com',
  contactEmail: 'contact@hanovadevs.com',
  location: '100% Remote-First Digital Studio (Global Operations • Hub: Lahore, Pakistan)'
}

export const privacyPolicyData = {
  title: 'Privacy Policy',
  eyebrow: 'LEGAL • PRIVACY',
  subtitle: 'How HanovaDevs collects, uses, protects, and manages information across our 100% remote digital agency operations and cloud platforms.',
  badge: 'Your privacy matters',
  sections: [
    {
      id: 'introduction',
      number: '01',
      title: 'Introduction & 100% Remote Operations',
      content: [
        {
          type: 'paragraph',
          text: 'Welcome to HanovaDevs ("we," "us," "our," or "HanovaDevs"). We operate as a 100% remote-first digital agency and custom software studio specializing in AI automation systems, conversational agents, custom software engineering, web application development, SEO, and digital consulting.'
        },
        {
          type: 'paragraph',
          text: 'HanovaDevs operates entirely through digital and cloud-based infrastructure without physical walk-in office locations. All client consultations, discovery sessions, engineering collaboration, and support services are delivered remotely.'
        },
        {
          type: 'paragraph',
          text: 'This Privacy Policy explains how we collect, use, disclose, and safeguard personal and business information when you visit our website (https://hanovadevs.com), use our interactive tools (such as our Project Estimator and AI Assistant Aria), schedule remote video/voice consultations, or engage our team for digital engineering services.'
        },
        {
          type: 'callout',
          title: 'Our Core Privacy Commitment',
          text: 'We believe in data minimization. We only collect information necessary to deliver high-quality digital solutions, communicate transparently with clients, and optimize our platform performance. We do not sell your personal information to third-party data brokers.'
        }
      ]
    },
    {
      id: 'information-we-collect',
      number: '02',
      title: 'Information We Collect',
      content: [
        {
          type: 'paragraph',
          text: 'We collect information in two primary ways: information you directly provide to us, and technical information collected automatically as you browse our digital platforms.'
        },
        {
          type: 'heading',
          text: 'A. Information You Provide Directly'
        },
        {
          type: 'list',
          items: [
            'Contact & Identification Details: Name, email address, phone number, company or brand name, and job title when you submit an inquiry or book a discovery meeting.',
            'Project Scope & Budget Information: Project goals, technical requirements, target delivery timelines, selected feature sets, and estimated investment ranges provided via our Contact Form or Project Estimator.',
            'Consultation & Remote Scheduling Details: Preferred meeting dates, times, timezones, and call agendas submitted through our digital consultation scheduler (for remote Google Meet or Zoom sessions).',
            'AI Assistant Interactions: Chat messages, inquiry prompts, and contact details shared during conversations with our website AI assistant (Aria).',
            'Newsletter Subscriptions: Email address submitted to receive engineering insights, tech case studies, and studio news.',
            'Client Communications: Notes, feedback, project files, and specifications shared during remote discovery and active engineering sprints.'
          ]
        },
        {
          type: 'heading',
          text: 'B. Information Collected Automatically'
        },
        {
          type: 'list',
          items: [
            'Device & Browser Telemetry: Browser type, operating system, device class (mobile, tablet, desktop), screen resolution, and language settings.',
            'Network & Access Logs: Approximate geographic location (country/city level from IP), referral URLs, pages visited, time spent per page, and navigation paths.',
            'Performance Metrics: Core Web Vitals, page load speeds, and client-side error telemetry collected through privacy-focused infrastructure telemetry (e.g., Vercel Web Analytics and Speed Insights).'
          ]
        }
      ]
    },
    {
      id: 'how-we-use-information',
      number: '03',
      title: 'How We Use Your Information',
      content: [
        {
          type: 'paragraph',
          text: 'We utilize collected information solely for legitimate business operations and digital service delivery purposes, including:'
        },
        {
          type: 'list',
          items: [
            'Responding to inquiries, project proposals, and scheduling remote technical discovery sessions.',
            'Scoping, architecting, developing, and deploying custom software and automation solutions.',
            'Operating and refining our interactive cost calculators, AI assistant responses, and site navigation.',
            'Delivering technical newsletters, case study releases, and agency announcements (with full unsubscribe controls).',
            'Monitoring application performance, server reliability, and preventing fraudulent or abusive activity.',
            'Complying with contractual, accounting, and legal obligations.'
          ]
        }
      ]
    },
    {
      id: 'analytics-and-cookies',
      number: '04',
      title: 'Analytics, Cookies & Similar Technologies',
      content: [
        {
          type: 'paragraph',
          text: 'HanovaDevs prioritizes lightweight, privacy-respecting technology. We use minimal browser storage mechanisms necessary for application functionality and non-invasive performance measurement.'
        },
        {
          type: 'list',
          items: [
            'Essential Functional Storage: Session storage and local storage to remember your UI preferences (such as calculator inputs and timezone selections) during your active visit.',
            'Aggregated Performance Analytics: We leverage edge-based performance analytics (such as Vercel Analytics) that measure page load times and engagement without tracking your identity across unrelated third-party websites.',
            'Cookie Controls: You can configure your browser to reject cookies or alert you when cookies are sent. Essential features of our site will continue to function normally even if non-essential cookies are disabled.'
          ]
        }
      ]
    },
    {
      id: 'ai-features-and-chatbot',
      number: '05',
      title: 'AI-Powered Features & Assistant Interactions',
      content: [
        {
          type: 'paragraph',
          text: 'Our website features "Aria," an interactive AI assistant designed to answer questions about our services, calculate rough budget estimates, and help visitors schedule calls.'
        },
        {
          type: 'list',
          items: [
            'Processing Context: Messages you submit to Aria are transmitted via encrypted API connections to secure serverless functions powered by modern language models (such as Google Gemini or OpenAI) solely to formulate helpful, immediate responses.',
            'No Training on Client Confidential Data: We do not permit third-party AI model providers to use your confidential business inquiries or project submissions to train publicly accessible machine learning models.',
            'Chat Records: We may retain anonymized chat records to review assistant accuracy, improve service recommendations, and follow up on client quote requests.'
          ]
        }
      ]
    },
    {
      id: 'third-party-services',
      number: '06',
      title: 'Third-Party Services & Integrations',
      content: [
        {
          type: 'paragraph',
          text: 'To provide a dependable digital infrastructure, we integrate with established, reputable cloud service providers. Each provider processes data strictly under confidentiality and data protection standards:'
        },
        {
          type: 'list',
          items: [
            'Cloud Hosting & Edge CDN: Vercel Inc. (Global edge infrastructure, serverless compute, and performance telemetry).',
            'Database & Backend Storage: Supabase Inc. (Encrypted database management for lead triage and booking records).',
            'Communication & Email Dispatch: Formsubmit / Nodemailer / SMTP gateways for contact routing and inquiry dispatch.',
            'Calendar & Scheduling: Google Calendar API links for generating user-directed remote calendar invitation events.'
          ]
        }
      ]
    },
    {
      id: 'data-sharing-and-disclosure',
      number: '07',
      title: 'How Information Is Shared',
      content: [
        {
          type: 'paragraph',
          text: 'HanovaDevs does not sell, rent, or trade your personal information. We only share information under strict, limited circumstances:'
        },
        {
          type: 'list',
          items: [
            'Authorized Service Providers: Trusted infrastructure vendors (hosting, database, email) who assist in running our web platforms under confidentiality obligations.',
            'Client Consent: When you explicitly authorize us to share information (e.g., integrating third-party APIs into your custom software project).',
            'Legal & Protection Requirements: If required to do so by applicable law, court order, or to protect the safety, rights, and intellectual property of HanovaDevs, our clients, or the public.'
          ]
        }
      ]
    },
    {
      id: 'data-security-and-retention',
      number: '08',
      title: 'Data Security & Retention',
      content: [
        {
          type: 'paragraph',
          text: 'We implement industry-standard administrative, technical, and cybersecurity safeguards to prevent unauthorized access, disclosure, alteration, or destruction of information across our remote cloud infrastructure.'
        },
        {
          type: 'list',
          items: [
            'Encryption: All web traffic and API transmissions are encrypted using modern Transport Layer Security (TLS 1.3 / HTTPS).',
            'Access Controls: Access to client databases and inquiry records is restricted to authenticated engineering personnel with multi-factor authentication.',
            'Data Retention: We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy, manage ongoing client engagements, or comply with legal and audit requirements.'
          ]
        }
      ]
    },
    {
      id: 'international-transfers',
      number: '09',
      title: 'International Data Processing & Remote Operations',
      content: [
        {
          type: 'paragraph',
          text: 'HanovaDevs operates as a global remote-first team serving clients across North America, Europe, Asia, and Australia. Information we collect may be processed and stored on cloud servers distributed worldwide.'
        },
        {
          type: 'paragraph',
          text: 'By interacting with our website and submitting your details, you acknowledge that your information may be transferred to and maintained on computer networks located outside of your state, province, or country, where data protection laws may differ. We take all reasonable steps to ensure your data is treated securely in accordance with this Privacy Policy.'
        }
      ]
    },
    {
      id: 'your-privacy-rights',
      number: '10',
      title: 'Your Privacy Rights & Choices',
      content: [
        {
          type: 'paragraph',
          text: 'Depending on your jurisdiction (including the EU/EEA, UK, California, and other regions with applicable privacy frameworks), you may have specific rights regarding your personal information:'
        },
        {
          type: 'list',
          items: [
            'Access & Portability: Request confirmation of whether we hold your information and obtain a copy of your records in a structured format.',
            'Correction: Request updates or corrections to incomplete or inaccurate personal details.',
            'Deletion: Request the erasure of your personal information where there is no legal requirement for retention.',
            'Marketing Opt-Out: Unsubscribe from marketing newsletters at any time by clicking the unsubscribe link or contacting us directly.',
            'Withdrawal of Consent: Revoke previously granted consent for specific data processing activities.'
          ]
        },
        {
          type: 'paragraph',
          text: 'To exercise any of these rights, please contact us at contact@hanovadevs.com. We respond to all verified requests in a timely manner.'
        }
      ]
    },
    {
      id: 'childrens-privacy',
      number: '11',
      title: "Children's Privacy",
      content: [
        {
          type: 'paragraph',
          text: 'Our website, digital products, and services are strictly targeted at business professionals and individuals aged 18 and older. We do not knowingly collect personal information from children under the age of 16. If you believe a minor has provided us with personal information, please notify us immediately for prompt deletion.'
        }
      ]
    },
    {
      id: 'external-links',
      number: '12',
      title: 'External Websites & Third-Party Links',
      content: [
        {
          type: 'paragraph',
          text: 'Our website, case studies, and research publications may contain links to external websites, client projects, and third-party tools. We do not control and are not responsible for the privacy practices, content, or policies of third-party domains. We encourage you to review the privacy notices of any external site you visit.'
        }
      ]
    },
    {
      id: 'changes-to-policy',
      number: '13',
      title: 'Changes to This Privacy Policy',
      content: [
        {
          type: 'paragraph',
          text: 'We may update this Privacy Policy periodically to reflect technological advancements, operational changes, or legal updates. When changes are published, we will revise the "Last updated" date at the top of this document. Continued use of our website or services after updates constitutes acceptance of the modified policy.'
        }
      ]
    },
    {
      id: 'contact-us',
      number: '14',
      title: 'Contact Us',
      content: [
        {
          type: 'paragraph',
          text: 'If you have questions, feedback, or privacy-related requests regarding this Privacy Policy or our remote data management practices, please contact our team:'
        },
        {
          type: 'list',
          items: [
            'Email: contact@hanovadevs.com',
            'Website: https://hanovadevs.com',
            'Operations: 100% Remote-First Digital Studio & Software Agency',
            'Response Commitment: All inquiries receive a reply within 24–48 business hours.'
          ]
        }
      ]
    }
  ]
}

export const termsOfServiceData = {
  title: 'Terms of Service',
  eyebrow: 'LEGAL • TERMS',
  subtitle: 'The terms governing access to HanovaDevs, our website, 100% remote software engineering, digital services, and client engagements.',
  badge: 'Clear & transparent terms',
  sections: [
    {
      id: 'acceptance-of-terms',
      number: '01',
      title: 'Acceptance of Terms',
      content: [
        {
          type: 'paragraph',
          text: 'These Terms of Service ("Terms") constitute a legally binding agreement between you ("Client," "User," or "you") and HanovaDevs ("we," "us," "our," or "HanovaDevs").'
        },
        {
          type: 'paragraph',
          text: 'By accessing or using our website (https://hanovadevs.com), interacting with our digital calculators and AI tools, requesting project proposals, or contracting our custom engineering and digital agency services, you acknowledge that you have read, understood, and agreed to be bound by these Terms.'
        },
        {
          type: 'callout',
          title: 'Master Agreement Precedence',
          text: 'Where a client enters into a separate written Statement of Work (SOW), Master Services Agreement (MSA), or formal proposal signed by both parties, the specific terms of that signed agreement will take precedence over these general Terms where explicitly stated.'
        }
      ]
    },
    {
      id: 'eligibility-and-use',
      number: '02',
      title: 'Eligibility & Website Use',
      content: [
        {
          type: 'paragraph',
          text: 'You must be at least 18 years of age and possess the legal authority to enter into binding commercial contracts to use our services or submit project inquiries on behalf of a company or entity.'
        },
        {
          type: 'paragraph',
          text: 'You agree to use our website and interactive tools solely for lawful business purposes and in accordance with these Terms. You agree not to disrupt site security, attempt unauthorized access to our serverless infrastructure, scrape content programmatically without written permission, or transmit malicious code.'
        }
      ]
    },
    {
      id: 'hanovadevs-services',
      number: '03',
      title: 'HanovaDevs Services & Solutions',
      content: [
        {
          type: 'paragraph',
          text: 'HanovaDevs provides professional technology and digital growth services, which may include:'
        },
        {
          type: 'list',
          items: [
            'AI Automation & Voice Calling Assistants (Autonomous conversational bots, VAPI/Retell integrations, workflow automation, and unified management portals).',
            'Custom Software Development (Web applications, SaaS architectures, backend APIs, and database engineering).',
            'Shopify Store Development (Custom Liquid themes, Shopify OS 2.0 implementations, checkout extensions, and app integrations).',
            'Web Design & Engineering (High-performance React/Next.js/Vite websites, responsive UI/UX, and CMS setups).',
            'SEO & Performance Optimization (Technical SEO audits, speed engineering, Core Web Vitals remediation, and structured schema markup).',
            'Brand Identity & Digital Design (Logos, visual systems, style guides, and digital asset kits).'
          ]
        }
      ]
    },
    {
      id: 'remote-operations-and-employment',
      number: '04',
      title: '100% Remote Operations, Digital Delivery & Remote Work Policy',
      content: [
        {
          type: 'paragraph',
          text: 'HanovaDevs operates exclusively as a 100% digital, remote-first agency and software studio. We do not operate physical walk-in office locations, on-site public branches, or in-person service centers.'
        },
        {
          type: 'callout',
          title: 'Remote-Only Client Collaboration',
          text: 'All client consultations, discovery workshops, sprint demos, technical reviews, deliverable approvals, and communications are conducted digitally via secure remote channels (e.g., Google Meet, Zoom, Slack, email, and collaborative staging portals). HanovaDevs does not provide on-site personnel or in-person visits.'
        },
        {
          type: 'heading',
          text: 'A. Remote Service Delivery & Project Management'
        },
        {
          type: 'list',
          items: [
            'Digital Sprints: Engineering sprints, deployments, and QA testing are executed entirely within cloud infrastructure and remote development pipelines.',
            'No On-Site Staffing: We do not dispatch personnel for on-premises client staffing, physical hardware maintenance, or physical office installations.',
            'Global Timezone Alignment: Our distributed team supports clients across North America, Europe, Asia, and Australasia through coordinated meeting slots and transparent asynchronous workflows.'
          ]
        },
        {
          type: 'heading',
          text: 'B. 100% Remote Employment & Recruitment Policy'
        },
        {
          type: 'list',
          items: [
            'Strictly Remote Jobs: All employment opportunities, engineering roles, design positions, and contractor engagements offered by HanovaDevs are strictly 100% remote jobs. We do not offer or require on-site employment or physical office presence.',
            'Legitimate Hiring Channels: All HanovaDevs job openings, candidate evaluations, technical assessments, and employment contracts are administered exclusively through official remote digital channels and verified @hanovadevs.com / contact@hanovadevs.com communications.',
            'Recruitment Fraud Protection: HanovaDevs will never ask candidates for fees, equipment purchases, or in-person visits to unverified physical locations.'
          ]
        }
      ]
    },
    {
      id: 'proposals-quotes-and-estimates',
      number: '05',
      title: 'Proposals, Quotations & Project Estimator Disclaimer',
      content: [
        {
          type: 'paragraph',
          text: 'We provide tools and discovery discussions to help clients plan technical investments effectively:'
        },
        {
          type: 'list',
          items: [
            'Estimator Tool Disclaimers: All figures generated by our interactive Cost & Growth Estimator, rate tables, or preliminary calculators are ballpark projections intended solely for planning and budgeting guidance. They do not constitute a binding contract or fixed-price quote.',
            'Formal SOW & Quotations: Binding project commitments are established only through a customized Statement of Work (SOW) or proposal that details agreed deliverables, sprint milestones, acceptance criteria, and exact commercial payment terms.',
            'Validity Period: Formal proposals and written quotations remain valid for thirty (30) days from the date of issue unless explicitly stated otherwise in writing.'
          ]
        }
      ]
    },
    {
      id: 'payments-and-invoicing',
      number: '06',
      title: 'Payments, Invoicing & Retainers',
      content: [
        {
          type: 'paragraph',
          text: 'Payment terms are structured transparently around sprint milestones or monthly retainers:'
        },
        {
          type: 'list',
          items: [
            'Milestone Billing: Standard project engagements typically require an upfront commencement deposit (e.g., 30%–50%) prior to sprint initiation, with milestone installments linked to verified deliverable handoffs (e.g., UI approval, staging deployment, final production release).',
            'Retainers & Ongoing Support: Monthly automation maintenance, SLA support, and dedicated developer retainers are billed in advance of each service cycle.',
            'Taxes & Third-Party Fees: Client is responsible for any applicable local taxes, payment processing charges, cloud infrastructure hosting fees (AWS, Vercel, Supabase), third-party API token costs (OpenAI, Gemini, VAPI), and font or domain licenses.'
          ]
        }
      ]
    },
    {
      id: 'client-responsibilities',
      number: '07',
      title: 'Client Responsibilities & Project Timelines',
      content: [
        {
          type: 'paragraph',
          text: 'Successful digital engineering requires active collaboration between HanovaDevs and the Client:'
        },
        {
          type: 'list',
          items: [
            'Timely Provision of Assets: The Client agrees to provide necessary brand assets, copywriting, credentials, API keys, database access, and architectural requirements in a prompt manner.',
            'Feedback & Approvals: The Client agrees to review staging previews and deliver review feedback within agreed sprint review windows (typically 3–5 business days).',
            'Impact of Delays: Timelines communicated in proposals depend on timely client responses. Unanticipated delays in client approvals, asset delivery, or third-party dependencies will automatically extend projected delivery dates without liability to HanovaDevs.'
          ]
        }
      ]
    },
    {
      id: 'scope-changes-and-revisions',
      number: '08',
      title: 'Project Scope, Change Requests & Revisions',
      content: [
        {
          type: 'paragraph',
          text: 'Each project agreement defines a specific scope of work. To maintain sprint velocity and quality standards:'
        },
        {
          type: 'list',
          items: [
            'Included Revisions: Standard design and software milestones include a specified number of iterative review cycles (typically 2 rounds per major deliverable phase) to fine-tune agreed requirements.',
            'Scope Changes (Change Requests): Any request for additional features, third-party integrations, fundamental architectural pivots, or new screen designs not outlined in the initial SOW will be scoped separately as a Change Request with an associated cost and timeline adjustment.'
          ]
        }
      ]
    },
    {
      id: 'intellectual-property-rights',
      number: '09',
      title: 'Intellectual Property Rights',
      content: [
        {
          type: 'paragraph',
          text: 'We operate under clear, sovereign IP ownership principles:'
        },
        {
          type: 'list',
          items: [
            'Client Deliverables Ownership: Upon receipt of full and final payment for the project, the Client owns all bespoke source code, custom design assets, and unique deliverables created specifically for the project under the SOW.',
            'Client Materials: The Client retains all pre-existing ownership rights to their proprietary data, brand logos, trademarks, and confidential information provided to HanovaDevs.',
            'HanovaDevs Background IP: HanovaDevs retains ownership of its pre-existing developer toolkits, reusable boilerplate modules, proprietary internal utilities, and general software engineering know-how. We grant the Client a perpetual, worldwide, non-exclusive license to use any embedded background code required to operate the deliverables.',
            'Open-Source Components: Deliverables may incorporate standard open-source libraries (e.g., React, Vite, Node modules) governed by their respective open-source licenses (MIT, Apache 2.0, BSD).'
          ]
        }
      ]
    },
    {
      id: 'portfolio-and-case-studies',
      number: '10',
      title: 'Portfolio & Case Study Showcase',
      content: [
        {
          type: 'paragraph',
          text: 'Unless explicitly prohibited under a signed Non-Disclosure Agreement (NDA), HanovaDevs reserves the right to showcase non-confidential project visuals, high-level summaries, and publicly accessible web designs within our portfolio, case studies, journal articles, and marketing collateral to demonstrate our engineering capabilities.'
        }
      ]
    },
    {
      id: 'service-disclaimers-and-outcomes',
      number: '11',
      title: 'Service Disclaimers & No Guarantee of Specific Business Results',
      content: [
        {
          type: 'callout',
          title: 'Important Commercial Notice',
          text: 'HanovaDevs engineers robust digital platforms and executes data-driven strategies using current industry best practices. However, because external market conditions, consumer behavior, platform algorithms, and search engine parameters fluctuate continuously, HanovaDevs does not guarantee specific commercial outcomes.'
        },
        {
          type: 'list',
          items: [
            'SEO & Search Rankings: We implement sound technical SEO and structured metadata, but search engine algorithms (Google, Bing) are controlled by third parties. We do not guarantee specific page rankings, traffic volumes, or indexing speeds.',
            'Conversion & Revenue Projections: Projections regarding conversion rate lifts, revenue compounding, or return on investment (ROI) are estimations based on past case studies and industry benchmarks, not binding warranties.',
            'AI & Language Models: Generative AI and automated voice models may occasionally produce unexpected outputs ("hallucinations") or encounter API latency. We build error handling and guardrails, but cannot guarantee 100% uninterrupted accuracy from third-party LLM providers.'
          ]
        }
      ]
    },
    {
      id: 'third-party-infrastructure',
      number: '12',
      title: 'Hosting, Domains & Third-Party Infrastructure',
      content: [
        {
          type: 'paragraph',
          text: 'HanovaDevs assists with deploying applications to modern cloud providers (e.g., Vercel, AWS, Supabase, Cloudflare, Shopify). However, HanovaDevs is not a hosting provider. We are not liable for service outages, data center hardware failures, DNS propagations, third-party API rate limits, or platform downtime caused by external infrastructure vendors.'
        }
      ]
    },
    {
      id: 'confidentiality',
      number: '13',
      title: 'Confidentiality',
      content: [
        {
          type: 'paragraph',
          text: 'Both HanovaDevs and the Client agree to protect and keep confidential any non-public, proprietary technical, financial, or business information disclosed during discussions or active project work. Confidential information will not be disclosed to third parties except to authorized subcontractors under equivalent confidentiality obligations or where required by law.'
        }
      ]
    },
    {
      id: 'limitation-of-liability',
      number: '14',
      title: 'Limitation of Liability',
      content: [
        {
          type: 'paragraph',
          text: 'To the maximum extent permitted by applicable law, in no event shall HanovaDevs, its founders, directors, employees, or partners be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, loss of data, loss of business goodwill, or service interruption, arising out of or in connection with the use of our website, tools, or delivered software.'
        },
        {
          type: 'paragraph',
          text: 'HanovaDevs\' total aggregate liability for any claims arising under a specific project agreement shall be strictly limited to the total fees actually paid by the Client to HanovaDevs for the specific deliverable giving rise to the claim in the three (3) months preceding the event.'
        }
      ]
    },
    {
      id: 'indemnification',
      number: '15',
      title: 'Indemnification',
      content: [
        {
          type: 'paragraph',
          text: 'The Client agrees to defend, indemnify, and hold harmless HanovaDevs from and against any claims, liabilities, damages, losses, or legal expenses arising out of (a) materials, copy, assets, or trademarks supplied by the Client that infringe on third-party intellectual property or privacy rights, (b) the Client\'s commercial operation of the delivered software, or (c) any breach of these Terms by the Client.'
        }
      ]
    },
    {
      id: 'suspension-and-termination',
      number: '16',
      title: 'Suspension & Termination',
      content: [
        {
          type: 'paragraph',
          text: 'Either party may terminate an active project engagement in accordance with the termination clauses set forth in the governing Statement of Work. In the event of project termination, the Client shall pay HanovaDevs for all billable hours, completed milestones, and non-cancellable expenses incurred up to the effective date of termination. Upon receipt of full settlement, HanovaDevs will hand over all completed work.'
        }
      ]
    },
    {
      id: 'governing-law-and-disputes',
      number: '17',
      title: 'Governing Law & Dispute Resolution',
      content: [
        {
          type: 'paragraph',
          text: 'These Terms and any dispute arising from client engagements shall be governed by and construed in accordance with the laws applicable to commercial digital enterprises, without regard to conflict of law principles.'
        },
        {
          type: 'paragraph',
          text: 'The parties agree to attempt in good faith to resolve any dispute, claim, or controversy through amicable executive discussions before initiating formal legal proceedings or arbitration.'
        }
      ]
    },
    {
      id: 'severability-and-entire-agreement',
      number: '18',
      title: 'Severability & Entire Agreement',
      content: [
        {
          type: 'paragraph',
          text: 'If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect. These Terms, together with any signed SOW or proposal, constitute the entire agreement between the parties concerning their subject matter.'
        }
      ]
    },
    {
      id: 'contact-information',
      number: '19',
      title: 'Contact Information',
      content: [
        {
          type: 'paragraph',
          text: 'For questions regarding these Terms of Service, remote operations, or to request a custom Master Services Agreement (MSA), please contact our legal and partnerships team:'
        },
        {
          type: 'list',
          items: [
            'Email: contact@hanovadevs.com',
            'Website: https://hanovadevs.com',
            'Operations: 100% Remote-First Digital Agency & Custom Software Studio'
          ]
        }
      ]
    }
  ]
}
