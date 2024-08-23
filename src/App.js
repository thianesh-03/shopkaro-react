import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import UserProfile from './Components/UserProfile';
import Products from './Components/Products';
import Payment from './Components/Payment';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<PrivateRoute component={UserProfile} />} />
      <Route path="/products" element={<Products />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}

export default App;
