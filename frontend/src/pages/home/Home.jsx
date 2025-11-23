import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Carousel, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaHeart, FaStar, FaTruck, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import ProductCard from '../../components/productCard/ProductCard';
import Article from '../../components/article/Article';
import { useFetch } from '../../hooks/useFetch';
import { getProducts } from '../../services/productService';
import './Home.css';

// Mock data for articles (since we don't have an articles API yet)
const MOCK_ARTICLES = [
  {
    _id: '1',
    title: 'The Art of Gift Giving in Zimbabwe',
    excerpt: 'Discover the rich traditions and modern trends in Zimbabwean gift culture...',
    category: 'Culture',
    createdAt: new Date().toISOString(),
    imageUrl: '/article1.jpg',
  },
  {
    _id: '2',
    title: 'Sustainable Gifts for a Better Tomorrow',
    excerpt: 'Learn about eco-friendly gift options that make a positive impact...',
    category: 'Sustainability',
    createdAt: new Date().toISOString(),
    imageUrl: '/article2.jpg',
  },
  {
    _id: '3',
    title: 'Personalized Gifts That Wow',
    excerpt: 'Explore creative ways to make your gifts more meaningful and memorable...',
    category: 'Tips',
    createdAt: new Date().toISOString(),
    imageUrl: '/article3.jpg',
  },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);

  const { data: products, loading, error } = useFetch(() => getProducts({ limit: 8 }), []);

  useEffect(() => {
    if (products) {
      // Get featured products (first 4)
      setFeaturedProducts(products.slice(0, 4));
    }
    setLatestArticles(MOCK_ARTICLES);
  }, [products]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Carousel className="hero-carousel">
          <Carousel.Item>
            <div className="hero-slide slide-1">
              <Container>
                <Row className="align-items-center">
                  <Col lg={6}>
                    <div className="hero-content">
                      <h1 className="hero-title">
                        Whimsical Presents
                        <span className="hero-subtitle">for Every Occasion</span>
                      </h1>
                      <p className="hero-description">
                        Discover unique and thoughtful gifts from Zimbabwe's finest artisans.
                        Perfect for birthdays, weddings, anniversaries, and more.
                      </p>
                      <div className="hero-buttons">
                        <Button as={Link} to="/shop" variant="primary" size="lg" className="hero-btn hero-btn-primary">
                          <FaShoppingBag className="btn-icon" />
                          Shop Now
                        </Button>
                        <Button as={Link} to="/about" variant="outline-light" size="lg" className="hero-btn hero-btn-outline">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="hero-slide slide-2">
              <Container>
                <Row className="align-items-center">
                  <Col lg={6}>
                    <div className="hero-content">
                      <h1 className="hero-title">
                        Handcrafted with
                        <span className="hero-subtitle">Love & Tradition</span>
                      </h1>
                      <p className="hero-description">
                        Support local artisans while finding the perfect gift.
                        Each piece tells a story of Zimbabwean craftsmanship.
                      </p>
                      <div className="hero-buttons">
                        <Button as={Link} to="/shop" variant="primary" size="lg" className="hero-btn hero-btn-primary">
                          <FaHeart className="btn-icon" />
                          Explore Gifts
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <Row>
            <Col lg={4} md={6} className="mb-4">
              <Card className="feature-card text-center">
                <Card.Body>
                  <FaTruck className="feature-icon" />
                  <Card.Title>Free Delivery</Card.Title>
                  <Card.Text>
                    Free shipping on orders over $50 within Zimbabwe
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4} md={6} className="mb-4">
              <Card className="feature-card text-center">
                <Card.Body>
                  <FaShieldAlt className="feature-icon" />
                  <Card.Title>Secure Payment</Card.Title>
                  <Card.Text>
                    Safe and secure payment with EcoCash integration
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4} md={6} className="mb-4">
              <Card className="feature-card text-center">
                <Card.Body>
                  <FaHeadset className="feature-icon" />
                  <Card.Title>24/7 Support</Card.Title>
                  <Card.Text>
                    Our customer service team is always here to help
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section">
        <Container>
          <div className="section-header text-center">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              Discover our most popular and highly-rated gifts
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center">
              Error loading products: {error}
            </div>
          ) : (
            <Row>
              {featuredProducts.map((product) => (
                <Col lg={3} md={6} key={product._id} className="mb-4">
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}

          <div className="text-center mt-4">
            <Button as={Link} to="/shop" variant="outline-primary" size="lg">
              View All Products
            </Button>
          </div>
        </Container>
      </section>

      {/* Blog Section */}
      <section className="blog-section">
        <Container>
          <div className="section-header text-center">
            <h2 className="section-title">Latest from Our Blog</h2>
            <p className="section-subtitle">
              Tips, trends, and stories from the world of gifting
            </p>
          </div>

          <Row>
            {latestArticles.map((article) => (
              <Col lg={4} md={6} key={article._id} className="mb-4">
                <Article article={article} />
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <Button as={Link} to="/blog" variant="outline-primary" size="lg">
              Read More Articles
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h2 className="cta-title">Ready to Find the Perfect Gift?</h2>
              <p className="cta-description">
                Browse our extensive collection and let us help you find something special.
              </p>
            </Col>
            <Col lg={4} className="text-lg-end">
              <Button as={Link} to="/shop" variant="light" size="lg" className="cta-btn">
                Start Shopping
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
