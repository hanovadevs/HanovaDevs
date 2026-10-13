/**
 * Eunoia Desktop App — Privacy Policy Data
 * 
 * This privacy policy is specific to the Eunoia desktop productivity app,
 * an in-house product built and powered by HanovaDevs. Eunoia is a local-first
 * application — all user data stays on-device by design.
 * 
 * DISCLAIMER: This policy represents a professional baseline. Before relying on
 * these terms for jurisdiction-specific compliance, they should be reviewed and
 * approved by qualified legal counsel.
 */

export const eunoiaLegalMetadata = {
  lastUpdated: 'September 18, 2026',
  effectiveDate: 'September 18, 2026',
  appName: 'Eunoia',
  companyName: 'HanovaDevs',
  websiteUrl: 'https://hanovadevs.com',
  productUrl: 'https://hanovadevs.com/products/eunoia',
  contactEmail: 'contact@hanovadevs.com',
  storeUrl: 'https://apps.microsoft.com/detail/9PJ36VD01Z4X'
}

export const eunoiaPrivacyPolicyData = {
  title: 'Eunoia Privacy Policy',
  eyebrow: 'EUNOIA • PRIVACY',
  subtitle: 'How the Eunoia desktop app handles your data — built local-first, zero cloud dependency, and designed with your privacy at its core.',
  badge: 'Local-first by design',
  sections: [
    {
      id: 'introduction',
      number: '01',
      title: 'Introduction & Our Privacy Philosophy',
      content: [
        {
          type: 'paragraph',
          text: 'Welcome to the Eunoia Privacy Policy. Eunoia is a desktop productivity companion designed, developed, and powered by HanovaDevs ("we," "us," "our"). Eunoia combines daily task planning, a rich Markdown-based notes engine, a PIN-protected private journal, a Pomodoro focus timer with ambient soundscapes, smart cognitive alarms, and a fully offline AI assistant.'
        },
        {
          type: 'paragraph',
          text: 'This Privacy Policy explains what information Eunoia collects (or more importantly, does not collect), how data is stored and managed, and what rights you have as a user of the application.'
        },
        {
          type: 'callout',
          title: 'Our Core Principle: Your Data Stays on Your Device',
          text: 'Eunoia is architected as a local-first application. All your tasks, notes, journal entries, focus session logs, mood data, alarms, soundscape preferences, and AI conversations are stored exclusively on your local machine. We do not operate remote servers that receive, process, or store your personal productivity data. Your data is yours — completely and unconditionally.'
        }
      ]
    },
    {
      id: 'data-we-do-not-collect',
      number: '02',
      title: 'Data We Do Not Collect',
      content: [
        {
          type: 'paragraph',
          text: 'Unlike many productivity applications that require cloud accounts and synchronize your data to remote servers, Eunoia takes a fundamentally different approach. By design, the following data categories are never transmitted off your device:'
        },
        {
          type: 'list',
          items: [
            'Tasks & Planner Data: Your daily tasks, subtasks, statuses, priorities, and scheduling information remain entirely in local SQLite databases on your machine.',
            'Notes & Markdown Files: All rich-text notes, tags, pinned items, and searchable content are stored locally and never uploaded to any server.',
            'Private Journal & Diary Entries: Your PIN-protected personal reflections, mood tracking data, and diary timeline are encrypted and stored locally. We have zero access to these entries.',
            'Focus Session Logs: Pomodoro timer statistics, break intervals, session counts, and cognitive stamina metrics are stored on-device only.',
            'Voice Recordings & Transcripts: All voice input is transcribed completely offline using on-device Transformers.js models. Audio data never leaves your machine.',
            'AI Conversations: All interactions with the built-in AI assistant are processed locally. Your prompts, responses, and action history are never sent to external AI services.',
            'Habit Tracking & Mood Data: Weekly habit completion data, mood logs, and personal momentum statistics are maintained exclusively in local storage.',
            'File Vault Contents: Any documents stored in the local file vault remain on your filesystem and are never transmitted externally.'
          ]
        }
      ]
    },
    {
      id: 'local-storage-architecture',
      number: '03',
      title: 'Local Storage Architecture',
      content: [
        {
          type: 'paragraph',
          text: 'Eunoia uses a combination of SQLite databases and structured JSON files to persist all user data on your local filesystem. This architecture ensures zero-latency data access, complete offline functionality, and absolute data sovereignty.'
        },
        {
          type: 'heading',
          text: 'A. Storage Technologies'
        },
        {
          type: 'list',
          items: [
            'SQLite: The primary structured database engine for tasks, notes, journal entries, focus sessions, habits, and planner data. SQLite runs entirely within your local Electron process.',
            'JSON Files: Configuration preferences, theme settings, soundscape selections, alarm configurations, and UI state are persisted as local JSON files in the application data directory.',
            'Local Filesystem: The document vault feature reads and writes standard files directly on your desktop or designated folders — no proprietary containers or cloud sync layers.'
          ]
        },
        {
          type: 'heading',
          text: 'B. Data Location'
        },
        {
          type: 'paragraph',
          text: 'All Eunoia data is stored in your operating system\'s standard application data directory (e.g., %APPDATA% on Windows, ~/Library/Application Support on macOS, ~/.config on Linux). You have full filesystem access to these files at all times.'
        }
      ]
    },
    {
      id: 'offline-ai-processing',
      number: '04',
      title: 'Offline AI & Voice Processing',
      content: [
        {
          type: 'paragraph',
          text: 'Eunoia\'s AI capabilities are designed to operate completely offline, ensuring your conversations and voice recordings never leave your device.'
        },
        {
          type: 'callout',
          title: 'Zero External AI Calls',
          text: 'Eunoia does not connect to OpenAI, Google, Anthropic, or any other cloud-based AI service to process your prompts, voice recordings, or task automation commands. All AI inference runs locally on your CPU using optimized on-device models.'
        },
        {
          type: 'heading',
          text: 'A. Voice Transcription'
        },
        {
          type: 'list',
          items: [
            'On-Device Models: Voice-to-text transcription is powered by Transformers.js, running optimized speech recognition models directly within the Electron application process.',
            'No Audio Uploads: Your microphone input is processed in real-time on your local machine. Audio buffers are discarded after transcription — they are never recorded, stored permanently, or transmitted to remote servers.',
            'Transcript Privacy: Resulting text transcripts are saved only to your local database and are never shared externally.'
          ]
        },
        {
          type: 'heading',
          text: 'B. Conversational AI Assistant'
        },
        {
          type: 'list',
          items: [
            'Local Inference: The built-in AI assistant uses client-side language models to understand natural language commands (e.g., "add a task for tomorrow," "start a focus session").',
            'No Cloud Training: Your conversations with the assistant are never used to train, fine-tune, or improve any external machine learning models.',
            'Action Automation: When the AI assistant creates tasks, sets reminders, or updates your planner, all operations are executed against your local SQLite database.'
          ]
        }
      ]
    },
    {
      id: 'network-connectivity',
      number: '05',
      title: 'Network & Internet Connectivity',
      content: [
        {
          type: 'paragraph',
          text: 'Eunoia is designed to function entirely offline. However, there are limited scenarios where the application may use an internet connection:'
        },
        {
          type: 'list',
          items: [
            'Application Updates: When distributed through the Microsoft Store, Windows handles automatic updates through its standard update infrastructure. Eunoia itself does not implement a custom update server or phone-home mechanism.',
            'Initial Model Download: On first launch, certain AI model weights for Transformers.js may need to be downloaded once and cached locally. After initial download, all inference runs offline.',
            'No Telemetry or Analytics: Eunoia does not include any analytics SDKs, crash reporting services, usage tracking pixels, or behavioral telemetry. We do not monitor how you use the application.'
          ]
        },
        {
          type: 'callout',
          title: 'Verified by the Community',
          text: 'Users with network monitoring tools have independently confirmed that Eunoia makes zero outbound network requests during normal operation. The application is truly quiet on the wire.'
        }
      ]
    },
    {
      id: 'microsoft-store-distribution',
      number: '06',
      title: 'Microsoft Store Distribution',
      content: [
        {
          type: 'paragraph',
          text: 'Eunoia is officially available on the Microsoft Store. When you download Eunoia through the Microsoft Store, the following applies:'
        },
        {
          type: 'list',
          items: [
            'Microsoft Account: The Microsoft Store may require a Microsoft account to download applications. Your Microsoft account credentials and purchase history are managed by Microsoft under their own privacy policy — HanovaDevs does not receive or store your Microsoft account information.',
            'Store Analytics: Microsoft may collect aggregated download and installation statistics through their Store platform. HanovaDevs may have access to anonymized aggregate metrics (total downloads, regional distribution, OS version breakdown) but never individual user identities.',
            'Update Distribution: Application updates are delivered through the Microsoft Store\'s standard update pipeline. HanovaDevs does not operate separate update servers.',
            'Store Reviews & Ratings: If you leave a review or rating on the Microsoft Store, that content is governed by Microsoft\'s privacy practices and community guidelines.'
          ]
        }
      ]
    },
    {
      id: 'data-export-and-portability',
      number: '07',
      title: 'Data Export & Portability',
      content: [
        {
          type: 'paragraph',
          text: 'We believe your data should never be trapped in a proprietary container. Eunoia provides full data portability:'
        },
        {
          type: 'list',
          items: [
            'Markdown Export: Export your entire notes database as clean, structured Markdown (.md) files that are readable on any platform or text editor.',
            'JSON Export: Export planner data, task logs, habit records, and focus session statistics as standard JSON datasets for use in any analytics tool or backup system.',
            'No Vendor Lock-In: Your SQLite databases use the standard, open-source SQLite file format. You can inspect, query, and migrate your data using any compatible database tool (e.g., DB Browser for SQLite).',
            'Direct File Access: All stored files in the document vault are standard filesystem files — no encryption wrappers or proprietary containers prevent you from accessing them with other applications.'
          ]
        }
      ]
    },
    {
      id: 'pin-protection-and-security',
      number: '08',
      title: 'PIN Protection & Local Security',
      content: [
        {
          type: 'paragraph',
          text: 'Eunoia includes a PIN-protected private diary feature designed to keep your most personal reflections secure from unauthorized local access.'
        },
        {
          type: 'list',
          items: [
            'Local PIN Storage: Your diary PIN is stored locally using secure hashing techniques. It is never transmitted to any remote server.',
            'No Cloud Authentication: Eunoia does not require you to create an online account, verify an email address, or authenticate through any cloud identity provider. Your PIN works entirely offline.',
            'User Responsibility: Since all security is local, it is your responsibility to safeguard your device access credentials and Eunoia PIN. If you lose your PIN, recovery options are limited to local measures.',
            'No Remote Recovery: HanovaDevs cannot remotely reset your PIN or access your private diary entries under any circumstances — we have no access to your local data.'
          ]
        }
      ]
    },
    {
      id: 'third-party-components',
      number: '09',
      title: 'Third-Party & Open-Source Components',
      content: [
        {
          type: 'paragraph',
          text: 'Eunoia is built using established open-source technologies. Transparency about our technology stack is part of our privacy commitment:'
        },
        {
          type: 'list',
          items: [
            'Electron Framework: Eunoia uses Electron to deliver a cross-platform desktop experience. Electron itself does not collect telemetry from end users.',
            'Transformers.js: The on-device AI models run via the Transformers.js library by Hugging Face, executed entirely within the local Electron process without external API calls.',
            'SQLite: An open-source, self-contained, full-featured SQL database engine. No external database server connections.',
            'Open-Source Licenses: Eunoia incorporates standard open-source libraries governed by their respective licenses (MIT, Apache 2.0, BSD). None of these libraries independently collect user data when used within Eunoia.'
          ]
        }
      ]
    },
    {
      id: 'childrens-privacy',
      number: '10',
      title: 'Children\'s Privacy',
      content: [
        {
          type: 'paragraph',
          text: 'While Eunoia does not collect personal information from any user (adults or children), the application is designed for and marketed toward individuals aged 13 and older who can benefit from productivity tools, task planning, and journaling features.'
        },
        {
          type: 'paragraph',
          text: 'Parents and guardians should supervise their children\'s use of any desktop software. If you have concerns about a minor using Eunoia, please contact us at contact@hanovadevs.com.'
        }
      ]
    },
    {
      id: 'your-rights',
      number: '11',
      title: 'Your Rights & Choices',
      content: [
        {
          type: 'paragraph',
          text: 'Because Eunoia is a local-first application that does not collect or transmit your personal data to our servers, traditional data subject rights (access, correction, deletion, portability) are inherently fulfilled by design:'
        },
        {
          type: 'list',
          items: [
            'Access: You have direct filesystem access to all your data at all times. No request to us is needed.',
            'Correction: You can edit, modify, or update any data within the application or directly in the SQLite/JSON files.',
            'Deletion: Uninstalling Eunoia and removing the application data directory permanently deletes all associated data. You can also delete individual entries within the app at any time.',
            'Portability: Export features allow you to take your data in standard Markdown and JSON formats to any competing application.',
            'Opt-Out: Since we collect no data, there is nothing to opt out of. Eunoia respects your privacy by default, not by configuration.'
          ]
        }
      ]
    },
    {
      id: 'changes-to-policy',
      number: '12',
      title: 'Changes to This Privacy Policy',
      content: [
        {
          type: 'paragraph',
          text: 'We may update this Privacy Policy periodically to reflect changes in the application\'s features, distribution channels, or applicable legal requirements. When we publish changes, we will update the "Last Updated" date at the top of this document.'
        },
        {
          type: 'paragraph',
          text: 'Since Eunoia does not collect your email or contact information, we cannot notify you directly of policy changes. We recommend periodically reviewing this page at https://hanovadevs.com/products/eunoia/privacy for the latest version.'
        }
      ]
    },
    {
      id: 'contact-us',
      number: '13',
      title: 'Contact Us',
      content: [
        {
          type: 'paragraph',
          text: 'If you have questions, feedback, or concerns about this Privacy Policy or the Eunoia application\'s data practices, please reach out to the HanovaDevs team:'
        },
        {
          type: 'list',
          items: [
            'Email: contact@hanovadevs.com',
            'Website: https://hanovadevs.com',
            'Product Page: https://hanovadevs.com/products/eunoia',
            'Microsoft Store: https://apps.microsoft.com/detail/9PJ36VD01Z4X',
            'Developer: HanovaDevs — 100% Remote-First Digital Studio & Software Agency',
            'Response Commitment: All inquiries receive a reply within 24–48 business hours.'
          ]
        }
      ]
    }
  ]
}
