import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { experienceFilterReducer } from '@/store/experienceFilter/filterSlice';

/**
 * Renders with a fresh Redux store so each test starts from clean filter state.
 * The store is returned so tests can read or dispatch to it.
 */
export const renderWithStore = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: { experienceFilter: experienceFilterReducer }
  });

  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>)
  };
};
