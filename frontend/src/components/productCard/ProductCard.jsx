import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../../hooks/useCart.js';
import { formatPrice } from '../../utils/formatPrice.js';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const inStock = product.stock > 0;
  const rating = Math.round(product.rating || 0);

  return (
    <Card className="product-card h-100">
      <Link to={`/product/${product._id}`} className="product-image-wrapper">
        <img
          src={product.imageUrl || '/placeholder.jpg'}
          alt={product.name}
          className="product-image"
        />
        <span className="product-category-badge text-capitalize">{product.category}</span>
        <span className="wishlist-icon" onClick={(e) => e.preventDefault()}>
          <FaHeart />
        </span>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <Card.Title className="product-title">{product.name}</Card.Title>
        </Link>
        <Card.Text className="product-description">
          {product.description?.substring(0, 90)}...
        </Card.Text>

        <span className={`product-stock-badge ${inStock ? 'in-stock' : 'out-of-stock'}`}>
          {inStock ? `${product.stock} in stock` : 'Out of stock'}
        </span>

        <div className="product-price-row">
          <span className="product-price">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="product-price-original">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <div className="product-rating">
          <span className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} style={{ opacity: i < rating ? 1 : 0.25 }} />
            ))}
          </span>
          <span className="rating-count">({product.numReviews || 0})</span>
        </div>

        <button
          type="button"
          className="btn-add-cart"
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          <FaShoppingBag />
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
