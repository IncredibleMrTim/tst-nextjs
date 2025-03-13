'use client';
import Navigation from './Navigation';
import Drawer from '@components/drawer/Drawer';
import { TstLogo } from '@components/logos/TstLogo';

const Header = () => {
  return (
    <header className="relative flex justify-center bg-gradient-to-b from-blue-200 via--blue-100 via-70% via-zinc-50 to-80% to-transparent gap-4 shadow-md">
      <div className="flex flex-col justify-center w-2/3">
        <div className="w-full self-center mx-0 my-0 sm:w-1/3 sm:mx-4  ">
          <TstLogo />
        </div>

        <div className="absolute bottom-4 left-4 visible md:invisible">
          <Drawer />
        </div>

        <div className="invisible md:visible">
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
