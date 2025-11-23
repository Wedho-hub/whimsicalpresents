import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { getMyOrders } from '../../services/orderService.js';
import { formatPrice } from '../../utils/formatPrice.js';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'shipped': return 'primary';
      case 'delivered': return 'success';
      case 'cancelled': return 'danger';
      default: return 'secondary';
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
          Error loading orders: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h2 className="mb-4">
            <FaShoppingCart className="me-2" />
            My Orders
          </h2>

          {orders.length === 0 ? (
            <Alert variant="info">
              You haven't placed any orders yet.
              <Link to="/shop" className="alert-link ms-2">
                Start shopping now!
              </Link>
            </Alert>
          ) : (
            <Row>
              {orders.map((order) => (
                <Col md={6} lg={4} key={order._id} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <Card.Title className="mb-1">
                            Order #{order._id.slice(-8)}
                          </Card.Title>
                          <small className="text-muted">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </small>
                        </div>
                        <Badge bg={getStatusBadgeVariant(order.status)}>
                          {order.status}
                        </Badge>
                      </div>

                      <div className="mb-3">
                        <strong>Total: {formatPrice(order.totalAmount)}</strong>
                        <br />
                        <small className="text-muted">
                          {order.products?.length || 0} item(s)
                        </small>
                      </div>

                      <div className="d-flex gap-2">
                        <Button
                          as={Link}
                          to={`/orders/${order._id}`}
                          variant="outline-primary"
                          size="sm"
                        >
                          <FaEye className="me-1" />
                          View Details
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default OrderList;
