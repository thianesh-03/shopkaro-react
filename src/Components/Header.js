import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
import authService from "../authService";




function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout=()=>{
  authService.logout();
  useNavigate("/");
  }

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, [isAuthenticated]);

  return (
    <header className="header">
      <nav>
        <h1 className="title"> ShopKaro</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
          {!isAuthenticated && <li><Link to="/signup">Signup</Link></li>}
          <li><Link to="/products">Products</Link></li>
          {isAuthenticated && <li>< Link to="/" onClick={logout}>Logout</Link></li>}
        </ul>
        
      </nav>
    </header>
  );
}

export default Header;