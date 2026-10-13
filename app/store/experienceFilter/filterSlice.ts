import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const ALL_DECADES = 'all';

export interface ExperienceFilterState {
  skill: string | null;
  decade: string;
  /** Role the page should open and scroll to, set by links elsewhere on the page. */
  focusedExperienceId: string | null;
}

const initialState: ExperienceFilterState = {
  skill: null,
  decade: ALL_DECADES,
  focusedExperienceId: null
};

export const experienceFilterSlice = createSlice({
  name: 'experienceFilter',
  initialState,
  reducers: {
    setSkill: (state, action: PayloadAction<string | null>) => {
      state.skill = action.payload;
      state.decade = ALL_DECADES;
    },
    setDecade: (state, action: PayloadAction<string>) => {
      state.decade = action.payload;
    },
    focusExperience: (state, action: PayloadAction<string>) => {
      state.skill = null;
      state.decade = ALL_DECADES;
      state.focusedExperienceId = action.payload;
    },
    clearFocusedExperience: state => {
      state.focusedExperienceId = null;
    }
  }
});

export const { setSkill, setDecade, focusExperience, clearFocusedExperience } =
  experienceFilterSlice.actions;
export const experienceFilterReducer = experienceFilterSlice.reducer;
