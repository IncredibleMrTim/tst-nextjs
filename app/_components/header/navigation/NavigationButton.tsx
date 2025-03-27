import { Button } from '@radix-ui/themes';

import { MenuItem } from '@store/navigation/types';

interface NavigationButtonProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick: (menuItem: MenuItem) => void;
  menuItem: MenuItem;
  isMobile?: boolean;
}

const NavButton = ({ children, onClick, menuItem }: NavigationButtonProps) => {
  const handleNavigationClick = () => {
    onClick(menuItem);
  };

  return (
    <div className="flex pl-3 pr-3">
      <Button
        onClick={handleNavigationClick}
        variant="ghost"
        radius="none"
        size="3"
        className={`!text-black !border-b-2 ${menuItem.isActive ? '!bg-slate-100 !border-slate-400' : '!border-transparent'} hover:!bg-slate-100`}
      >
        {children}
      </Button>
    </div>
  );
};

export default NavButton;
