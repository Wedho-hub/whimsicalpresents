import React from 'react';
import { Table, Badge, Image, Spinner, Alert } from 'react-bootstrap';
import { useFetch } from '../../hooks/useFetch';
import { getProducts } from '../../services/productService';
import { formatPrice } from '../../utils/formatPrice';

const AdminProducts = () => {
  const { data, loading, error } = useFetch(() => getProducts({ limit: 100 }), []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h2 className="mb-4">Products ({data?.total ?? 0})</h2>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((p) => (
            <tr key={p._id}>
              <td><Image src={p.imageUrl} width={48} height={48} style={{ objectFit: 'cover' }} rounded /></td>
              <td>{p.name}</td>
              <td className="text-capitalize">{p.category}</td>
              <td>{formatPrice(p.price)}</td>
              <td>
                <Badge bg={p.stock > 0 ? 'success' : 'danger'}>{p.stock}</Badge>
              </td>
              <td>{p.rating?.toFixed(1) ?? '0.0'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminProducts;
