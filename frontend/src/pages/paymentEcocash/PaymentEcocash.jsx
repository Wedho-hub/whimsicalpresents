import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, ProgressBar } from 'react-bootstrap';
import { FaMobileAlt, FaCheckCircle, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import { useParams, Link } from 'react-router-dom';
import { usePayment } from '../../hooks/usePayment';
import { formatPrice } from '../../utils/formatPrice';
import './PaymentEcocash.css';

const PaymentEcocash = () => {
  const { orderId } = useParams();
  const { processPayment, loading, error } = usePayment();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentStep, setPaymentStep] = useState('form'); // form, processing, success, failed
  const [transactionId, setTransactionId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  // Mock order details (in real app, fetch from API)
  useEffect(() => {
    if (orderId) {
      // Simulate fetching order details
      setOrderDetails({
        _id: orderId,
        totalAmount: 150.00,
        items: [
          { name: 'Handcrafted Basket', quantity: 1, price: 75.00 },
          { name: 'Zimbabwean Beadwork', quantity: 2, price: 37.50 }
        ],
        customerName: 'John Doe',
        customerEmail: 'john@example.com'
      });
    }
  }, [orderId]);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber || !phoneNumber.match(/^(\+263|0)[7-8][0-9]{8}$/)) {
      alert('Please enter a valid Zimbabwean phone number');
      return;
    }

    setPaymentStep('processing');

    try {
      const result = await processPayment({
        orderId,
        phoneNumber,
        amount: orderDetails?.totalAmount
      });

      if (result.success) {
        setTransactionId(result.transactionId);
        setPaymentStep('success');
      } else {
        setPaymentStep('failed');
      }
    } catch (err) {
      console.error('Payment processing error:', err);
      setPaymentStep('failed');
    }
  };

  const handleRetry = () => {
    setPaymentStep('form');
    setTransactionId('');
  };

  const renderPaymentForm = () => (
    <Card className="payment-card">
      <Card.Header className="text-center">
        <FaMobileAlt className="payment-icon mb-3" />
        <h3>EcoCash Payment</h3>
        <p className="text-muted">Complete your payment securely</p>
      </Card.Header>

      <Card.Body>
        {orderDetails && (
          <div className="order-summary mb-4">
            <h5>Order Summary</h5>
            <div className="order-items">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="order-item">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <hr />
            <div className="order-total">
              <strong>Total: {formatPrice(orderDetails.totalAmount)}</strong>
            </div>
          </div>
        )}

        <Form onSubmit={handlePhoneSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>EcoCash Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="0771234567 or +263771234567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="phone-input"
            />
            <Form.Text className="text-muted">
              Enter the phone number linked to your EcoCash account
            </Form.Text>
          </Form.Group>

          <div className="payment-instructions mb-4">
            <h6>How it works:</h6>
            <ol>
              <li>Enter your EcoCash-registered phone number</li>
              <li>Click "Pay Now" to initiate the payment</li>
              <li>You'll receive a prompt on your phone</li>
              <li>Enter your EcoCash PIN to complete the transaction</li>
            </ol>
          </div>

          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <div className="payment-actions">
            <Button
              as={Link}
              to="/checkout"
              variant="outline-secondary"
              className="back-btn"
            >
              <FaArrowLeft className="me-2" />
              Back to Checkout
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="pay-btn"
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Processing...
                </>
              ) : (
                <>
                  <FaMobileAlt className="me-2" />
                  Pay {orderDetails ? formatPrice(orderDetails.totalAmount) : ''}
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderProcessing = () => (
    <Card className="payment-card text-center">
      <Card.Body className="p-5">
        <div className="processing-icon mb-4">
          <FaMobileAlt className="fa-spin" />
        </div>
        <h3>Processing Payment</h3>
        <p className="text-muted mb-4">
          Please check your phone and complete the EcoCash transaction
        </p>
        <ProgressBar animated now={75} className="mb-3" />
        <small className="text-muted">
          This may take a few moments...
        </small>
      </Card.Body>
    </Card>
  );

  const renderSuccess = () => (
    <Card className="payment-card text-center success-card">
      <Card.Body className="p-5">
        <FaCheckCircle className="success-icon mb-4" />
        <h3>Payment Successful!</h3>
        <p className="text-muted mb-3">
          Your payment has been processed successfully.
        </p>
        {transactionId && (
          <div className="transaction-info mb-4">
            <strong>Transaction ID:</strong> {transactionId}
          </div>
        )}
        <div className="success-actions">
          <Button as={Link} to="/orders" variant="primary" className="me-2">
            View Orders
          </Button>
          <Button as={Link} to="/shop" variant="outline-primary">
            Continue Shopping
          </Button>
        </div>
      </Card.Body>
    </Card>
  );

  const renderFailed = () => (
    <Card className="payment-card text-center failed-card">
      <Card.Body className="p-5">
        <FaExclamationTriangle className="failed-icon mb-4" />
        <h3>Payment Failed</h3>
        <p className="text-muted mb-4">
          We couldn't process your payment. Please try again or contact support.
        </p>
        <div className="failed-actions">
          <Button onClick={handleRetry} variant="primary" className="me-2">
            Try Again
          </Button>
          <Button as={Link} to="/contact" variant="outline-primary">
            Contact Support
          </Button>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Container className="payment-ecocash-page">
      <div className="payment-header text-center mb-4">
        <h1>Complete Your Payment</h1>
        <p className="text-muted">Secure EcoCash payment for your order</p>
      </div>

      <Row className="justify-content-center">
        <Col lg={6} md={8}>
          {paymentStep === 'form' && renderPaymentForm()}
          {paymentStep === 'processing' && renderProcessing()}
          {paymentStep === 'success' && renderSuccess()}
          {paymentStep === 'failed' && renderFailed()}
        </Col>
      </Row>

      {/* Security Notice */}
      <div className="security-notice text-center mt-4">
        <small className="text-muted">
          🔒 Your payment information is secure and encrypted.
          We never store your EcoCash PIN or full card details.
        </small>
      </div>
    </Container>
  );
};

export default PaymentEcocash;
