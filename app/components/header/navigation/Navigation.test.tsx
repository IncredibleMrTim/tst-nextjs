import { renderWithRouter, setupMockRouter } from '@/utils/testUtils';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import { MenuItems } from '@/store/navigation/types';
import Navigation, { NavDirection } from './Navigation';

jest.mock('@store/navigation/useNavigationStore', () => ({
  useNavigationStore: jest.fn(selector =>
    selector({
      menuItems: [
        { name: MenuItems.HOME, path: '/', isActive: false },
        { name: MenuItems.EXPERIENCE, path: '/experience', isActive: false },
        { name: MenuItems.SKILLS, path: '/skills', isActive: false }
      ],
      setActiveMenuItem: jest.fn(),
      setIsDrawerOpen: jest.fn()
    })
  )
}));

describe('Navigation', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    setupMockRouter({ push: mockPush });
  });

  it('calls handleNavigationClick when a menu item is clicked', async () => {
    renderWithRouter(<Navigation />);

    const menuItem = screen.getByText(MenuItems.HOME);
    await userEvent.click(menuItem);

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('should render the navigation vertically', () => {
    const { container } = renderWithRouter(
      <Navigation orientation={NavDirection.VERTICAL} />
    );

    expect(
      container.querySelector('[data-orientation=vertical]')
    ).toBeInTheDocument();
  });
});
