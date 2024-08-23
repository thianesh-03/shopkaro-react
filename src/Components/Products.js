// Products.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import authService from '../authService';
import './Products.css'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const location = useLocation(); 
  const searchQuery = location.state?.searchQuery?.toLowerCase() || ''; 

  useEffect(() => {
    authService.getProducts()
      .then(data => {
        setProducts(data);
        if (searchQuery) {
          const filtered = data.filter(product => 
            product.title.toLowerCase().includes(searchQuery)
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts(data);
        }
      })
      .catch(err => console.error("Error in fetching the data", err));
  }, [searchQuery]); 

  const onFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    applyFilter(selectedFilter);
  };

  const applyFilter = (filter) => {
    switch (filter) {
      case 'all':
        setFilteredProducts(products);
        break;
      case 'price':
        setFilteredProducts([...products].sort((a, b) => a.price - b.price));
        break;
      case 'category':
        setFilteredProducts([...products].sort((a, b) => a.category.localeCompare(b.category)));
        break;
      case 'rating':
        setFilteredProducts([...products].sort((a, b) => b.rating.rate - a.rating.rate));
        break;
      case 'brand':
        setFilteredProducts([...products].sort((a, b) => a.brand.localeCompare(b.brand)));
        break;
      default:
        setFilteredProducts(products);
        break;
    }
  };

  const handleNavigateToAddCard = (product) => {
    navigate('/Payment', { state: { product } });
  };
  function formatCurrency(value) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(value);
}

  return (
    <div className="products-container">
      <div className="filter-container">
        
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <h3>{product.title}</h3>
              <img 
                src={product.image} 
                alt={product.title} 
                onClick={() => handleNavigateToAddCard(product)} 
                style={{ cursor: 'pointer' }} 
              />
              <p>Price: {formatCurrency(product.price*75)}</p>
              <p>Category: {product.category}</p>
              <p>Rating: {product.rating.rate}</p>
              <p>Brand: {product.brand}</p>
              <button onClick={() => handleNavigateToAddCard(product)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Products;