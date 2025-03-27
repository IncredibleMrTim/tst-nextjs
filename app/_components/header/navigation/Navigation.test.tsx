import { renderWithRouter, setupMockRouter } from '@utils/testUtils';
import { screen } from '@testing-library/react';
import { MenuItems } from '@store/useNavigationStore';
import Navigation from './Navigation';

describe('Navigation', () => {
  beforeEach(() => {
    setupMockRouter({ push: jest.fn() });
  });

  it('renders navigation items', () => {
    renderWithRouter(<Navigation />);

    Object.values(MenuItems).forEach(item => {
      const linkElement = screen.getByText(item);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
