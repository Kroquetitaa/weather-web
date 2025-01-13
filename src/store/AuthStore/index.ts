import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthStore } from './AuthStore.type';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      email: null,
      isAuthenticated: false,
      login: (email) => {
        set({ email, isAuthenticated: true });
      },
      logout: () => {
        set({ email: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ email: state.email, isAuthenticated: state.isAuthenticated })
    }
  )
);
