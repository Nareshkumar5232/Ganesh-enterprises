"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

interface AuthStore {
  user: User | null;
  token?: string | null;
  isAuthenticated: boolean;
  login: (user: User, token?: string) => void;
  loginWithCredentials: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login(user, token) {
        set({ user, token: token ?? null, isAuthenticated: true });
      },
          async loginWithCredentials(email: string, password: string) {
            try {
              const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
              });
              if (!res.ok) return false;
              const data = await res.json();
              set({ user: data.user, token: data.token, isAuthenticated: true });
              return true;
            } catch (err) {
              return false;
            }
          },
      logout() {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "sri-ganesh-enterprises-auth",
    }
  )
);

export default useAuthStore;
