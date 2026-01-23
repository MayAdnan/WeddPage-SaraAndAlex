import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { adminApi } from '../api/adminApi';
import type { AdminLoginRequest } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AdminLoginRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('adminToken');
    const expiry = localStorage.getItem('tokenExpiry');

    if (token && expiry) {
      const expiryDate = new Date(expiry);
      if (expiryDate > new Date()) {
        setIsAuthenticated(true);
      } else {
        // Token expired - clean up
        localStorage.removeItem('adminToken');
        localStorage.removeItem('tokenExpiry');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: AdminLoginRequest): Promise<void> => {
    const response = await adminApi.login(credentials);
    localStorage.setItem('adminToken', response.token);
    localStorage.setItem('tokenExpiry', response.expiresAt);
    setIsAuthenticated(true);
  };

  const logout = (): void => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('tokenExpiry');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

