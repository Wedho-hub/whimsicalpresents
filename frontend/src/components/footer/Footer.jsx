import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <Container>
        <Row className="g-4">
          <Col md={4}>
            <div className="footer-brand">
              <FaHeart className="footer-heart" />
              <h5>Whimsical Presents</h5>
            </div>
            <p>Sending love home to Zimbabwe, one thoughtful gift at a time.</p>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/orders">My Orders</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Info</h5>
            <p>
              123 Main Street<br />
              Harare, Zimbabwe<br />
              Phone: +263 123 456 789<br />
              Email: info@whimsicalpresents.co.zw
            </p>
          </Col>
        </Row>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Whimsical Presents. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
