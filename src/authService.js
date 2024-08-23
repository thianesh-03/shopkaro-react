// src/authService.js
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', credentials);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const register = async (user) => {
    try {
      await axios.post('http://localhost:3000/api/register', user);
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
