import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert, ListGroup } from 'react-bootstrap';
import { FaArrowLeft, FaMapMarkerAlt, FaCreditCard, FaTruck } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { getOrderById } from '../../services/orderService.js';
import { formatPrice } from '../../utils/formatPrice.js';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user && id) {
      fetchOrder();
    }
  }, [user, id]);

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

  const getPaymentStatusBadgeVariant = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'paid': return 'success';
      case 'failed': return 'danger';
      case 'refunded': return 'info';
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
          Error loading order details: {error}
        </Alert>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Order not found.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <Button as={Link} to="/orders" variant="outline-secondary" className="mb-4">
            <FaArrowLeft className="me-2" />
            Back to Orders
          </Button>

          <h2 className="mb-4">Order Details</h2>

          <Row>
            <Col lg={8}>
              {/* Order Summary */}
              <Card className="mb-4">
                <Card.Header>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Order #{order._id.slice(-8)}</h5>
                    <div>
                      <Badge bg={getStatusBadgeVariant(order.status)} className="me-2">
                        {order.status}
                      </Badge>
                      <Badge bg={getPaymentStatusBadgeVariant(order.paymentStatus)}>
                        {order.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p><strong>Total Amount:</strong> {formatPrice(order.totalAmount)}</p>
                    </Col>
                    <Col md={6}>
                      <p><strong>Payment Method:</strong> {order.paymentMethod || 'EcoCash'}</p>
                      <p><strong>Items:</strong> {order.products?.length || 0}</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Products */}
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">Products</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {order.products?.map((item, index) => (
                      <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{item.product?.name || 'Product'}</h6>
                          <small className="text-muted">
                            Quantity: {item.quantity} × {formatPrice(item.product?.price || 0)}
                          </small>
                        </div>
                        <strong>{formatPrice((item.product?.price || 0) * item.quantity)}</strong>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              {/* Shipping Address */}
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <FaMapMarkerAlt className="me-2" />
                    Shipping Address
                  </h5>
                </Card.Header>
                <Card.Body>
                  <p className="mb-0">{order.shippingAddress}</p>
                </Card.Body>
              </Card>

              {/* Order Status */}
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <FaTruck className="me-2" />
                    Order Status
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Order Placed</span>
                      <Badge bg="success">✓</Badge>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Processing</span>
                      <Badge bg={order.status !== 'pending' ? 'success' : 'secondary'}>✓</Badge>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipped</span>
                      <Badge bg={['shipped', 'delivered'].includes(order.status) ? 'success' : 'secondary'}>✓</Badge>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Delivered</span>
                      <Badge bg={order.status === 'delivered' ? 'success' : 'secondary'}>✓</Badge>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Payment Info */}
              <Card>
                <Card.Header>
                  <h5 className="mb-0">
                    <FaCreditCard className="me-2" />
                    Payment Information
                  </h5>
                </Card.Header>
                <Card.Body>
                  <p><strong>Status:</strong> <Badge bg={getPaymentStatusBadgeVariant(order.paymentStatus)}>{order.paymentStatus}</Badge></p>
                  <p><strong>Method:</strong> {order.paymentMethod || 'EcoCash'}</p>
                  {order.transactionId && (
                    <p><strong>Transaction ID:</strong> {order.transactionId}</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetails;
