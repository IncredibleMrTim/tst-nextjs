import { type Experience } from '@/actions/experience.actions';
import { getMonthsBetween } from './dateUtils';

type DateInput = string | Date;

type SkillSearchable = Pick<Experience, 'technologies' | 'summary'>;

/**
 * Splits a markdown bullet list ("- one\n- two") into plain strings.
 */
export const getSummaryBullets = (summary: string | null): string[] =>
  (summary ?? '')
    .split('\n')
    .map(line => line.replace(/^\s*-\s*/, '').trim())
    .filter(Boolean);

/**
 * Groups a date into its decade label, e.g. 2014-08-01 becomes "2010s".
 */
export const getDecade = (date: DateInput) =>
  `${Math.floor(new Date(date).getUTCFullYear() / 10) * 10}s`;

/**
 * Two-letter fallback shown in place of a company logo.
 */
export const getInitials = (company: string) =>
  company
    .split(/\s+/)
    .filter(word => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join('');

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');

/**
 * A role uses a skill when it is listed in the role's technologies, or named
 * as a whole word in its summary (e.g. "React" within a bullet).
 */
export const isSkillUsedInExperience = (
  experience: SkillSearchable,
  skill: string
) => {
  const skillName = skill.toLowerCase();
  const isListed = experience.technologies.some(
    technology => technology.toLowerCase() === skillName
  );

  if (isListed) return true;

  const wholeWord = new RegExp(`(?<![\\w])${escapeRegExp(skillName)}(?![\\w])`);
  return wholeWord.test((experience.summary ?? '').toLowerCase());
};

export const getExperiencesUsingSkill = <T extends SkillSearchable>(
  experiences: T[],
  skill: string
): T[] =>
  experiences.filter(experience => isSkillUsedInExperience(experience, skill));

export const getUniqueTechnologyCount = (experiences: SkillSearchable[]) =>
  new Set(experiences.flatMap(experience => experience.technologies)).size;

/**
 * Full years since the earliest role began.
 */
export const getYearsSince = (date: DateInput, now: Date = new Date()) =>
  Math.floor(getMonthsBetween(date, now) / 12);

export interface TimelineBounds {
  start: number;
  end: number;
}

type RoleDates = Pick<Experience, 'fromDate' | 'toDate'>;

/**
 * The career timeline runs from 1 January of the earliest start year to the
 * end of the current month.
 */
export const getTimelineBounds = (
  experiences: Pick<Experience, 'fromDate'>[],
  now: Date = new Date()
): TimelineBounds => {
  const earliestStart = Math.min(
    ...experiences.map(experience => new Date(experience.fromDate).getTime())
  );

  return {
    start: Date.UTC(new Date(earliestStart).getUTCFullYear(), 0, 1),
    end: Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)
  };
};

const getTimelinePercent = (time: number, { start, end }: TimelineBounds) =>
  ((time - start) / (end - start)) * 100;

// Keeps very short roles visible as a sliver rather than vanishing
const MIN_SPAN_PERCENT = 0.4;

/**
 * Position of a role along the timeline as percentages of its width. The end
 * month is inclusive, and a role with no end date runs to the end of the timeline.
 */
export const getTimelineSpan = (
  experience: RoleDates,
  bounds: TimelineBounds
) => {
  const startTime = new Date(experience.fromDate).getTime();
  const endDate = experience.toDate ? new Date(experience.toDate) : null;
  const endTime = endDate
    ? Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth() + 1, 1)
    : bounds.end;
  const left = getTimelinePercent(startTime, bounds);

  return {
    left,
    width: Math.max(
      getTimelinePercent(endTime, bounds) - left,
      MIN_SPAN_PERCENT
    )
  };
};

/**
 * Years to label along the timeline axis, every `step` years from the start.
 */
export const getTimelineYears = (bounds: TimelineBounds, step = 4) => {
  const years: number[] = [];
  const startYear = new Date(bounds.start).getUTCFullYear();

  for (let year = startYear; Date.UTC(year, 0, 1) < bounds.end; year += step) {
    years.push(year);
  }

  return years;
};

export const getYearPercent = (year: number, bounds: TimelineBounds) =>
  getTimelinePercent(Date.UTC(year, 0, 1), bounds);

/**
 * Months spent in a role; a current role counts up to `now`.
 */
export const getRoleMonths = (experience: RoleDates, now: Date = new Date()) =>
  getMonthsBetween(experience.fromDate, experience.toDate ?? now);
