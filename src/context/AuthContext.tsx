'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '@/types';
import { dataStore, DEMO_STUDENT, DEMO_ADMIN } from '@/lib/store';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (fullName: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  switchDemoRole: (targetRole: UserRole) => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load stored user or default to student
    const current = dataStore.getCurrentUser();
    setUser(current);
    setIsLoading(false);
  }, []);

  const login = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    // Simple authentication logic
    if (email.toLowerCase().includes('admin')) {
      dataStore.setCurrentUser(DEMO_ADMIN);
      setUser(DEMO_ADMIN);
    } else {
      const student = { ...DEMO_STUDENT, email };
      dataStore.setCurrentUser(student);
      setUser(student);
    }
    setIsLoading(false);
    return true;
  };

  const register = async (fullName: string, email: string): Promise<boolean> => {
    setIsLoading(true);
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email,
      full_name: fullName,
      role: 'student',
      points: 25, // Bonus points on registration!
      avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(fullName)}`,
      created_at: new Date().toISOString()
    };
    dataStore.setCurrentUser(newUser);
    setUser(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    dataStore.setCurrentUser(null);
    setUser(null);
  };

  const switchDemoRole = (targetRole: UserRole) => {
    if (targetRole === 'admin') {
      dataStore.setCurrentUser(DEMO_ADMIN);
      setUser(DEMO_ADMIN);
    } else {
      dataStore.setCurrentUser(DEMO_STUDENT);
      setUser(DEMO_STUDENT);
    }
  };

  const refreshUser = () => {
    const fresh = dataStore.getCurrentUser();
    setUser(fresh);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'student',
        isAdmin: user?.role === 'admin',
        isLoading,
        login,
        register,
        logout,
        switchDemoRole,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
