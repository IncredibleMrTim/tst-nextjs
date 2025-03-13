import { render, screen } from '@testing-library/react';

import { MenuItems } from '@store/useNavigationStore';

import Navigation from './navigation/Navigation';

describe('Navigation', () => {
  it('renders navigation items', () => {
    render(<Navigation />);

    Object.values(MenuItems).forEach(item => {
      const linkElement = screen.getByText(item);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
