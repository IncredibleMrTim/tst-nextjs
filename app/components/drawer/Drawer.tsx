// MOVE TO COMPONENT LIBRARY
'use client';

import { Drawer as GeistDrawer, DrawerProps } from '@geist-ui/core';
import React, { MouseEventHandler } from 'react';
import { ListBulletIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';

interface IDrawerProps {
  onTrigger?: MouseEventHandler<HTMLButtonElement> | undefined;
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  children: React.ReactNode;
}

const Drawer = ({
  onTrigger,
  title,
  subTitle,
  children,
  ...props
}: IDrawerProps & DrawerProps) => {
  return (
    <div>
      <IconButton variant="ghost" onClick={onTrigger}>
        <ListBulletIcon width={32} height={32} className="text-gray-700" />
      </IconButton>

      <GeistDrawer width="80%" placement="right" {...props}>
        {title && <GeistDrawer.Title>{title}</GeistDrawer.Title>}
        {subTitle && <GeistDrawer.Subtitle>{subTitle}</GeistDrawer.Subtitle>}
        <GeistDrawer.Content className="!h-full">
          {children}
        </GeistDrawer.Content>
      </GeistDrawer>
    </div>
  );
};

export default Drawer;
