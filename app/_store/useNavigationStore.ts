import { create } from 'zustand';
import { getCurrentUrlPath } from '@utils/browserUtils';

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
  isDrawerOpen: boolean;

  setActiveMenuItem: (menuItem: MenuItem) => void;
  setIsDrawerOpen: (isOpen: boolean) => void;
}

export const useNavigationStore = create<NavigationStore>(set => ({
  menuItems: [
    { name: MenuItems.HOME, path: '/', isActive: getCurrentUrlPath('/') },
    {
      name: MenuItems.EXPERIENCE,
      path: '/experience',
      isActive: getCurrentUrlPath('/experience')
    },
    {
      name: MenuItems.TECHNOLOGY,
      path: '/technology',
      isActive: getCurrentUrlPath('/technology')
    }
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
