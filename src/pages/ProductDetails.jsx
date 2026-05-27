import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import  products  from '../data/products';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
function ProductDetails() {
    const { addToCart } = useContext(CartContext);
    const { id } = useParams()
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        // Fetch product details using the id
       const foundProduct = products.find(p => p.id === parseInt(id));
       setProduct(foundProduct);

       if (!foundProduct) {
        console.error('Product not found');
        navigate('/'); // Redirect to home if product not found
        return;
       }
    }, [id]);

    if (!product) {
        return <div className="page"><p>Loading product details...</p></div>;
    }

    console.log(product);
  return (
    <div className="page">
        <div className="container">
            <div className="product-detail">
                <div className="product-detail-image">
                    <img src={product?.image} alt={product?.name} />
                    
                </div>
                <div className="product-detail-content">
                    <h1 className="product-detail-name" >{product?.name}</h1>
                    <p className="product-detail-description">{product?.description}</p>
                    <p className="product-detail-price">${product?.price.toFixed(2)}</p>
                    <button className='btn btn-primary' onClick={() => addToCart(product.id)}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails