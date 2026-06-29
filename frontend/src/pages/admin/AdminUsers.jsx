import React from 'react';
import { Table, Badge, Spinner, Alert } from 'react-bootstrap';
import { useFetch } from '../../hooks/useFetch';
import { getUsers } from '../../services/userService';

const AdminUsers = () => {
  const { data: users, loading, error } = useFetch(() => getUsers(), []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h2 className="mb-4">Users ({users?.length ?? 0})</h2>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <Badge bg={u.role === 'admin' ? 'warning' : 'secondary'} className="text-capitalize">
                  {u.role}
                </Badge>
              </td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminUsers;
