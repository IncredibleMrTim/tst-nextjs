# Tim Smart Technology — Project Setup

Personal portfolio and CV site for Tim Smart Technology Ltd (timsmarttechnology.co.uk). Next.js App Router, content in Postgres via Prisma, served through server actions.

## Working Style

Tim and Claude are a friendly team (BFFs, as of 2026-10-08): warm, personable, a bit of humour, empathy when something's frustrating. Substance stays sharp — be honest about problems, say what was and wasn't checked, keep replies short.

Critique Tim's ideas — a good friend says when something's a bad idea. Be kind: lead with what works, explain the concern and why, suggest an alternative, leave the call to Tim. Tim has feelings too.

## Stack

- Next.js 16 (App Router, Turbopack for both `dev` and `build`), React 19, TypeScript (`strict`), yarn (`packageManager: yarn@1.22.22`)
- Tailwind CSS v4 — theme lives in `app/globals.css`; `tailwind.config.js` is still present for shadcn
- Sora is bundled in `app/fonts/` and loaded with `next/font/local`, not `next/font/google`: Turbopack ignores `adjustFontFallback: false` for Google fonts, and the generated Arial fallback has wider arrow glyphs that shift the layout
- shadcn/ui (`new-york`, `components.json`) — components in `app/components/ui/`
- Postgres + Prisma 7 (`@prisma/adapter-pg`), schema in `prisma/schema.prisma`, client in `app/lib/prisma.ts`
- Redux Toolkit for client state (`app/store/`)
- Jest + React Testing Library + `@testing-library/user-event`
- Path aliases (`tsconfig.json`): `@/*` → `app/*`, plus `@components`, `@store`, `@utils`, `@actions`, `@api`

## Code Standards

### Formatting

Prettier is the source of truth (`.prettierrc`): single quotes, no trailing commas, `arrowParens: avoid`, semicolons on. Match it — don't reformat unrelated code.

### TypeScript & naming

- **NEVER use `any`** — use proper types or `unknown`. Keep `strict` passing.
- Prefer types derived from Prisma (`Prisma.SkillGetPayload<{}>`, `$Enums.SkillType`) over hand-written duplicates (precedent: `ExperienceWithSkills` in `experience.actions.ts`).
- Infer where obvious; explicit for component props and function signatures.
- Descriptive names, no abbreviations unless universal. Functions `verbNoun` (`getExperiences`, `formatDate`); booleans `is`/`has`/`should`; true constants `SCREAMING_SNAKE_CASE`; variables name their contents (`experiences`, `skillCategories` — not `data`, `d`, `res`).
- Components and their folders follow the existing layout: `app/components/<camelCaseFolder>/<PascalCase>.tsx`, shadcn primitives in `app/components/ui/<lowercase>.tsx`.

### Functions & components

- Small, single-purpose functions, max 50 lines; prefer pure; JSDoc on exported functions.
- Functional components as arrow functions with a default export (`const PageHeader = (...) => {...}; export default PageHeader;`). Files under 300 lines; props interface named `[ComponentName]Props`.
- Server Components by default; add `'use client'` only where state, effects or browser APIs are needed, and keep that boundary as low in the tree as possible.
- Extract complex logic to hooks/utilities (`app/utils/`) and large markup into their own components.
- Colocate tests as `[Name].test.tsx` next to the file. Use `userEvent` over `fireEvent`; use `renderHook` from `@testing-library/react`.

### Design system

- **Use shadcn components instead of writing your own**, with shadcn syntax — never Radix primitives directly. Add with `npx shadcn@latest add <component>`. Existing `@radix-ui/themes` usage (`Box`, `Flex`, `Container`, `Button`) is legacy; don't add more of it.
- Beyond shadcn, style with Tailwind utilities, not inline `style` objects. Reserve inline `style` for values that can't be static classes.
- Reuse theme tokens from `globals.css` — no hardcoded hex or repeated `var(--...)`. Add new tokens to the theme and map them into shadcn's so its components share the palette.
- Publicly hosted images and SVGs go in `public/` at the repo root.

### Data fetching

- Data comes from Prisma through server actions in `app/actions/<name>.actions.ts` (`'use server'`), wrapped in `unstable_cache` with a `revalidate` and `tags`. No Prisma calls in components or route handlers.
- Components load data via those actions — never hardcoded placeholder constants standing in for database content.
- Never log or commit sensitive data (API keys, `DATABASE_URL`, OAuth secrets, `NEXTAUTH_SECRET`). Secrets belong in `.env`, which is gitignored.

### Database safety

- `postinstall` runs `prisma migrate deploy` — **every install and deploy applies pending migrations to the database `DATABASE_URL` points at, which is the hosted one.** Treat adding a migration as shipping it.
- Never run `db:migrate`, `db:seed`, `db:reset` or any `prisma` command against that database without Tim's explicit OK in that conversation. Writing migration and seed files is fine; running them is Tim's call.
- Install and upgrade packages with `--ignore-scripts` (and `DATABASE_URL` pointed at a scratch database) so `postinstall` can't migrate the hosted database. Regenerate the client separately with `yarn prisma generate`.
- Stop dev servers by the PID you started, never `pkill -f "next dev"`: that matches Tim's own servers.

### Comments

- Comment WHY, not WHAT; document business logic and non-obvious decisions. No commented-out code (use git history).
- TODOs need context: `// TODO: <description>`. Tasks live on Trello, but card links go in commit bodies, not code (cards get renamed and archived).

## Structure

- `app/page.tsx` — the single-page design: hero, about, skills, selected work, experience, projects, contact. Each section is a component, so `app/(pages)/experience`, `/skills` and `/resume` reuse them as standalone routes (metadata in each `layout.tsx`, `loading.tsx` where it fetches).
- `app/actions/` — server actions (Prisma + `unstable_cache`), one file per entity: experience, profile, education, featuredWork, project, skillGroup.
- `app/components/` — UI, one folder per feature (`hero`, `about`, `skills`, `featuredWork`, `experience`, `projects`, `contact`, `header`, `footer`); `common/` has shared pieces (`Section`, `SectionHeading`, `TagList`); `ui/` is shadcn.
- `app/lib/` — `prisma.ts`, `companyLogos.ts` (logo key → files), `navigation.ts` (nav items, `CV_URL`), `content.ts`, `utils.ts` (`cn`).
- `app/hooks/` — shared hooks (`useActiveSection` drives the nav highlight).
- `app/store/` — Redux slices (`experienceFilter` shares the skill/decade filter between sections) and provider.
- `app/utils/` — pure helpers with colocated tests, plus `testFixtures.ts` and `renderWithStore.tsx` for tests.
- `public/images/logos/` — company logos, pre-sized for 1x/2x/3x screens. Rasters are used with plain `<img srcset>` on purpose: `next/image` would re-encode them lossily.
- `prisma/` — schema and migrations. `scripts/` — seed data and seed runners.

## Content

Site content lives in the database, seeded from `scripts/portfolioSeedData.ts` (taken from the CV). To change it, edit that file and re-run the seed — with Tim's OK, as it writes to the hosted database. Company logos need both a `logo` key on the role and an entry in `app/lib/companyLogos.ts`; a role without one shows its initials.

## Resources

Source assets and anything generated that isn't code (images, screenshots, PDFs, exports, social graphics) live in a resources folder **outside this repo**, not the Desktop, repo or a temp dir. Tell Tim the filename when you save something there.

<!-- TODO: confirm the resources folder path for this project with Tim — the Skim Reapers one (`.../TownSquareDigital/Skim Reapers/resources`) belongs to that project, so it isn't reused here. -->

## Browser Automation

**Default to Playwright MCP** (`mcp__plugin_playwright_playwright__*`) for page checks, flows, console/network and screenshots — snapshot-based (cheaper), no per-use confirmation. Always `browser_close` when done.

Claude in Chrome (`mcp__claude-in-chrome__*`) only when the task needs Tim's logged-in Chrome, and ask first — never open a tab automatically. Always `tabs_close_mcp` tabs you opened.

## Commands

- `yarn dev` — dev server
- `yarn build` — production build
- `yarn lint` — runs ESLint directly (`eslint.config.mjs`); `next lint` was removed in Next 16
- `yarn test` — Jest
- `yarn db:seed:portfolio` — writes the site content (roles, projects, profile, skills) from `scripts/portfolioSeedData.ts`. Idempotent: roles are matched on start date, so existing `description` text survives. Follow the database rules above before running it.
- `npx tsc --noEmit` — type-check

## Git & PR Workflow

Work on a feature branch and open a PR into `main` (history shows this: `Tst 4/...` branches merged as `(#44)`, with `.github/PULL_REQUEST_TEMPLATE.md`). Never push straight to `main`. When asked to commit/push/PR:

1. First run the CI-style checks: `yarn lint`, `npx tsc --noEmit`, `yarn test`, `yarn build`.
2. Commit on the feature branch, push, and open the PR with `gh pr create --base main`; fill in the PR template (description + screenshots for UI changes).

### Commits

- Conventional commits: `type(scope): description`. Types: `feature`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`.
- Atomic and focused. Message in lower case except the scope.
- Put the Trello card's short link in the body when the work belongs to one.

## Design & Planning

**Convention:** keep tool/MCP-specific detail in `docs/`, with only a pointer and a "read this when…" trigger here. Nothing in `docs/` yet — add it when a workflow needs it.
