import React, { memo } from "react";  // Use memo to prevent unnecessary re-renders
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = memo(({ children, onLogout }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <div style={{ marginLeft: "160px", padding: "20px", width: "100%" }}>
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
