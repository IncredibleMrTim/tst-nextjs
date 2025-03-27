'use client';

import Drawer from '@components/drawer/Drawer';
import { TstLogo } from '@components/logos/TstLogo';
import { useNavigationStore } from '@store/navigation/useNavigationStore';
import Navigation, { NavDirection } from './navigation/Navigation';
import DrawerTemplate from './drawerTemplate/DrawerTemplate';
import { Box, Container } from '@radix-ui/themes';

const Header = () => {
  const setIsDrawerOpen = useNavigationStore(state => state.setIsDrawerOpen);
  const isDrawerOpen = useNavigationStore(state => state.isDrawerOpen);

  return (
    <header className="w-full relative flex justify-center bg-gradient-to-b from-blue-200 via--blue-100 via-70% via-zinc-50 to-80% to-transparent gap-4 shadow-md">
      <Container>
        <div className="flex flex-col justify-center">
          <Box className="w-full self-center mx-0 p-8 sm:w-1/6 sm:mx-4 my-4 sm:p-0 ">
            <TstLogo />
          </Box>

          <div className="absolute bottom-2 left-4 visible md:invisible">
            <Drawer
              onClose={() => setIsDrawerOpen(false)}
              onTrigger={() => setIsDrawerOpen(!isDrawerOpen)}
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
