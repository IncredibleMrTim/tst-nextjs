export const experienceData = [
  {
    role: 'Senior Full Stack Engineer',
    company: 'World Veterinary Services',
    location: 'Remote',
    summary: `- Brought in as a replacement engineer to complete a partially delivered internal portal and API.
- Redesigned and rebuilt an incomplete PostgreSQL database, producing a new ERD and restructuring the API accordingly.
- Delivered a production-ready API supporting a React Native application.
- Developed a secure Next.js admin portal using server actions for both internal and external API consumption.
- Collaborated with distributed mobile teams and stakeholders to ensure alignment and successful delivery.
- Delivered the full solution ahead of schedule within a two-month timeframe.`,
    description: `I was contracted by WVS as a replacement developer to complete an internal portal and API.  When I arrived at WVS, my predecessor had partially implemented an API to server a React Native application.  I was tasked with completing this API and developing an admin portal to manage content.

On working on the API I soon discovered that the PostgresSQL DB was not complete and required re-designing.  On creating the new ERD and implementing it, I then updated the API to fit the new DB structure.

I developed an admin portal using NextJS with server actions exposed internally to serve the admin portal as actions and externally as HTTP requests to serve client-based applications such as the React Native app.

I was given 2 months to complete the task and arrived at a production ready application and API ahead of time while working with a distributed React Native team and stakeholders to ensure the API and Portal was fit for purpose.`,
    fromDate: new Date('2025-11-01'),
    toDate: new Date('2025-12-31'),
    order: 11,
    skills: [
      { name: 'React', order: 1 },
      { name: 'Next.js', order: 2 },
      { name: 'TypeScript', order: 3 },
      { name: 'Prisma ORM', order: 4 },
      { name: 'PostgreSQL', order: 5 },
      { name: 'Tailwind CSS', order: 6 },
      { name: 'Jest', order: 7 },
      { name: 'OpenAPI/Swagger', order: 8 },
      { name: 'Vercel', order: 9 }
    ]
  },
  {
    role: 'Senior Frontend Engineer',
    company: 'Premium Training Services',
    location: 'Remote',
    summary: `- Played a key role in migrating a legacy platform to a modern, scalable architecture.
- Designed and implemented a four-layer frontend architecture using React Query, Axios, MSW, and REST APIs.
- Built a mock backend using MSW to decouple tightly coupled IndexedDB logic.
- Refactored legacy code and modernised testing infrastructure.
- Improved maintainability, performance, and developer experience across the application.`,
    description: `Acted as a key technical driver in planning and executing the migration of PTS’s legacy system to a modern, scalable architecture.
Took ownership of critical technical decisions, selecting and implementing technologies that improved performance, maintainability, and developer experience. Redeveloped major parts of the application to align with modern design patterns and best practices.

Designed and implemented a four-layer architecture leveraging React Query, Axios, MSW, and a RESTful API, supported by in-house debugging tools and an OpenAPI/Swagger interface. Addressed the challenges of working with IndexedDB by developing a mock backend using MSW, successfully decoupling complex, tightly bound system layers.

Day-to-day work involved implementing the new architecture, refactoring unit tests, and developing new features within the modernized system.`,
    fromDate: new Date('2025-09-01'),
    toDate: new Date('2025-11-30'),
    order: 10,
    skills: [
      { name: 'React', order: 1 },
      { name: 'TypeScript', order: 2 },
      { name: 'Vite', order: 3 },
      { name: 'Vitest', order: 4 },
      { name: 'React Query (TanStack)', order: 5 },
      { name: 'Tailwind CSS', order: 6 },
      { name: 'Drizzle ORM', order: 7 },
      { name: 'MSW', order: 8 }
    ]
  },
  {
    role: 'Senior Frontend Engineer',
    company: 'AstraZeneca',
    location: 'Remote',
    summary: `- Developed an internal analytics tool supporting Monte Carlo modelling for asset combination decisions.
- Led migration from Webpack/Jest to Vite/Vitest.
- Replaced Styled-Components with Tailwind CSS to standardise frontend stack.
- Contributed to Frontend Working Group, defining best practices across the Connected Insights division.
- Integrated shared design systems and enhanced testing and development workflows.`,
    description: `Developed and maintained an internal management tool for decision-makers, enabling analysis of asset combinations using Monte Carlo algorithms. Spearheaded migration from Webpack/Jest to Vite/Vitest and Styled-Components to Tailwind CSS, aligning the tech stack across teams.
    
Actively contributed to the FE Working Group, standardizing frontend best practices within the Connected Insights group. Led the integration of a common design system to ensure consistency across applications, working closely with UX teams to refine user experiences. Expanded responsibilities beyond frontend development, integrating with other teams, driving agile processes, improving working practices, and enhancing testing strategies.`,
    fromDate: new Date('2024-02-01'),
    toDate: new Date('2025-03-31'),
    order: 9,
    skills: [
      { name: 'React', order: 1 },
      { name: 'TypeScript', order: 2 },
      { name: 'Vite', order: 3 },
      { name: 'Vitest', order: 4 },
      { name: 'React Query (TanStack)', order: 5 },
      { name: 'Tailwind CSS', order: 6 }
    ]
  },
  {
    role: 'Senior Frontend UI Engineer',
    company: 'Santander Auto',
    location: 'Remote',
    summary: `- Delivered customer-facing operational tools to resolve validation errors within internal systems.
- Gathered requirements and worked closely with stakeholders and product owners.
- Coordinated frontend and backend teams in Agile/Kanban ceremonies.
- Improved accessibility, SEO, and component structure within React applications.`,
    description: `As a key member of the Customer team, I played a pivotal role in developing customer-centric features and resolving reported issues. Spearheaded the creation of an innovative customer operations feature, utilizing React, React Query, TypeScript, React Hook Forms, and Tailwind. This feature empowered the service team to rectify data validation errors from our in-house validation system, OCS.`,
    fromDate: new Date('2023-07-01'),
    toDate: new Date('2023-11-30'),
    order: 8,
    skills: [
      { name: 'React', order: 1 },
      { name: 'TypeScript', order: 2 },
      { name: 'React Query (TanStack)', order: 3 },
      { name: 'Tailwind CSS', order: 4 },
      { name: 'Vite', order: 5 }
    ]
  },
  {
    role: 'Lead Frontend UI Engineer',
    company: 'Coyote Software',
    location: 'Remote',
    summary: `- Led migration of enterprise platform from AngularJS to React.
- Managed daily stand-ups and frontend delivery planning.
- Built a standalone component library using React and Storybook.
- Developed early-stage Next.js proof of concept prior to company acquisition.
- Mentored developers and established frontend standards.`,
    description: `As the Lead Frontend UI Engineer at Coyote Software, I led the team and successfully migrated the platform from AngularJS to ReactJS. Managed daily stand-ups, communicated project status, and developed a standalone component library using ReactJS, TypeScript, and Storybook.

Started developing POC in Next.JS before the company was bought out.  Early-stage development focused on technology analysis and project MVP starting with the main property asset page.`,
    fromDate: new Date('2022-06-01'),
    toDate: new Date('2023-07-31'),
    order: 7,
    skills: [
      { name: 'React', order: 1 },
      { name: 'TypeScript', order: 2 },
      { name: 'Next.js', order: 3 },
      { name: 'Redux', order: 4 },
      { name: 'Material UI', order: 5 },
      { name: 'Storybook', order: 6 }
    ]
  },
  {
    role: 'Senior Frontend React Developer',
    company: 'MDRxTech',
    location: 'Remote',
    summary: `- Delivered CSX Carbon Capture project using React, TypeScript, Redux, AWS, and PostgreSQL.
- Provided architectural consultation and Agile process improvements.
- Worked with AWS services including CloudFront, S3, RDS, API Gateway, and Amplify.`,
    fromDate: new Date('2022-01-01'),
    toDate: new Date('2022-06-30'),
    order: 6,
    skills: [
      { name: 'React', order: 1 },
      { name: 'TypeScript', order: 2 },
      { name: 'Redux', order: 3 },
      { name: 'AWS S3', order: 4 },
      { name: 'AWS RDS', order: 5 },
      { name: 'AWS CloudFront', order: 6 },
      { name: 'AWS API Gateway', order: 7 }
    ]
  },
  {
    role: 'Frontend React Developer',
    company: 'Office of National Statistics',
    location: 'Remote',
    summary: `- Developed accessible search functionality using React and Go templates.
- Ensured WCAG compliance.
- Contributed within Scrum-based delivery cycles.`,
    fromDate: new Date('2021-12-01'),
    toDate: new Date('2022-01-31'),
    order: 5,
    skills: [
      { name: 'React', order: 1 },
      { name: 'CSS3', order: 2 },
      { name: 'Jest', order: 3 },
      { name: 'SQL', order: 4 },
      { name: 'NPM', order: 5 },
      { name: 'RESTful APIs', order: 6 }
    ]
  },
  {
    role: 'Senior Frontend Software Engineer',
    company: 'LexisNexis Risk Solutions',
    location: 'Remote',
    summary: `- Delivered multiple telematics and risk management platforms.
- Built web portals using React, TypeScript, and Material UI.
- Developed mobile applications using React Native.
- Created reusable component libraries with Storybook.
- Transitioned from C# backend development into senior frontend engineering role.
- Collaborated with international teams across the US, Brazil, Spain, and Vietnam.`,
    description: `Worked across multiple projects in the LexisNexis group including Telematics and Commercial Real Estate Risk.  Developed applications end to end using React, React Hooks, Material UI, Typescript and various other frontend-based technologies.  Worked as part of an agile team through each step of task identification, estimating and planning.`,
    fromDate: new Date('2014-08-01'),
    toDate: new Date('2021-11-30'),
    order: 4,
    skills: [
      { name: 'React', order: 1 },
      { name: 'TypeScript', order: 2 },
      { name: 'C#', order: 3 },
      { name: 'SQL', order: 4 },
      { name: 'Material UI', order: 5 },
      { name: 'CSS3', order: 6 },
      { name: 'SASS', order: 7 },
      { name: 'Styled-Components', order: 8 },
      { name: 'Storybook', order: 9 },
      { name: 'Jest', order: 10 },
      { name: 'NPM', order: 11 },
      { name: 'RESTful APIs', order: 12 }
    ]
  },
  {
    role: 'Software Engineer',
    company: 'DBT Ltd',
    location: 'Remote',
    summary: `- Led development of Windows Smart Clients, dashboards, CRM and asset management systems.
- Worked across C#, MVC, jQuery, SQL, and web technologies.`,
    fromDate: new Date('2012-04-01'),
    toDate: new Date('2014-09-30'),
    order: 3,
    skills: [
      { name: 'React', order: 1 },
      { name: 'C#', order: 2 },
      { name: 'SQL', order: 3 },
      { name: 'CSS3', order: 4 },
      { name: 'Jest', order: 5 },
      { name: 'NPM', order: 6 },
      { name: 'RESTful APIs', order: 7 }
    ]
  },
  {
    role: 'Frontend Developer',
    company: 'MAD Productions Ltd',
    location: 'Remote',
    summary: `- Built e-commerce platforms and CMS systems.
- Improved system performance and client delivery processes.`,
    fromDate: new Date('2011-04-01'),
    toDate: new Date('2012-07-31'),
    order: 2,
    skills: [
      { name: 'C#', order: 1 },
      { name: 'JavaScript (ES6+)', order: 2 },
      { name: 'SQL', order: 3 },
      { name: 'CSS3', order: 4 },
      { name: 'Jest', order: 5 },
      { name: 'NPM', order: 6 },
      { name: 'RESTful APIs', order: 7 }
    ]
  },
  {
    role: 'Junior Developer',
    company: 'Webree Ltd',
    location: 'Remote',
    summary: `- Developed CRM/CMS-integrated web applications.
- Integrated internal systems with third-party platforms.`,
    fromDate: new Date('2009-06-01'),
    toDate: new Date('2011-03-31'),
    order: 1,
    skills: [
      { name: 'C#', order: 1 },
      { name: 'JavaScript (ES6+)', order: 2 },
      { name: 'SQL', order: 3 },
      { name: 'CSS3', order: 4 },
      { name: 'NPM', order: 5 },
      { name: 'RESTful APIs', order: 6 }
    ]
  }
];
