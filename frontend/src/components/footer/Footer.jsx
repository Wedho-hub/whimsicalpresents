import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Whimsical Presents</h5>
            <p>Your one-stop shop for unique and thoughtful gifts in Zimbabwe.</p>
            <div className="social-icons">
              <a href="#" className="text-light me-3">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-light me-3">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-light">
                <FaInstagram size={24} />
              </a>
            </div>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <LinkContainer to="/about">
                  <a href="#" className="text-light">About Us</a>
                </LinkContainer>
              </li>
              <li>
                <LinkContainer to="/contact">
                  <a href="#" className="text-light">Contact</a>
                </LinkContainer>
              </li>
              <li>
                <LinkContainer to="/shop">
                  <a href="#" className="text-light">Shop</a>
                </LinkContainer>
              </li>
              <li>
                <a href="#" className="text-light">Privacy Policy</a>
              </li>
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
        <hr />
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; 2024 Whimsical Presents. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
