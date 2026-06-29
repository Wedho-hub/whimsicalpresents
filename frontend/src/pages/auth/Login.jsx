import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaHeart, FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Auth.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const result = await login(email, password);

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
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Sign in to continue gifting</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
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

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="auth-submit-btn w-100"
                  disabled={submitting}
                >
                  <FaSignInAlt className="me-2" />
                  {submitting ? 'Signing in…' : 'Sign In'}
                </Button>
              </Form>

              <p className="auth-switch">
                Don't have an account? <Link to="/register" state={{ from: redirectTo }}>Create one</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
