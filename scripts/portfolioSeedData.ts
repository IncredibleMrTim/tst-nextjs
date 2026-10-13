// Content for the portfolio site, taken from the CV. Roles are listed oldest to newest;
// `order` follows the same sequence (higher = more recent).

export const experienceData = [
  {
    role: 'Developer',
    company: 'Webree Ltd',
    type: null,
    location: 'Remote',
    logo: 'webree',
    summary:
      '- Developed CRM and CMS-integrated web applications.\n- Integrated internal systems with third-party platforms.',
    technologies: [
      'C#',
      'JavaScript',
      'jQuery',
      'SQL',
      'CSS',
      'Jest',
      'NPM',
      'REST',
      'Agile'
    ],
    fromDate: new Date('2009-06-01'),
    toDate: new Date('2011-03-01'),
    order: 1
  },
  {
    role: 'Frontend Developer',
    company: 'MAD Productions Ltd',
    type: null,
    location: 'Remote',
    logo: null,
    summary:
      '- Built e-commerce platforms and Content Management Systems.\n- Improved application performance and client delivery processes.',
    technologies: [
      'C#',
      'JavaScript',
      'jQuery',
      'SQL',
      'CSS',
      'Jest',
      'NPM',
      'REST',
      'Agile'
    ],
    fromDate: new Date('2011-04-01'),
    toDate: new Date('2012-07-01'),
    order: 2
  },
  {
    role: 'Software Engineer',
    company: 'DBT Ltd',
    type: null,
    location: 'Remote',
    logo: 'proagrica',
    summary:
      '- Led development of Windows Smart Clients, dashboards, CRM and asset management systems.\n- Applied C#, MVC, jQuery, SQL and web technologies across software development projects.',
    technologies: ['C#', 'MVC', 'React', 'jQuery', 'SQL', 'CSS', 'REST'],
    fromDate: new Date('2012-04-01'),
    toDate: new Date('2014-09-01'),
    order: 3
  },
  {
    role: 'Senior Frontend Software Engineer',
    company: 'LexisNexis Risk Solutions',
    type: null,
    location: 'Remote',
    logo: 'lexisnexis',
    summary:
      '- Delivered telematics and risk management platforms across web and mobile environments.\n- Built web portals using React, TypeScript and Material UI.\n- Developed mobile applications using React Native. Created reusable component libraries with Storybook.\n- Transitioned from C# backend development into a senior frontend engineering role.\n- Collaborated with international engineering teams across the US, Brazil, Spain and Vietnam.',
    technologies: [
      'React',
      'React Native',
      'AngularJS',
      'C#',
      'SQL',
      'React Context',
      'Material UI',
      'SASS',
      'Styled-Components',
      'Storybook',
      'Jest',
      'REST'
    ],
    fromDate: new Date('2014-08-01'),
    toDate: new Date('2021-11-01'),
    order: 4
  },
  {
    role: 'Frontend React Developer',
    company: 'Office for National Statistics',
    type: 'Contract',
    location: 'Remote',
    logo: 'ons',
    summary:
      '- Developed accessible search functionality using React and Go templates.\n- Implemented solutions aligned with Web Content Accessibility Guidelines (WCAG).\n- Contributed to Scrum-based software delivery cycles.',
    technologies: [
      'React',
      'Go',
      'CSS',
      'Jest',
      'SQL',
      'NPM',
      'REST',
      'Agile',
      'WCAG'
    ],
    fromDate: new Date('2021-12-01'),
    toDate: new Date('2022-01-01'),
    order: 5
  },
  {
    role: 'Senior Frontend React Developer',
    company: 'MDRxTech – Mishcon de Reya Group',
    type: 'Contract',
    location: 'Remote',
    logo: 'mdrxtech',
    summary:
      '- Delivered the CSX Carbon Capture project using React, TypeScript, Redux, AWS and PostgreSQL.\n- Provided architectural consultation and supported Agile process improvements.\n- Worked with AWS services including CloudFront, S3, RDS, API Gateway and Amplify.',
    technologies: ['React', 'TypeScript', 'Redux', 'AWS', 'PostgreSQL'],
    fromDate: new Date('2022-01-01'),
    toDate: new Date('2022-06-01'),
    order: 6
  },
  {
    role: 'Lead Frontend UI Engineer',
    company: 'Coyote Software',
    type: null,
    location: 'Remote',
    logo: 'coyote',
    summary:
      '- Led migration of an enterprise platform from AngularJS to React.\n- Managed frontend delivery planning and daily development activities.\n- Built a standalone React component library using Storybook.\n- Developed an early-stage Next.js proof of concept prior to company acquisition.\n- Mentored developers and established frontend development standards.',
    technologies: [
      'React',
      'TypeScript',
      'Next.js',
      'Redux',
      'Material UI',
      'Storybook'
    ],
    fromDate: new Date('2022-06-01'),
    toDate: new Date('2023-07-01'),
    order: 7
  },
  {
    role: 'Senior Frontend UI Engineer',
    company: 'Santander Auto',
    type: 'Contract',
    location: 'Remote',
    logo: 'santander',
    summary:
      '- Delivered customer-facing operational tools to resolve validation issues within internal systems.\n- Gathered requirements and worked with stakeholders and product owners to define frontend solutions.\n- Coordinated frontend and backend teams through Agile and Kanban ceremonies.\n- Improved accessibility, SEO and component structure across React applications.',
    technologies: [
      'React',
      'TypeScript',
      'React Query',
      'Tailwind CSS',
      'Vite'
    ],
    fromDate: new Date('2023-07-01'),
    toDate: new Date('2023-11-01'),
    order: 8
  },
  {
    role: 'Senior Frontend Engineer',
    company: 'AstraZeneca',
    type: 'Contract',
    location: 'Remote',
    logo: 'astrazeneca',
    summary:
      "- Developed an internal analytics application supporting Monte Carlo modelling for asset combination decisions.\n- Led migration from Webpack/Jest to Vite/Vitest, modernising the frontend development and testing stack.\n- Replaced Styled-Components with Tailwind CSS to standardise the frontend stack.\n- Contributed to the Frontend Working Group and helped define development standards across the Connected Insights division.\n- Integrated shared design systems and improved testing and development workflows.\n- Supported broader adoption of the organisation's design system.",
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Vitest',
      'React Query',
      'Tailwind CSS'
    ],
    fromDate: new Date('2024-02-01'),
    toDate: new Date('2025-03-01'),
    order: 9
  },
  {
    role: 'Senior Frontend Engineer',
    company: 'Premium Training Services',
    type: 'Contract',
    location: 'Remote',
    logo: 'pts',
    summary:
      '- Migrated a legacy platform to a modern, scalable frontend architecture.\n- Designed and implemented a four-layer frontend architecture using React Query, Axios, Mock Service Worker and REST APIs.\n- Built a mock backend with Mock Service Worker to decouple tightly coupled IndexedDB functionality.\n- Refactored legacy code and modernised testing infrastructure using Vitest.\n- Improved application maintainability, performance and developer experience.',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Vitest',
      'React Query',
      'Tailwind CSS',
      'Drizzle ORM',
      'IndexedDB'
    ],
    fromDate: new Date('2025-09-01'),
    toDate: new Date('2025-11-01'),
    order: 10
  },
  {
    role: 'Senior Full Stack Engineer',
    company: 'World Veterinary Services',
    type: 'Contract',
    location: 'Remote',
    logo: 'wvs',
    summary:
      '- Rebuilt an incomplete PostgreSQL database and produced a new Entity-Relationship Diagram to support future application development.\n- Restructured the API around the revised database architecture. Delivered a production-ready API supporting a React Native application.\n- Developed a secure Next.js administration portal using Server Actions for internal and external API consumption.\n- Collaborated with distributed mobile teams and stakeholders throughout delivery.\n- Completed the full solution ahead of schedule within a two-month contract.',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Prisma',
      'PostgreSQL',
      'Tailwind CSS',
      'Jest',
      'Swagger',
      'Vercel'
    ],
    fromDate: new Date('2025-11-01'),
    toDate: new Date('2025-12-01'),
    order: 11
  },
  {
    role: 'AI Integration Engineer',
    company: 'Elanco Animal Health',
    type: 'Fixed-Term Contract',
    location: 'Remote',
    logo: 'elanco',
    summary:
      '- Rebuilt an AI persona proof of concept into production-grade architecture, improving performance and response alignment by approximately 70%. Translated complex regulatory business rules into a structured data matrix for integration with the AI engine.\n- Developed a custom Python agent and RAG proof of concept to overcome internal platform file-size limitations.\n- Replicated architectural outputs for large files stored in Google Cloud Storage.\n- Designed a hierarchical context structure separating Persona, General Rules and Template Rules.\n- Implemented Context Caching to reduce latency and input token costs across enterprise workflows.\n- Developed a regulatory data ingestion pipeline for complex pharmaceutical documents.\n- Addressed middle-context recall degradation to improve reliability of long-form data extraction.\n- Stabilised and scaled a client application using Google Enterprise Agents.',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Python',
      'Google Enterprise Agents',
      'Context Caching',
      'RAG',
      'Google Cloud Storage'
    ],
    fromDate: new Date('2026-05-01'),
    toDate: new Date('2026-07-01'),
    order: 12
  },
  {
    role: 'Application Architect & Full Stack Engineer',
    company: 'Tauranga Electroplaters',
    type: 'Private Contract',
    location: 'Remote',
    logo: 'tauranga',
    summary:
      '- Architected and developed a full-stack process management application from the ground up, covering application design, frontend, backend, database architecture, AI integration and deployment.\n- Gathered requirements directly from the client and translated business processes into application workflows and technical requirements. Designed application UX and architecture using Figma before development.\n- Integrated Claude API to extract Purchase Order data and route jobs through electroplating.\n- Architected and deployed a PostgreSQL database using Prisma ORM and Next.js functionality to manage job states and process data.\n- Implemented WebSockets to provide real-time application updates and multi-user status synchronisation.\n- Configured Vercel Blob storage with dynamic image compression for production-stage photography.\n- Automated workflow completion processes, including customer notification emails and synchronised Xero documents.\n- Established CI/CD deployment through Vercel and GitHub workflows, taking the application from initial concept to production.',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'React Query',
      'Tailwind CSS',
      'WebSockets',
      'Claude API',
      'Prisma',
      'PostgreSQL',
      'Vercel Blob',
      'Vercel'
    ],
    fromDate: new Date('2026-07-01'),
    toDate: null,
    order: 13
  }
];

export const projectData = [
  {
    name: 'Skim Reapers',
    role: 'Product Owner / Engineer / Architect',
    fromDate: new Date('2026-07-01'),
    toDate: null,
    summary:
      '- Designed and developed a modern website using React, Next.js and TypeScript based on client requirements and design direction.\n- Integrated Sanity CMS to allow independent management of website content and media.\n- Built production and development environments and implemented CI/CD deployment to Krystal hosting.\n- Architected PostgreSQL database functionality using Prisma and Next.js Server Actions.\n- Gathered requirements directly from the client and managed UX planning, architecture and delivery.',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Prisma',
      'PostgreSQL',
      'Sanity CMS',
      'ShadCN',
      'Claude Code',
      'Krystal'
    ],
    url: 'https://dev.skimreapers.co.uk',
    order: 1
  },
  {
    name: 'Town Square Digital',
    role: 'Independent Software Development',
    fromDate: null,
    toDate: null,
    summary:
      '- Developed web solutions for smaller independent businesses, providing modern digital platforms within budget-conscious environments.\n- Managed full-stack delivery across architecture, frontend development, backend services, databases and deployment.\n- Applied React, Next.js, TypeScript and PostgreSQL according to individual project requirements.\n- Used Claude Code and Figma Make to streamline development and design workflows.\n- Developed production-ready applications incorporating AI integrations, including Claude API document ingestion and real-time customer data processing.',
    technologies: [],
    url: 'https://townsquaredigital.co.uk',
    order: 2
  }
];

// `company` links each result to its role in experienceData.
export const featuredWorkData = [
  {
    company: 'Elanco Animal Health',
    metric: '~70%',
    label: 'faster, better aligned',
    title: 'Production AI persona architecture',
    description:
      'Rebuilt a proof of concept with context caching, Google Cloud Storage and a custom Python agent.',
    technologies: 'Python · RAG · Google Cloud',
    order: 1
  },
  {
    company: 'World Veterinary Services',
    metric: '2 mo',
    label: 'delivered ahead of schedule',
    title: 'Database, API and admin portal',
    description:
      'Rebuilt the database, restructured the API and shipped a Next.js administration portal.',
    technologies: 'Next.js · Prisma · PostgreSQL',
    order: 2
  },
  {
    company: 'Tauranga Electroplaters',
    metric: 'AI',
    label: 'Purchase Order extraction',
    title: 'Process management application',
    description:
      'Claude extracts Purchase Orders and routes jobs, with real-time multi-user status sync.',
    technologies: 'Next.js · Claude API · WebSockets',
    order: 3
  },
  {
    company: 'Coyote Software',
    metric: '→ React',
    label: 'migrated from AngularJS',
    title: 'Enterprise platform migration',
    description:
      'Led the move to React and built a reusable Storybook component library.',
    technologies: 'React · Storybook · Redux',
    order: 4
  }
];

export const educationData = [
  {
    institution: 'Southampton Solent University',
    qualification: 'BSc (Hons) Software Engineering & Internet Application',
    fromYear: 2005,
    toYear: 2009,
    order: 1
  },
  {
    institution: 'IWIGTS Training College',
    qualification: 'GNVQ IT Solutions',
    fromYear: 1996,
    toYear: 1998,
    order: 2
  }
];

export const skillGroupData = [
  {
    name: 'Frontend Engineering',
    items: [
      'React',
      'Next.js',
      'React Native',
      'TypeScript',
      'JavaScript',
      'Vite',
      'Redux',
      'Zustand',
      'React Query',
      'React Hook Form',
      'Responsive Web Design',
      'SPA',
      'SSR',
      'Frontend Architecture',
      'Component-Driven Development'
    ],
    order: 1
  },
  {
    name: 'Backend & APIs',
    items: [
      'Node.js',
      'REST APIs',
      'Next.js Server Actions',
      'Prisma',
      'Drizzle ORM',
      'PostgreSQL',
      'OpenAPI',
      'Swagger',
      'Serverless Functions',
      'API Integration',
      'Database Architecture',
      'Entity-Relationship Diagrams'
    ],
    order: 2
  },
  {
    name: 'AI & AI Integration',
    items: [
      'AI Context Engineering',
      'LLMs',
      'Claude API',
      'Claude Code',
      'GitHub Copilot',
      'Google Enterprise Agents',
      'Vertex AI',
      'Retrieval- Augmented Generation (RAG)',
      'AI Agent Architecture',
      'Context Caching',
      'Persona Engineering',
      'Prompt Engineering',
      'Data Ingestion Pipelines'
    ],
    order: 3
  },
  {
    name: 'UI & Design Systems',
    items: [
      'Tailwind CSS',
      'Material UI',
      'Storybook',
      'Styled-Components',
      'SASS',
      'Sanity CMS',
      'Design Systems',
      'Component Libraries',
      'Figma',
      'Figma Make'
    ],
    order: 4
  },
  {
    name: 'Testing & Development',
    items: [
      'Jest',
      'Vitest',
      'Playwright',
      'Cypress',
      'Mock Service Worker (MSW)',
      'NPM',
      'Yarn',
      'GitHub',
      'Test-Driven Development (TDD)'
    ],
    order: 5
  },
  {
    name: 'Cloud & DevOps',
    items: [
      'AWS',
      'S3',
      'RDS',
      'API Gateway',
      'CloudFront',
      'CloudWatch',
      'Google Cloud Storage',
      'Vertex AI',
      'Vercel',
      'CI/CD',
      'GitHub Workflows'
    ],
    order: 6
  },
  {
    name: 'Engineering & Collaboration',
    items: [
      'Agile',
      'Scrum',
      'Kanban',
      'Technical Leadership',
      'Engineering Mentorship',
      'Requirements Gathering',
      'Stakeholder Collaboration',
      'Cross-Functional Collaboration',
      'Legacy Modernisation',
      'Code Modernisation',
      'System Design'
    ],
    order: 7
  }
];

export const profileData = {
  name: 'Tim Smart',
  companyName: 'Tim Smart Technology LTD',
  jobTitle: 'Senior Full Stack Engineer',
  introduction:
    'I design, build and ship web products end to end, with Next.js, TypeScript and AI integration. From requirements and architecture to production.',
  about: [
    'Senior Full Stack Software Engineer with extensive experience building modern web applications across frontend engineering, backend development, API integration, database architecture and cloud deployment.',
    'Specialist experience includes React, Next.js, TypeScript, Node.js and PostgreSQL, with a strong focus on frontend architecture, reusable component systems, responsive applications and maintainable code. Experience spans enterprise platforms, internal applications, customer-facing products, mobile applications and private client projects.',
    'Recent engineering work has focused heavily on AI integration, including AI Context Engineering, Claude API, Claude Code, Google Enterprise Agents, Vertex AI, Retrieval-Augmented Generation (RAG), Context Caching and AI agent architecture. At Elanco Animal Health, an AI persona architecture was rebuilt for production use, delivering an approximately 70% performance improvement.',
    'Private engineering projects have provided direct experience working with clients from requirements gathering and solution design through development, database architecture, AI integration, CI/CD and production deployment. This includes building full-stack applications for Tauranga Electroplaters and modern web solutions for Skim Reapers.',
    'Earlier roles include senior engineering positions across AstraZeneca, LexisNexis Risk Solutions, Coyote Software, Santander Auto, Mishcon de Reya Group and the Office for National Statistics, with experience spanning React migrations, design systems, component libraries, React Native, AWS and distributed international teams.',
    'Engineering interests centre on practical application development, modern frontend architecture, AI-enabled software and building reliable products that solve real business problems.'
  ],
  email: 'tim.smart@timsmarttechnology.co.uk',
  githubUrl: 'https://github.com/IncredibleMrTim',
  linkedinUrl: 'https://linkedin.com/in/tim-smart/',
  heroSkills: ['Next.js', 'TypeScript', 'Claude API', 'PostgreSQL'],
  featuredSkills: [
    'React',
    'TypeScript',
    'Next.js',
    'Redux',
    'Tailwind CSS',
    'Storybook',
    'PostgreSQL',
    'Prisma',
    'Claude API',
    'AWS',
    'Jest',
    'React Native'
  ],
  highlightMetric: '~70%',
  highlightLabel: 'AI performance\nimprovement',
  currentProjectTitle:
    'AI-powered process management for Tauranga Electroplaters',
  currentProjectTechnologies: 'Next.js · Claude API · WebSockets'
};
