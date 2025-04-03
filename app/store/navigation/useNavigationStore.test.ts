import { renderHook, act } from '@testing-library/react';
import { MenuItems } from './types';
import { useNavigationStore } from './useNavigationStore';

describe('useNavigationStore', () => {
  it('should set the active menu item', () => {
    const { result } = renderHook(() => useNavigationStore());

    act(() => {
      result.current.setActiveMenuItem({
        name: MenuItems.EXPERIENCE,
        path: '/experience'
      });
    });

    const { menuItems } = result.current;
    expect(
      menuItems.find(item => item.name === MenuItems.EXPERIENCE)?.isActive
    ).toBe(true);
    expect(menuItems.find(item => item.name === MenuItems.HOME)?.isActive).toBe(
      false
    );
    expect(
      menuItems.find(item => item.name === MenuItems.SKILLS)?.isActive
    ).toBe(false);
  });

  it('should toggle the drawer state', () => {
    const { result } = renderHook(() => useNavigationStore());

    act(() => {
      result.current.setIsDrawerOpen(true);
    });

    expect(result.current.isDrawerOpen).toBe(true);

    act(() => {
      result.current.setIsDrawerOpen(false);
    });

    expect(result.current.isDrawerOpen).toBe(false);
  });
});
