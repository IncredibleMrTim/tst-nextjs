'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import {
  Accordion as TWAccordion,
  AccordionBody,
  AccordionHeader
} from '@material-tailwind/react';
import { Box, Flex } from '@radix-ui/themes';

interface AccordionProps {
  open?: boolean;
  onClick?: () => void;
  title: string;
  icon?: string;
  iconOpen?: string;
  iconClosed?: string;
  children: React.ReactNode;
  lastItem?: boolean;
}

export const Accordion = ({
  open,
  children,
  title,
  lastItem,
  icon,
  iconOpen,
  iconClosed
}: AccordionProps) => {
  const [accordionOpen, setAccordionOpen] = useState(open ?? false);

  const renderHeading = () => {
    return (
      <Flex className="text-black flex w-full" justify="between">
        <h3
          className={`${
            accordionOpen
              ? `heading-text-color-open`
              : `heading-text-color-closed`
          } duration-30 pb-1 flex`}
        >
          {title}
        </h3>
        <ChevronDownIcon
          className={`${
            accordionOpen ? `rotate-180` : `heading-icon-color-closed`
          } duration-30 w-6 flex`}
        />
      </Flex>
    );
  };

  return (
    <div className="accordion-component">
      <TWAccordion
        className="overflow-y-hidden accordion"
        open={accordionOpen}
        placeholder={undefined}
        onPointerEnterCapture={null}
        onPointerLeaveCapture={null}
      >
        <AccordionHeader
          className={`p-2 ${!lastItem && `border-b-1 border-gray-200`} transition: ${
            accordionOpen
              ? `bg-gray-200 !text-black duration-[500ms]`
              : `bg-white !text-black duration-[500ms]`
          }`}
          onClick={() => setAccordionOpen(!accordionOpen)}
          placeholder={undefined}
          onPointerEnterCapture={null}
          onPointerLeaveCapture={null}
        >
          <div className="w-full flex justify-between mx-auto heading accordion-heading">
            {renderHeading()}
          </div>
        </AccordionHeader>
        <AccordionBody data-testid="accordion-body" className="p-0">
          <Box className="bg-gray-50 rounded-b-sm accordion-body p-4">
            {children}
          </Box>
        </AccordionBody>
      </TWAccordion>
    </div>
  );
};
