import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth.js';
import { useCart } from '../../hooks/useCart.js';
import './Navbar.css';

const NavigationBar = () => {
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();

  const logoutHandler = () => {
    logout();
  };

  return (
    <header>
      <Navbar className='navbar' expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Whimsical Presents</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto nav-menu">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/shop">
                <Nav.Link>Shop</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link className="cart-link">
                  <FaShoppingCart /> Cart
                  {getCartItemCount() > 0 && (
                    <Badge pill bg="success" className="ms-1 cart-badge">
                      {getCartItemCount()}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {user ? (
                <div className="nav-dropdown">
                  <Nav.Link className="dropdown-toggle" id="username">
                    <FaUser /> {user.name}
                  </Nav.Link>
                  <div className="dropdown-menu">
                    <LinkContainer to="/profile">
                      <Nav.Link>Profile</Nav.Link>
                    </LinkContainer>
                    <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                  </div>
                </div>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {user && user.role === 'admin' && (
                <div className="nav-dropdown">
                  <Nav.Link className="dropdown-toggle">Admin</Nav.Link>
                  <div className="dropdown-menu">
                    <LinkContainer to="/admin/users">
                      <Nav.Link>Users</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/admin/products">
                      <Nav.Link>Products</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/admin/orders">
                      <Nav.Link>Orders</Nav.Link>
                    </LinkContainer>
                  </div>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavigationBar;
