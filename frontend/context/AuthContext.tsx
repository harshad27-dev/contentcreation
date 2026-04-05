"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { fetchApi } from "@/lib/api";

type User = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  scriptsGenerated?: number;
  videosExported?: number;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const response = await fetchApi("/auth/me");
      if (response.success) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      logout(); // Clear invalid token
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      refreshUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token: string, user: User) => {
    Cookies.set("token", token, { expires: 7 }); // 7 days
    setUser(user);
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
