import { FaFacebook, FaTwitter, FaGithub, FaInstagram, FaLinkedin, FaBasketballBall } from 'react-icons/fa';

const SOCIALS = [FaFacebook, FaTwitter, FaGithub, FaInstagram, FaLinkedin, FaBasketballBall];

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="footer__logo">
          <div className="footer__bars">
            <span />
            <span />
            <span />
          </div>
          <h3>SiteLogo</h3>
        </div>
        <p>High level experience in web design and development knowledge, producing quality work.</p>
      </div>

      <div>
        <h3>Use Cases</h3>
        <ul>
          <li>Web-designers</li>
          <li>Marketers</li>
          <li>Small Business</li>
          <li>Website Builder</li>
        </ul>
      </div>

      <div>
        <h3>Company</h3>
        <ul>
          <li>About Us</li>
          <li>Careers</li>
          <li>FAQs</li>
          <li>Teams</li>
        </ul>
      </div>

      <div>
        <h3>Follow us</h3>
        <div className="footer__social">
          {SOCIALS.map((Icon, i) => (
            <div className="footer__social-icon" key={i}>
              <Icon />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
