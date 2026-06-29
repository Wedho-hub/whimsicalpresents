import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeart, FaUsers, FaAward, FaLeaf, FaHandshake, FaStar } from 'react-icons/fa';
import './About.css';

const About = () => {
  const values = [
    {
      icon: <FaHeart />,
      title: 'Passion for Gifts',
      description: 'We believe every gift tells a story and creates lasting memories.'
    },
    {
      icon: <FaUsers />,
      title: 'Community Focus',
      description: 'Supporting local artisans and building stronger communities through meaningful commerce.'
    },
    {
      icon: <FaAward />,
      title: 'Quality Excellence',
      description: 'Only the finest handcrafted products that meet our high standards.'
    },
    {
      icon: <FaLeaf />,
      title: 'Sustainability',
      description: 'Committed to eco-friendly practices and sustainable sourcing.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Happy Customers' },
    { number: '200+', label: 'Unique Products' },
    { number: '50+', label: 'Local Artisans' },
    { number: '4.8', label: 'Average Rating' }
  ];

  const team = [
    {
      name: 'Tendai Chitsungo',
      role: 'Founder & CEO',
      bio: 'Passionate about connecting Zimbabwean artisans with the world.',
      image: 'https://loremflickr.com/400/400/portrait,businessman?lock=21',
    },
    {
      name: 'Nomsa Moyo',
      role: 'Head of Design',
      bio: 'Curating the most beautiful and meaningful gift collections.',
      image: 'https://loremflickr.com/400/400/portrait,businesswoman?lock=22',
    },
    {
      name: 'Kudakwashe Ndlovu',
      role: 'Operations Manager',
      bio: 'Ensuring every order is handled with care and delivered on time.',
      image: 'https://loremflickr.com/400/400/portrait,man?lock=23',
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="hero-title">About Whimsical Presents</h1>
                <p className="hero-description">
                  We're more than just a gift shop. We're a celebration of Zimbabwean craftsmanship,
                  culture, and creativity. Every product in our collection tells a story of tradition,
                  innovation, and heart.
                </p>
                <Button href="#story" variant="primary" size="lg" className="hero-btn">
                  Our Story
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image">
                <img
                  src="https://loremflickr.com/700/600/handicraft,workshop?lock=24"
                  alt="Zimbabwean artisans at work"
                  className="img-fluid rounded"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Story Section */}
      <section id="story" className="story-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="story-image">
                <img
                  src="https://loremflickr.com/700/600/giftbox,wrapping?lock=25"
                  alt="Our story"
                  className="img-fluid rounded"
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="story-content">
                <h2 className="section-title">Our Story</h2>
                <p className="story-text">
                  Whimsical Presents was born from a simple idea: to showcase the incredible talent
                  and creativity of Zimbabwean artisans to the world. Founded in 2020, we've grown
                  from a small online store to a beloved destination for unique, handcrafted gifts.
                </p>
                <p className="story-text">
                  We work directly with local artisans, ensuring fair wages and sustainable practices.
                  Each piece in our collection is carefully selected to represent the rich cultural
                  heritage and artistic excellence of Zimbabwe.
                </p>
                <p className="story-text">
                  Our mission is to make gifting more meaningful, one handcrafted treasure at a time.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </div>

          <Row>
            {values.map((value, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <Card className="value-card text-center h-100">
                  <Card.Body>
                    <div className="value-icon">
                      {value.icon}
                    </div>
                    <Card.Title className="value-title">{value.title}</Card.Title>
                    <Card.Text className="value-description">
                      {value.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <Container>
          <Row>
            {stats.map((stat, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <div className="stat-item text-center">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              The passionate people behind Whimsical Presents
            </p>
          </div>

          <Row>
            {team.map((member, index) => (
              <Col lg={4} md={6} key={index} className="mb-4">
                <Card className="team-card text-center h-100">
                  <div className="team-image-container">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="team-image"
                      onError={(e) => {
                        e.target.src = '/placeholder-avatar.jpg';
                      }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="team-name">{member.name}</Card.Title>
                    <Card.Subtitle className="team-role mb-3">{member.role}</Card.Subtitle>
                    <Card.Text className="team-bio">{member.bio}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h2 className="cta-title">Join Our Community</h2>
              <p className="cta-description">
                Be part of the movement to celebrate Zimbabwean craftsmanship.
                Shop our collection and share the joy of meaningful gifting.
              </p>
            </Col>
            <Col lg={4} className="text-lg-end">
              <Button href="/shop" variant="primary" size="lg" className="cta-btn">
                <FaHandshake className="me-2" />
                Shop Now
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;
