import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function Layout({ children, onLogout }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="ml-64 p-6 w-full">
        <Navbar onLogout={onLogout} />
        <div className="mt-16">{children}</div> {/* Main content space */}
      </div>
    </div>
  );
}

export default Layout;
