import { render } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

const mockUseRouter = useRouter as jest.Mock;

export const setupMockRouter = (mockRouterValues = { push: jest.fn() }) => {
  mockUseRouter.mockReturnValue(mockRouterValues);
};

export const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui);
};
