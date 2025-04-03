'use client';

import { NavigationMenu } from 'radix-ui';
import { useRouter } from 'next/navigation';

import { MenuItem } from '@store/navigation/types';

import NavButton from './NavigationButton';
import {
  useAppSelector,
  useAppDispatch,
  StoreKeys,
  createStatePath
} from '@/store/redux/store';

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
    </NavigationMenu.Root>
  );
};

export default Navigation;
