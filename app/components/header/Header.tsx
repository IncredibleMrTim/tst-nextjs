'use client';

import Drawer from '@/components/drawer/Drawer';
import { TstLogo } from '@/components/logos/TstLogo';

import Navigation, { NavDirection } from './navigation/Navigation';
import DrawerTemplate from './drawerTemplate/DrawerTemplate';
import { Box, Container } from '@radix-ui/themes';
import { useAppDispatch, useAppSelector } from '@/store/redux/store';

const Header = () => {
  const dispatch = useAppDispatch();
  const isDrawerOpen = useAppSelector(state => state.nav.isDrawerOpen);

  return (
    <header className="w-full relative flex justify-center bg-gradient-to-b from-blue-200 via--blue-100 via-70% via-zinc-50 to-80% to-transparent gap-4 shadow-md">
      <Container>
        <div className="flex-col justify-center">
          <Box className="!flex w-full justify-center p-4">
            <TstLogo className="w-3/5 md:w-1/4" />
          </Box>

          <div className="absolute bottom-2 left-4 visible md:invisible">
            <Drawer
              aria-label="Open navigation"
              aria-controls="NavigationMenu"
              onClose={() =>
                dispatch({ type: 'navigation/setIsDrawerOpen', payload: false })
              }
              onTrigger={() =>
                dispatch({
                  type: 'navigation/setIsDrawerOpen',
                  payload: !isDrawerOpen
                })
              }
              visible={isDrawerOpen}
            >
              <DrawerTemplate />
            </Drawer>
          </div>
          <div className="invisible md:visible">
            <Navigation orientation={NavDirection.HORIZONTAL} />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
