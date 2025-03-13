import Navigation, { NavDirection } from '../navigation/Navigation';
import { TstLogo } from '@/_components/logos/TstLogo';

const DrawerTemplate = () => {
  return (
    <div className="flex flex-col justify-start w-full h-full">
      <div className="flex w-60 self-end opacity-30 mb-4">
        <TstLogo />
      </div>
      <Navigation orientation={NavDirection.VERTICAL} />
    </div>
  );
};

export default DrawerTemplate;
