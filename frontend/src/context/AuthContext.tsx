"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  token: String | null;
  role: String | null;
  id: String | null;
  login: (token: string, role: string, id: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  id: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<String | null>(null);
  const [role, setRole] = useState<String | null>(null);
  const [id, setId] = useState<String | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    const savedId = localStorage.getItem("id");
    if (savedToken && savedRole && savedId) {
      setToken(savedToken);
      setRole(savedRole);
      setId(savedId);
    }
  }, []);

  const login = (newToken: string, newRole: string, newId: string) => {
    setToken(newToken);
    setRole(newRole);
    setId(newId);
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    localStorage.setItem("id", newId);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
  };

  return (
    <AuthContext.Provider value={{ token, role, id, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
