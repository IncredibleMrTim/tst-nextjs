'use client';

import { NavigationMenu } from 'radix-ui';
import { useRouter } from 'next/navigation';

import { useAppSelector, useAppDispatch, StoreKeys } from '@/store/redux/store';
import SignIn from '@/components/auth/SignIn';
import { Button } from '@radix-ui/themes';
import LoginPopover from '@/components/popover/Popover';
import { MenuItem } from '@/store/navigation/types';
import useAuthentication from '@/components/auth/useAuthentication';
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
  const dispatch = useAppDispatch();
  const { handleLogin, auth } = useAuthentication();

  const router = useRouter();

  const menuItems = useAppSelector(state => state.nav.menuItems);

  const handleNavigationClick = (menuItem: MenuItem) => {
    dispatch({
      type: StoreKeys.NAV_SET_ACTIVE_MENU_ITEM,
      payload: menuItem
    });
    dispatch({
      type: StoreKeys.NAV_SET_IS_DRAWER_OPEN,
      payload: false
    });

    router.push(menuItem.path);
  };

  const navVertical = 'flex flex-col';
  const navHorizontal = 'flex flex-row justify-center divide-slate-200 pb-1';

  return (
    <div className="flex justify-between w-full">
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
                aria-label={`Navigate to ${menuItem.name}`}
                aria-controls="NavigationButton"
                aria-current={
                  menuItem.isActive ? `${menuItem.name} page` : undefined
                }
                key={menuItem.name}
                menuItem={menuItem}
                onClick={handleNavigationClick}
              >
                {menuItem.name}
              </NavButton>
            ))}
          </NavigationMenu.Item>
        </NavigationMenu.List>
        <Button onClick={() => handleLogin()}>
          {auth.isAuthenticated ? 'Logout' : 'login'}
        </Button>
      </NavigationMenu.Root>
      <div className="mr-4 hidden md:flex">
        <LoginPopover
          targetElement={
            <Button
              variant="ghost"
              radius="none"
              size="3"
              className={`!text-black !border-b-2 !cursor-pointer !border-transparent hover:!bg-slate-100`}
            >
              Login
            </Button>
          }
        >
          <div className="w-[300px]">
            <SignIn />
          </div>
        </LoginPopover>
      </div>
    </div>
  );
};

export default Navigation;
