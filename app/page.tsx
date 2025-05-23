'use client';
import Card from '@/components/card/Card';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/redux/store';

const Home = () => {
  const pathName = usePathname();
  const dispatch = useAppDispatch();

  const menuItems = useAppSelector(state => state.nav.menuItems);

  useEffect(() => {
    dispatch({
      type: 'navigation/setMenuItems',
      payload: menuItems.find(item => item.path === pathName) || menuItems[0]
    });
  }, [pathName]);

  return (
    <div className="flex flex-col gap-12">
      <div className="hidden sm:flex">
        <Image
          src="/images/tstBanner.png"
          alt="TST Banner"
          width={1920}
          height={1080}
        />
      </div>
      <div>
        <h1>Frontend Software Engineer Consultant</h1>
        <p>
          Experienced Front End web application developer with over 10 years
          working in the information technology and services industry. Skilled
          in JavaScript, React.js, React Native, CSS, Rest API’s and supporting
          technologies. Comfortable working in an Agile environment using BDD
          principles and working with both Jest and Cypress testing
          technologies. A strong and competent professional with a BSC(Hons)
          focused in Software EngineeringInternet Application Development from
          Southampton Solent University.
        </p>
      </div>

      <div className="flex gap-8 flex-col sm:flex-row">
        <Card imageSrc="/images/experience.svg" imageAlt="Experience">
          Over 15 years continuous employment in various Software Engineering
          disciplines specialising in frontend development over the past 4
          years.
        </Card>

        <Card imageSrc="/images/technology.svg" imageAlt="Technology">
          Starting with earlier versions of .NET in 2008 and evolving through
          SQL, Vanilla JavaScript, React and working with Agile and TDD
          methodologies.
        </Card>
      </div>
    </div>
  );
};

export default Home;
