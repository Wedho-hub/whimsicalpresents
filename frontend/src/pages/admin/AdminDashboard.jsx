import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaBox, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { useFetch } from '../../hooks/useFetch';
import { getProducts } from '../../services/productService';
import { getOrders } from '../../services/orderService';
import { getUsers } from '../../services/userService';
import { formatPrice } from '../../utils/formatPrice';

const AdminDashboard = () => {
  const { data: productData } = useFetch(() => getProducts({ limit: 1 }), []);
  const { data: orders } = useFetch(() => getOrders(), []);
  const { data: users } = useFetch(() => getUsers(), []);

  const totalRevenue = (orders || []).reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      <Row className="g-4">
        <Col md={3}>
          <Card>
            <Card.Body>
              <FaBox className="mb-2 text-primary" size={24} />
              <h4>{productData?.total ?? '—'}</h4>
              <small className="text-muted">Products</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <FaShoppingCart className="mb-2 text-primary" size={24} />
              <h4>{orders?.length ?? '—'}</h4>
              <small className="text-muted">Orders</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <FaUsers className="mb-2 text-primary" size={24} />
              <h4>{users?.length ?? '—'}</h4>
              <small className="text-muted">Customers</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <h4>{formatPrice(totalRevenue)}</h4>
              <small className="text-muted">Total Revenue</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
