import { create } from 'zustand';
import { MenuItem, MenuItems } from './types';

export interface NavigationStore {
  menuItems: MenuItem[];
  isDrawerOpen: boolean;

  setActiveMenuItem: (menuItem: MenuItem) => void;
  setIsDrawerOpen: (isOpen: boolean) => void;
}

export const useNavigationStore = create<NavigationStore>(set => ({
  menuItems: [
    { name: MenuItems.HOME, path: '/' },
    { name: MenuItems.EXPERIENCE, path: '/experience' },
    { name: MenuItems.SKILLS, path: '/skills' },
    { name: MenuItems.RESUME, path: '/resume' }
  ],
  isDrawerOpen: false,

  setActiveMenuItem: menuItem => {
    set(state => ({
      menuItems: state.menuItems.map(item => ({
        ...item,
        isActive: item.name === menuItem.name
      }))
    }));
  },
  setIsDrawerOpen: isOpen => set({ isDrawerOpen: isOpen })
}));
