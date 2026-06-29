import React from 'react';
import { useInViewport } from '../../hooks/useInViewport';
import './Reveal.css';

// Wraps content with a subtle fade/slide-up entrance animation when it
// scrolls into view, used to add polish to section headers and grids
// without pulling in a full animation library.
const Reveal = ({ children, className = '', delay = 0 }) => {
  const [ref, isVisible] = useInViewport();

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
