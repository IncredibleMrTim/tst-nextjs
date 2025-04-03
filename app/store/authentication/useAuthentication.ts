import { create } from 'zustand';

export interface AuthenticationStore {
  isLoggedIn: boolean;

  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useAuthenticationStore = create<AuthenticationStore>(set => ({
  isLoggedIn: false,

  setIsLoggedIn: isLoggedIn => set({ isLoggedIn })
}));
