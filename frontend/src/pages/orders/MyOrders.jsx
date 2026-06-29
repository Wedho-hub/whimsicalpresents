import React from 'react';
import { Container, Card, Badge, Button } from 'react-bootstrap';
import { FaBoxOpen, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { getMyOrders } from '../../services/orderService';
import { formatPrice } from '../../utils/formatPrice';
import './MyOrders.css';

const STATUS_VARIANT = {
  pending: 'secondary',
  processing: 'info',
  shipped: 'primary',
  delivered: 'success',
  cancelled: 'danger',
};

const MyOrders = () => {
  const { data: orders, loading, error } = useFetch(() => getMyOrders(), []);

  return (
    <Container className="myorders-page">
      <h1 className="myorders-title">My Orders</h1>

      {loading ? (
        <p className="myorders-empty">Loading your orders…</p>
      ) : error ? (
        <p className="myorders-empty">Unable to load orders right now.</p>
      ) : !orders || orders.length === 0 ? (
        <div className="myorders-empty-state">
          <FaBoxOpen className="myorders-empty-icon" />
          <h3>No orders yet</h3>
          <p>Once you place an order, it will show up here.</p>
          <Button as={Link} to="/shop" className="myorders-shop-btn">
            Start Shopping <FaArrowRight className="ms-2" />
          </Button>
        </div>
      ) : (
        orders.map((order) => (
          <Card key={order._id} className="order-card">
            <Card.Body>
              <div className="order-card-header">
                <div>
                  <span className="order-id">Order #{order._id.slice(-8).toUpperCase()}</span>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <Badge bg={STATUS_VARIANT[order.status] || 'secondary'} className="order-status-badge">
                  {order.status}
                </Badge>
              </div>

              <div className="order-items-list">
                {order.products.map((item, i) => (
                  <span key={i} className="order-item-chip">
                    {item.product?.name || 'Product'} × {item.quantity}
                  </span>
                ))}
              </div>

              <div className="order-card-footer">
                <span className="order-payment">
                  Payment: <strong>{order.paymentStatus}</strong>
                </span>
                <span className="order-total">{formatPrice(order.totalAmount)}</span>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default MyOrders;
