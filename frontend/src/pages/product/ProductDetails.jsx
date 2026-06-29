import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge, Form } from 'react-bootstrap';
import { FaStar, FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';
import { getProductById } from '../../services/productService.js';
import { formatPrice } from '../../utils/formatPrice.js';
import { toast } from 'react-toastify';
import './ProductDetails.css';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id);
        setProduct(data);
        setSelectedImage(0);
        setQuantity(1);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= (product?.stock || 1)) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 product-details-page">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 product-details-page">
        <Alert variant="danger">Error loading product: {error}</Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5 product-details-page">
        <Alert variant="warning">Product not found.</Alert>
      </Container>
    );
  }

  const images = product.images?.length ? product.images : [product.imageUrl];

  return (
    <Container className="py-5 product-details-page">
      <Row>
        <Col lg={6}>
          <Card className="mb-3 product-image-card">
            <Card.Body className="p-0">
              <div className="position-relative">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="product-main-image"
                />
                {product.stock === 0 && (
                  <Badge bg="danger" className="position-absolute top-0 end-0 m-3">
                    Out of Stock
                  </Badge>
                )}
              </div>
              {images.length > 1 && (
                <div className="d-flex gap-2 p-3 product-thumbnails">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className={`product-thumbnail ${selectedImage === index ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="product-info-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h2 className="product-name">{product.name}</h2>
                  <Badge bg="secondary" className="mb-2 text-capitalize">{product.category}</Badge>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline-secondary" size="sm" className="icon-btn">
                    <FaHeart />
                  </Button>
                  <Button variant="outline-secondary" size="sm" className="icon-btn">
                    <FaShare />
                  </Button>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.round(product.rating || 0) ? 'star-filled' : 'star-empty'}
                    />
                  ))}
                  <span className="ms-2 product-reviews-count">
                    ({product.numReviews || 0} reviews)
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="product-price">{formatPrice(product.price)}</h3>
                {product.originalPrice && product.originalPrice > product.price && (
                  <small className="product-original-price">
                    {formatPrice(product.originalPrice)}
                  </small>
                )}
              </div>

              <div className="mb-4">
                <h5 className="product-section-label">Description</h5>
                <p className="product-description">{product.description}</p>
              </div>

              <div className="mb-4">
                <p className="mb-1">
                  <strong className="product-section-label">Stock:</strong>
                  <span className={`ms-2 ${product.stock > 0 ? 'stock-available' : 'stock-out'}`}>
                    {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                  </span>
                </p>
              </div>

              {product.stock > 0 && (
                <div className="mb-4">
                  <Row>
                    <Col sm={4}>
                      <Form.Group>
                        <Form.Label className="product-section-label">Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          min="1"
                          max={product.stock}
                          value={quantity}
                          onChange={handleQuantityChange}
                          className="qty-input"
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={8}>
                      <div className="d-grid mt-4">
                        <Button className="add-to-cart-btn" size="lg" onClick={handleAddToCart}>
                          <FaShoppingCart className="me-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}

              <div className="border-top pt-3 product-meta">
                <Row>
                  <Col sm={6}>
                    <small><strong>SKU:</strong> {product.sku || product._id.slice(-8)}</small>
                  </Col>
                  <Col sm={6}>
                    <small className="text-capitalize"><strong>Category:</strong> {product.category}</small>
                  </Col>
                </Row>
              </div>

              <div className="mt-3">
                <Link to="/shop" className="back-to-shop-link">← Back to all gifts</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
