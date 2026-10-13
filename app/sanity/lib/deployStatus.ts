// The deploy workflow (.github/workflows/deploy.yml) runs one job per
// environment, gated by an `if:` condition — a Sanity publish only ever
// executes the matching environment's job and skips the other, so the
// non-skipped job in a repository_dispatch run tells us which
// environment it deployed.
const GITHUB_API_ROOT = "https://api.github.com"
const REPO_OWNER = "IncredibleMrTim"
const REPO_NAME = "skim-reapers"
const DEPLOY_WORKFLOW_FILE = "deploy.yml"
const RUNS_TO_INSPECT = 10

export type DeployEnvironment = "dev" | "production"

export interface DeployStatus {
  environment: DeployEnvironment
  runUrl: string
  commitSha: string
  status: string
  conclusion: string | null
  startedAt: string
  completedAt: string | null
}

interface GithubWorkflowRun {
  html_url: string
  head_sha: string
  jobs_url: string
}

interface GithubWorkflowJob {
  name: string
  status: string
  conclusion: string | null
  started_at: string
  completed_at: string | null
}

async function fetchGithubJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  })
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("GitHub API rate limit exceeded — try again shortly.")
    }
    throw new Error(`GitHub API request failed (${response.status})`)
  }
  return response.json() as Promise<T>
}

/** The job that actually ran in a Sanity-triggered run — the other environment's job is always skipped. */
function findExecutedJob(jobs: GithubWorkflowJob[]): GithubWorkflowJob | undefined {
  return jobs.find((job) => job.conclusion !== "skipped")
}

function resolveEnvironment(jobName: string): DeployEnvironment | null {
  if (jobName.endsWith("(dev)")) return "dev"
  if (jobName.endsWith("(production)")) return "production"
  return null
}

function toDeployStatus(run: GithubWorkflowRun, job: GithubWorkflowJob, environment: DeployEnvironment): DeployStatus {
  return {
    environment,
    runUrl: run.html_url,
    commitSha: run.head_sha.slice(0, 7),
    status: job.status,
    conclusion: job.conclusion,
    startedAt: job.started_at,
    completedAt: job.completed_at,
  }
}

/**
 * Finds the most recent Sanity-triggered deploy (the repository_dispatch
 * events fired by the Sanity publish webhooks) for each environment, by
 * walking recent workflow runs newest-first and inspecting their jobs.
 * Stops as soon as both environments are resolved.
 */
export async function fetchLatestSanityDeployStatuses(): Promise<
  Record<DeployEnvironment, DeployStatus | null>
> {
  const runsUrl = `${GITHUB_API_ROOT}/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/${DEPLOY_WORKFLOW_FILE}/runs?event=repository_dispatch&per_page=${RUNS_TO_INSPECT}`
  const { workflow_runs: runs } = await fetchGithubJson<{ workflow_runs: GithubWorkflowRun[] }>(runsUrl)

  const statuses: Record<DeployEnvironment, DeployStatus | null> = { dev: null, production: null }

  for (const run of runs) {
    if (statuses.dev && statuses.production) break

    const { jobs } = await fetchGithubJson<{ jobs: GithubWorkflowJob[] }>(run.jobs_url)
    const executedJob = findExecutedJob(jobs)
    if (!executedJob) continue

    const environment = resolveEnvironment(executedJob.name)
    if (environment && !statuses[environment]) {
      statuses[environment] = toDeployStatus(run, executedJob, environment)
    }
  }

  return statuses
}
