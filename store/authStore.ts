"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types";
import { apiClient } from "../services/api";

interface AuthStore {
  user: User | null;
  token?: string | null;
  isAuthenticated: boolean;
  login: (user: User, token?: string) => void;
  loginWithCredentials: (email: string, password: string) => Promise<boolean>;
  registerWithCredentials: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login(user, token) {
        if (token && typeof window !== "undefined") {
          localStorage.setItem("admin_token", token);
        }
        set({ user, token: token ?? null, isAuthenticated: true });
      },
      async loginWithCredentials(email, password) {
        try {
          const res = await apiClient.post<{ user: User; token: string }>("/auth/login", { email, password });
          const { user, token } = res.data;
          if (typeof window !== "undefined") {
            localStorage.setItem("admin_token", token);
          }
          set({ user, token, isAuthenticated: true });
          return true;
        } catch (err) {
          return false;
        }
      },
      async registerWithCredentials(name, email, password) {
        try {
          const res = await apiClient.post<{ user: User; token: string }>("/auth/register", { name, email, password });
          const { user, token } = res.data;
          if (typeof window !== "undefined") {
            localStorage.setItem("admin_token", token);
          }
          set({ user, token, isAuthenticated: true });
          return true;
        } catch (err) {
          return false;
        }
      },
      logout() {
        if (typeof window !== "undefined") {
          localStorage.removeItem("admin_token");
        }
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "sri-ganesh-enterprises-auth",
    }
  )
);

export default useAuthStore;
