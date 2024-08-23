import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import Products from './components/Products';
import Payment from './components/Payment';
import PrivateRoute from './components/PrivateRoute'; // Custom private route component if needed

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          } 
        />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
