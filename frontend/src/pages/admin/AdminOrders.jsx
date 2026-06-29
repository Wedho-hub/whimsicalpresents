import React from 'react';
import { Table, Badge, Spinner, Alert } from 'react-bootstrap';
import { useFetch } from '../../hooks/useFetch';
import { getOrders } from '../../services/orderService';
import { formatPrice } from '../../utils/formatPrice';

const STATUS_VARIANT = {
  pending: 'secondary',
  processing: 'info',
  shipped: 'primary',
  delivered: 'success',
  cancelled: 'danger',
};

const AdminOrders = () => {
  const { data: orders, loading, error } = useFetch(() => getOrders(), []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h2 className="mb-4">Orders ({orders?.length ?? 0})</h2>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((o) => (
            <tr key={o._id}>
              <td>{o._id.slice(-8).toUpperCase()}</td>
              <td>{o.user?.name || 'Unknown'}</td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
              <td>{formatPrice(o.totalAmount)}</td>
              <td className="text-capitalize">{o.paymentStatus}</td>
              <td>
                <Badge bg={STATUS_VARIANT[o.status] || 'secondary'} className="text-capitalize">
                  {o.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminOrders;
