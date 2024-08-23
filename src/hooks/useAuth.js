import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Implement your authentication logic here
    // For example, check localStorage or make an API call
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Example check
  }, []);

  return { isAuthenticated };
};
