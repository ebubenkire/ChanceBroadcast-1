import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section brand-section">
          <h3>MoviePro<span className="brand-dot">.</span></h3>
          <p>Empowering the next generation of filmmakers and artists through innovation, education, and opportunity.</p>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <Link to="/academy">Academy</Link>
          <Link to="/auditions">Auditions</Link>
          <Link to="/voting">Voting</Link>
          <Link to="/streaming">Streaming</Link>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <div className="contact-info">
            <p>
              <i className="fas fa-envelope"></i>
              info@moviepro.com
            </p>
            <p>
              <i className="fas fa-phone"></i>
              (555) 123-4567
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              123 Film Street<br />
              Hollywood, CA 90028
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} MoviePro. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 