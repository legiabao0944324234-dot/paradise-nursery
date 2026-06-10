import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const calculateTotalCost = (item) => (parseFloat(item.cost.replace('$', '')) * item.quantity).toFixed(2);
  const calculateCartTotal = () => cartItems.reduce((total, item) => total + parseFloat(item.cost.replace('$', '')) * item.quantity, 0).toFixed(2);
  const handleIncrement = (item) => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  const handleDecrement = (item) => {
    if (item.quantity === 1) dispatch(removeItem(item.name));
    else dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
  };
  const handleRemove = (item) => dispatch(removeItem(item.name));
  const handleCheckout = () => alert('Coming Soon! Thank you for shopping at Paradise Nursery 🌿');

  return (
    <div className="cart-page">
      <nav className="navbar"><h2>🌿 Paradise Nursery</h2></nav>
      <div className="cart-page-header"><h2>🛒 Your Shopping Cart</h2></div>
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty 🌱</p><br />
            <button className="continue-btn" onClick={onContinueShopping}>Browse Plants</button>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div className="cart-item" key={item.name}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>Unit price: {item.cost}</p>
                  <p>Subtotal: ${calculateTotalCost(item)}</p>
                </div>
                <div className="cart-item-controls">
                  <button className="qty-btn" onClick={() => handleDecrement(item)}>−</button>
                  <span className="qty-display">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => handleIncrement(item)}>+</button>
                  <button className="remove-btn" onClick={() => handleRemove(item)}>Remove</button>
                </div>
              </div>
            ))}
            <div className="cart-summary">
              <h3>Total: ${calculateCartTotal()}</h3>
              <button className="continue-btn" onClick={onContinueShopping}>Continue Shopping</button>
              <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;
