import React, { memo } from "react";  // Use memo to prevent unnecessary re-renders
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = memo(({ children, onLogout }) => {
  // Define the sidebar width to match the width in your Sidebar component
  const sidebarWidth = "160px"; // Set this value to match your Sidebar's `w-` class or inline style

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <div 
          style={{
            marginLeft: sidebarWidth, // Matches the Sidebar's width
            padding: "20px",
            width: "calc(100% - " + sidebarWidth + ")",
          }}
        >
          <Navbar onLogout={onLogout} />
          <div style={{ flex: 1 }}>{children}</div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
});

export default Layout;
