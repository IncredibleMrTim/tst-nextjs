'use client';

import { NavigationMenu } from 'radix-ui';

import { type MenuItem, useNavigationStore } from '@store/useNavigationStore';

import NavButton from './NavigationButton';

export enum NavDirection {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export interface NavigationProps {
  direction?: NavDirection;
}

const Navigation = ({
  direction = NavDirection.HORIZONTAL
}: NavigationProps) => {
  const menuItems = useNavigationStore(state => state.menuItems);

  const setActiveMenuItem = useNavigationStore(
    state => state.setActiveMenuItem
  );
  const setIsDrawerOpen = useNavigationStore(state => state.setIsDrawerOpen);

  const handleNavigationClick = (menuItem: MenuItem) => {
    setActiveMenuItem(menuItem);
    setIsDrawerOpen(false);
  };

  const navVertical =
    'flex flex-col justify-center divide-slate-200 divide-y-1 w-full';
  const navHorizontal =
    'flex flex-row divide-slate-200 divide-x-1 align-center';

  return (
    <NavigationMenu.Root
      orientation={direction}
      className="flex w-full justify-start text-xl "
    >
      <NavigationMenu.List className="flex align-center pb-1 w-full">
        <NavigationMenu.Item className={`align-center w-full`}>
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
