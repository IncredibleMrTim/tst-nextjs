export enum DateVariant {
  Short = 'short',
  Long = 'long'
}

type DateInput = string | Date;

// Dates are stored as UTC midnights, so format in UTC. Local time would show
// the previous month to visitors west of UTC.
export const formatDate = (dateString: DateInput, variant?: DateVariant) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: variant === 'long' ? 'numeric' : undefined,
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  });
};

/**
 * Formats a role's span, e.g. "Feb 2024 – Mar 2025". A missing end date means
 * the role is current.
 */
export const formatDateRange = (
  fromDate: DateInput,
  toDate: DateInput | null
) => `${formatDate(fromDate)} – ${toDate ? formatDate(toDate) : 'Present'}`;

/**
 * Whole calendar months covered by a span, counting both the first and last
 * month (Jan to Jan is 1 month, Jan to Feb is 2).
 */
export const getMonthsBetween = (fromDate: DateInput, toDate: DateInput) => {
  const start = new Date(fromDate);
  const end = new Date(toDate);

  return (
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    end.getUTCMonth() -
    start.getUTCMonth() +
    1
  );
};

/**
 * Formats a number of months as "1 yr 2 mo", dropping any zero part.
 */
export const formatDuration = (months: number) => {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  return [
    years ? `${years} yr${years > 1 ? 's' : ''}` : '',
    remainingMonths ? `${remainingMonths} mo` : ''
  ]
    .filter(Boolean)
    .join(' ');
};
