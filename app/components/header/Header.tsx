'use client';

import { TstLogo } from '@/components/logos/TstLogo';

import { IconButton } from '@radix-ui/themes';

import Navigation, { NavDirection } from './navigation/Navigation';
import { LuAlignJustify } from 'react-icons/lu';
import DrawerTemplate from './drawerTemplate/DrawerTemplate';
import { Box, Container } from '@radix-ui/themes';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';

const Header = () => {
  return (
    <header className="w-full relative flex justify-center bg-gradient-to-b from-blue-200 via--blue-100 via-70% via-zinc-50 to-80% to-transparent gap-4 shadow-md">
      <Container>
        <div className="flex-col justify-center">
          <Box className="!flex w-full justify-center p-4 md:justify-center">
            <TstLogo className="w-1/2 md:w-1/4 landscape:w-1/3" />
          </Box>

          <div className="flex md:hidden landscape:hidden p-2">
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <IconButton variant="ghost" aria-label="Open navigation">
                  <LuAlignJustify size={24} className="text-gray-700" />
                </IconButton>
              </DrawerTrigger>
              <DrawerTitle className="hidden">Navigation</DrawerTitle>
              <DrawerContent className="right-0 top-0 h-screen w-[80%] rounded-l-2xl">
                <DrawerTemplate />
              </DrawerContent>
            </Drawer>
          </div>
          <div className="hidden md:flex landscape:flex">
            <Navigation orientation={NavDirection.HORIZONTAL} />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
