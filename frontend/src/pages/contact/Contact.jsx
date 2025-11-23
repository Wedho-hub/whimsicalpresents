import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Address',
      details: [
        '123 Artisan Street',
        'Harare, Zimbabwe'
      ]
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      details: [
        '+263 123 456 789',
        '+263 987 654 321'
      ]
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      details: [
        'info@whimsicalpresents.co.zw',
        'support@whimsicalpresents.co.zw'
      ]
    },
    {
      icon: <FaClock />,
      title: 'Business Hours',
      details: [
        'Mon - Fri: 8:00 AM - 6:00 PM',
        'Sat: 9:00 AM - 4:00 PM',
        'Sun: Closed'
      ]
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real app, you would send this to your backend
      console.log('Contact form submitted:', formData);

      setSubmitMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <Container>
          <div className="text-center">
            <h1 className="hero-title">Get In Touch</h1>
            <p className="hero-description">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <Container>
          <Row>
            {/* Contact Information */}
            <Col lg={4} className="mb-4">
              <div className="contact-info">
                <h2 className="section-title">Contact Information</h2>
                <p className="section-description">
                  Reach out to us through any of the channels below.
                  We're here to help with your gifting needs.
                </p>

                {contactInfo.map((info, index) => (
                  <Card key={index} className="contact-card">
                    <Card.Body>
                      <div className="contact-icon">
                        {info.icon}
                      </div>
                      <h5 className="contact-title">{info.title}</h5>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="contact-detail">{detail}</p>
                      ))}
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Col>

            {/* Contact Form */}
            <Col lg={8}>
              <Card className="contact-form-card">
                <Card.Header>
                  <h3 className="form-title">Send us a Message</h3>
                </Card.Header>
                <Card.Body>
                  {submitMessage && (
                    <Alert variant="success" className="mb-4">
                      {submitMessage}
                    </Alert>
                  )}

                  {submitError && (
                    <Alert variant="danger" className="mb-4">
                      {submitError}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Your full name"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="your.email@example.com"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Subject *</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="What's this about?"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Message *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Tell us how we can help you..."
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      className="submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="me-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="map-section">
        <Container>
          <div className="map-placeholder">
            <h3 className="map-title">Find Us</h3>
            <div className="map-container">
              <div className="map-content">
                <FaMapMarkerAlt className="map-icon" />
                <p>Interactive map would be embedded here</p>
                <small className="text-muted">123 Artisan Street, Harare, Zimbabwe</small>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Contact;
