import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Pagination, Badge, Alert } from 'react-bootstrap';
import { FaFilter, FaSearch } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/productCard/ProductCard';
import { useFetch } from '../../hooks/useFetch';
import { getProducts } from '../../services/productService';
import './Shop.css';

const Shop = () => {
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('for') || '');
  const [selectedOccasion, setSelectedOccasion] = useState(searchParams.get('occasion') || '');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const productsPerPage = 12;

  // Recipient categories — match Product.category enum in the backend
  const categories = [
    { value: '', label: 'All Recipients' },
    { value: 'her', label: 'For Her' },
    { value: 'him', label: 'For Him' },
    { value: 'general', label: 'General Gifts' },
  ];

  const occasionOptions = [
    { value: '', label: 'All Occasions' },
    { value: 'valentines', label: "Valentine's Day" },
    { value: 'birthday', label: 'Birthday' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'christmas', label: 'Christmas' },
    { value: 'graduation', label: 'Graduation' },
  ];

  // Sort options
  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: '-name', label: 'Name (Z-A)' },
    { value: 'price', label: 'Price (Low to High)' },
    { value: '-price', label: 'Price (High to Low)' },
    { value: '-rating', label: 'Highest Rated' },
    { value: '-createdAt', label: 'Newest First' },
  ];

  const { data: products, loading, error } = useFetch(() =>
    getProducts({
      page: currentPage,
      limit: productsPerPage,
      sort: sortBy,
      category: selectedCategory,
      occasion: selectedOccasion,
      search: searchTerm,
    }), [currentPage, sortBy, selectedCategory, selectedOccasion, searchTerm]
  );

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  // Handle category filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Handle occasion filter
  const handleOccasionChange = (occasion) => {
    setSelectedOccasion(occasion);
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedOccasion('');
    setSortBy('name');
    setCurrentPage(1);
  };

  // Pagination is performed server-side — use the page of products as-is
  const totalPages = products?.pages || 0;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + (products?.products?.length || 0);
  const currentProducts = products?.products || [];

  return (
    <Container className="shop-page">
      <div className="shop-header">
        <h1 className="shop-title">Shop Our Collection</h1>
        <p className="shop-subtitle">
          Discover unique gifts for every occasion and loved one
        </p>
      </div>

      {/* Search and Filters */}
      <div className="shop-controls">
        <Row className="align-items-center">
          <Col lg={6} md={8}>
            <Form onSubmit={handleSearch} className="search-form">
              <div className="search-input-group">
                <Form.Control
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <Button type="submit" variant="primary" className="search-btn">
                  <FaSearch />
                </Button>
              </div>
            </Form>
          </Col>

          <Col lg={6} md={4} className="text-md-end">
            <Button
              variant="outline-primary"
              onClick={() => setShowFilters(!showFilters)}
              className="filter-toggle-btn"
            >
              <FaFilter className="me-2" />
              Filters
            </Button>
          </Col>
        </Row>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <Row>
              <Col lg={3} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Recipient</Form.Label>
                  <Form.Select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col lg={3} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Occasion</Form.Label>
                  <Form.Select
                    value={selectedOccasion}
                    onChange={(e) => handleOccasionChange(e.target.value)}
                  >
                    {occasionOptions.map((occasion) => (
                      <option key={occasion.value} value={occasion.value}>
                        {occasion.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col lg={3} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Sort By</Form.Label>
                  <Form.Select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col lg={3} md={6} className="d-flex align-items-end">
                <Button variant="outline-secondary" onClick={clearFilters} className="clear-filters-btn">
                  Clear All Filters
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedCategory || selectedOccasion) && (
        <div className="active-filters">
          <span className="filters-label">Active filters:</span>
          {searchTerm && (
            <Badge bg="primary" className="filter-badge">
              Search: "{searchTerm}"
              <button
                type="button"
                className="filter-remove"
                onClick={() => setSearchTerm('')}
              >
                ×
              </button>
            </Badge>
          )}
          {selectedCategory && (
            <Badge bg="secondary" className="filter-badge">
              {categories.find((c) => c.value === selectedCategory)?.label}
              <button
                type="button"
                className="filter-remove"
                onClick={() => setSelectedCategory('')}
              >
                ×
              </button>
            </Badge>
          )}
          {selectedOccasion && (
            <Badge bg="secondary" className="filter-badge">
              {occasionOptions.find((o) => o.value === selectedOccasion)?.label}
              <button
                type="button"
                className="filter-remove"
                onClick={() => setSelectedOccasion('')}
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="results-info">
        {products && (
          <p className="results-text">
            Showing {startIndex + 1}-{Math.min(endIndex, products.total)} of {products.total} products
          </p>
        )}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading products...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          Error loading products: {error}
        </Alert>
      ) : currentProducts.length === 0 ? (
        <div className="text-center py-5">
          <h3>No products found</h3>
          <p>Try adjusting your search or filters</p>
          <Button variant="primary" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <>
          <Row>
            {currentProducts.map((product) => (
              <Col xl={3} lg={4} md={6} key={product._id} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <Pagination className="justify-content-center">
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPage}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </Pagination.Item>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <Pagination.Ellipsis key={pageNumber} />;
                  }
                  return null;
                })}

                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Shop;
