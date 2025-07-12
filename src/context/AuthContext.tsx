"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  userType: string;
  emailVerified: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (phone: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/me`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.id && data.name && data.email && data.userType) {
          setUser(data);
        } else if (data && data.user && data.user.id && data.user.name && data.user.email && data.user.userType) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const login = async (phone: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Attempting login for:', phone);
      const res = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ phone, password }),
      });
      
      console.log('Login response status:', res.status);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.log('Login error data:', errorData);
        setError('E-mail ou Palavra-passe inválidos!');
        setLoading(false);
        return false;
      }
      
      const data = await res.json();
      console.log('Login success data:', data);
      
      await refresh();
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setError('Não foi possível fazer login.');
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch(`/api/auth/logout`, { method: 'POST', credentials: 'include' });
    } catch {
      setError('Erro ao fazer logout.');
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
};
