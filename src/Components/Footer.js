import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-300 fixed bottom-0 left-0 w-full text-center py-0 text-sm ml-[149px]">
      <div className="text-gray-600 text-center">
        <p>&copy; {currentYear} Efficio. All Rights Reserved.</p>
        <p>
          <a href="/privacy-policy" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" className="text-blue-500 hover:underline">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
