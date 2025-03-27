'use client';

import { NavigationMenu } from 'radix-ui';
import { useRouter } from 'next/navigation';

import { useNavigationStore } from '@store/navigation/useNavigationStore';
import { MenuItem } from '@store/navigation/types';

import NavButton from './NavigationButton';

export enum NavDirection {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export interface NavigationProps {
  orientation?: NavDirection;
}

const Navigation = ({
  orientation = NavDirection.HORIZONTAL
}: NavigationProps) => {
  const router = useRouter();
  const menuItems = useNavigationStore(state => state.menuItems);

  const setActiveMenuItem = useNavigationStore(
    state => state.setActiveMenuItem
  );
  const setIsDrawerOpen = useNavigationStore(state => state.setIsDrawerOpen);

  const handleNavigationClick = (menuItem: MenuItem) => {
    setActiveMenuItem(menuItem);
    setIsDrawerOpen(false);
    router.push(menuItem.path);
  };

  const navVertical = 'flex flex-col';
  const navHorizontal = 'flex flex-row justify-center divide-slate-200 pb-1';

  return (
    <NavigationMenu.Root
      orientation={orientation}
      className="flex justify-start text-xl"
    >
      <NavigationMenu.List className="flex">
        <NavigationMenu.Item
          className={`${orientation === NavDirection.HORIZONTAL ? navHorizontal : navVertical}`}
        >
          {menuItems.map(menuItem => (
            <NavButton
              key={menuItem.name}
              menuItem={menuItem}
              onClick={handleNavigationClick}
            >
              {menuItem.name}
            </NavButton>
          ))}
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default Navigation;
