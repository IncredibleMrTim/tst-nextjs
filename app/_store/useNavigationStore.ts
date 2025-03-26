import { create } from 'zustand';

export enum MenuItems {
  HOME = 'Home',
  EXPERIENCE = 'Experience',
  SKILLS = 'Skills'
}

export type MenuItem = {
  name: MenuItems;
  path: string;
  isActive?: boolean;
};

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
    { name: MenuItems.SKILLS, path: '/skills' }
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
