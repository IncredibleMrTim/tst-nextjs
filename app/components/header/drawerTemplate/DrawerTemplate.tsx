import Navigation, { NavDirection } from '../navigation/Navigation';
import { TstLogo } from '@/components/logos/TstLogo';

const DrawerTemplate = () => {
  return (
    <div className="flex flex-col justify-start w-full h-full">
      <div className="flex w-full justify-center p-4 bg-gradient-to-br from-white from-40% to-blue-200 border-b border-gray-300 shadow">
        <TstLogo className="w-3/4 max-w-xs" />
      </div>
      <Navigation orientation={NavDirection.VERTICAL} />
    </div>
  );
};

export default DrawerTemplate;
