import {
  ALL_DECADES,
  clearFocusedExperience,
  experienceFilterReducer,
  focusExperience,
  setDecade,
  setSkill,
  type ExperienceFilterState
} from './filterSlice';

const buildState = (
  overrides: Partial<ExperienceFilterState> = {}
): ExperienceFilterState => ({
  skill: null,
  decade: ALL_DECADES,
  focusedExperienceId: null,
  ...overrides
});

describe('experienceFilterReducer', () => {
  it('should start with no filters', () => {
    expect(experienceFilterReducer(undefined, { type: 'unknown' })).toEqual(
      buildState()
    );
  });

  it('should set the skill and reset the decade filter', () => {
    const state = experienceFilterReducer(
      buildState({ decade: '2010s' }),
      setSkill('React')
    );

    expect(state.skill).toBe('React');
    expect(state.decade).toBe(ALL_DECADES);
  });

  it('should clear the skill', () => {
    const state = experienceFilterReducer(
      buildState({ skill: 'React' }),
      setSkill(null)
    );

    expect(state.skill).toBeNull();
  });

  it('should set the decade', () => {
    expect(
      experienceFilterReducer(buildState(), setDecade('2010s')).decade
    ).toBe('2010s');
  });

  it('should focus a role and clear any filters hiding it', () => {
    const state = experienceFilterReducer(
      buildState({ skill: 'React', decade: '2010s' }),
      focusExperience('role-1')
    );

    expect(state).toEqual(buildState({ focusedExperienceId: 'role-1' }));
  });

  it('should clear the focused role once handled', () => {
    const state = experienceFilterReducer(
      buildState({ focusedExperienceId: 'role-1' }),
      clearFocusedExperience()
    );

    expect(state.focusedExperienceId).toBeNull();
  });
});
