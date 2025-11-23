import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../../hooks/useCart.js';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card className="product-card h-100">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          variant="top"
          src={product.image || '/placeholder.jpg'}
          alt={product.name}
          className="product-image"
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <Card.Title className="product-title">{product.name}</Card.Title>
        </Link>
        <Card.Text className="product-description">
          {product.description?.substring(0, 100)}...
        </Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="product-price">${product.price}</span>
            <div className="product-rating">
              <FaStar className="text-warning" />
              <span className="ms-1">{product.rating || 0}</span>
            </div>
          </div>
          <Button
            variant="primary"
            className="w-100"
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
          >
            {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
