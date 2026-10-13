export const researchArticles = [
  {
    id: 'attention-is-all-you-need', title: 'Attention Is All You Need', source: 'Original paper · arXiv', sourceUrl: 'https://arxiv.org/abs/1706.03762', category: 'AI & Machine Learning', date: 'June 2017', readTime: 'Source paper', featured: true, image: '/news/research.svg',
    excerpt: 'The original Transformer paper, proposing an attention-based architecture for sequence modelling.',
    content: '<h2>What the paper contributes</h2><p>This paper introduced the Transformer architecture, using attention in place of recurrence and convolutions for its sequence-transduction model. It evaluates the approach on translation tasks.</p><h2>How to read it</h2><p>Separate the architecture described in the paper from later models and production systems built around related ideas. Its reported results belong to the experimental settings in the paper, not every application using attention.</p><h2>Original source</h2><p>This is a short editorial introduction. Follow the source link for the authors, experiments, methodology, and limitations.</p>',
  },
  {
    id: 'retrieval-augmented-generation', title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks', source: 'Original paper · arXiv', sourceUrl: 'https://arxiv.org/abs/2005.11401', category: 'AI & Machine Learning', date: 'May 2020', readTime: 'Source paper', image: '/news/ai.svg',
    excerpt: 'A foundational paper combining retrieval with language generation for knowledge-intensive tasks.',
    content: '<h2>The central idea</h2><p>The paper combines a retrieval component with a sequence-to-sequence model. Retrieved material provides a non-parametric source of information alongside the model’s learned parameters.</p><h2>Practical interpretation</h2><p>Retrieval does not by itself guarantee a correct answer. A deployed system needs to evaluate the material it retrieves, the answer it generates, and the access controls around the information.</p><h2>Original source</h2><p>Read the original paper for its architecture, task-specific evaluation, and reported experimental results.</p>',
  },
  {
    id: 'lora-adaptation', title: 'LoRA: Low-Rank Adaptation of Large Language Models', source: 'Original paper · arXiv', sourceUrl: 'https://arxiv.org/abs/2106.09685', category: 'AI & Machine Learning', date: 'June 2021', readTime: 'Source paper', image: '/news/research.svg',
    excerpt: 'A parameter-efficient approach to adapting pretrained language models.',
    content: '<h2>The approach</h2><p>LoRA freezes pretrained model weights and introduces trainable low-rank matrices for adaptation. The paper compares this approach with other adaptation methods in its chosen experimental settings.</p><h2>Choosing an adaptation strategy</h2><p>The appropriate method depends on the model, task, data, hardware, and deployment constraints. A result reported in a research benchmark should not be presented as a guaranteed saving in a client application.</p><h2>Original source</h2><p>Use the original publication to inspect the method, experiments, and trade-offs.</p>',
  },
  {
    id: 'wcag-22', title: 'WCAG 2.2: A Reference for Accessible Interfaces', source: 'W3C recommendation', sourceUrl: 'https://www.w3.org/TR/WCAG22/', category: 'UX & Design', date: 'Living reference', readTime: 'Specification', image: '/news/product.svg',
    excerpt: 'The W3C reference for assessing accessibility of web content and interaction.',
    content: '<h2>Why this reference matters</h2><p>WCAG organizes accessibility requirements around content being perceivable, operable, understandable, and robust. The recommendation defines testable success criteria and levels of conformance.</p><h2>Use it with real testing</h2><p>Check keyboard use, screen-reader interpretation, contrast, form labels, focus behavior, and other criteria relevant to the page. An automated scan covers only part of an assessment.</p><h2>Original source</h2><p>The W3C specification provides the authoritative criteria. A project should state its testing scope before claiming conformance.</p>',
  },
  {
    id: 'web-vitals', title: 'Web Vitals: Understand Loading, Responsiveness and Stability', source: 'Google · web.dev', sourceUrl: 'https://web.dev/articles/vitals', category: 'Web Development', date: 'Living reference', readTime: 'Official guide', image: '/news/infrastructure.svg',
    excerpt: 'A practical starting point for evaluating a website’s performance experience.',
    content: '<h2>Measure an experience</h2><p>Web Vitals describes signals for evaluating page experience. Core Web Vitals focus on loading, responsiveness, and visual stability.</p><h2>Keep the conditions clear</h2><p>Distinguish laboratory testing from measurements of real visitors. Devices, connections, page content, and third-party services affect results. A controlled score should be reported with its test conditions.</p><h2>Original source</h2><p>Use the official guide for current metric definitions and recommended measurement tools.</p>',
  },
]
