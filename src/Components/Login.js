import React, { useState } from 'react';
import { useAuth } from '../authService';

const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleLogin = async () => {
    try {
      await login(credentials);
      // Redirect to the dashboard or home page
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
