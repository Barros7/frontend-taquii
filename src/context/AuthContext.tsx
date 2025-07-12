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
      console.log('AuthContext: refresh() - checking user session');
      const res = await fetch(`/api/auth/me`, {
        credentials: 'include',
      });
      console.log('AuthContext: refresh() - response status:', res.status);
      
      if (res.ok) {
        const data = await res.json();
        console.log('AuthContext: refresh() - user data:', data);
        
        if (data && data.id && data.name && data.email && data.userType) {
          console.log('AuthContext: setting user from direct data');
          setUser(data);
        } else if (data && data.user && data.user.id && data.user.name && data.user.email && data.user.userType) {
          console.log('AuthContext: setting user from nested data');
          setUser(data.user);
        } else {
          console.log('AuthContext: no valid user data found, setting user to null');
          setUser(null);
        }
      } else {
        console.log('AuthContext: refresh() - response not ok, setting user to null');
        setUser(null);
      }
    } catch (error) {
      console.error('AuthContext: refresh() - error:', error);
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => { 
    console.log('AuthContext: initial refresh on mount');
    refresh(); 
  }, []);

  const login = async (phone: string, password: string) => {
    console.log('AuthContext: login() - starting login process');
    setLoading(true);
    setError(null);
    try {
      console.log('AuthContext: login() - attempting login for:', phone);
      const res = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ phone, password }),
      });
      
      console.log('AuthContext: login() - response status:', res.status);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.log('AuthContext: login() - error data:', errorData);
        setError('E-mail ou Palavra-passe inválidos!');
        setLoading(false);
        return false;
      }
      
      const data = await res.json();
      console.log('AuthContext: login() - success data:', data);
      
      console.log('AuthContext: login() - calling refresh() to update user state');
      await refresh();
      console.log('AuthContext: login() - refresh completed');
      setLoading(false);
      return true;
    } catch (error) {
      console.error('AuthContext: login() - error:', error);
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
