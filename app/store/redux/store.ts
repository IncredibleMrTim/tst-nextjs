"use client";
import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { navReducer } from '../navigation/navSlice';
import { authReducer } from '../authentication/authSlice';

export const store = configureStore({
  reducer: combineReducers({ nav: navReducer, auth: authReducer }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export enum StoreKeys {
  AUTH_SET_IS_LOGGED_IN = 'authentication/setIsLoggedIn',
  NAV_SET_ACTIVE_MENU_ITEM = 'navigation/setActiveMenuItem',
  NAV_SET_IS_DRAWER_OPEN = 'navigation/setIsDrawerOpen'
}

export const createStatePath = (key: StoreKeys, path: string) =>
  `${key}/${path}`;
