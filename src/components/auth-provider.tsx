"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: {
    name?: string | null;
  };
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  signUp: (name: string, email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  signUp: async () => null,
  signIn: async () => null,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/session", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) return { user: null };
        return (await res.json()) as { user: AuthUser | null };
      })
      .then((data) => setUser(data.user ?? null))
      .finally(() => setLoading(false));
  }, []);

  const signUp = async (name: string, email: string, password: string) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string; user?: AuthUser | null };
    if (!res.ok) return data.error ?? "Failed to sign up";
    setUser(data.user ?? null);
    return null;
  };

  const signIn = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string; user?: AuthUser | null };
    if (!res.ok) return data.error ?? "Failed to sign in";
    setUser(data.user ?? null);
    return null;
  };

  const signOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
