import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaCreditCard, FaTruck, FaShieldAlt, FaCheck } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { createOrder } from '../../services/orderService';
import { formatPrice } from '../../utils/formatPrice';
import './Checkout.css';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    deliveryInstructions: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('ecocash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !orderPlaced) {
      navigate('/shop');
    }
  }, [cart, navigate, orderPlaced]);

  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5; // Free shipping over $50
  const tax = subtotal * 0.15; // 15% VAT
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('Please log in to place an order');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const orderData = {
        user: user._id,
        products: cart.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: total,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          province: formData.province,
          postalCode: formData.postalCode,
          deliveryInstructions: formData.deliveryInstructions,
        },
        paymentMethod,
      };

      const response = await createOrder(orderData);

      if (response.success) {
        setOrderPlaced(true);
        clearCart();
        // Redirect to payment page with order ID
        setTimeout(() => {
          navigate(`/payment/ecocash/${response.order._id}`);
        }, 2000);
      } else {
        setError('Failed to place order. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while placing your order');
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <Container className="checkout-success">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="text-center success-card">
              <Card.Body className="p-5">
                <div className="success-icon">
                  <FaCheck />
                </div>
                <h2 className="success-title">Order Placed Successfully!</h2>
                <p className="success-message">
                  Thank you for your order. You will be redirected to the payment page shortly.
                </p>
                <Spinner animation="border" className="mt-3" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <Row>
        {/* Order Summary */}
        <Col lg={4} className="order-summary-col">
          <Card className="order-summary-card sticky-top">
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="order-items">
                {cart.map((item) => (
                  <div key={item._id} className="order-item">
                    <div className="item-info">
                      <h6 className="item-name">{item.name}</h6>
                      <span className="item-quantity">Qty: {item.quantity}</span>
                    </div>
                    <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <hr />

              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="total-row">
                  <span>Tax (15%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <hr />
                <div className="total-row total-amount">
                  <strong>Total</strong>
                  <strong>{formatPrice(total)}</strong>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Checkout Form */}
        <Col lg={8}>
          <Form onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <Card className="checkout-card">
              <Card.Header>
                <h5 className="mb-0">Shipping Information</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Address *</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address"
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>City *</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Province *</Form.Label>
                      <Form.Select
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Province</option>
                        <option value="Harare">Harare</option>
                        <option value="Bulawayo">Bulawayo</option>
                        <option value="Manicaland">Manicaland</option>
                        <option value="Mashonaland Central">Mashonaland Central</option>
                        <option value="Mashonaland East">Mashonaland East</option>
                        <option value="Mashonaland West">Mashonaland West</option>
                        <option value="Masvingo">Masvingo</option>
                        <option value="Matabeleland North">Matabeleland North</option>
                        <option value="Matabeleland South">Matabeleland South</option>
                        <option value="Midlands">Midlands</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Delivery Instructions (Optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="deliveryInstructions"
                    value={formData.deliveryInstructions}
                    onChange={handleInputChange}
                    placeholder="Any special delivery instructions..."
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Payment Method */}
            <Card className="checkout-card">
              <Card.Header>
                <h5 className="mb-0">Payment Method</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group>
                  <div className="payment-options">
                    <Form.Check
                      type="radio"
                      id="ecocash"
                      name="paymentMethod"
                      value="ecocash"
                      checked={paymentMethod === 'ecocash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      label={
                        <div className="payment-option">
                          <FaCreditCard className="payment-icon" />
                          <div>
                            <strong>EcoCash</strong>
                            <p className="mb-0 text-muted">Pay with your mobile money</p>
                          </div>
                        </div>
                      }
                    />
                  </div>
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Error Message */}
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}

            {/* Place Order Button */}
            <div className="checkout-actions">
              <Button
                as={Link}
                to="/cart"
                variant="outline-secondary"
                className="back-to-cart-btn"
              >
                Back to Cart
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isProcessing || cart.length === 0}
                className="place-order-btn"
              >
                {isProcessing ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FaCreditCard className="me-2" />
                    Place Order - {formatPrice(total)}
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
