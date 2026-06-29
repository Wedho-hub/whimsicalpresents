import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaHeart, FaUserPlus } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Auth.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setSubmitting(true);
    const result = await register(name, email, password);
    setSubmitting(false);

    if (result.success) {
      navigate(redirectTo, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <Container className="auth-page">
      <Row className="justify-content-center">
        <Col md={7} lg={5}>
          <Card className="auth-card">
            <Card.Body>
              <div className="auth-header">
                <FaHeart className="auth-heart" />
                <h2 className="auth-title">Join Whimsical Presents</h2>
                <p className="auth-subtitle">Send love home in just a few clicks</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="auth-submit-btn w-100"
                  disabled={submitting}
                >
                  <FaUserPlus className="me-2" />
                  {submitting ? 'Creating account…' : 'Create Account'}
                </Button>
              </Form>

              <p className="auth-switch">
                Already have an account? <Link to="/login" state={{ from: redirectTo }}>Sign in</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
