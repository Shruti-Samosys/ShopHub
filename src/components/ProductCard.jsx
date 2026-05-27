import React from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
export default function ProductCard({product}) {
  const { addToCart } = useContext(CartContext);
  const cartItems = useContext(CartContext).cartItems;
  const inCart = cartItems.find(item => item.id === product.id);
  return (
     <div  className="product-card">
        <img src={product.image} alt={product.name} className='product-card-image' />
        <div className="product-card-content">
            <h3 className='product-card-name'>{product.name}</h3>
            <p className='product-card-price'>${product.price}</p>
            <div className='product-card-actions'>
                <Link className='btn btn-secondary' to={`/products/${product.id}`}>
                    View Details
                </Link>
                <button className='btn btn-primary' onClick={() => addToCart(product.id)}>
                    Add to Cart {inCart ? ` (${inCart.quantity})` : ''}
                </button>
            </div>
        </div>
    </div>
  );
}
