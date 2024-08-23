// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import { getAuthStatus } from "../authService"; // Adjust the import to your service

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const status = await getAuthStatus();
      setIsAuthenticated(status);
    };
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
