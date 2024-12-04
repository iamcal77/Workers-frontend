import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function Layout({ children, onLogout }) {
  // Log the props received by the Layout component
  console.log('Layout props:', { children, onLogout });
  
  if (onLogout === undefined) {
    console.warn('onLogout prop is undefined');
  }

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div style={{ marginLeft: '160px', padding: '20px', width: '100%' }}>
        <Navbar onLogout={onLogout} />

        {/* Main content space */}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
