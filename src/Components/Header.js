import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthService from '../services/AuthService'; // You'll need to implement this service

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    AuthService.isAuthenticated().then(status => {
      setIsAuthenticated(status);
    });
  }, []);

  const onSearch = (data) => {
    const { searchQuery } = data;
    if (searchQuery) {
      navigate(`/products?searchQuery=${searchQuery}`);
    }
  };

  const logout = () => {
    AuthService.logout();
    navigate('/');
  };

  return (
    <nav>
      <div className="search-container">
        <form onSubmit={handleSubmit(onSearch)}>
          <input
            type="text"
            id="search-input"
            placeholder="Search"
            {...register('searchQuery')}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(onSearch)();
              }
            }}
          />
        </form>
      </div>
      
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
        {!isAuthenticated && <li><Link to="/signup">Signup</Link></li>}
        {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
        {isAuthenticated && <li><a href="#" onClick={logout}>Logout</a></li>}
      </ul>
    </nav>
  );
}

export default Header;
