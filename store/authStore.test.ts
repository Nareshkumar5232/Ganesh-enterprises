// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from "vitest";
import { useAuthStore } from "./authStore";

describe("useAuthStore Backend Integration", () => {
  const randomEmail = `test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}@example.com`;
  const password = "securePassword123";
  const name = "Integration Test User";

  it("should fail to log in with unregistered credentials", async () => {
    // Make sure we are logged out initially
    useAuthStore.getState().logout();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);

    const success = await useAuthStore.getState().loginWithCredentials(randomEmail, password);
    expect(success).toBe(false);
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeNull();
  });

  it("should successfully register a new user on the backend", async () => {
    const success = await useAuthStore.getState().registerWithCredentials(name, randomEmail, password);
    expect(success).toBe(true);

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).not.toBeNull();
    expect(state.user?.email).toBe(randomEmail);
    expect(state.user?.name).toBe(name);
    expect(state.token).toBeDefined();
    expect(state.token).not.toBeNull();

    // Check localStorage fallback
    if (typeof window !== "undefined") {
      expect(localStorage.getItem("admin_token")).toBe(state.token);
    }
  });

  it("should successfully log in with the newly registered credentials", async () => {
    // Log out first
    useAuthStore.getState().logout();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeNull();
    if (typeof window !== "undefined") {
      expect(localStorage.getItem("admin_token")).toBeNull();
    }

    // Log in
    const success = await useAuthStore.getState().loginWithCredentials(randomEmail, password);
    expect(success).toBe(true);

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.email).toBe(randomEmail);
    expect(state.token).toBeDefined();
    expect(state.token).not.toBeNull();
  });

  it("should successfully clean up state and localStorage on logout", () => {
    useAuthStore.getState().logout();
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    if (typeof window !== "undefined") {
      expect(localStorage.getItem("admin_token")).toBeNull();
    }
  });
});
