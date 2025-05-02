import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Misaki Auto Supply</h3>
          <p>Your trusted source for high-quality auto parts and accessories since 1995.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/new-products">New Products</Link></li>
            <li><Link to="/buy-set">Buy a Set</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Popular Brands</h3>
          <ul>
            <li><Link to="/brand/toyota">Toyota</Link></li>
            <li><Link to="/brand/honda">Honda</Link></li>
            <li><Link to="/brand/nissan">Nissan</Link></li>
            <li><Link to="/brand/mazda">Mazda</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <p><i className="fas fa-map-marker-alt"></i> 123 Auto Parts Street, Tokyo, Japan</p>
          <p><i className="fas fa-phone"></i> +81 123-456-7890</p>
          <p><i className="fas fa-envelope"></i> info@misakiautosupply.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Misaki Auto Supply. All Rights Reserved.</p>
        <div className="footer-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
