import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <style>{`
        .footer {
          background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
          color: white;
          padding: 4rem 2rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #fbbf24 100%);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          max-width: 1400px;
          margin: 0 auto 3rem;
        }

        .footer h4 {
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          color: #fbbf24;
          position: relative;
          display: inline-block;
        }

        .footer h4::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 50px;
          height: 3px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          border-radius: 2px;
        }

        .footer p {
          color: #d1d5db;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          font-size: 15px;
        }

        .footer-btn {
          display: inline-block;
          padding: 12px 28px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .footer-btn:hover {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
          color: white;
        }

        .nav-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav-links li {
          margin-bottom: 0.8rem;
        }

        .nav-links a {
          color: #d1d5db;
          text-decoration: none;
          font-size: 15px;
          transition: all 0.3s ease;
          display: inline-block;
          position: relative;
          padding-left: 20px;
        }

        .nav-links a::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: #667eea;
          transition: all 0.3s ease;
        }

        .nav-links a:hover {
          color: #fbbf24;
          transform: translateX(5px);
        }

        .nav-links a:hover::before {
          color: #fbbf24;
        }

        .nav-links a.active {
          color: #fbbf24;
          font-weight: 600;
        }

        .footer ul:not(.nav-links) {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer ul:not(.nav-links) li {
          color: #d1d5db;
          margin-bottom: 0.8rem;
          font-size: 15px;
          padding-left: 20px;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .footer ul:not(.nav-links) li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: #667eea;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .footer ul:not(.nav-links) li:hover {
          color: #fbbf24;
          transform: translateX(5px);
        }

        .footer ul:not(.nav-links) li:hover::before {
          color: #fbbf24;
        }

        .footer-contact div {
          color: #d1d5db;
          margin-bottom: 1rem;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          padding: 8px;
          border-radius: 8px;
        }

        .footer-contact div:hover {
          background: rgba(102, 126, 234, 0.1);
          color: #fbbf24;
          transform: translateX(5px);
        }

        .footer-social {
          display: flex;
          gap: 12px;
          margin-top: 1.5rem;
        }

        .footer-social a {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
          border: 2px solid rgba(102, 126, 234, 0.3);
          border-radius: 12px;
          color: white;
          font-size: 18px;
          transition: all 0.3s ease;
        }

        .footer-social a:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: transparent;
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.5);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          margin-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: #9ca3af;
          font-size: 14px;
        }

        .footer > div:not(.footer-grid):not(.footer-bottom) {
          max-width: 1400px;
          margin: 2rem auto 0;
          padding: 1.5rem;
          background: rgba(102, 126, 234, 0.1);
          border-left: 4px solid #667eea;
          border-radius: 8px;
        }

        .footer > div:not(.footer-grid):not(.footer-bottom) strong {
          color: #fbbf24;
          font-size: 16px;
        }
          

        @media (max-width: 768px) {
          .footer {
            padding: 3rem 1.5rem 1.5rem;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .footer h4 {
            font-size: 1.2rem;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-grid">
          {/* ABOUT */}
          <div>
            <h4>About Us</h4>
            <p>
              Established in 2010, DSA CRM System is a professional loan
              management and CRM platform connecting customers with banks
              and NBFCs across India at competitive interest rates.
            </p>
            <NavLink to="/about">
              <span className="footer-btn">View More</span>
            </NavLink>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4>Quick Links</h4>
            <ul className="nav-links">
              <li>
                <NavLink to="/" end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/howitworks">
                  How It Works
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/blog">
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/careers">
                  Careers
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/contact">
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/customer-registration">
                  Register Now
                </NavLink>
              </li>
            </ul>
          </div>

          {/* LOANS */}
          <div>
            <h4>Loans We Offer</h4>
            <ul className="nav-links">
              <li>
                <NavLink to="/loan-application">Personal Loans</NavLink>
              </li>
              <li>
                <NavLink to="/balance-transfer">
                  Personal Loans - Balance Transfer
                </NavLink>
              </li>
              <li>
                <NavLink to="/loan-application">Home Loans</NavLink>
              </li>
              <li>
                <NavLink to="/loan-application">Education Loans</NavLink>
              </li>
              <li>
                <NavLink to="/loan-application">Vehicle Loans</NavLink>
              </li>
              <li>
                <NavLink to="/loan-application">Business Loans</NavLink>
              </li>
              <li>
                <NavLink to="/loan-application">Mortgage Loans</NavLink>
              </li>
              <li>
                <NavLink to="/medical-loan">Medical Loans</NavLink>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="footer-contact">
            <h4>Contact Info</h4>
            <div>📍 Nashik, Maharastra, India</div>
            <div>📞 +91 81216 66902</div>
            <div>✉ info@dsacrm.com</div>

            <div className="footer-social">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* COMPLAINTS */}
        <div>
          <strong>For Complaints</strong><br />
          Call Us: +91 95339 80582<br />
          Mail Us: support@dsacrm.com
        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          © 2026 DSA CRM Application | All Rights Reserved | Privacy Policy | Terms of Use
        </div>
      </footer>
    </>
  );
};

export default Footer;