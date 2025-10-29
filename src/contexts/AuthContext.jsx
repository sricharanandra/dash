import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService, verifyToken, getCurrentUser, isAuthenticated as checkAuth } from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        // Verify token with backend
        const result = await verifyToken();
        
        if (result.success) {
          setUser(result.data.user);
          setIsAuthenticated(true);
        } else {
          // Token invalid, clear storage
          logoutService();
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  const login = async (credentials) => {
    const result = await loginService(credentials);
    
    if (result.success) {
      setUser(result.data.user);
      setIsAuthenticated(true);
      return { success: true };
    }
    
    return { success: false, error: result.error };
  };

  const logout = () => {
    logoutService();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
