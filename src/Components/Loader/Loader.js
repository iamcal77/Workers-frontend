// DotLoader.js
import React from 'react';
import './Loader.css';  // Import the CSS for styling
import Layout from '../Layout';

const Loader = (onLogout) => {
  return (
    <Layout onLogout={onLogout}>
    <div className="dot-loader-container">
      <div className="dot-loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
    </Layout>
  );
};

export default Loader;
