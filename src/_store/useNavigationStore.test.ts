import { renderHook, act } from '@testing-library/react';
import { useNavigationStore, MenuItems } from './useNavigationStore';

describe('useNavigationStore', () => {
  it('should set the active menu item', () => {
    const { result } = renderHook(() => useNavigationStore());

    act(() => {
      result.current.setActiveMenuItem({
        name: MenuItems.EXPERIENCE,
        path: '/experience'
      });
    });

    const menuItems = result.current.menuItems;
    expect(
      menuItems.find(item => item.name === MenuItems.EXPERIENCE)?.isActive
    ).toBe(true);
    expect(menuItems.find(item => item.name === MenuItems.HOME)?.isActive).toBe(
      false
    );
    expect(
      menuItems.find(item => item.name === MenuItems.TECHNOLOGY)?.isActive
    ).toBe(false);
  });
});
