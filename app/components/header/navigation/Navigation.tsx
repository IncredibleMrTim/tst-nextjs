'use client';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { DrawerClose } from '@/components/ui/drawer';
import { useRouter, usePathname } from 'next/navigation';

import { MenuItem } from '@/store/navigation/types';

import { useAppSelector, useAppDispatch } from '@/store/redux/store';
import Link from 'next/link';

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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = useAppSelector(state => state.nav.menuItems);

  // Check if a menu item is active based on current pathname
  const isMenuItemActive = (menuItem: MenuItem) => {
    // For homepage, only match if pathname is exactly '/'
    if (menuItem.path === '/') {
      return pathname === '/';
    }

    console.log(menuItem.path, pathname.startsWith(menuItem.path));
    // For other pages, match if pathname starts with the menu item path
    return pathname.startsWith(menuItem.path);
  };

  const handleNavigationClick = (menuItem: MenuItem) => {
    dispatch({
      type: 'navigation/setIsDrawerOpen',
      payload: false
    });

    router.push(menuItem.path);
  };

  return (
    <NavigationMenu
      orientation={orientation}
      className={`text-xl ${orientation === NavDirection.VERTICAL ? '!items-start !justify-start !w-full !max-w-full' : 'justify-start'}`}
    >
      <NavigationMenuList
        className={`flex gap-0 m-0 p-0 ${orientation === NavDirection.VERTICAL ? 'flex-col !items-start !justify-start !w-full p-4' : 'flex-row justify-center'}`}
      >
        {menuItems.map(menuItem => {
          const isActive = isMenuItemActive(menuItem);
          return (
            <NavigationMenuItem
              key={menuItem.name}
              className={orientation === NavDirection.VERTICAL ? '!w-full' : ''}
            >
              <NavigationMenuLink
                asChild
                className={
                  orientation === NavDirection.VERTICAL
                    ? 'group flex w-full items-center justify-start rounded bg-background p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none' +
                      (isActive ? ' bg-slate-100' : '')
                    : `${navigationMenuTriggerStyle()} rounded-none p-4 ${isActive ? 'bg-slate-100' : ''}`
                }
              >
                {orientation === NavDirection.VERTICAL ? (
                  <DrawerClose asChild>
                    <Link
                      href={menuItem.path}
                      onClick={() => handleNavigationClick(menuItem)}
                      aria-label={`Navigate to ${menuItem.name}`}
                      className="!text-lg md:!text-base w-full"
                    >
                      {menuItem.name}
                    </Link>
                  </DrawerClose>
                ) : (
                  <Link
                    href={menuItem.path}
                    onClick={() => handleNavigationClick(menuItem)}
                    aria-label={`Navigate to ${menuItem.name}`}
                    className="!text-lg md:!text-base"
                  >
                    {menuItem.name}
                  </Link>
                )}
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
