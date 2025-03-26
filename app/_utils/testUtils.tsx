import { render } from '@testing-library/react';

export const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui);
};
