import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  role: string;
  [key: string]: any;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAdmin: () => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('ki_data_token'));
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      // Decode JWT to get user info (basic implementation)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
      }
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem('ki_data_token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('ki_data_token');
    setToken(null);
    setUser(null);
  };

  const isAdmin = () => {
    return user && user.role === 'ADMIN';
  };

  const value = {
    token,
    user,
    login,
    logout,
    isAdmin,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};