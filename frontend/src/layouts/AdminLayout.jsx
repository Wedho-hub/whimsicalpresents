import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaTachometerAlt, FaBox, FaShoppingCart, FaUsers, FaCreditCard } from 'react-icons/fa';

const AdminLayout = () => {
  return (
    <div className="d-flex" style={{ minHeight: '100vh', background: 'var(--midnight)' }}>
      {/* Sidebar */}
      <div className="text-white" style={{ width: '250px', minHeight: '100vh', background: 'var(--midnight-2)' }}>
        <div className="p-3">
          <h5>Admin Panel</h5>
          <Nav className="flex-column">
            <LinkContainer to="/admin/dashboard">
              <Nav.Link className="text-white">
                <FaTachometerAlt className="me-2" />
                Dashboard
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/products">
              <Nav.Link className="text-white">
                <FaBox className="me-2" />
                Products
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/orders">
              <Nav.Link className="text-white">
                <FaShoppingCart className="me-2" />
                Orders
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/users">
              <Nav.Link className="text-white">
                <FaUsers className="me-2" />
                Users
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/payments">
              <Nav.Link className="text-white">
                <FaCreditCard className="me-2" />
                Payments
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow-1">
        <Navbar bg="light" expand="lg" className="px-3">
          <Navbar.Brand>Whimsical Presents - Admin</Navbar.Brand>
        </Navbar>
        <Container fluid className="p-4">
          <div className="bg-white rounded-3 p-4 shadow-sm">
            <Outlet />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AdminLayout;
