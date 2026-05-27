import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
export default function Checkout() {
  const { getCartItems } = useContext(CartContext);
  const cartItems = getCartItems();
  const updateCartItem = useContext(CartContext).updateCartItem;
  const removeFromCart = useContext(CartContext).removeFromCart;  
  const getCartTotal = useContext(CartContext).getCartTotal;  
  const clearCart = useContext(CartContext).clearCart;
  function handlePlaceOrder() {
    alert('Order placed successfully!');
    clearCart();
  }
  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className='checkout-section-title'>Order Summary</h2>
            <p>Your cart items will be displayed here.</p>
              {cartItems.map((item) => (
                <div className="checkout-item">
                  <img src={item.image} alt={item.name} className="checkout-item-image" />
                  <div className="checkout-item-details">
                    <h3 className="checkout-item-name">{item.name}</h3>
                    <p className="checkout-item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="checkout-item-controls">
                    <div className="quantity-controls">
                      {/* <button className="btn btn-outline">Remove</button> */}
                      <button className="quantity-btn" onClick={() => updateCartItem(item.id, item.quantity - 1)}>-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button className="quantity-btn" onClick={() => updateCartItem(item.id, item.quantity + 1)}>+</button>
                    </div>
                  
                  {/* <div className="checkout-item-total"> */}
                    <p className="checkout-item-total">${(item.price * item.quantity).toFixed(2)}</p>
                    <button className="btn btn-secondary btn-small" onClick={() => removeFromCart(item.id)}>Remove</button>
                  {/* </div> */}
                </div>
                </div>
              ))}
          </div>

          <div className="checkout-summary">
            <h2 className='checkout-section-title'>Payment Summary</h2>
            <div className="checkout-total">
              <p className="checkout-total-label">Subtotal:</p>
              <p className="checkout-total-value">${getCartTotal().toFixed(2)}</p>
            </div>
            <div className="checkout-total">
              <p className="checkout-total-label">Tax:</p>
              <p className="checkout-total-value">${(getCartTotal() * 0.02).toFixed(2)}</p>
            </div>
            <div className="checkout-total">
              <p className="checkout-total-label">Total:</p>
              <p className="checkout-total-value">${(getCartTotal() + getCartTotal() * 0.02).toFixed(2)}</p>
            </div>
            <button className="btn btn-primary btn-block" onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  )
}
