import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { formatPrice } from '../../utils/formatPrice';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <Container className="cart-page">
        <div className="cart-empty">
          <FaShoppingBag className="cart-empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Find the perfect gift for someone special.</p>
          <Button as={Link} to="/shop" className="cart-empty-btn">
            Browse Gifts <FaArrowRight className="ms-2" />
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="cart-page">
      <h1 className="cart-title">Your Cart</h1>

      <Row>
        <Col lg={8}>
          {cartItems.map((item) => (
            <Card key={item._id} className="cart-item-card">
              <Card.Body className="d-flex align-items-center gap-3">
                <Image src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h5 className="cart-item-name">{item.name}</h5>
                  <span className="cart-item-price">{formatPrice(item.price)}</span>
                </div>
                <div className="cart-item-qty">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <FaMinus />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    aria-label="Increase quantity"
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="cart-item-subtotal">
                  {formatPrice(item.price * item.quantity)}
                </div>
                <button
                  type="button"
                  className="cart-remove-btn"
                  onClick={() => removeFromCart(item._id)}
                  aria-label="Remove item"
                >
                  <FaTrash />
                </button>
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col lg={4}>
          <Card className="cart-summary-card">
            <Card.Body>
              <h5 className="cart-summary-title">Order Summary</h5>
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              <p className="cart-summary-note">
                Shipping and tax calculated at checkout.
              </p>
              <Button className="cart-checkout-btn w-100" onClick={handleCheckout}>
                Proceed to Checkout <FaArrowRight className="ms-2" />
              </Button>
              <Button as={Link} to="/shop" variant="outline-secondary" className="cart-continue-btn w-100 mt-2">
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
