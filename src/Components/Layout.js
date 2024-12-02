import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function Layout({ children, onLogout }) {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div style={{ marginLeft: '160px', padding: '20px', width: '100%' }}> {/* Further reduced margin-left */}
        <Navbar onLogout={onLogout} />

        {/* Main content space */}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
