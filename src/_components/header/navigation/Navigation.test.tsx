import { MenuItems, useNavigationStore } from '@store/useNavigationStore';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation from './Navigation';

jest.mock('@store/useNavigationStore', () => ({
  ...jest.requireActual('@store/useNavigationStore'),
  useNavigationStore: jest.fn()
}));

describe('Navigation', () => {
  let setActiveMenuItem = jest.fn();

  const mockMenuItems = [
    { name: MenuItems.HOME, path: '/' },
    { name: MenuItems.EXPERIENCE, path: '/experience' },
    { name: MenuItems.TECHNOLOGY, path: '/technology' }
  ];

  beforeEach(() => {
    (useNavigationStore as unknown as jest.Mock).mockImplementation(selector =>
      selector({
        menuItems: mockMenuItems,

        setActiveMenuItem
      })
    );
  });

  it('renders navigation items', () => {
    render(<Navigation />);

    Object.values(MenuItems).forEach(item => {
      const linkElement = screen.getByText(item);
      expect(linkElement).toBeInTheDocument();
    });
  });

  it('should handle the menu item click', async () => {
    render(<Navigation />);

    const linkElement = screen.getByText(MenuItems.HOME);
    await userEvent.click(linkElement);

    expect(setActiveMenuItem).toHaveBeenCalledWith(mockMenuItems[0]);
  });
});
