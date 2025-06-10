'use client';

import { Flex } from '@radix-ui/themes';
import {
  AstraZenecaLogo,
  LexisNexisLogo,
  MdrxTechLogo,
  OnsLogo,
  ProagricaLogo,
  SantanderLogo,
  CoyoteLogo
} from '../logos';
import BrandWrapper from './BrandWrapper';

const BrandBanner = () => {
  return (
    <Flex
      className="w-full  border-gray-200 py-2 !hidden md:border-b-1 landscape:border-b-1 md:!flex landscape:!flex overflow-x-scroll "
      justify="between"
    >
      <BrandWrapper>
        <img
          src="/images/wizz-logo-trans.webp"
          alt="Wizzington Moos Boutique"
          className="w-full pt-2 "
        />
      </BrandWrapper>
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
    </Flex>
  );
};

export default BrandBanner;
