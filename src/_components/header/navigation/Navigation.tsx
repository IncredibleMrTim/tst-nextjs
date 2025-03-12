'use client';

import { useNavigationStore, type MenuItem } from '@store/useNavigationStore';
import Link from 'next/link';
import { NavigationMenu } from 'radix-ui';
import NavButton from './NavigationButton';

const Navigation = () => {
  const menuItems = useNavigationStore(state => state.menuItems);
  const setActiveMenuItem = useNavigationStore(
    state => state.setActiveMenuItem
  );

  const handleNavigationClick = (menuItem: MenuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <NavigationMenu.Root className="flex w-full justify-start text-xl">
      <NavigationMenu.List className="flex align-center pb-1">
        <NavigationMenu.Item className="flex divide-slate-200 divide-x-1 align-center">
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
