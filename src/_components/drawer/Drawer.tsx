'use client';

import { Drawer as GeistDrawer } from '@geist-ui/core';
import { ListBulletIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { useState } from 'react';

const Drawer = () => {
  const [state, setState] = useState(false);
  return (
    <div>
      <IconButton variant="ghost" onClick={() => setState(true)} size="4">
        <ListBulletIcon width={24} height={24} />
      </IconButton>

      <GeistDrawer
        visible={state}
        onClose={() => setState(false)}
        placement="right"
      >
        <GeistDrawer.Title>Drawer</GeistDrawer.Title>
        <GeistDrawer.Subtitle>This is a drawer</GeistDrawer.Subtitle>
        <GeistDrawer.Content>
          <p>Some content contained within the drawer.</p>
        </GeistDrawer.Content>
      </GeistDrawer>
    </div>
  );
};

export default Drawer;
