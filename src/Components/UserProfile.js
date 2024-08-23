// src/Components/UserProfile.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../authService';
import axios from 'axios';
import { Typography, Container } from '@mui/material';

const UserProfile = () => {
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      axios.get('http://localhost:4000/api/profile') // Adjust the URL based on your backend setup
        .then(response => setUser(response.data))
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <Container>
      <Typography variant="h4">User Profile</Typography>
      <Typography variant="body1">Welcome, {user?.email}!</Typography>
      {/* Add additional user details here */}
    </Container>
  );
};

export default UserProfile;
