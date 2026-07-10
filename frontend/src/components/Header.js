import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useAuth } from '../auth';
import Logo from './Logo';

export default function Header({ variant = 'dark', onProductsClick }) {
  const { isLoggedIn, isAdmin } = useAuth();

  function scrollToProducts() {
    if (onProductsClick) {
      onProductsClick();
      return;
    }
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header className={`header header--${variant}`}>
      <div className="header__logo">
        <Logo />
      </div>

      <nav className="header__nav">
        <Link to="/" className="header__link header__link--active">Home</Link>
        <button type="button" className="header__link" onClick={scrollToProducts}>
          Products
        </button>
        {isAdmin && <Link to="/shto" className="header__link">Shto Produkt</Link>}
        <Link to="/" className="header__link">Categories</Link>
        <Link to="/" className="header__link">About</Link>
        <Link to="/" className="header__link">Contact Us</Link>
      </nav>

      <div className="header__actions">
        {isAdmin && <span className="header__badge">admin</span>}
        <FaShoppingCart />
        <Link to={isLoggedIn ? '/home' : '/login'} aria-label="Profili">
          <FaUser />
        </Link>
      </div>
    </header>
  );
}
