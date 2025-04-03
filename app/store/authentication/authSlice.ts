import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { StoreKeys } from '../redux/store';

export interface AuthState {
  isLoggedIn: boolean;

  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const initialSate = {
  isLoggedIn: false
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState: initialSate,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    }
  }
});
export const { setIsLoggedIn } = authSlice.actions;
export const authReducer = authSlice.reducer;
