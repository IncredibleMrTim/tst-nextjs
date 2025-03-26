import { DateVariant, formatDate } from './dateUtils';

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
