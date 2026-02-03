import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, userData?: Partial<User>) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token: string, userData?: Partial<User>) => {
        set({
          token,
          isAuthenticated: true,
          user: {
            id: '1',
            name: 'Renault Admin',
            email: 'admin@renault.com',
            role: 'Administrator',
            ...userData,
          },
        });
      },
      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },
      initialize: () => {
        // Check if token exists to determine authentication status
        const { token } = get();
        if (token) {
          set({ isAuthenticated: true });
        }
      },
    }),
    {
      name: 'renault-auth-storage',
      // Only store token and user, not isAuthenticated which is derived
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
