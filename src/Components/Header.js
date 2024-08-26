import React from "react";
import { Link } from "react-router-dom";
import './Header.css'

function Header() {
  return (
    <header className="header">
      <nav>
        <h1 className="title"> ShopKaro</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/products">Products</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;