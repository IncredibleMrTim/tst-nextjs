# Sanity integration (work in progress)

Project `s4buasyp` ("Tim Smart Technology"), dataset `production` (public reads, empty).
Env vars live in `.env.local` (gitignored) and must also be set on the host.

## Done
- Packages installed (`next-sanity` 13, `sanity` 6, `@sanity/client`, `@sanity/vision`, `styled-components`, dev `groq-js`).
- Site moved into the `app/(site)` route group (layout, page, `(pages)`), paths fixed. Not yet rebuilt after the move.
- `app/sanity/env.ts`, `client.ts`, `fetch.ts` (tagged, cached fetch helper).
- `.env.example`, `.env.local`.

## Still to do
1. `(admin)` route group: own root layout, `admin/[[...tool]]/page.tsx` + client `NextStudio` wrapper.
2. `sanity.config.ts` + `sanity.cli.ts` (typegen), `app/sanity/schemaTypes` (profile singleton, experience, project, featuredWork, education, skillGroup), `structure.ts`.
3. GROQ queries (`app/sanity/queries.ts`), then swap the Prisma-backed `app/actions/*` for Sanity fetches (drop `'use server'`, use `server-only`); `summary` becomes `string[]`, update components/fixtures/tests.
4. `scripts/seed.sanity.ts` from `scripts/portfolioSeedData.ts` (NDJSON export for `sanity dataset import`, or token write).
5. `app/api/revalidate/route.ts` (`parseBody` + `revalidateTag(type, 'max')`) and the publish webhook in manage.sanity.io; add CORS origins.
6. Verify queries with `groq-js`, run build/lint/tests, update `CLAUDE.md`.

Install packages with `--ignore-scripts --ignore-engines` (see CLAUDE.md database safety).
