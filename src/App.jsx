import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import AboutUs from './components/AboutUs';

function AppContent() {
  const [page, setPage] = useState('landing');
  return (
    <div>
      {page === 'landing' && (
        <div className="landing-page">
          <nav className="navbar">
            <h2>🌿 Paradise Nursery</h2>
            <div className="navbar-right">
              <button className="cart-btn" onClick={() => setPage('about')}>About Us</button>
              <button className="cart-btn" onClick={() => setPage('products')}>Shop Now</button>
            </div>
          </nav>
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Bring nature indoors. Explore our hand-picked collection of beautiful, healthy plants for every home and lifestyle.</p>
            <button className="get-started-btn" onClick={() => setPage('products')}>Get Started</button>
          </div>
        </div>
      )}
      {page === 'products' && <ProductList onCartClick={() => setPage('cart')} />}
      {page === 'cart' && <CartItem onContinueShopping={() => setPage('products')} />}
      {page === 'about' && (
        <>
          <nav className="navbar">
            <h2>🌿 Paradise Nursery</h2>
            <div className="navbar-right">
              <button className="cart-btn" onClick={() => setPage('landing')}>Home</button>
              <button className="cart-btn" onClick={() => setPage('products')}>Shop Now</button>
            </div>
          </nav>
          <AboutUs />
        </>
      )}
    </div>
  );
}

function App() {
  return <Provider store={store}><AppContent /></Provider>;
}

export default App;
