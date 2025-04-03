import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { MenuItem, MenuItems } from '../navigation/types';

export interface NavState {
  menuItems: MenuItem[];
  isDrawerOpen: boolean;

  setActiveMenuItem: (menuItem: MenuItem) => void;
  setIsDrawerOpen: (isOpen: boolean) => void;
}

const initialSate = {
  menuItems: [
    { name: MenuItems.HOME, path: '/' },
    { name: MenuItems.EXPERIENCE, path: '/experience' },
    { name: MenuItems.SKILLS, path: '/skills' },
    { name: MenuItems.RESUME, path: '/resume' }
  ],
  isDrawerOpen: false
};

export const navSlice = createSlice({
  name: 'nav',
  initialState: initialSate,
  reducers: {
    setActiveMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.menuItems = state.menuItems.map(item => ({
        ...item,
        isActive: item.name === action.payload.name
      }));
    },
    setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    }
  }
});
export const { setActiveMenuItem, setIsDrawerOpen } = navSlice.actions;
export const navReducer = navSlice.reducer;
