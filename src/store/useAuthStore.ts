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
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: {
        id: '1',
        name: 'Renault Admin',
        email: 'admin@renault.com',
        role: 'Administrator',
      },
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
    }),
    {
      name: 'renault-auth-storage',
    }
  )
);
