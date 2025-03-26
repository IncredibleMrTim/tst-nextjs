import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { MenuItems } from '@store/useNavigationStore';
import Navigation from './Navigation';
import { renderWithRouter } from '@utils/testUtils';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

const mockUseRouter = useRouter as jest.Mock;

describe('Navigation', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: jest.fn()
    });
  });

  it('renders navigation items', () => {
    renderWithRouter(<Navigation />);

    Object.values(MenuItems).forEach(item => {
      const linkElement = screen.getByText(item);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
