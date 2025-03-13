// MOVE TO COMPONENT LIBRARY
'use client';

import { Drawer as GeistDrawer, DrawerProps } from '@geist-ui/core';
import { MouseEventHandler, useState } from 'react';
import { ListBulletIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';

interface IDrawerProps extends DrawerProps {
  children: React.ReactNode;
  onTrigger?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const Drawer = ({ children, onTrigger, ...props }: IDrawerProps) => {
  return (
    <div>
      <IconButton variant="ghost" onClick={onTrigger} size="4">
        <ListBulletIcon width={24} height={24} />
      </IconButton>

      <GeistDrawer width="80%" placement="right" {...props}>
        <GeistDrawer.Title>Drawer</GeistDrawer.Title>
        <GeistDrawer.Subtitle>This is a drawer</GeistDrawer.Subtitle>
        <GeistDrawer.Content>{children}</GeistDrawer.Content>
      </GeistDrawer>
    </div>
  );
};

export default Drawer;
