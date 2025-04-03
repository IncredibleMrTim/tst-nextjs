'use client';

import { NavigationMenu } from 'radix-ui';
import { useRouter } from 'next/navigation';

import { useNavigationStore } from '@/store/navigation/useNavigationStore';
import { MenuItem } from '@/store/navigation/types';

import NavButton from './NavigationButton';
import { Button } from '@radix-ui/themes';
import LoginPopover from '@/components/popover/Popover';
import SignIn from '@/components/auth/SignIn';
import { signOut } from '@/components/auth/actions';
import useAuth from '@/hooks/useAuth';
import { useAuthenticationStore } from '@/store/authentication/useAuthentication';

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
  useAuth();

  const router = useRouter();
  const menuItems = useNavigationStore(state => state.menuItems);
  const isLoggedIn = useAuthenticationStore(state => state.isLoggedIn);
  const setIsLoggedIn = useAuthenticationStore(state => state.setIsLoggedIn);

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
    <div className="flex justify-between">
      <NavigationMenu.Root
        orientation={orientation}
        className="flex justify-start text-xl !w-full"
      >
        <NavigationMenu.List className="flex justify-between">
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
