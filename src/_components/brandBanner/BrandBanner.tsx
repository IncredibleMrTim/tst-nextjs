'use client';

import {
  AstraZenecaLogo,
  CoyoteLogo,
  LexisNexisLogo,
  MdrxTechLogo,
  OnsLogo,
  ProagricaLogo,
  SantanderLogo
} from '../logos';
import BrandWrapper from './BrandWrapper';

const BrandBanner = () => {
  return (
    <div className="flex justify-between h-full border-b-1 border-gray-200 xs:invisible invisible md:visible">
      <BrandWrapper>
        <AstraZenecaLogo />
      </BrandWrapper>
      <BrandWrapper>
        <SantanderLogo />
      </BrandWrapper>
      <BrandWrapper>
        <CoyoteLogo />
      </BrandWrapper>
      <BrandWrapper>
        <OnsLogo />
      </BrandWrapper>
      <BrandWrapper>
        <LexisNexisLogo />
      </BrandWrapper>
      <BrandWrapper>
        <ProagricaLogo />
      </BrandWrapper>
      <BrandWrapper>
        <MdrxTechLogo />
      </BrandWrapper>
    </div>
  );
};

export default BrandBanner;
