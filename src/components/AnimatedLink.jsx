import React from 'react';
import '../animatedLink.css';

const AnimatedLink = ({ text, href, className = '' }) => {
// Instead of a separate Arrow component, embed the SVG directly like in the original example
return (
    <a href={href} className={`animated-link ${className}`} target='_blank'>
      <span className="mask">
        <div className="link-container">
          <span className="link-title1 title">{text}</span>
          <span className="link-title2 title">{text}</span>
        </div>
      </span>
      <span className="link-icon">
        <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
          <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
        </svg>
        <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
          <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
        </svg>
      </span>
    </a>
);
};

export default AnimatedLink;