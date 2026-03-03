export const skillsData = [
  // Languages & Core Technologies
  {
    name: 'TypeScript',
    description:
      'Adds a robust layer of static typing to JavaScript, catching errors at compile-time and improving developer experience in large codebases.',
    type: 'TECHNOLOGIES' as const,
    order: 1
  },
  {
    name: 'JavaScript (ES6+)',
    description:
      'Leveraging modern syntax like async/await, destructuring, and optional chaining to write clean, efficient, and readable code.',
    type: 'TECHNOLOGIES' as const,
    order: 2
  },
  {
    name: 'Node.js',
    description:
      'An asynchronous, event-driven JavaScript runtime that enables the development of scalable network applications and high-performance backend services.',
    type: 'TECHNOLOGIES' as const,
    order: 3
  },
  {
    name: 'HTML5',
    description:
      'The backbone of the web, utilizing semantic elements to ensure accessibility, SEO optimization, and standardized content structure.',
    type: 'TECHNOLOGIES' as const,
    order: 4
  },
  {
    name: 'CSS3',
    description:
      'Crafting visually engaging user interfaces through advanced layout techniques like Flexbox and Grid, along with fluid animations.',
    type: 'TECHNOLOGIES' as const,
    order: 5
  },
  {
    name: 'SQL',
    description:
      'The industry-standard language for managing and querying relational databases, ensuring data integrity and complex data retrieval.',
    type: 'TECHNOLOGIES' as const,
    order: 6
  },
  {
    name: 'C#',
    description:
      'A versatile, object-oriented language frequently used for enterprise-level backend development, desktop applications, and game development.',
    type: 'TECHNOLOGIES' as const,
    order: 7
  },

  // Frontend
  {
    name: 'React',
    description:
      'A declarative library for building component-based user interfaces, focusing on a one-way data flow and an optimized virtual DOM.',
    type: 'FRONTEND' as const,
    order: 8
  },
  {
    name: 'Next.js',
    description:
      'A powerful React framework that streamlines the creation of production-ready apps with built-in SSR, SSG, and API routes.',
    type: 'FRONTEND' as const,
    order: 9
  },
  {
    name: 'Vite',
    description:
      'A next-generation frontend build tool that offers lightning-fast Hot Module Replacement (HMR) and an optimized build process.',
    type: 'FRONTEND' as const,
    order: 10
  },
  {
    name: 'Redux',
    description:
      'A predictable state container for JavaScript apps, ideal for managing complex global state across large-scale applications.',
    type: 'FRONTEND' as const,
    order: 11
  },
  {
    name: 'Zustand',
    description:
      'A small, fast, and scalable state-management solution that uses simplified hooks without the heavy boilerplate of Redux.',
    type: 'FRONTEND' as const,
    order: 12
  },
  {
    name: 'React Query (TanStack)',
    description:
      'Simplifies server state management by handling fetching, caching, and synchronizing asynchronous data with ease.',
    type: 'FRONTEND' as const,
    order: 13
  },
  {
    name: 'React Hook Form',
    description:
      'Minimizes re-renders and simplifies form validation through a performant, hook-based approach to handling user input.',
    type: 'FRONTEND' as const,
    order: 14
  },

  // Styling & UI
  {
    name: 'Tailwind CSS',
    description:
      'A utility-first CSS framework that allows for rapid UI development directly within markup, promoting consistency and speed.',
    type: 'STYLING' as const,
    order: 15
  },
  {
    name: 'Styled-Components',
    description:
      'A CSS-in-JS library that uses tagged template literals to style components, keeping styles scoped and tightly coupled with logic.',
    type: 'STYLING' as const,
    order: 16
  },
  {
    name: 'Material UI',
    description:
      'A comprehensive library of pre-designed React components following Material Design guidelines for a polished, professional look.',
    type: 'STYLING' as const,
    order: 17
  },
  {
    name: 'Storybook',
    description:
      'An isolated environment for developing UI components, serving as both a workshop for building and a documentation site for design systems.',
    type: 'STYLING' as const,
    order: 18
  },
  {
    name: 'SASS',
    description:
      'A CSS extension language that adds features like variables, nested rules, and mixins to make stylesheets more maintainable.',
    type: 'STYLING' as const,
    order: 19
  },

  // Backend & APIs
  {
    name: 'Prisma ORM',
    description:
      'An intuitive, type-safe database toolkit that simplifies database access and migrations with a clean, auto-generated API.',
    type: 'BACKEND' as const,
    order: 20
  },
  {
    name: 'Drizzle ORM',
    description:
      'A lightweight, "TypeScript-first" ORM designed for maximum performance and a thin abstraction layer over standard SQL.',
    type: 'BACKEND' as const,
    order: 21
  },
  {
    name: 'PostgreSQL',
    description:
      'A powerful, open-source object-relational database system known for its reliability, feature robustness, and performance.',
    type: 'BACKEND' as const,
    order: 22
  },
  {
    name: 'RESTful APIs',
    description:
      'Designing and implementing scalable web services based on representational state transfer, ensuring standard communication.',
    type: 'BACKEND' as const,
    order: 23
  },
  {
    name: 'OpenAPI/Swagger',
    description:
      'Creating standardized, interactive documentation for APIs, making them easier to consume and integrate for other developers.',
    type: 'BACKEND' as const,
    order: 24
  },

  // Testing & Tooling
  {
    name: 'Jest',
    description:
      'A delightful JavaScript testing framework with a focus on simplicity, used for unit and integration testing with built-in mocking.',
    type: 'TESTING' as const,
    order: 25
  },
  {
    name: 'Vitest',
    description:
      'A Vite-native unit testing framework that is extremely fast, leveraging the same configuration as the build tool for consistency.',
    type: 'TESTING' as const,
    order: 26
  },
  {
    name: 'Playwright',
    description:
      'A modern end-to-end testing library that enables reliable automation across Chromium, Firefox, and WebKit with a single API.',
    type: 'TESTING' as const,
    order: 27
  },
  {
    name: 'Cypress',
    description:
      'An all-in-one testing framework that provides a visual, interactive way to debug and test web applications in a real browser.',
    type: 'TESTING' as const,
    order: 28
  },
  {
    name: 'MSW',
    description:
      'An API mocking library that uses Service Workers to intercept network requests, allowing for seamless testing without a live backend.',
    type: 'TESTING' as const,
    order: 29
  },
  {
    name: 'NPM',
    description:
      'The worlds largest software registry, used to manage project dependencies and share reusable code modules.',
    type: 'TESTING' as const,
    order: 30
  },
  {
    name: 'Yarn',
    description:
      'A fast and secure alternative package manager that offers deterministic installs via a lockfile and optimized caching.',
    type: 'TESTING' as const,
    order: 31
  },

  // Cloud & DevOps
  {
    name: 'AWS S3',
    description:
      'A highly scalable object storage service used for hosting assets, user uploads, and static files with high durability.',
    type: 'DEVOPS' as const,
    order: 32
  },
  {
    name: 'AWS RDS',
    description:
      'A managed service that makes it easy to set up, operate, and scale relational databases (like Postgres or MySQL) in the cloud.',
    type: 'DEVOPS' as const,
    order: 33
  },
  {
    name: 'AWS API Gateway',
    description:
      'A fully managed service that allows developers to create, publish, maintain, and secure APIs at any scale.',
    type: 'DEVOPS' as const,
    order: 34
  },
  {
    name: 'AWS CloudFront',
    description:
      'A fast content delivery network (CDN) service that securely delivers data and APIs to users globally with low latency.',
    type: 'DEVOPS' as const,
    order: 35
  },
  {
    name: 'AWS CloudWatch',
    description:
      'A monitoring and observability service that provides data and actionable insights to track application health and performance.',
    type: 'DEVOPS' as const,
    order: 36
  },
  {
    name: 'Vercel',
    description:
      'A cloud platform optimized for frontend developers, providing seamless hosting for Next.js apps with automated deployments.',
    type: 'DEVOPS' as const,
    order: 37
  },

  // AI-Augmented Development
  {
    name: 'Claude Code',
    description:
      'An advanced AI-powered command-line tool and assistant that helps automate complex coding tasks and refactorings.',
    type: 'AI' as const,
    order: 38
  },
  {
    name: 'GitHub Copilot',
    description:
      'An AI pair programmer that provides real-time code suggestions and autocomplete, speeding up the development workflow.',
    type: 'AI' as const,
    order: 39
  },

  // Methodologies & Leadership
  {
    name: 'Agile',
    description:
      'Facilitating an iterative approach to development that prioritizes flexibility, customer feedback, and the rapid delivery of high-quality software.',
    type: 'METHODOLOGIES' as const,
    order: 40
  },
  {
    name: 'Scrum',
    description:
      'Implementing the Scrum framework to manage complex projects through sprints and retrospectives, ensuring team alignment and constant improvement.',
    type: 'METHODOLOGIES' as const,
    order: 41
  },
  {
    name: 'Kanban',
    description:
      'Optimizing workflow transparency and efficiency by visualizing tasks and maximizing the continuous flow of value to stakeholders.',
    type: 'METHODOLOGIES' as const,
    order: 42
  },
  {
    name: 'TDD',
    description:
      'Following a "test-first" philosophy to ensure high code coverage, reduce regressions, and produce cleaner, more maintainable architectural designs.',
    type: 'METHODOLOGIES' as const,
    order: 43
  },
  {
    name: 'CI/CD',
    description:
      'Automating the integration and deployment pipeline to ensure that code changes are released to production reliably and frequently.',
    type: 'METHODOLOGIES' as const,
    order: 44
  },
  {
    name: 'Mentorship',
    description:
      'Fostering the growth of developers through code reviews and pair programming to build a stronger, more autonomous engineering culture.',
    type: 'METHODOLOGIES' as const,
    order: 45
  },
  {
    name: 'Technical Leadership',
    description:
      'Guiding teams through complex architectural decisions, balancing business requirements with technical debt and high engineering standards.',
    type: 'METHODOLOGIES' as const,
    order: 46
  }
];
