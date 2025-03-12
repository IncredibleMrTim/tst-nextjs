'use client';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header className="flex justify-center bg-gradient-to-b from-blue-200 via--blue-100 via-70% via-zinc-50 to-80% to-transparent gap-4 shadow-md">
      <div className="flex flex-col justify-center w-2/3">
        <img src="./tstLogo.svg" alt="logo" className="w-1/6 self-center m-4" />
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
