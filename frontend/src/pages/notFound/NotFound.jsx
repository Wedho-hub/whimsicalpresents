import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaHome, FaSearch, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <Container>
        <Row className="align-items-center min-vh-100">
          <Col className="text-center">
            <div className="error-content">
              <div className="error-code">404</div>
              <h1 className="error-title">Oops! Page Not Found</h1>
              <p className="error-description">
                The page you're looking for doesn't exist or has been moved.
                Let's get you back on track with some amazing gifts!
              </p>

              <div className="error-actions">
                <Button as={Link} to="/" variant="primary" size="lg" className="error-btn">
                  <FaHome className="me-2" />
                  Go Home
                </Button>
                <Button as={Link} to="/shop" variant="outline-primary" size="lg" className="error-btn">
                  <FaShoppingBag className="me-2" />
                  Shop Gifts
                </Button>
                <Button as={Link} to="/contact" variant="outline-secondary" size="lg" className="error-btn">
                  <FaSearch className="me-2" />
                  Contact Us
                </Button>
              </div>

              <div className="error-suggestions">
                <h3>Popular Pages</h3>
                <div className="suggestion-links">
                  <Link to="/shop" className="suggestion-link">Shop</Link>
                  <Link to="/about" className="suggestion-link">About Us</Link>
                  <Link to="/contact" className="suggestion-link">Contact</Link>
                  <Link to="/checkout" className="suggestion-link">Checkout</Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Decorative Elements */}
      <div className="floating-elements">
        <div className="floating-gift gift-1">🎁</div>
        <div className="floating-gift gift-2">🎀</div>
        <div className="floating-gift gift-3">💝</div>
        <div className="floating-gift gift-4">🎈</div>
      </div>
    </div>
  );
};

export default NotFound;
