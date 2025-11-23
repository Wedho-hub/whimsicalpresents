import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge, Form } from 'react-bootstrap';
import { FaStar, FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';
import { getProductById } from '../../services/productService.js';
import { formatPrice } from '../../utils/formatPrice.js';
import { toast } from 'react-toastify';

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
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
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
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.stock || 1)) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
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
      <Container className="py-5">
        <Alert variant="danger">
          Error loading product: {error}
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Product not found.
        </Alert>
      </Container>
    );
  }

  const images = product.images || [product.image || '/placeholder-product.jpg'];

  return (
    <Container className="py-5">
      <Row>
        <Col lg={6}>
          {/* Product Images */}
          <Card className="mb-3">
            <Card.Body className="p-0">
              <div className="position-relative">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="img-fluid w-100"
                  style={{ maxHeight: '500px', objectFit: 'cover' }}
                />
                {product.stock === 0 && (
                  <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
                    Out of Stock
                  </Badge>
                )}
              </div>
              {images.length > 1 && (
                <div className="d-flex gap-2 p-3">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className={`img-thumbnail ${selectedImage === index ? 'border-primary' : ''}`}
                      style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          {/* Product Info */}
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h2 className="mb-2">{product.name}</h2>
                  <Badge bg="secondary" className="mb-2">{product.category}</Badge>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline-secondary" size="sm">
                    <FaHeart />
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    <FaShare />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < (product.rating || 0) ? 'text-warning' : 'text-muted'}
                    />
                  ))}
                  <span className="ms-2 text-muted">
                    ({product.reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <h3 className="text-primary mb-0">{formatPrice(product.price)}</h3>
                {product.originalPrice && product.originalPrice > product.price && (
                  <small className="text-muted text-decoration-line-through">
                    {formatPrice(product.originalPrice)}
                  </small>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <h5>Description</h5>
                <p className="text-muted">{product.description}</p>
              </div>

              {/* Stock Status */}
              <div className="mb-4">
                <p className="mb-1">
                  <strong>Stock:</strong>
                  <span className={`ms-2 ${product.stock > 0 ? 'text-success' : 'text-danger'}`}>
                    {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                  </span>
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              {product.stock > 0 && (
                <div className="mb-4">
                  <Row>
                    <Col sm={4}>
                      <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          min="1"
                          max={product.stock}
                          value={quantity}
                          onChange={handleQuantityChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={8}>
                      <div className="d-grid mt-4">
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={handleAddToCart}
                          disabled={product.stock === 0}
                        >
                          <FaShoppingCart className="me-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}

              {/* Additional Info */}
              <div className="border-top pt-3">
                <Row>
                  <Col sm={6}>
                    <small className="text-muted">
                      <strong>SKU:</strong> {product.sku || product._id.slice(-8)}
                    </small>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted">
                      <strong>Category:</strong> {product.category}
                    </small>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Additional Information Tabs could go here */}
    </Container>
  );
};

export default ProductDetails;
