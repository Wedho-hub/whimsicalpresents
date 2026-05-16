import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaHeart, FaGift, FaMars, FaVenus, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth.js';
import { useCart } from '../../hooks/useCart.js';
import './Navbar.css';

const NavigationBar = () => {
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setUserMenuOpen(false);
    setAdminMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      {/* Top announcement bar */}
      <div className="announcement-bar">
        <Container>
          <p className="announcement-text">
            🎁 Free delivery within Zimbabwe on orders over $50 &nbsp;|&nbsp; Pay with EcoCash or USD &nbsp;|&nbsp; Same-day delivery in Harare
          </p>
        </Container>
      </div>

      {/* Main Navbar */}
      <Navbar className="main-navbar" expand="lg" collapseOnSelect>
        <Container>
          {/* Brand / Logo */}
          <Link to="/" className="navbar-brand-link">
            <div className="brand-logo">
              <FaHeart className="brand-heart" />
              <span className="brand-name">Whimsical Presents</span>
            </div>
          </Link>

          <Navbar.Toggle
            aria-controls="main-nav"
            className="nav-toggler"
          />

          <Navbar.Collapse id="main-nav">
            <Nav className="mx-auto main-nav-links">
              <Link
                to="/"
                className={`nav-item-link ${isActive('/') ? 'active' : ''}`}
              >
                Home
              </Link>

              <Link
                to="/shop"
                className={`nav-item-link ${isActive('/shop') ? 'active' : ''}`}
              >
                All Gifts
              </Link>

              <Link
                to="/shop?for=her"
                className="nav-item-link nav-item-her"
              >
                <FaVenus className="nav-gender-icon" />
                For Her
              </Link>

              <Link
                to="/shop?for=him"
                className="nav-item-link nav-item-him"
              >
                <FaMars className="nav-gender-icon" />
                For Him
              </Link>

              <Link
                to="/shop?occasion=true"
                className="nav-item-link"
              >
                <FaGift className="nav-gender-icon" />
                Occasions
              </Link>

              <Link
                to="/about"
                className={`nav-item-link ${isActive('/about') ? 'active' : ''}`}
              >
                About
              </Link>

              <Link
                to="/contact"
                className={`nav-item-link ${isActive('/contact') ? 'active' : ''}`}
              >
                Contact
              </Link>
            </Nav>

            {/* Right side actions */}
            <Nav className="nav-actions">
              {/* Cart */}
              <Link to="/cart" className="nav-action-btn cart-btn">
                <FaShoppingCart />
                {getCartItemCount() > 0 && (
                  <Badge className="cart-count">{getCartItemCount()}</Badge>
                )}
              </Link>

              {/* User menu */}
              {user ? (
                <div
                  className={`nav-user-menu ${userMenuOpen ? 'open' : ''}`}
                  onMouseEnter={() => setUserMenuOpen(true)}
                  onMouseLeave={() => setUserMenuOpen(false)}
                >
                  <button className="nav-action-btn user-btn">
                    <FaUser />
                    <span className="user-name">{user.name.split(' ')[0]}</span>
                    <FaChevronDown className="chevron" />
                  </button>
                  <div className="user-dropdown">
                    <Link to="/profile" className="dropdown-item-link">My Profile</Link>
                    <Link to="/orders" className="dropdown-item-link">My Orders</Link>
                    <hr className="dropdown-divider" />
                    <button className="dropdown-item-link dropdown-logout" onClick={logout}>
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="nav-signin-btn">
                  <FaUser />
                  Sign In
                </Link>
              )}

              {/* Admin menu */}
              {user?.role === 'admin' && (
                <div
                  className={`nav-user-menu admin-menu ${adminMenuOpen ? 'open' : ''}`}
                  onMouseEnter={() => setAdminMenuOpen(true)}
                  onMouseLeave={() => setAdminMenuOpen(false)}
                >
                  <button className="nav-action-btn admin-btn">
                    Admin
                    <FaChevronDown className="chevron" />
                  </button>
                  <div className="user-dropdown">
                    <Link to="/admin/products" className="dropdown-item-link">Products</Link>
                    <Link to="/admin/orders" className="dropdown-item-link">Orders</Link>
                    <Link to="/admin/users" className="dropdown-item-link">Users</Link>
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
