import {
  getDecade,
  getRoleMonths,
  getTimelineBounds,
  getTimelineSpan,
  getTimelineYears,
  getYearPercent,
  getExperiencesUsingSkill,
  getInitials,
  getSummaryBullets,
  getUniqueTechnologyCount,
  getYearsSince,
  isSkillUsedInExperience
} from './experienceUtils';

const buildExperience = (technologies: string[], summary: string | null) => ({
  technologies,
  summary
});

describe('getSummaryBullets', () => {
  it('should split markdown bullets into plain strings', () => {
    expect(getSummaryBullets('- First point\n- Second point')).toEqual([
      'First point',
      'Second point'
    ]);
  });

  it('should ignore blank lines and extra whitespace', () => {
    expect(getSummaryBullets('-   Spaced\n\n- Next  ')).toEqual([
      'Spaced',
      'Next'
    ]);
  });

  it('should return an empty list for a missing summary', () => {
    expect(getSummaryBullets(null)).toEqual([]);
  });
});

describe('getDecade', () => {
  it('should label the decade of a date', () => {
    expect(getDecade('2014-08-01')).toBe('2010s');
    expect(getDecade(new Date('2009-06-01'))).toBe('2000s');
  });

  it('should use UTC so a start of year is not pushed into the previous decade', () => {
    expect(getDecade(new Date('2020-01-01T00:00:00.000Z'))).toBe('2020s');
  });
});

describe('getInitials', () => {
  it('should use the first two words', () => {
    expect(getInitials('World Veterinary Services')).toBe('WV');
    expect(getInitials('Tauranga Electroplaters')).toBe('TE');
  });

  it('should skip words that do not start with a letter', () => {
    expect(getInitials('– Elanco Animal Health')).toBe('EA');
  });
});

describe('isSkillUsedInExperience', () => {
  it('should match a listed technology regardless of case', () => {
    expect(
      isSkillUsedInExperience(buildExperience(['React'], null), 'react')
    ).toBe(true);
  });

  it('should match a whole word in the summary', () => {
    expect(
      isSkillUsedInExperience(
        buildExperience([], '- Built with Storybook components'),
        'Storybook'
      )
    ).toBe(true);
  });

  it('should not match part of a longer word', () => {
    expect(
      isSkillUsedInExperience(
        buildExperience([], '- Migrated from AngularJS'),
        'Angular'
      )
    ).toBe(false);
  });

  it('should treat regex characters in a skill name literally', () => {
    expect(
      isSkillUsedInExperience(buildExperience(['Next.js'], null), 'Next.js')
    ).toBe(true);
    expect(
      isSkillUsedInExperience(buildExperience(['NextXjs'], null), 'Next.js')
    ).toBe(false);
  });
});

describe('getExperiencesUsingSkill', () => {
  it('should keep only the experiences that use the skill', () => {
    const react = buildExperience(['React'], null);
    const csharp = buildExperience(['C#'], null);

    expect(getExperiencesUsingSkill([react, csharp], 'React')).toEqual([react]);
  });
});

describe('getUniqueTechnologyCount', () => {
  it('should count each technology once across roles', () => {
    expect(
      getUniqueTechnologyCount([
        buildExperience(['React', 'SQL'], null),
        buildExperience(['React', 'C#'], null)
      ])
    ).toBe(3);
  });
});

describe('getYearsSince', () => {
  it('should return whole years since a date', () => {
    expect(getYearsSince('2009-06-01', new Date('2026-10-13'))).toBe(17);
  });
});

describe('timeline', () => {
  const now = new Date('2026-10-13');
  const bounds = getTimelineBounds(
    [
      { fromDate: new Date('2009-06-01') },
      { fromDate: new Date('2014-08-01') }
    ],
    now
  );

  it('should run from the start of the earliest year to the end of this month', () => {
    expect(bounds.start).toBe(Date.UTC(2009, 0, 1));
    expect(bounds.end).toBe(Date.UTC(2026, 10, 1));
  });

  it('should place a closed role with an inclusive end month', () => {
    const { left, width } = getTimelineSpan(
      { fromDate: new Date('2009-01-01'), toDate: new Date('2025-12-01') },
      bounds
    );

    expect(left).toBe(0);
    // The role covers 2009-01-01 up to (not including) 2026-01-01
    const expectedWidth =
      ((Date.UTC(2026, 0, 1) - bounds.start) / (bounds.end - bounds.start)) *
      100;
    expect(width).toBeCloseTo(expectedWidth, 5);
  });

  it('should run a current role to the end of the timeline', () => {
    const { left, width } = getTimelineSpan(
      { fromDate: new Date('2026-07-01'), toDate: null },
      bounds
    );

    expect(left + width).toBeCloseTo(100, 5);
  });

  it('should keep very short roles visible', () => {
    const { width } = getTimelineSpan(
      { fromDate: new Date('2020-01-01'), toDate: new Date('2020-01-01') },
      bounds
    );

    expect(width).toBeGreaterThanOrEqual(0.4);
  });

  it('should label every fourth year from the start', () => {
    expect(getTimelineYears(bounds)).toEqual([2009, 2013, 2017, 2021, 2025]);
  });

  it('should position a year along the axis', () => {
    expect(getYearPercent(2009, bounds)).toBe(0);
    expect(getYearPercent(2025, bounds)).toBeGreaterThan(0);
    expect(getYearPercent(2025, bounds)).toBeLessThan(100);
  });
});

describe('getRoleMonths', () => {
  it('should count a closed role by its dates', () => {
    expect(
      getRoleMonths({
        fromDate: new Date('2025-09-01'),
        toDate: new Date('2025-11-01')
      })
    ).toBe(3);
  });

  it('should count a current role up to now', () => {
    expect(
      getRoleMonths(
        { fromDate: new Date('2026-07-01'), toDate: null },
        new Date('2026-10-13')
      )
    ).toBe(4);
  });
});
