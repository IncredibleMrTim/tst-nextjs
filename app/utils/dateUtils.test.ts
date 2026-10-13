import {
  DateVariant,
  formatDate,
  formatDateRange,
  formatDuration,
  getMonthsBetween
} from './dateUtils';

describe('formatDate', () => {
  it('should format date in short variant', () => {
    const date = '2025-03-26';
    const formattedDate = formatDate(date, DateVariant.Short);
    expect(formattedDate).toBe('Mar 2025');
  });

  it('should format date in long variant', () => {
    const date = '2025-03-26';
    const formattedDate = formatDate(date, DateVariant.Long);
    expect(formattedDate).toBe('26 Mar 2025');
  });

  it('should format Date object in short variant', () => {
    const date = new Date('2025-03-26');
    const formattedDate = formatDate(date, DateVariant.Short);
    expect(formattedDate).toBe('Mar 2025');
  });

  it('should format Date object in long variant', () => {
    const date = new Date('2025-03-26');
    const formattedDate = formatDate(date, DateVariant.Long);
    expect(formattedDate).toBe('26 Mar 2025');
  });

  it('should handle invalid date string', () => {
    const date = 'invalid-date';
    const formattedDate = formatDate(date, DateVariant.Short);
    expect(formattedDate).toBe('Invalid Date');
  });

  it('should handle invalid Date object', () => {
    const date = new Date('invalid-date');
    const formattedDate = formatDate(date, DateVariant.Short);
    expect(formattedDate).toBe('Invalid Date');
  });

  it('should format date with undefined variant as short', () => {
    const date = '2025-03-26';
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('Mar 2025');
  });
});

describe('formatDateRange', () => {
  it('should format a closed range', () => {
    expect(formatDateRange('2024-02-01', '2025-03-01')).toBe(
      'Feb 2024 – Mar 2025'
    );
  });

  it('should show Present when there is no end date', () => {
    expect(formatDateRange(new Date('2026-07-01'), null)).toBe(
      'Jul 2026 – Present'
    );
  });
});

describe('getMonthsBetween', () => {
  it('should count both the first and last month', () => {
    expect(getMonthsBetween('2025-01-01', '2025-01-01')).toBe(1);
    expect(getMonthsBetween('2025-01-01', '2025-02-01')).toBe(2);
  });

  it('should span years', () => {
    expect(getMonthsBetween('2024-02-01', '2025-03-01')).toBe(14);
  });
});

describe('formatDuration', () => {
  it('should show months only under a year', () => {
    expect(formatDuration(3)).toBe('3 mo');
  });

  it('should show whole years without months', () => {
    expect(formatDuration(12)).toBe('1 yr');
    expect(formatDuration(24)).toBe('2 yrs');
  });

  it('should show years and months together', () => {
    expect(formatDuration(14)).toBe('1 yr 2 mo');
    expect(formatDuration(88)).toBe('7 yrs 4 mo');
  });
});
