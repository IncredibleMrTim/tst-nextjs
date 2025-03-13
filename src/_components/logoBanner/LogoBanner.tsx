'use client';
import {
  CoyoteLogo,
  MdrxTechLogo,
  LexisNexisLogo,
  OnsLogo,
  SantanderLogo,
  AstraZenecaLogo,
  ProagricaLogo
} from '../logos';
import LogoWrapper from './LogoWrapper';

const LogoBanner = () => {
  return (
    <div className="flex justify-between h-full border-b-1 border-gray-200 xs:invisible invisible md:visible">
      <LogoWrapper>
        <AstraZenecaLogo />
      </LogoWrapper>
      <LogoWrapper>
        <SantanderLogo />
      </LogoWrapper>
      <LogoWrapper>
        <CoyoteLogo />
      </LogoWrapper>
      <LogoWrapper>
        <OnsLogo />
      </LogoWrapper>
      <LogoWrapper>
        <LexisNexisLogo />
      </LogoWrapper>
      <LogoWrapper>
        <ProagricaLogo />
      </LogoWrapper>
      <LogoWrapper>
        <MdrxTechLogo />
      </LogoWrapper>
    </div>
  );
};

export default LogoBanner;
