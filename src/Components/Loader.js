// DotLoader.js
import React from 'react';
import './Loader.css';  // Import the CSS for styling

const Loader = () => {
  return (
    <div className="dot-loader-container">
      <div className="dot-loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default Loader;
