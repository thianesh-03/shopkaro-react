import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/products");
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h1 id="txt1">Online</h1>
          <h1 id="txt2">Shopping</h1>
          <p>
            Discover a seamless and smarter shopping experience with ShopEase. 
            Browse a vast catalog of products from top brands, enjoy personalized recommendations, 
            and find the best deals with our price comparison tool. Shop securely with diverse payment 
            options and track your orders in real-time. Take advantage of exclusive offers, read reviews 
            from fellow shoppers, and benefit from our reliable delivery services. Download ShopEase 
            today and transform the way you shop!
          </p>
          <button className="cta-btn" onClick={onClick}>GET STARTED</button>
        </div>
      </section>

      <footer>
        <p>&copy; shopkaro</p>
      </footer>
    </main>
  );
}

export default Home;
