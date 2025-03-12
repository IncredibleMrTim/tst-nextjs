import { create } from 'zustand';

export enum MenuItems {
  HOME = 'Home',
  EXPERIENCE = 'Experience',
  TECHNOLOGY = 'Technology'
}

export type MenuItem = {
  name: MenuItems;
  path: string;
  isActive?: boolean;
};

export interface NavigationStore {
  menuItems: MenuItem[];
  setActiveMenuItem: (menuItem: MenuItem) => void;
}

export const useNavigationStore = create<NavigationStore>(set => ({
  activeMenuItem: MenuItems.HOME,
  menuItems: [
    { name: MenuItems.HOME, path: '/' },
    { name: MenuItems.EXPERIENCE, path: '/experience' },
    { name: MenuItems.TECHNOLOGY, path: '/technology' }
  ],

  setActiveMenuItem: menuItem => {
    set(state => ({
      menuItems: state.menuItems.map(item => ({
        ...item,
        isActive: item.name === menuItem.name
      }))
    }));
  }
}));
