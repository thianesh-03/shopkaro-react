import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Payment from "./Components/Payment";
import ProtectedRoute from "./ProtectedRoute"
import Products from "./Components/Products";
import Signup from "./Components/Signup";
import Header from "./Components/Header";
import AddCard from "./Components/AddCart";


function App() {
  return (
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<AddCard />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </>
  );
}

export default App;
