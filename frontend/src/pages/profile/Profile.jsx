import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { updateUserProfile } from '../../services/userService';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setSubmitting(true);
    try {
      await updateUserProfile({ name, email, ...(password ? { password } : {}) });
      setMessage('Profile updated successfully.');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="profile-page">
      <Row className="justify-content-center">
        <Col md={7} lg={6}>
          <Card className="profile-card">
            <Card.Body>
              <div className="profile-header">
                <FaUserCircle className="profile-icon" />
                <h2 className="profile-title">My Profile</h2>
              </div>

              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>New Password (optional)</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Leave blank to keep current password"
                  />
                </Form.Group>

                <Button type="submit" className="profile-save-btn w-100" disabled={submitting}>
                  {submitting ? 'Saving…' : 'Save Changes'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
