import React from "react";
import "./footer.css"; // Import the external CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          &copy; {new Date().getFullYear()} Movie Recommender App. All rights
          reserved.
        </p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="mailto:support@movieapp.com">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
