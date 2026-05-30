import { useState, useEffect, useRef } from 'react'
import SEO from '../components/SEO'
import './News.css'

/* ═════════════════════════════════════
   NEWS DATA — 22 Curated Tech Stories
   ═════════════════════════════════════ */
const newsArticles = [
  {
    id: 'openai-gpt5-orion',
    title: 'OpenAI Launches GPT-5: Multi-Agent Collaboration and Sandbox Self-Debugging',
    excerpt: 'OpenAI\'s latest foundation model introduces autonomous cognitive agents, infinite cross-session memory layers, and fully persistent execution environments.',
    description: `OpenAI has officially launched GPT-5 (internally code-named "Orion"), marking a watershed moment in the field of general-purpose AI. The new model departs from traditional static conversational interfaces, shifting to a multi-agent orchestration framework where independent cognitive units collaborate in parallel to solve complex user tasks. GPT-5 also implements fully persistent cross-session memory, allowing the model to recall, adapt, and build upon past developer discussions indefinitely.

In testing, GPT-5 achieved state-of-the-art results on several challenging reasoning and coding benchmarks, including SWE-bench Verified (84.6%) and the new Olympiad Physics Reasoning benchmark (89.1%). The model introduces a self-debugging capability that allows it to spin up sandboxed environments to verify, compile, and debug generated source code before presenting it to the user.

Sam Altman stated, "GPT-5 is not just a language model—it is a cognitive team. You describe the goal, and it will coordinate, build, and deploy the entire solution." The model is now available to Enterprise and Plus developers, with an API tier supporting up to 5 million input tokens per call.`,
    category: 'AI & Robotics',
    date: 'May 29, 2026',
    source: 'Wired',
    sourceUrl: 'https://wired.com',
    region: 'USA',
    regionFlag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    tags: ['OpenAI', 'GPT-5', 'Agents', 'Deep Learning'],
    variant: 'featured'
  },
  {
    id: 'intel-silicon-qubits',
    title: 'Intel Achieves 99.9% Gate Fidelity on 128-Qubit Silicon Spin Processor',
    excerpt: 'Intel\'s "Tunnel Falls II" processor leverages standard commercial extreme ultraviolet (EUV) lithography to manufacture highly stable qubits on standard 300mm silicon wafers.',
    description: `Intel has announced a major breakthrough in quantum manufacturing by achieving 99.9% single-qubit and two-qubit gate fidelity on its 128-qubit "Tunnel Falls II" silicon spin qubit processor. This achievement is a critical threshold required for fault-tolerant quantum error correction, bringing commercial-scale quantum systems closer to practical utility.

Crucially, Intel manufactured the Tunnel Falls II processor using standard extreme ultraviolet (EUV) lithography on its commercial 300mm wafer fabrication lines in Oregon. By leveraging existing semiconductor manufacturing infrastructures instead of custom boutique processes, Intel claims it can scale up qubit counts with dramatically higher yield and lower thermal variation than superconducting or trapped-ion competitors.

Intel plans to ship beta hardware kits to academic and corporate partners by Q4 2026, with cloud integrations slated for early 2027. The company's quantum roadmap projects scaling to a 10,000 physical qubit chip by 2028.`,
    category: 'Quantum Computing',
    date: 'May 29, 2026',
    source: 'IEEE Spectrum',
    sourceUrl: 'https://spectrum.ieee.org',
    region: 'USA',
    regionFlag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    tags: ['Intel', 'Quantum Computing', 'Silicon Qubits', 'EUV'],
    variant: 'standard'
  },
  {
    id: 'nasa-artemis-iv-gateway',
    title: 'NASA Artemis IV Lunar Gateway module enters final assembly in Italy',
    excerpt: 'The ESA-designed Habitation and Logistics Outpost completed critical static load tests, preparing for a scheduled launch to lunar orbit in late 2026.',
    description: `NASA and the European Space Agency (ESA) have announced that the Habitation and Logistics Outpost (HALO), the foundational crew quarter module for the Lunar Gateway station, has officially entered final assembly. The module successfully completed structural static load and hermetic seal verification tests at Thales Alenia Space's high-tech facility in Turin, Italy.

The HALO module will act as the command and habitation center for the Gateway station, which will hover in a Near-Rectilinear Halo Orbit (NRHO) around the Moon. HALO will provide living quarters, life support systems, power distribution networks, and communications routing for visiting astronauts as they prepare to descent to the lunar south pole.

The module is scheduled to be shipped to the Kennedy Space Center in Florida by July 2026, where it will be integrated with the Power and Propulsion Element (PPE) before launching on a SpaceX Falcon Heavy rocket.`,
    category: 'Space Tech',
    date: 'May 29, 2026',
    source: 'NASA Spaceflight',
    sourceUrl: 'https://nasa.gov',
    region: 'Europe',
    regionFlag: '🇪🇺',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    tags: ['NASA', 'Artemis', 'Lunar Gateway', 'ESA'],
    variant: 'compact'
  },
  {
    id: 'nvidia-blackwell-ultra',
    title: 'NVIDIA Unveils Blackwell Ultra B300: 1.5 Trillion Transistors and 288GB HBM4',
    excerpt: 'NVIDIA\'s next-gen GPU pushes AI training speeds 4x beyond the H100, with a unified memory fabric designed for trillion-parameter models.',
    description: `NVIDIA has officially unveiled the Blackwell Ultra B300 GPU at its GTC 2026 keynote, marking the most significant leap in AI accelerator design since the original A100. The chip packs 1.5 trillion transistors across a dual-die architecture connected by a 10 TB/s NVLink-C2C fabric, and ships with 288GB of HBM4 memory operating at 12 TB/s bandwidth. Jensen Huang described it as "the engine of the next industrial revolution."

The B300 is designed specifically for training frontier models exceeding one trillion parameters. NVIDIA claims a 4x improvement in FP4 training throughput over the H100, while reducing energy consumption per FLOP by 40%. The chip also introduces a new "Expert Parallelism" mode optimized for Mixture-of-Experts architectures, which are becoming the dominant design pattern for large language models.

Major cloud providers including AWS, Azure, and Google Cloud have already committed to deploying B300-based instances in Q3 2026. Meta and xAI have reportedly placed orders for over 400,000 units each. The starting price for an 8-GPU DGX B300 system is expected to exceed $500,000.`,
    category: 'Semiconductors',
    date: 'May 28, 2026',
    source: 'The Verge',
    sourceUrl: 'https://theverge.com',
    region: 'USA',
    regionFlag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80',
    tags: ['NVIDIA', 'GPU', 'AI Hardware', 'HBM4'],
    variant: 'featured'
  },
  {
    id: 'google-gemini-3',
    title: 'Google DeepMind Launches Gemini 3.0 with Native Multimodal Reasoning',
    excerpt: 'Gemini 3.0 processes text, images, video, and code within a single unified transformer — no modality adapters required.',
    description: `Google DeepMind has released Gemini 3.0, its most capable foundation model to date. Unlike previous versions that stitched together separate encoders for different modalities, Gemini 3.0 uses a single, unified transformer architecture that natively processes text, images, video, audio, and code tokens within the same attention stream.

In benchmark testing, Gemini 3.0 Ultra achieved state-of-the-art results on MMLU (94.2%), HumanEval (93.1%), and the newly introduced VidQA-2026 video reasoning benchmark (87.4%). The model also demonstrated unprecedented performance on long-context tasks, processing up to 10 million tokens in a single inference window.

Google has integrated Gemini 3.0 across its entire product suite, including Search, Workspace, Android, and Cloud. The API is available to developers through Vertex AI with pricing starting at $3 per million input tokens.`,
    category: 'AI & Robotics',
    date: 'May 27, 2026',
    source: 'TechCrunch',
    sourceUrl: 'https://techcrunch.com',
    region: 'USA',
    regionFlag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    tags: ['Google', 'Gemini', 'LLM', 'Multimodal'],
    variant: 'standard'
  },
  {
    id: 'spacex-starship-v3',
    title: 'SpaceX Successfully Tests Starship V3 with Full Orbital Refueling',
    excerpt: 'The upgraded Starship completed its first in-orbit propellant transfer, a critical milestone for the Artemis III lunar landing mission.',
    description: `SpaceX has achieved a historic milestone by successfully completing the first full orbital propellant transfer between two Starship vehicles. The test, conducted 250 km above Earth\'s surface, transferred approximately 150 metric tons of liquid oxygen and methane over a 45-minute window using an automated docking and fluid coupling system.

This capability is essential for NASA\'s Artemis III mission, which will use Starship as the Human Landing System (HLS) to return astronauts to the lunar surface. The refueled Starship must carry enough propellant to perform the translunar injection burn, lunar orbit insertion, powered descent, and return ascent — a total delta-v budget that requires multiple refueling flights.

Elon Musk confirmed that SpaceX plans to conduct at least three more refueling demonstrations before the end of 2026, with the Artemis III mission currently targeted for mid-2027.`,
    category: 'Space Tech',
    date: 'May 26, 2026',
    source: 'Ars Technica',
    sourceUrl: 'https://arstechnica.com',
    region: 'USA',
    regionFlag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80',
    tags: ['SpaceX', 'Starship', 'NASA', 'Artemis'],
    variant: 'standard'
  },
  {
    id: 'eu-ai-act-enforcement',
    title: 'EU AI Act Enters Full Enforcement: Billion-Euro Fines for Non-Compliance',
    excerpt: 'The European Union\'s comprehensive AI regulation framework is now fully enforceable, with penalties reaching up to 7% of global revenue.',
    description: `The European Union\'s AI Act has entered full enforcement as of May 2026, establishing the world\'s most comprehensive regulatory framework for artificial intelligence systems. Companies deploying AI within the EU must now comply with a tiered risk classification system that categorizes AI applications from "minimal risk" to "unacceptable risk."

High-risk AI systems — including those used in healthcare diagnostics, credit scoring, hiring, and law enforcement — must undergo mandatory conformity assessments, maintain detailed technical documentation, and implement continuous monitoring systems. Violations can result in fines of up to €35 million or 7% of global annual revenue, whichever is higher.

The regulation has already prompted significant changes in industry practices. Major tech companies have established dedicated EU compliance teams, and a new ecosystem of "AI auditing" firms has emerged to help organizations navigate the complex requirements.`,
    category: 'AI & Robotics',
    date: 'May 25, 2026',
    source: 'Reuters',
    sourceUrl: 'https://reuters.com',
    region: 'Europe',
    regionFlag: '🇪🇺',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
    tags: ['EU', 'Regulation', 'AI Act', 'Compliance'],
    variant: 'compact'
  },
  {
    id: 'tsmc-2nm-production',
    title: 'TSMC Begins Mass Production of 2nm Chips Using Gate-All-Around Transistors',
    excerpt: 'The world\'s largest chipmaker has started volume manufacturing of its N2 process, delivering 25% more performance than the 3nm node.',
    description: `Taiwan Semiconductor Manufacturing Company has begun mass production of chips using its N2 (2-nanometer) process technology, marking the industry\'s transition from FinFET to Gate-All-Around (GAA) nanosheet transistors. The new architecture wraps the gate material completely around the channel on all four sides, providing dramatically better electrostatic control and reducing leakage current.

TSMC reports that N2 delivers a 25% speed improvement at the same power, or a 30% power reduction at the same speed, compared to its N3E process. The company\'s Fab 20 in Hsinchu is currently the primary production facility, with Fab 2 in Kaohsiung expected to come online for N2 production by Q4 2026.

Apple is widely expected to be the first major customer, with the A20 Bionic chip for the iPhone 18 reportedly being manufactured on N2. Qualcomm, MediaTek, and AMD are also confirmed design partners.`,
    category: 'Semiconductors',
    date: 'May 24, 2026',
    source: 'Nikkei Asia',
    sourceUrl: 'https://asia.nikkei.com',
    region: 'Taiwan',
    regionFlag: '🇹🇼',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    tags: ['TSMC', '2nm', 'GAA', 'Semiconductors'],
    variant: 'featured'
  },
  {
    id: 'openai-codex-2',
    title: 'OpenAI Releases Codex 2: Full Autonomous Software Engineering Agent',
    excerpt: 'Codex 2 can independently architect, implement, test, and deploy entire software projects from a natural language specification.',
    description: `OpenAI has launched Codex 2, a next-generation software engineering agent that represents a paradigm shift from code completion to full autonomous development. Unlike its predecessor, which primarily assisted with individual functions and snippets, Codex 2 can independently handle multi-file project architecture, implementation, testing, CI/CD pipeline configuration, and deployment.

In internal benchmarks, Codex 2 successfully completed 78% of real-world GitHub issues from popular open-source repositories without human intervention, compared to 42% for the original Codex and 67% for competing agents. The system uses a novel "Plan-Execute-Verify" loop that generates an architectural blueprint before writing any code.

OpenAI is offering Codex 2 through a new "Teams" tier priced at $200 per developer per month. Early adopters including Stripe, Shopify, and Instacart report 40-60% reductions in time-to-ship for routine engineering tasks.`,
    category: 'AI & Robotics',
    date: 'May 23, 2026',
    source: 'Wired',
    sourceUrl: 'https://wired.com',
    region: 'USA',
    regionFlag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
    tags: ['OpenAI', 'Codex', 'Agents', 'DevTools'],
    variant: 'standard'
  },
  {
    id: 'apple-vision-pro-2',
    title: 'Apple Announces Vision Pro 2 with M5 Chip and 50% Weight Reduction',
    excerpt: 'The second-generation spatial computer addresses the biggest complaints — weight and price — while doubling the field of view.',
    description: `Apple has unveiled the Vision Pro 2 at a special event in Cupertino, addressing the two primary criticisms of the original: weight and price. The new device weighs just 380 grams (down from 650g), achieved through a complete chassis redesign using titanium-magnesium alloy and the relocation of the battery to an integrated headband.

Powered by the M5 chip with a dedicated Neural Engine containing 40 TOPS of processing power, Vision Pro 2 doubles the field of view to 120 degrees and introduces "Spatial Persistence" — the ability to leave virtual objects anchored in physical space even after removing the headset. Eye tracking resolution has improved to 0.5 degrees of visual angle.

The starting price has been reduced to $2,499 (from $3,499), and Apple is offering an enterprise tier at $3,999 with MDM integration and multi-user support. Pre-orders begin June 15, with shipping starting July 1.`,
    category: 'Consumer Tech',
    date: 'May 22, 2026',
    source: 'Bloomberg',
    sourceUrl: 'https://bloomberg.com',
    region: 'USA',
    regionFlag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&q=80',
    tags: ['Apple', 'Vision Pro', 'XR', 'M5'],
    variant: 'standard'
  },
  {
    id: 'quantum-error-correction',
    title: 'Google Achieves Below-Threshold Quantum Error Correction on Willow II',
    excerpt: 'For the first time, adding more qubits makes the system more reliable — the foundational requirement for practical quantum computing.',
    description: `Google Quantum AI has demonstrated below-threshold quantum error correction on its Willow II processor, a milestone that physicists have pursued for nearly three decades. The achievement means that as the system scales to more physical qubits, the logical error rate actually decreases — the fundamental requirement for building fault-tolerant quantum computers.

The Willow II processor uses 256 superconducting transmon qubits arranged in a surface code topology. The team demonstrated a logical error rate of 10^-7 per round of error correction, using a distance-7 surface code with 97 data qubits and 96 ancilla qubits. This is a 100x improvement over the best previous result.

Google estimates that achieving "quantum advantage" for commercially relevant problems — such as molecular simulation for drug discovery and materials science — will require logical error rates below 10^-10, which they project achieving by 2028 with a 4,000-qubit processor.`,
    category: 'Quantum Computing',
    date: 'May 21, 2026',
    source: 'Nature',
    sourceUrl: 'https://nature.com',
    region: 'USA',
    regionFlag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    tags: ['Quantum', 'Google', 'Error Correction', 'Willow'],
    variant: 'compact'
  },
  {
    id: 'toyota-solid-state',
    title: 'Toyota Launches First Mass-Market Solid-State Battery EV with 900-Mile Range',
    excerpt: 'The bZ5X sedan uses solid-state cells that charge from 10% to 80% in under 10 minutes and retain 90% capacity after 1,500 cycles.',
    description: `Toyota has begun deliveries of the bZ5X, the world\'s first mass-market electric vehicle powered by solid-state batteries. The sedan offers an EPA-estimated range of 900 miles on a single charge, nearly tripling the range of current lithium-ion EVs and eliminating range anxiety as a barrier to EV adoption.

The solid-state cells, developed in partnership with Panasonic and Idemitsu Kosan, use a sulfide-based solid electrolyte that enables energy density of 500 Wh/kg — roughly double that of the best lithium-ion cells. Charging from 10% to 80% takes under 10 minutes at compatible 350kW DC fast chargers, and Toyota guarantees 90% capacity retention after 1,500 full charge cycles.

The bZ5X launches in Japan at ¥7.5 million (approximately $48,000 USD), with North American and European availability planned for Q1 2027. Toyota plans to expand solid-state technology across its entire EV lineup by 2030.`,
    category: 'Green Tech',
    date: 'May 20, 2026',
    source: 'Nikkei Asia',
    sourceUrl: 'https://asia.nikkei.com',
    region: 'Japan',
    regionFlag: '🇯🇵',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    tags: ['Toyota', 'EV', 'Solid-State', 'Battery'],
    variant: 'featured'
  },
  {
    id: 'crowdstrike-supply-chain',
    title: 'CrowdStrike Uncovers State-Sponsored Supply Chain Attack Targeting npm Registry',
    excerpt: 'A sophisticated campaign injected backdoors into 47 popular JavaScript packages, potentially compromising thousands of enterprise applications.',
    description: `CrowdStrike\'s threat intelligence team has uncovered a major state-sponsored supply chain attack targeting the npm package registry. The campaign, attributed to a nation-state actor designated as VELVET TYPHOON, involved the compromise of maintainer accounts for 47 popular npm packages with a combined weekly download count exceeding 15 million.

The attackers injected obfuscated backdoor code into patch version updates, making the changes nearly invisible in standard code review. The backdoor established encrypted command-and-control channels that could exfiltrate environment variables, API keys, and database credentials. CrowdStrike estimates that at least 12,000 enterprise applications may have been affected.

npm Inc. has revoked the compromised versions, and CrowdStrike has released free scanning tools to help organizations identify affected dependencies. The incident has renewed calls for mandatory code signing and reproducible builds in the JavaScript ecosystem.`,
    category: 'Cybersecurity',
    date: 'May 19, 2026',
    source: 'CrowdStrike Blog',
    sourceUrl: 'https://crowdstrike.com',
    region: 'USA',
    regionFlag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    tags: ['Security', 'npm', 'Supply Chain', 'CrowdStrike'],
    variant: 'standard'
  },
  {
    id: 'samsung-mach1-npu',
    title: 'Samsung Unveils Mach-1 NPU: Dedicated On-Device AI Chip for Galaxy S27',
    excerpt: 'The standalone neural processor delivers 100 TOPS performance while consuming less power than the CPU\'s idle state.',
    description: `Samsung has unveiled its first standalone Neural Processing Unit, the Mach-1, which will debut in the Galaxy S27 series later this year. Unlike integrated NPUs that share die space and power budget with the CPU and GPU, the Mach-1 is a dedicated chip optimized exclusively for AI inference workloads.

The Mach-1 delivers 100 trillion operations per second (TOPS) in INT4 precision while consuming just 3 watts of power. Samsung claims this enables real-time on-device processing of 13-billion parameter language models, advanced computational photography pipelines, and simultaneous multi-language translation without any cloud connectivity.

The chip uses a novel "Sparse Attention" architecture that skips zero-valued computations, reducing memory bandwidth requirements by up to 60%. Samsung has also announced a developer SDK that allows third-party apps to leverage the Mach-1 for custom AI features.`,
    category: 'Consumer Tech',
    date: 'May 18, 2026',
    source: 'Samsung Newsroom',
    sourceUrl: 'https://news.samsung.com',
    region: 'South Korea',
    regionFlag: '🇰🇷',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80',
    tags: ['Samsung', 'NPU', 'Galaxy', 'On-Device AI'],
    variant: 'compact'
  },
  {
    id: 'deepseek-r2',
    title: 'DeepSeek Releases R2: Open-Source Reasoning Model Rivaling GPT-4o',
    excerpt: 'The Chinese AI lab\'s latest model matches frontier proprietary systems on math and coding benchmarks at a fraction of the training cost.',
    description: `DeepSeek, the Hangzhou-based AI research lab, has released DeepSeek-R2, an open-source reasoning model that matches or exceeds GPT-4o on mathematical reasoning, code generation, and scientific analysis benchmarks. The model uses a 671-billion parameter Mixture-of-Experts architecture with 37 billion active parameters per forward pass.

On the MATH benchmark, R2 scores 92.1% (vs. GPT-4o's 90.8%). On SWE-bench Verified, it achieves a 54.2% resolve rate, comparable to the best proprietary models. DeepSeek reports that R2 was trained using approximately $8 million worth of compute — roughly 1/50th of the estimated cost to train GPT-4.

The model weights are released under an MIT license, and DeepSeek has published a detailed technical report describing novel training techniques including "Reinforcement Learning from AI Feedback" (RLAIF) and "Multi-Stage Distillation." The release has intensified the debate about whether open-source models will ultimately commoditize foundation AI.`,
    category: 'AI & Robotics',
    date: 'May 17, 2026',
    source: 'South China Morning Post',
    sourceUrl: 'https://scmp.com',
    region: 'China',
    regionFlag: '🇨🇳',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4628c6bb5?w=800&q=80',
    tags: ['DeepSeek', 'Open Source', 'LLM', 'China'],
    variant: 'standard'
  },
  {
    id: 'arm-v10-architecture',
    title: 'ARM Announces v10 Architecture with Integrated Photonic Interconnects',
    excerpt: 'The next-gen ARM ISA embeds optical data routing directly into the chip specification, reducing inter-core latency by 80%.',
    description: `ARM Holdings has announced its ARMv10 instruction set architecture, the most significant revision since ARMv8 introduced 64-bit computing in 2013. The headline feature is native support for photonic interconnects — allowing chip designers to route data between cores using light instead of electrical signals within a standardized framework.

The photonic interconnect specification defines a silicon photonics layer that can be fabricated on top of standard CMOS logic using existing foundry processes. ARM claims this reduces inter-core communication latency by 80% and cuts interconnect power consumption by 90% compared to traditional metal wiring.

ARMv10 also introduces hardware-level support for Confidential Computing, enabling encrypted computation without trusting the cloud provider. Qualcomm, Samsung, and MediaTek have all announced plans to develop ARMv10-based chips, with first silicon expected in late 2027.`,
    category: 'Semiconductors',
    date: 'May 16, 2026',
    source: 'AnandTech',
    sourceUrl: 'https://anandtech.com',
    region: 'UK',
    regionFlag: '🇬🇧',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    tags: ['ARM', 'Photonics', 'ISA', 'Architecture'],
    variant: 'compact'
  },
  {
    id: 'neuralink-blindsight',
    title: 'Neuralink\'s Blindsight Implant Restores Partial Vision in First Human Trial',
    excerpt: 'A 42-year-old patient with complete cortical blindness can now identify shapes, navigate rooms, and read large text after 6 months.',
    description: `Neuralink has published preliminary results from its Blindsight brain-computer interface trial, showing that a 42-year-old patient with complete cortical blindness has regained functional partial vision after six months with the implant. The patient can now identify basic shapes, navigate unfamiliar rooms, and read text displayed at 48pt or larger.

The Blindsight device bypasses damaged visual pathways entirely, using a head-mounted camera array to capture visual information, process it through an onboard neural encoder, and stimulate the visual cortex directly through 3,072 electrode contacts. The system generates phosphene patterns that the brain learns to interpret as coherent visual information.

The FDA granted Blindsight "Breakthrough Device" designation in 2025. Neuralink plans to expand the trial to 50 patients across 10 centers in 2026, with a target of full regulatory approval by 2028.`,
    category: 'Consumer Tech',
    date: 'May 15, 2026',
    source: 'MIT Technology Review',
    sourceUrl: 'https://technologyreview.com',
    region: 'USA',
    regionFlag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80',
    tags: ['Neuralink', 'BCI', 'Vision', 'Medical'],
    variant: 'standard'
  },
  {
    id: 'rust-linux-kernel-6',
    title: 'Linux Kernel 6.12 Merges Rust Driver Framework: 15,000+ Lines of Rust Now Upstream',
    excerpt: 'Linus Torvalds approves the Rust driver abstraction layer, enabling safe, memory-secure driver development for the world\'s most critical operating system.',
    description: `The Linux kernel 6.12 release has merged the Rust driver abstraction framework, marking a historic moment for both the Rust programming language and the Linux ecosystem. Over 15,000 lines of Rust code are now part of the upstream kernel, providing safe abstractions for writing device drivers without the memory safety vulnerabilities that plague C-based driver code.

The merged framework includes abstractions for PCI devices, platform devices, GPIO controllers, and I2C buses. Several production drivers have already been written in Rust, including an NVMe driver by Samsung and a GPU scheduler component by Google for Android.

Linus Torvalds commented that while he still considers C the "heart" of the kernel, Rust provides a "safety net" for the most common categories of kernel vulnerabilities — use-after-free, buffer overflows, and data races — which account for approximately 70% of all kernel CVEs.`,
    category: 'Cybersecurity',
    date: 'May 14, 2026',
    source: 'LWN.net',
    sourceUrl: 'https://lwn.net',
    region: 'USA',
    regionFlag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80',
    tags: ['Rust', 'Linux', 'Kernel', 'Memory Safety'],
    variant: 'standard'
  },
  {
    id: 'iter-fusion-milestone',
    title: 'ITER Achieves First Plasma: The Dawn of Commercial Fusion Energy',
    excerpt: 'After decades of delays, the world\'s largest tokamak has produced its first hydrogen plasma, bringing fusion power one step closer to reality.',
    description: `The International Thermonuclear Experimental Reactor (ITER) in southern France has achieved "first plasma" — the momentous ignition of superheated hydrogen gas inside the world\'s largest tokamak fusion reactor. The milestone, originally scheduled for 2025, was delayed by engineering challenges and the COVID pandemic but represents a pivotal moment in humanity\'s quest for virtually limitless clean energy.

The plasma reached temperatures of approximately 50 million degrees Celsius during the initial commissioning run, though ITER\'s ultimate target is 150 million degrees — ten times hotter than the core of the Sun. At full power, the reactor is designed to produce 500 megawatts of fusion power from 50 megawatts of heating input, demonstrating a Q factor of 10.

ITER is a collaboration between 35 nations representing over half the world\'s population. Commercial fusion power plants based on ITER\'s design are projected for the 2040s.`,
    category: 'Green Tech',
    date: 'May 13, 2026',
    source: 'BBC News',
    sourceUrl: 'https://bbc.com',
    region: 'France',
    regionFlag: '🇫🇷',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    tags: ['ITER', 'Fusion', 'Clean Energy', 'Tokamak'],
    variant: 'featured'
  },
  {
    id: 'meta-llama-4-scout',
    title: 'Meta Releases Llama 4 Scout: 10M Token Context Window and 109B Active Parameters',
    excerpt: 'The open-weight model introduces a Mixture-of-Experts design with 17 active experts per token, enabling desktop-class AI inference.',
    description: `Meta AI has released Llama 4 Scout, the latest entry in its open-weight foundation model family. Scout uses a Mixture-of-Experts architecture with 109 billion active parameters (from a total of 1.2 trillion), and introduces a groundbreaking 10 million token context window — enough to process entire codebases, book series, or months of conversation history in a single inference call.

The model supports 12 input modalities natively, including text, images, video, audio, and structured data formats. On the MMLU-Pro benchmark, Scout scores 89.3%, placing it between Claude 3.5 and GPT-4o in capability. However, its open-weight nature and efficient architecture mean it can run on a single high-end workstation with 4x RTX 5090 GPUs.

Meta has released Scout under a permissive license that allows commercial use, fine-tuning, and redistribution. The company estimates that the open-source AI ecosystem now serves over 1 billion monthly active users across all Llama-derived deployments.`,
    category: 'AI & Robotics',
    date: 'May 12, 2026',
    source: 'Meta AI Blog',
    sourceUrl: 'https://ai.meta.com',
    region: 'USA',
    regionFlag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    tags: ['Meta', 'Llama', 'Open Source', 'MoE'],
    variant: 'standard'
  },
  {
    id: 'isro-venus-orbiter',
    title: 'ISRO Launches Shukrayaan-1: India\'s First Mission to Venus',
    excerpt: 'The ₹1,200 crore mission will study Venus\'s atmosphere, surface geology, and potential signs of phosphine-based microbial chemistry.',
    description: `The Indian Space Research Organisation has successfully launched Shukrayaan-1, India\'s first dedicated mission to Venus, aboard a GSLV Mk III rocket from the Satish Dhawan Space Centre in Sriharikota. The orbiter carries 19 scientific instruments, including a synthetic aperture radar capable of penetrating Venus\'s thick cloud cover to map surface features at 30-meter resolution.

The mission\'s primary scientific objectives include studying the super-rotation of Venus\'s atmosphere (which rotates 60 times faster than the planet itself), mapping volcanic activity, and searching for trace gases — particularly phosphine — that some scientists have proposed as potential biosignatures for microbial life in Venus\'s cloud layers.

Shukrayaan-1 will reach Venus orbit in approximately 140 days after performing a series of Earth-bound orbit-raising maneuvers and a Venus orbit insertion burn. The mission is designed to operate for at least 4 years.`,
    category: 'Space Tech',
    date: 'May 11, 2026',
    source: 'The Hindu',
    sourceUrl: 'https://thehindu.com',
    region: 'India',
    regionFlag: '🇮🇳',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
    tags: ['ISRO', 'Venus', 'Space', 'India'],
    variant: 'compact'
  },
  {
    id: 'cloudflare-workers-gpu',
    title: 'Cloudflare Launches Workers GPU: Serverless AI Inference at the Edge',
    excerpt: 'Developers can now deploy AI models to 300+ edge locations worldwide with automatic scaling and sub-100ms inference latency.',
    description: `Cloudflare has launched Workers GPU, extending its serverless platform to support GPU-accelerated AI inference at over 300 edge locations worldwide. Developers can deploy quantized models up to 13 billion parameters and receive inference results in under 100 milliseconds from any global location.

The service supports ONNX, GGUF, and SafeTensors model formats, with pre-optimized versions of popular models including Llama 3, Mistral, Stable Diffusion XL, and Whisper available in a one-click model catalog. Pricing starts at $0.01 per 1,000 inference requests for small models, with volume discounts for enterprise customers.

Workers GPU integrates natively with Cloudflare\'s existing developer platform, including KV storage, D1 databases, R2 object storage, and Vectorize for RAG applications. The company positions the service as an alternative to centralized cloud GPU instances for latency-sensitive AI applications.`,
    category: 'AI & Robotics',
    date: 'May 10, 2026',
    source: 'Cloudflare Blog',
    sourceUrl: 'https://blog.cloudflare.com',
    region: 'USA',
    regionFlag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    tags: ['Cloudflare', 'Edge', 'Serverless', 'GPU'],
    variant: 'standard'
  },
  {
    id: 'japan-hydrogen-pipeline',
    title: 'Japan Completes World\'s First Intercontinental Liquid Hydrogen Pipeline',
    excerpt: 'A 9,000 km undersea pipeline connecting Australia\'s Pilbara region to Kobe enables continuous green hydrogen delivery for heavy industry.',
    description: `Japan and Australia have completed the world\'s first intercontinental liquid hydrogen pipeline, a 9,000 km undersea conduit connecting solar-powered electrolysis plants in Australia\'s Pilbara region to industrial consumers in Kobe, Japan. The $47 billion project, jointly funded by both governments and a consortium of private investors, is designed to deliver 300,000 tonnes of green hydrogen annually.

The pipeline uses advanced cryogenic insulation technology developed by Kawasaki Heavy Industries to maintain hydrogen at -253°C throughout the journey. Boil-off losses have been reduced to less than 0.1% per day through a novel re-liquefaction system powered by ocean thermal energy conversion.

The project is a cornerstone of Japan\'s strategy to decarbonize heavy industry, with steel manufacturer Nippon Steel and chemical giant Mitsubishi Chemical among the first industrial customers. Japan aims to source 20% of its total energy from hydrogen by 2040.`,
    category: 'Green Tech',
    date: 'May 9, 2026',
    source: 'Financial Times',
    sourceUrl: 'https://ft.com',
    region: 'Japan',
    regionFlag: '🇯🇵',
    image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80',
    tags: ['Hydrogen', 'Japan', 'Green Energy', 'Pipeline'],
    variant: 'standard'
  },
  {
    id: 'microsoft-copilot-os',
    title: 'Microsoft Unveils Windows 12 with Copilot OS: The AI-First Operating System',
    excerpt: 'Every Windows interaction — from file management to app switching — is now mediated by an ambient AI assistant deeply integrated into the kernel.',
    description: `Microsoft has unveiled Windows 12, which the company describes as the first "AI-first operating system." At its core is Copilot OS, an ambient AI layer that is integrated directly into the Windows kernel and can observe, understand, and assist with every user interaction without explicit invocation.

Copilot OS can automatically organize files based on project context, suggest workflow optimizations based on usage patterns, generate application macros by observing repeated actions, and provide real-time natural language answers about any on-screen content. The system processes all AI inference locally using the device\'s NPU, with no data sent to the cloud unless explicitly authorized.

Windows 12 requires a minimum of 16GB RAM and an NPU delivering at least 40 TOPS. Microsoft has partnered with Intel, AMD, and Qualcomm to ensure all new PCs shipped from Q3 2026 meet these requirements. An upgrade from Windows 11 will be free for the first year.`,
    category: 'Consumer Tech',
    date: 'May 8, 2026',
    source: 'The Verge',
    sourceUrl: 'https://theverge.com',
    region: 'USA',
    regionFlag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1624996379697-f01d168b1a52?w=800&q=80',
    tags: ['Microsoft', 'Windows 12', 'Copilot', 'AI OS'],
    variant: 'compact'
  },
  {
    id: 'boston-dynamics-atlas-ev',
    title: 'Boston Dynamics\' Electric Atlas Begins Commercial Deployment at Hyundai Factories',
    excerpt: 'The fully electric humanoid robot performs complex assembly tasks alongside human workers in a shared production line.',
    description: `Boston Dynamics has begun commercial deployment of its all-electric Atlas humanoid robot at Hyundai Motor Group manufacturing facilities in South Korea and the United States. The electric Atlas replaces the company\'s famous hydraulic prototype with a lighter, quieter, and more precise electric actuation system capable of manipulating objects with sub-millimeter accuracy.

The robots are currently performing tasks including heavy component lifting (up to 25 kg), precision part placement, quality inspection using onboard vision systems, and inter-station material transport. Each Atlas unit operates autonomously for 4-hour shifts before requiring a 45-minute charge cycle.

Hyundai reports a 23% increase in production line throughput in areas where Atlas units are deployed, with zero safety incidents over the initial 3-month trial period. Boston Dynamics plans to make Atlas available for commercial leasing to other manufacturers starting Q4 2026, at an estimated cost of $150,000 per unit per year.`,
    category: 'AI & Robotics',
    date: 'May 7, 2026',
    source: 'IEEE Spectrum',
    sourceUrl: 'https://spectrum.ieee.org',
    region: 'South Korea',
    regionFlag: '🇰🇷',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    tags: ['Boston Dynamics', 'Atlas', 'Humanoid', 'Manufacturing'],
    variant: 'standard'
  }
]

const newsCategories = ['All', 'AI & Robotics', 'Semiconductors', 'Space Tech', 'Cybersecurity', 'Consumer Tech', 'Green Tech', 'Quantum Computing']

/* ═════════════════════════════════════
   HELPER: Relative time display
   ═════════════════════════════════════ */
function getTimeAgo(dateStr) {
  const now = new Date()
  const date = new Date(dateStr.replace(/(\w+)\s(\d+),\s(\d+)/, '$1 $2, $3'))
  const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24))
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  if (diff < 7) return `${diff} days ago`
  if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`
  return dateStr
}

/* ═════════════════════════════════════
   NEWS PAGE COMPONENT
   ═════════════════════════════════════ */
export default function News() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [expandedCard, setExpandedCard] = useState(null)
  const [spotlightExpanded, setSpotlightExpanded] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const tickerRef = useRef(null)

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const filteredArticles = activeCategory === 'All'
    ? newsArticles
    : newsArticles.filter(a => a.category === activeCategory)

  const spotlight = newsArticles[0] // Most recent article
  const gridArticles = filteredArticles.filter(a => a.id !== spotlight.id)

  // Category counts
  const getCategoryCount = (cat) => {
    if (cat === 'All') return newsArticles.length
    return newsArticles.filter(a => a.category === cat).length
  }

  // Region stats
  const regionCounts = newsArticles.reduce((acc, a) => {
    const key = `${a.regionFlag} ${a.region}`
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  // Ticker headlines (top 8)
  const tickerItems = newsArticles.slice(0, 8)

  return (
    <div className="news-page">
      <SEO
        title="Tech News — Latest Technology Headlines Worldwide"
        description="Stay informed with the latest technology news from around the globe. AI breakthroughs, semiconductor innovations, space missions, cybersecurity alerts, and more — curated by HanovaDevs."
        url="/news"
        keywords="tech news, technology headlines, AI news, semiconductor news, space tech, cybersecurity news, HanovaDevs"
      />

      {/* ===== HERO ===== */}
      <section className="nw-hero" id="news-hero">
        <div className="nw-hero__mesh" />
        <div className="nw-hero__grid" />
        <div className="container">
          <div className="nw-hero__content reveal-up">
            <span className="nw-label">The Newsroom</span>
            <h1>Global <span className="nw-gradient">Tech</span> Pulse.</h1>
            <p>Real-time coverage of the technologies reshaping our world — from silicon fabs to orbital stations, curated by our engineering team.</p>
            <div className="nw-live-strip">
              <span className="nw-pulse" />
              <span className="nw-live-label">Live</span>
              <span>{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>•</span>
              <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BREAKING NEWS TICKER ===== */}
      <div className="nw-ticker" ref={tickerRef}>
        <div className="nw-ticker__badge">
          <span className="nw-ticker__badge-dot">BREAKING</span>
        </div>
        <div className="nw-ticker__track">
          {/* Double the items for seamless loop */}
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={`${item.id}-${i}`} className="nw-ticker__item">
              {item.regionFlag} {item.title}
            </span>
          ))}
        </div>
      </div>

      {/* ===== CATEGORY FILTERS ===== */}
      <section className="nw-filters">
        <div className="container">
          <div className="nw-filters__bar">
            {newsCategories.map(cat => (
              <button
                key={cat}
                className={`nw-filter-btn ${activeCategory === cat ? 'nw-filter-btn--active' : ''}`}
                onClick={() => { setActiveCategory(cat); setExpandedCard(null) }}
              >
                {cat}
                <span className="nw-filter-count">{getCategoryCount(cat)}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HERO SPOTLIGHT ===== */}
      {activeCategory === 'All' && (
        <section className="nw-spotlight">
          <div className="container">
            <div className="nw-spotlight__card reveal-up" onClick={() => setSpotlightExpanded(!spotlightExpanded)}>
              <img src={spotlight.image} alt={spotlight.title} className="nw-spotlight__img" loading="lazy" />
              <div className="nw-spotlight__overlay" />
              <div className="nw-spotlight__content">
                <div className="nw-spotlight__meta">
                  <span className="nw-spotlight__flag">{spotlight.regionFlag}</span>
                  <span className="nw-category-badge">{spotlight.category}</span>
                  <span className="nw-time-badge">{getTimeAgo(spotlight.date)}</span>
                </div>
                <h2>{spotlight.title}</h2>
                <p>{spotlight.excerpt}</p>
                <span className="nw-spotlight__source">{spotlight.source} ↗</span>
                <div className="nw-read-indicator">
                  {spotlightExpanded ? '▲ Collapse' : '▼ Read Full Story'}
                </div>
              </div>
            </div>
            <div className={`nw-spotlight__detail ${spotlightExpanded ? 'nw-spotlight__detail--open' : ''}`}>
              <div className="nw-spotlight__detail-inner">
                {spotlight.description.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== MASONRY NEWS GRID ===== */}
      <section className="nw-grid-section">
        <div className="container">
          <div className="nw-grid-header">
            <h2>{activeCategory === 'All' ? 'All Stories' : activeCategory}</h2>
            <span className="nw-article-count">{gridArticles.length} articles</span>
          </div>
          <div className="nw-masonry">
            {gridArticles.map((article, i) => (
              <div
                key={article.id}
                className={`nw-card ${article.variant === 'compact' ? 'nw-card--compact' : ''} ${article.variant === 'featured' ? 'nw-card--featured' : ''} reveal-up reveal-delay-${(i % 3) + 1}`}
              >
                {/* Image (skip for compact variant) */}
                {article.variant !== 'compact' && (
                  <div className="nw-card__image">
                    <img src={article.image} alt={article.title} loading="lazy" />
                    <div className="nw-card__image-overlay" />
                  </div>
                )}

                <div className="nw-card__body">
                  <div className="nw-card__meta">
                    <span className="nw-card__flag">{article.regionFlag}</span>
                    <span className="nw-card__cat">{article.category}</span>
                    <span className="nw-card__date">{getTimeAgo(article.date)}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p className="nw-card__excerpt">{article.excerpt}</p>
                  <div className="nw-card__footer">
                    <span className="nw-card__source">{article.source}</span>
                    <button
                      className="nw-card__expand-btn"
                      onClick={() => toggleCard(article.id)}
                      aria-expanded={expandedCard === article.id}
                    >
                      {expandedCard === article.id ? 'Collapse' : 'Read More'}
                      <span className={`nw-card__expand-icon ${expandedCard === article.id ? 'nw-card__expand-icon--open' : ''}`}>▼</span>
                    </button>
                  </div>
                </div>

                {/* Expandable detail panel */}
                <div className={`nw-card__detail ${expandedCard === article.id ? 'nw-card__detail--open' : ''}`}>
                  <div className="nw-card__detail-text">
                    {article.description.split('\n\n').map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
                  <div className="nw-card__tags">
                    {article.tags.map(tag => (
                      <span key={tag} className="nw-tag">{tag}</span>
                    ))}
                  </div>
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nw-card__detail-source"
                  >
                    Read original at {article.source} ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REGION LEGEND ===== */}
      <section className="nw-regions">
        <div className="container">
          <div className="nw-regions__inner">
            {Object.entries(regionCounts).map(([region, count]) => (
              <div key={region} className="nw-region-chip">
                <span>{region}</span>
                <span className="nw-region-chip__count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
