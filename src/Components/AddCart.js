// AddCard.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AddCart.css'


const AddCard = () => {
  const { state } = useLocation();
  const { product } = state || {};
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const handleAddToCart = () => {

    navigate('/payment', { state: { product, quantity } });
  };
  function formatCurrency(value) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(value);
  }

  return (
    <div className="add-card-container">
      <div className="add-card-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="add-card-content">
        <h3 id="prod-title">{product.title}</h3>
        <p>{product.description}</p>
        <h5>Price: <span className="price">{formatCurrency(product.price*75* quantity) }</span></h5>
        <div className="quantity-selector">
          <button onClick={decrementQuantity}>-</button>
          <span>{quantity}</span>
          <button onClick={incrementQuantity}>+</button>
        </div>
        <button className="cta-btn" onClick={handleAddToCart}>Buy now</button>
      </div>
    </div>
  );
};

export default AddCard;