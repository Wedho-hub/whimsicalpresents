import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Article.css';

const Article = ({ article }) => {
  return (
    <Card className="article-card h-100">
      <Card.Img
        variant="top"
        src={article.imageUrl || '/placeholder-article.jpg'}
        alt={article.title}
        className="article-image"
      />

      <Card.Body className="article-body">
        <div className="article-meta">
          <span className="article-date">
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
          <span className="article-category">{article.category}</span>
        </div>

        <Card.Title className="article-title">{article.title}</Card.Title>

        <Card.Text className="article-excerpt">
          {article.excerpt || article.content?.substring(0, 150) + '...'}
        </Card.Text>

        <div className="article-footer">
          <small className="article-author">
            By {article.author || 'Whimsical Presents'}
          </small>

          <Button as={Link} to={`/article/${article._id}`} variant="outline-primary" size="sm">
            Read More
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Article;
