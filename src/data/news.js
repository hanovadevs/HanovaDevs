export const newsUpdatedAt = '2026-10-13'

// Editorial summaries of the linked primary announcements; publication dates belong to the sources.
export const newsArticles = [
  {
    id: 'azure-maia-expansion', publishedAt: '2026-10-12', category: 'Infrastructure', source: 'Microsoft',
    title: 'Microsoft plans a larger Azure Maia inference rollout',
    excerpt: 'Maia 200 is serving production workloads, while Microsoft plans multi-gigawatt deployments beginning in 2027.',
    summary: 'Microsoft says Maia 200 is already supporting production services and describes plans to expand its inference infrastructure from 2027. The company also outlined Maia 300, a future generation designed for long-context and multi-step AI workloads. The announced expansion is a plan, not a completed deployment; performance comparisons are Microsoft’s own claims.',
    sourceUrl: 'https://blogs.microsoft.com/blog/2026/10/12/microsoft-to-expand-azure-maia-system-to-multi-gigawatt-deployments/',
    image: '/news/infrastructure.svg', tags: ['Microsoft', 'Azure', 'AI Infrastructure'],
  },
  {
    id: 'claude-haiku-55', publishedAt: '2026-10-07', category: 'AI', source: 'Anthropic',
    title: 'Anthropic introduces Claude Haiku 5.5',
    excerpt: 'The new small-model release focuses on fast, repetitive work and cost-sensitive applications.',
    summary: 'Anthropic introduced Haiku 5.5 for tasks such as classification, summarization, customer support, and coding subagents. Its announcement includes model evaluations and changes to the wider Claude platform. Teams considering the release should test it against their own quality, latency, and operating-cost requirements rather than treating vendor benchmarks as a guarantee.',
    sourceUrl: 'https://www.anthropic.com/claude-haiku-5-5',
    image: '/news/ai.svg', tags: ['Anthropic', 'Claude', 'Model Release'],
  },
  {
    id: 'synthid-detector', publishedAt: '2026-10-07', category: 'Security', source: 'Google',
    title: 'Google opens SynthID Detector to a wider audience',
    excerpt: 'The tool checks supported media for watermarks used by Google and participating AI providers.',
    summary: 'Google announced wider English-language access to SynthID Detector. The tool checks supported images, video, and audio for compatible AI watermarks. Its coverage depends on the participating systems and embedded signals; the absence of a detected watermark should not be treated as proof that a file was created without AI.',
    sourceUrl: 'https://blog.google/innovation-and-ai/models-and-research/google-deepmind/synth-id-ai-content/',
    image: '/news/security.svg', tags: ['Google', 'SynthID', 'Content Provenance'],
  },
  {
    id: 'windows-hybrid-intelligence', publishedAt: '2026-10-07', category: 'Product', source: 'Microsoft',
    title: 'Microsoft outlines its hybrid AI direction for Windows',
    excerpt: 'Microsoft’s Windows announcement describes a mix of local processing and cloud AI experiences.',
    summary: 'Microsoft published its direction for hybrid intelligence on Windows, connecting local hardware capabilities with cloud-based services. The announcement covers the experience and platform changes the company is pursuing. Device availability and individual feature support should be checked against Microsoft’s current documentation and hardware requirements.',
    sourceUrl: 'https://blogs.windows.com/windowsexperience/2026/10/07/building-windows-for-hybrid-intelligence/',
    image: '/news/product.svg', tags: ['Microsoft', 'Windows', 'Hybrid AI'],
  },
  {
    id: 'embeddinggemma-2', publishedAt: '2026-10-06', category: 'Research', source: 'Google',
    title: 'EmbeddingGemma 2 brings multimodal retrieval to smaller devices',
    excerpt: 'Google’s new embedding model supports text and other media in a shared representation.',
    summary: 'Google introduced EmbeddingGemma 2, an open model for generating embeddings across text and supported media. The release targets uses such as local search and retrieval. The model card, license, and actual device-level evaluation remain important when deciding whether a deployment fits a product’s privacy and performance requirements.',
    sourceUrl: 'https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2/',
    image: '/news/research.svg', tags: ['Google', 'Embeddings', 'On-device AI'],
  },
  {
    id: 'anthropic-cyber-program', publishedAt: '2026-10-06', category: 'Security', source: 'Anthropic',
    title: 'Anthropic expands its Cyber Verification Program',
    excerpt: 'The updated program introduces access tiers for qualifying security professionals.',
    summary: 'Anthropic expanded its Cyber Verification Program with tiers intended for different forms of security work. Access depends on verification and the program’s controls. The announcement distinguishes qualifying defensive and authorized testing work; it does not make every advanced capability available to every user.',
    sourceUrl: 'https://www.anthropic.com/news/cyber-verification-program',
    image: '/news/security.svg', tags: ['Anthropic', 'Cybersecurity', 'Verification'],
  },
  {
    id: 'claude-frontier-academy', publishedAt: '2026-10-02', category: 'Business', source: 'Anthropic',
    title: 'Anthropic announces a $100 million engineer training program',
    excerpt: 'Claude Frontier Academy aims to train 10,000 engineers by the end of 2027.',
    summary: 'Anthropic announced a $100 million commitment to Claude Frontier Academy, with a stated goal of training 10,000 engineers by the end of 2027. The program focuses on practical AI implementation inside organizations. The funding commitment and training target are announced plans, not evidence that the target has already been reached.',
    sourceUrl: 'https://www.anthropic.com/news/claude-frontier-academy',
    image: '/news/business.svg', tags: ['Anthropic', 'Engineering', 'Training'],
  },
]
