import SignIn from '@/components/auth/SignIn';
import Navigation, { NavDirection } from '../navigation/Navigation';
import { TstLogo } from '@/components/logos/TstLogo';

const DrawerTemplate = () => {
  return (
    <div className="flex flex-col relative h-screen">
      <div className="flex w-60 self-end opacity-30 mb-4">
        <TstLogo />
      </div>
      <Navigation orientation={NavDirection.VERTICAL} />
      <div className="absolute bottom-20 left-0 w-full border-1 border-slate-300 p-4 rounded-md shadow-md">
        <SignIn />
      </div>
    </div>
  );
};

export default DrawerTemplate;
