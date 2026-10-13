/**
 * Product data notice reviewed against the current Eunoia source.
 * Release-specific functionality and applicable legal requirements require owner review.
 */
export const eunoiaLegalMetadata = {
  lastUpdated: 'October 13, 2026', effectiveDate: 'October 13, 2026',
  appName: 'Eunoia', companyName: 'HanovaDevs', websiteUrl: 'https://hanovadevs.com',
  contactEmail: 'contact@hanovadevs.com', location: 'Remote-first software company',
}
export const eunoiaPrivacyPolicyData = {
  title: 'Eunoia Privacy Policy', eyebrow: 'PRODUCT · PRIVACY',
  subtitle: 'Local workspace storage, optional connected AI, and the choices that affect your data.',
  badge: 'Clear data boundaries',
  sections: [
    { id: 'introduction', number: '01', title: 'About Eunoia', content: [
      { type: 'paragraph', text: 'Eunoia is a desktop personal workspace developed by HanovaDevs. It is available on Microsoft Store. This notice explains the local and connected features reflected in the current product source. Availability and settings can differ between installed versions; review the settings and release information for your version.' },
      { type: 'callout', title: 'Local-first does not mean never connected', text: 'Workspace information is stored on your device. Optional cloud AI, model downloads, store updates, and external links can use an internet connection. Do not assume every assistant interaction remains local when a cloud provider is connected.' },
    ] },
    { id: 'local-workspace', number: '02', title: 'Workspace Data on Your Device', content: [
      { type: 'paragraph', text: 'Tasks, notes, journal entries, settings and related workspace records are stored using local application databases and files. Documents and user-created exports can also exist in locations you choose. Device access, backups and copies matter to the privacy of these records.' },
      { type: 'list', items: ['Use the application controls to edit or remove workspace items.', 'Backups and exports can contain personal information. Store them carefully and share them only with people you trust.', 'A diary PIN or an application lock is not a substitute for protecting your operating-system account and device. This notice does not claim that every local file is encrypted.'] },
    ] },
    { id: 'assistant-processing', number: '03', title: 'Local and Optional Cloud AI', content: [
      { type: 'paragraph', text: 'The current application includes a local-model path and an optional OpenAI connection. Local model inference operates on the device. When a connected cloud mode is used, the request can include your prompt, relevant conversation context and workspace information needed for the requested assistance, and is sent to the configured provider.' },
      { type: 'paragraph', text: 'The current source can prefer cloud reasoning when a valid provider key is connected, depending on the selected mode. Review the AI settings before entering confidential information. Select a local mode or disconnect the cloud provider if you do not want cloud processing.' },
      { type: 'list', items: ['Cloud requests are subject to the provider’s terms, retention and data-processing rules. We do not make a blanket no-training or zero-retention guarantee on that provider’s behalf.', 'Provider credentials are used to authenticate connected features. Do not share them in support messages or public screenshots.', 'AI outputs can be incorrect. Check important answers and proposed changes before relying on them.'] },
    ] },
    { id: 'voice-and-network', number: '04', title: 'Voice and Network Connections', content: [
      { type: 'paragraph', text: 'Voice functionality may use local transcription or connected cloud services, depending on your version and configuration. In connected transcription, audio may be sent to OpenAI; connected speech generation can send the text to be spoken. Local transcription is a separate path and may require downloaded model files.' },
      { type: 'list', items: ['Model downloads require a network request and may be cached on your device.', 'Store installation and updates are handled through Microsoft’s infrastructure.', 'Links, connected tools and optional providers have their own data handling. Review the destination before sharing sensitive information.'] },
    ] },
    { id: 'store-and-providers', number: '05', title: 'Microsoft Store and Other Providers', content: [
      { type: 'paragraph', text: 'Microsoft manages the Store account, installation, purchases where applicable, and platform-level information under its own policies. A Store distribution is not a certification of every privacy or security statement made by an application developer.' },
      { type: 'paragraph', text: 'Connected AI and download providers can receive technical request information as well as the content required by the selected feature. Check their current policies and your account settings. This notice does not claim an independent community network audit or that all third-party components are incapable of telemetry.' },
    ] },
    { id: 'retention-and-deletion', number: '06', title: 'Retention, Export and Deletion', content: [
      { type: 'paragraph', text: 'Local records remain until removed through the application, applicable device controls or your chosen storage process. Uninstalling an application does not necessarily remove every user-data folder, export or backup. Check those locations separately before deleting anything you need to keep.' },
      { type: 'paragraph', text: 'Provider-side retention is governed by the connected service and your account terms. Deleting a local conversation or export does not necessarily delete a provider’s request records. Contact the relevant provider for its controls and contact HanovaDevs for product questions.' },
    ] },
    { id: 'support-and-choices', number: '07', title: 'Support and Your Choices', content: [
      { type: 'paragraph', text: 'If you contact HanovaDevs, we receive the information you send, such as your email address, device details, feedback and any attached files. Remove private workspace data and credentials from support material unless it is necessary and you have agreed how to share it.' },
      { type: 'paragraph', text: 'You can review connected AI settings, control microphone access through your device, manage local files and backups, and ask us questions about the application. Privacy rights and requests depend on the processing and applicable jurisdiction; they are not automatically fulfilled merely because part of an application works locally.' },
    ] },
    { id: 'contact-us', number: '08', title: 'Contact and Updates', content: [
      { type: 'paragraph', text: 'For privacy or product questions, email contact@hanovadevs.com. Tell us the installed Eunoia version and the feature involved, without including passwords or API keys. We update this notice when material product data flows change.' },
      { type: 'list', items: ['Developer: HanovaDevs, founded in 2022 by Ali Haider.', 'Product page: https://hanovadevs.com/products/eunoia', 'Official Store listing: https://apps.microsoft.com/detail/9PJ36VD01Z4X', 'Website privacy and cookies: https://hanovadevs.com/privacy-policy'] },
    ] },
  ],
}
