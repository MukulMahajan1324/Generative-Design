export const personalInfo = {
  name: "Alex Rivera",
  tagline: "Bridging the gap between pixel-perfect design and high-performance frontend architecture.",
  roles: [
    "Frontend Developer",
    "UI/UX Designer",
    "Design Systems Architect",
    "Creative Technologist"
  ],
  bio: "I design intuitive human-centered interfaces in Figma and build them in modern React, TypeScript, and Tailwind CSS. Obsessed with 60fps micro-interactions, responsive fluidity, and accessible web standards (WCAG AAA).",
  location: "San Francisco, CA & Remote",
  status: "Available for full-time & high-impact contracts",
  yearsExperience: "5+",
  projectsCompleted: "35+",
  lighthouseScore: "100",
  satisfactionRate: "99%",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    figma: "https://figma.com",
    dribbble: "https://dribbble.com",
    twitter: "https://x.com",
    email: "alex.rivera.dev@gmail.com"
  }
};

export const projectsData = [
  {
    id: "lumina-design-system",
    title: "Lumina Design System & Token Studio",
    subtitle: "Enterprise Component System & Token Pipeline",
    category: "Design Systems",
    featured: true,
    thumbnailGradient: "from-cyan-500/20 via-blue-600/20 to-purple-600/30",
    tags: ["React 19", "Figma Tokens", "Tailwind CSS", "Storybook", "TypeScript"],
    metrics: "45+ components • Adopted across 12 product teams • 70% faster UI sprint speed",
    overview: "A unified, accessible design system connecting Figma token architecture with production React components. Features dark/light themes, automatic WCAG contrast validation, and keyboard-first accessibility.",
    demoUrl: "https://example.com/lumina-demo",
    repoUrl: "https://github.com/example/lumina-design-system",
    caseStudy: {
      problem: "Product engineering teams were building redundant UI elements, resulting in visual inconsistency, slow feature delivery, and accessibility regression issues across legacy apps.",
      solution: "Engineered a headless, token-driven component architecture synchronizing directly with Figma Variables via automated CI/CD token exports.",
      designProcess: [
        "Audited 120+ unique existing screens to catalog inconsistent buttons, modals, and typography",
        "Established a mathematical 4px spacing scale and semantic color token hierarchy",
        "Built interactive Figma component libraries with auto-layout and variant state matrix",
        "Wrote automated a11y test suites with axe-core and Storybook test-runner"
      ],
      techHighlights: [
        "Multi-brand CSS Custom Properties powered by Tailwind v4",
        "Polymorphic React components with strict TypeScript types",
        "Sub-15kb bundle footprint with zero runtime CSS overhead"
      ],
      results: "Cut frontend UI sprint delivery time by 70%, reduced design QA review cycles from 4 days to 4 hours, and achieved 100% WCAG AA compliance across all products."
    }
  },
  {
    id: "zenith-analytics",
    title: "Zenith Cloud SaaS Dashboard",
    subtitle: "Real-Time Telemetry & Data Visualization Platform",
    category: "Web Applications",
    featured: true,
    thumbnailGradient: "from-emerald-500/20 via-teal-600/20 to-blue-700/30",
    tags: ["React", "Next.js", "Tailwind CSS", "Recharts", "Framer Motion"],
    metrics: "Sub-50ms latency • 150k daily active queries • 4.9/5 User Satisfaction",
    overview: "A glassmorphism-inspired cloud monitoring dashboard with real-time streaming charts, customizable bento widgets, and interactive filtering.",
    demoUrl: "https://example.com/zenith-analytics",
    repoUrl: "https://github.com/example/zenith-analytics",
    caseStudy: {
      problem: "Cloud infrastructure engineers were overwhelmed by cluttered charts and sluggish dashboard re-renders during high-volume server spikes.",
      solution: "Designed an information-dense, yet visually calm dark-mode layout with customizable modular bento panels and virtualized rendering.",
      designProcess: [
        "Conducted 1:1 user research with 15 DevOps engineers to identify key glanceable signals",
        "Created high-fidelity Figma prototypes with live micro-interactions and quick-filter hotkeys",
        "Implemented high-contrast data visualization palettes optimized for colorblindness (deuteranopia safe)"
      ],
      techHighlights: [
        "Canvas-based rendering for 50,000+ data points without dropped frames",
        "Drag-and-drop customizable layout using modern Pointer Events",
        "Optimistic UI updates with instant keyboard shortcuts (`Cmd+K` command palette)"
      ],
      results: "Increased daily active usage by 180% and reduced incident response investigation time by 32%."
    }
  },
  {
    id: "aurora-interactive-3d",
    title: "Aurora Creative 3D Audio Experience",
    subtitle: "WebAudio & WebGL Interactive Spatial Sound Canvas",
    category: "Creative & 3D",
    featured: true,
    thumbnailGradient: "from-purple-500/20 via-pink-600/20 to-rose-700/30",
    tags: ["Three.js", "WebGL", "Web Audio API", "GLSL Shaders", "React"],
    metrics: "Awwwards Site of the Day Nominee • 60 FPS on mobile • 120k organic visits",
    overview: "An immersive audio-visual sandbox where users manipulate 3D reactive fluid meshes synced to interactive synthesized soundscapes.",
    demoUrl: "https://example.com/aurora-3d",
    repoUrl: "https://github.com/example/aurora-3d",
    caseStudy: {
      problem: "Traditional portfolio and marketing sites often feel static and forgettable. The goal was to prove how high-end WebGL graphics can run performantly on everyday mobile devices.",
      solution: "Engineered custom GLSL noise shaders coupled with real-time Fast Fourier Transform (FFT) audio node analysis.",
      designProcess: [
        "Explored generative mathematical forms and parametric surfaces in Blender",
        "Designed touch-first mobile gesture controls for orbit, zoom, and harmonic modulation",
        "Tuned post-processing bloom, chromatic aberration, and film grain for cinematic feel"
      ],
      techHighlights: [
        "Instanced buffer geometries to keep GPU draw calls under 10",
        "Custom procedural audio synthesizer running on an AudioWorklet thread",
        "Adaptive resolution scaling dynamically maintaining 60 FPS"
      ],
      results: "Recognized as Site of the Day nominee on Awwwards, shared by 40,000+ designers on Twitter/X, and featured in modern web design roundups."
    }
  },
  {
    id: "kura-fintech-mobile",
    title: "Kura Smart Wallet & Wealth App",
    subtitle: "Next-Generation Global Neo-Banking Mobile UI",
    category: "Mobile UI",
    featured: false,
    thumbnailGradient: "from-amber-500/20 via-orange-600/20 to-red-700/30",
    tags: ["React Native", "UI/UX Research", "Figma", "Micro-Interactions", "Tailwind"],
    metrics: "$24M in monthly transactions • 4.9 App Store rating • 250k downloads",
    overview: "A sleek, trustworthy fintech mobile experience featuring frictionless peer-to-peer transfers, biometric security animations, and intuitive investment insights.",
    demoUrl: "https://example.com/kura-wallet",
    repoUrl: "https://github.com/example/kura-wallet",
    caseStudy: {
      problem: "Users felt high anxiety when transferring large sums due to obscure banking terminology and clunky multi-step verification flows.",
      solution: "Redesigned the entire transfer flow with confidence-building micro-feedback, clear fee breakdowns, and tactile spring haptics.",
      designProcess: [
        "Tested 4 different payment flow variants with 30 target banking users",
        "Crafted custom SVG completion animations indicating instant payment finality",
        "Created an accessible number pad optimized for single-thumb mobile ergonomics"
      ],
      techHighlights: [
        "Declarative gesture-driven drawer navigation",
        "Zero-latency biometric prompt triggers",
        "Offline-first cached balance ledger"
      ],
      results: "Transaction abandonment dropped from 14% to 1.8%, while user Net Promoter Score (NPS) jumped from +38 to +74."
    }
  },
  {
    id: "synapse-ai-studio",
    title: "Synapse AI Creative Canvas",
    subtitle: "Node-Based Generative AI Prompt & Workflow Builder",
    category: "Web Applications",
    featured: false,
    thumbnailGradient: "from-violet-500/20 via-indigo-600/20 to-sky-700/30",
    tags: ["React", "TypeScript", "Tailwind CSS", "Canvas API", "Zustand"],
    metrics: "12,000 active creators • Infinite canvas • Smooth 60fps pan/zoom",
    overview: "An infinite-canvas node editor for chaining multi-model AI workflows (LLMs, Diffusion models, and vector search) with real-time execution feedback.",
    demoUrl: "https://example.com/synapse-ai",
    repoUrl: "https://github.com/example/synapse-ai",
    caseStudy: {
      problem: "Complex multi-step prompt engineering in chat boxes is tedious, linear, and impossible to branch or parameterize cleanly.",
      solution: "Designed a visual nodal graph interface inspired by modular synthesizers and node-based shaders, making AI pipelines visual and shareable.",
      designProcess: [
        "Benchmarked leading creative tools (Figma, Blender, Unreal Engine Blueprints)",
        "Invented snapping wire connectors with magnetic cursor physics and visual pulses",
        "Added minimap navigator and search-anything radial menu"
      ],
      techHighlights: [
        "Hardware-accelerated 2D canvas backdrop with SVG spline bezier curves",
        "Reactive state management using Zustand with undo/redo history trees",
        "Local-first persistence with automatic IndexedDB synchronization"
      ],
      results: "Users built over 140,000 automated creative workflows within the first 6 months of open beta."
    }
  },
  {
    id: "velox-motion-store",
    title: "Velox Hypercar Configurator",
    subtitle: "High-End E-Commerce & Interactive Visualizer",
    category: "Creative & 3D",
    featured: false,
    thumbnailGradient: "from-blue-500/20 via-indigo-600/20 to-slate-800/30",
    tags: ["Three.js", "React", "Tailwind CSS", "Web Audio", "Framer Motion"],
    metrics: "2.4x conversion uplift • Realistic PBR materials • 98% mobile compatibility",
    overview: "A photorealistic 3D vehicle configurator enabling real-time paint customization, interior material toggling, and interactive sound engine revving.",
    demoUrl: "https://example.com/velox-configurator",
    repoUrl: "https://github.com/example/velox-configurator",
    caseStudy: {
      problem: "Static image car configurators failed to evoke emotion and drove low pre-order reservation intent.",
      solution: "Crafted a web-based 3D studio environment with realistic car lighting, metallic paint flakes, and interactive door/cockpit toggles.",
      designProcess: [
        "Optimized high-poly CAD models down to 45k polygons with normal map baking",
        "Created an intuitive floating glassmorphism control dock for colors and trim options",
        "Added spatial engine exhaust sound recordings that react to throttle sliders"
      ],
      techHighlights: [
        "HDR environment mapping for reflections",
        "Lossless texture compression using KTX2 / Basis Universal format",
        "Progressive asset loading ensuring fast first-paint under 1.2s"
      ],
      results: "Achieved a 240% increase in customer test-drive bookings and a 4-minute average session duration."
    }
  }
];

export const skillsData = {
  frontend: [
    { name: "React 19 / Next.js", level: 95, exp: "5 years", highlight: "Server Components, Suspense, Hooks architecture" },
    { name: "TypeScript / JavaScript", level: 92, exp: "5 years", highlight: "Strict typing, Generics, AST manipulation" },
    { name: "Tailwind CSS & Modern CSS", level: 98, exp: "5 years", highlight: "v4 @theme, Cascade Layers, :has(), Container Queries" },
    { name: "WebGL / Three.js / Canvas", level: 82, exp: "3 years", highlight: "GLSL Shaders, 3D Scenes, 60fps Optimization" },
    { name: "State Architecture (Zustand/Redux)", level: 90, exp: "4 years", highlight: "Normalized caches, Middleware, Local-first sync" },
    { name: "Web Audio API", level: 85, exp: "3 years", highlight: "Real-time sound synthesis, spatial micro-interactions" }
  ],
  design: [
    { name: "Figma & Design Systems", level: 96, exp: "5 years", highlight: "Tokens, Auto-layout, Component variant sets, Branching" },
    { name: "UI/UX & Human Interface Guidelines", level: 94, exp: "5 years", highlight: "Information architecture, User flows, Wireframing" },
    { name: "Micro-Interactions & Motion", level: 95, exp: "4 years", highlight: "Choreographed transitions, Spring physics, Haptics" },
    { name: "Accessibility (WCAG 2.2 AAA)", level: 92, exp: "4 years", highlight: "Screen reader tree, Focus traps, Semantic markup" },
    { name: "Rapid Prototyping", level: 93, exp: "5 years", highlight: "Interactive Figma clickable mockups, Code prototypes" },
    { name: "User Research & Usability Testing", level: 88, exp: "4 years", highlight: "Qualitative interviews, Heatmaps, A/B validation" }
  ],
  tools: [
    { name: "Vite / Bun / Node.js", level: 92, exp: "4 years", highlight: "Fast HMR, Plugin authors, ESM bundling" },
    { name: "Git / GitHub Actions CI/CD", level: 90, exp: "5 years", highlight: "Release pipelines, Automated PR linting, Vercel" },
    { name: "Storybook & Visual Regression", level: 91, exp: "4 years", highlight: "Component documentation, Chromatic visual tests" },
    { name: "Testing (Vitest, Testing Library, Playwright)", level: 86, exp: "4 years", highlight: "Unit tests, E2E flows, a11y automated assertions" },
    { name: "Performance & Lighthouse Audits", level: 95, exp: "5 years", highlight: "Core Web Vitals (INP, LCP, CLS), Bundle splitting" }
  ]
};

export const designProcessSteps = [
  {
    step: "01",
    title: "Discovery & Empathy",
    subtitle: "Understanding the Why Before the How",
    description: "Deep dive into user pain points, business requirements, and technical constraints. Uncover latent needs through competitive benchmarking and user empathy maps.",
    deliverables: ["User Persona & Journey Maps", "Feature Priority Matrix", "Information Architecture (IA)", "Technical Feasibility Audit"]
  },
  {
    step: "02",
    title: "Wireframing & Prototype",
    subtitle: "From Low-Fi Concepts to High-Fi Figma Systems",
    description: "Rapidly iterate on layouts using low-fidelity sketches before translating into systematic Figma design files with modular design tokens, typography scales, and responsive variants.",
    deliverables: ["Interactive Clickable Prototypes", "Figma Design Token Studio", "WCAG Color Contrast Matrix", "Micro-Interaction Storyboards"]
  },
  {
    step: "03",
    title: "Frontend Engineering",
    subtitle: "Pixel-Perfect, Accessible & Performant Code",
    description: "Architect reusable, type-safe React components with Tailwind CSS. Ensure rigorous keyboard navigation, semantic HTML tags, and clean separation between UI presentation and business logic.",
    deliverables: ["Production React Components", "Storybook Component Catalog", "Type-safe APIs & Hooks", "Unit & Integration Test Suites"]
  },
  {
    step: "04",
    title: "Motion, Polish & Launch",
    subtitle: "60fps Fluidity & Lighthouse 100 Standards",
    description: "Fine-tune easing curves, spring physics, and subtle glassmorphism textures. Benchmark Core Web Vitals (LCP, INP, CLS) and deploy with CI/CD automated checks.",
    deliverables: ["Lighthouse 100/100 Audits", "Core Web Vitals Optimization", "Cross-Browser & Device QA", "Automated Deployment Pipeline"]
  }
];

export const testimonialsData = [
  {
    quote: "Alex has that rare superpower of thinking like a top-tier visual designer while coding like a seasoned senior frontend architect. The design system Alex built saved our team months of development.",
    author: "Elena Rostova",
    role: "VP of Product",
    company: "SaaSify Cloud",
    avatar: "ER"
  },
  {
    quote: "Working with Alex felt like magic. Our user conversion jumped 32% within two weeks of shipping the new checkout interface. Every micro-interaction and animation feels completely intentional.",
    author: "Marcus Chen",
    role: "Engineering Director",
    company: "Nexus Labs",
    avatar: "MC"
  },
  {
    quote: "One of the most detail-oriented frontend engineers I've collaborated with. Alex's dedication to accessibility (WCAG AA) without sacrificing visual beauty is second to none.",
    author: "Sarah Jenkins",
    role: "Lead Product Designer",
    company: "Vanguard Design Studio",
    avatar: "SJ"
  }
];
