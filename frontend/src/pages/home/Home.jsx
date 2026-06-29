import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaShoppingBag, FaHeart, FaStar, FaTruck, FaShieldAlt,
  FaHeadset, FaArrowRight, FaVenus, FaMars, FaGift,
  FaCheckCircle, FaMobileAlt, FaBox,
} from 'react-icons/fa';
import { GiDiamondRing, GiRose, GiChocolateBar } from 'react-icons/gi';
import ProductCard from '../../components/productCard/ProductCard';
import Reveal from '../../components/reveal/Reveal';
import { useFetch } from '../../hooks/useFetch';
import { getProducts } from '../../services/productService';
import './Home.css';

const GIFT_CATEGORIES = [
  {
    id: 'her',
    label: 'For Her',
    icon: <FaVenus />,
    tagline: 'Jewellery · Perfumes · Bouquets · Spa Sets',
    color: 'rose',
    link: '/shop?for=her',
    emoji: '💝',
  },
  {
    id: 'him',
    label: 'For Him',
    icon: <FaMars />,
    tagline: 'Gadgets · Grooming · Watches · Spirits',
    color: 'blue',
    link: '/shop?for=him',
    emoji: '💙',
  },
  {
    id: 'general',
    label: 'General Gifts',
    icon: <FaGift />,
    tagline: 'Hampers · Home · Chocolates · Experiences',
    color: 'gold',
    link: '/shop',
    emoji: '🎁',
  },
];

const OCCASIONS = [
  { label: "Valentine's Day", emoji: '💕', link: '/shop?occasion=valentines' },
  { label: 'Birthday',        emoji: '🎂', link: '/shop?occasion=birthday'   },
  { label: 'Wedding',         emoji: '💍', link: '/shop?occasion=wedding'    },
  { label: 'Anniversary',     emoji: '🌹', link: '/shop?occasion=anniversary'},
  { label: 'Christmas',       emoji: '🎄', link: '/shop?occasion=christmas'  },
  { label: 'Graduation',      emoji: '🎓', link: '/shop?occasion=graduation' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: <FaShoppingBag />,
    title: 'Choose Your Gift',
    desc: 'Browse curated collections for him, her, or general celebrations. Personalise with a heartfelt message.',
  },
  {
    step: '02',
    icon: <FaMobileAlt />,
    title: 'Pay Securely',
    desc: 'Pay in USD or ZWG via EcoCash, bank transfer, or card — wherever you are in the world.',
  },
  {
    step: '03',
    icon: <FaBox />,
    title: 'We Deliver in Zim',
    desc: 'Your gift is beautifully packaged and hand-delivered to your loved one anywhere in Zimbabwe.',
  },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { data: products, loading, error } = useFetch(() => getProducts({ limit: 8 }), []);

  useEffect(() => {
    if (products?.products) setFeaturedProducts(products.products.slice(0, 4));
  }, [products]);

  return (
    <div className="home-page">

      {/* ══════════════════════════════════════
          HERO CAROUSEL
      ══════════════════════════════════════ */}
      <section className="hero-section">
        <Carousel
          className="hero-carousel"
          indicators
          controls
          interval={5000}
          pause={false}
          touch
        >
          {/* Slide 1 */}
          <Carousel.Item>
            <div className="hero-slide slide-1">
              <div className="hero-overlay" />
              <Container className="hero-inner">
                <Row className="align-items-center justify-content-between g-0 hero-row">
                  <Col lg={6} className="hero-text-col">
                    <div className="hero-content fade-in-up">
                      <span className="hero-eyebrow">
                        <GiRose className="eyebrow-icon" /> For the Zimbabwe Diaspora
                      </span>
                      <h1 className="hero-title">
                        Send Love <br />
                        <em>Home to Zimbabwe</em>
                      </h1>
                      <p className="hero-description">
                        Thousands of miles away but never far from their heart.
                        We handpick, package, and deliver premium gifts to your
                        loved ones across Zimbabwe — so every occasion feels special.
                      </p>
                      <div className="hero-buttons">
                        <Link to="/shop" className="hero-btn-primary">
                          <FaShoppingBag /> Shop Gifts
                        </Link>
                        <Link to="/shop?for=her" className="hero-btn-outline">
                          Explore Collections <FaArrowRight />
                        </Link>
                      </div>
                    </div>
                  </Col>
                  <Col lg={5} className="hero-img-col d-none d-lg-flex">
                    <div className="hero-image-wrapper">
                      <img
                        src="/images/hero1.webp"
                        alt="Elegant gift boxes wrapped with love for Zimbabwe"
                        className="hero-image"
                        loading="eager"
                      />
                      <div className="hero-badge hero-badge-1">
                        <FaHeart /> Free delivery in Zim
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>

          {/* Slide 2 */}
          <Carousel.Item>
            <div className="hero-slide slide-2">
              <div className="hero-overlay" />
              <Container className="hero-inner">
                <Row className="align-items-center justify-content-between g-0 hero-row">
                  <Col lg={5} className="hero-img-col d-none d-lg-flex order-lg-1">
                    <div className="hero-image-wrapper">
                      <img
                        src="/images/hero2.webp"
                        alt="Personalised romantic gifts for her"
                        className="hero-image"
                        loading="lazy"
                      />
                      <div className="hero-badge hero-badge-2">
                        <GiDiamondRing /> For Her
                      </div>
                    </div>
                  </Col>
                  <Col lg={6} className="hero-text-col order-lg-2">
                    <div className="hero-content fade-in-up">
                      <span className="hero-eyebrow">
                        <FaVenus className="eyebrow-icon" /> Gifts For Her
                      </span>
                      <h1 className="hero-title">
                        She Deserves <br />
                        <em>The Very Best</em>
                      </h1>
                      <p className="hero-description">
                        From handcrafted jewellery to luxurious perfume sets and
                        blooming bouquets — give her a moment she will treasure
                        long after the day is over.
                      </p>
                      <div className="hero-buttons">
                        <Link to="/shop?for=her" className="hero-btn-primary">
                          <FaVenus /> Shop For Her
                        </Link>
                        <Link to="/shop" className="hero-btn-outline">
                          Browse All <FaArrowRight />
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>

          {/* Slide 3 */}
          <Carousel.Item>
            <div className="hero-slide slide-3">
              <div className="hero-overlay" />
              <Container className="hero-inner">
                <Row className="align-items-center justify-content-between g-0 hero-row">
                  <Col lg={6} className="hero-text-col">
                    <div className="hero-content fade-in-up">
                      <span className="hero-eyebrow">
                        <GiChocolateBar className="eyebrow-icon" /> Hampers & Sets
                      </span>
                      <h1 className="hero-title">
                        Every Occasion <br />
                        <em>Unforgettable</em>
                      </h1>
                      <p className="hero-description">
                        Birthdays, weddings, anniversaries, Christmas — our curated
                        hampers and celebration sets turn any moment into a memory
                        worth keeping.
                      </p>
                      <div className="hero-buttons">
                        <Link to="/shop" className="hero-btn-primary">
                          <FaGift /> View Hampers
                        </Link>
                        <Link to="/contact" className="hero-btn-outline">
                          Custom Order <FaArrowRight />
                        </Link>
                      </div>
                    </div>
                  </Col>
                  <Col lg={5} className="hero-img-col d-none d-lg-flex">
                    <div className="hero-image-wrapper">
                      <img
                        src="/images/hero3.jpg"
                        alt="Celebration hampers and gift sets delivered in Zimbabwe"
                        className="hero-image"
                        loading="lazy"
                      />
                      <div className="hero-badge hero-badge-3">
                        <FaStar /> Premium Quality
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* ══════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════ */}
      <section className="trust-bar">
        <Container>
          <Row className="justify-content-center g-0">
            <Col xs={12} sm={4} className="trust-item">
              <FaTruck className="trust-icon" />
              <span>Free Delivery in Zimbabwe</span>
            </Col>
            <Col xs={12} sm={4} className="trust-item">
              <FaShieldAlt className="trust-icon" />
              <span>Secure EcoCash &amp; USD Payments</span>
            </Col>
            <Col xs={12} sm={4} className="trust-item">
              <FaHeadset className="trust-icon" />
              <span>24/7 Customer Support</span>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          GIFT CATEGORIES
      ══════════════════════════════════════ */}
      <section className="categories-section section-py">
        <Container>
          <Reveal className="section-header">
            <span className="section-label">Shop By Recipient</span>
            <h2 className="section-title">Find the Perfect Gift</h2>
            <p className="section-subtitle">
              Curated selections for every person and every occasion —
              delivered fresh to your loved ones in Zimbabwe.
            </p>
          </Reveal>

          <Row className="g-4 justify-content-center">
            {GIFT_CATEGORIES.map((cat, i) => (
              <Col key={cat.id} md={4} sm={12}>
                <Reveal delay={i * 120}>
                <Link to={cat.link} className="category-card-link">
                  <div className={`category-card category-${cat.color}`}>
                    <div className="category-emoji">{cat.emoji}</div>
                    <div className="category-icon">{cat.icon}</div>
                    <h3 className="category-label">{cat.label}</h3>
                    <p className="category-tagline">{cat.tagline}</p>
                    <span className="category-cta">
                      Shop Now <FaArrowRight className="cta-arrow" />
                    </span>
                  </div>
                </Link>
                </Reveal>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          FEATURED PRODUCTS
      ══════════════════════════════════════ */}
      <section className="featured-section section-py">
        <Container>
          <Reveal className="section-header">
            <span className="section-label">Bestsellers</span>
            <h2 className="section-title">Most Loved Gifts</h2>
            <p className="section-subtitle">
              Handpicked favourites adored by our customers across Zimbabwe
              and the diaspora community worldwide.
            </p>
          </Reveal>

          {loading ? (
            <div className="products-loading text-center py-5">
              <div className="loading-hearts">
                <FaHeart className="loading-heart" />
                <FaHeart className="loading-heart" style={{ animationDelay: '0.2s' }} />
                <FaHeart className="loading-heart" style={{ animationDelay: '0.4s' }} />
              </div>
              <p className="mt-3 text-soft">Loading beautiful gifts…</p>
            </div>
          ) : error ? (
            <div className="alert alert-warning text-center">
              Unable to load products right now. <Link to="/shop">Browse the full shop →</Link>
            </div>
          ) : featuredProducts.length > 0 ? (
            <Row className="g-4">
              {featuredProducts.map((product) => (
                <Col key={product._id} lg={3} md={6} sm={6}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5">
              <FaGift style={{ fontSize: '3rem', color: 'var(--rose-blush)', marginBottom: '1rem' }} />
              <p className="text-soft">New gifts arriving soon. Check back shortly!</p>
            </div>
          )}

          <div className="text-center mt-5">
            <Link to="/shop" className="btn btn-outline-primary px-5">
              View All Gifts <FaArrowRight style={{ marginLeft: '0.4rem' }} />
            </Link>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS (Diaspora section)
      ══════════════════════════════════════ */}
      <section className="how-it-works-section section-py">
        <Container>
          <Reveal className="section-header">
            <span className="section-label">Simple Process</span>
            <h2 className="section-title">Send Gifts From Anywhere</h2>
            <p className="section-subtitle">
              Whether you're in the UK, US, South Africa or anywhere in the world —
              sending love to Zimbabwe has never been this easy.
            </p>
          </Reveal>

          <Row className="g-4 justify-content-center">
            {HOW_IT_WORKS.map((step, i) => (
              <Col key={i} md={4} sm={12}>
                <div className="step-card">
                  <div className="step-number">{step.step}</div>
                  <div className="step-icon">{step.icon}</div>
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-desc">{step.desc}</p>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="step-connector">
                      <FaArrowRight />
                    </div>
                  )}
                </div>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-5">
            <Link to="/shop" className="btn btn-primary px-5">
              <FaHeart style={{ marginRight: '0.5rem' }} />
              Start Gifting
            </Link>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          OCCASIONS
      ══════════════════════════════════════ */}
      <section className="occasions-section section-py">
        <Container>
          <Reveal className="section-header">
            <span className="section-label">Shop by Moment</span>
            <h2 className="section-title">Every Celebration Covered</h2>
          </Reveal>

          <div className="occasions-grid">
            {OCCASIONS.map((occ, i) => (
              <Link key={i} to={occ.link} className="occasion-chip">
                <span className="occasion-emoji">{occ.emoji}</span>
                <span className="occasion-label">{occ.label}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          DIASPORA CTA BANNER
      ══════════════════════════════════════ */}
      <section className="diaspora-cta-section">
        <div className="diaspora-cta-inner">
          <Container>
            <Row className="align-items-center justify-content-between g-4">
              <Col lg={7}>
                <span className="cta-eyebrow">Zimbabwe Diaspora</span>
                <h2 className="cta-title">
                  Make Them Feel Loved <br />
                  <em>From Miles Away</em>
                </h2>
                <p className="cta-desc">
                  Distance is no barrier to love. Order from the UK, USA, South Africa,
                  Australia — we'll make sure your gift arrives beautifully in Zimbabwe.
                </p>
                <div className="cta-features">
                  <span className="cta-feature"><FaCheckCircle /> Same-day Harare delivery</span>
                  <span className="cta-feature"><FaCheckCircle /> EcoCash accepted</span>
                  <span className="cta-feature"><FaCheckCircle /> Nationwide coverage</span>
                </div>
              </Col>
              <Col lg={4} className="text-lg-end">
                <Link to="/shop" className="btn btn-gold btn-lg px-5 py-3">
                  <FaGift style={{ marginRight: '0.5rem' }} />
                  Send a Gift Now
                </Link>
                <div className="mt-3">
                  <Link to="/contact" className="cta-link-subtle">
                    Need help choosing? Talk to us →
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY US / FEATURES
      ══════════════════════════════════════ */}
      <section className="features-section section-py">
        <Container>
          <Reveal className="section-header">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">Gifting Done Right</h2>
          </Reveal>

          <Row className="g-4">
            <Col lg={3} md={6}>
              <div className="feature-card">
                <div className="feature-icon-wrap">
                  <FaTruck />
                </div>
                <h5 className="feature-title">Nationwide Delivery</h5>
                <p className="feature-text">
                  We deliver to Harare, Bulawayo, Mutare, Gweru and all major
                  cities across Zimbabwe.
                </p>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="feature-card">
                <div className="feature-icon-wrap">
                  <FaShieldAlt />
                </div>
                <h5 className="feature-title">Secure Payments</h5>
                <p className="feature-text">
                  Pay confidently via EcoCash, USD, Visa/Mastercard or bank
                  transfer. Your transactions are always protected.
                </p>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="feature-card">
                <div className="feature-icon-wrap">
                  <GiDiamondRing />
                </div>
                <h5 className="feature-title">Premium Quality</h5>
                <p className="feature-text">
                  Every item is hand-curated, quality-checked, and wrapped in
                  luxury packaging before it leaves our hands.
                </p>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="feature-card">
                <div className="feature-icon-wrap">
                  <FaHeadset />
                </div>
                <h5 className="feature-title">24/7 Support</h5>
                <p className="feature-text">
                  Our team is always available via WhatsApp, email, or phone
                  to help you find and send the perfect gift.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
};

export default Home;
