import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useAuth, clearAuth } from '../auth';

export default function Profile() {
  const { username, isAdmin } = useAuth();
  const navigate = useNavigate();

  function logout() {
    clearAuth();
    navigate('/login');
  }

  return (
    <div className="page">
      <Header />
      <div className="page__body">
        <div className="card-form">
          <h3>Miresevjen, {username}!</h3>
          <p>Roli yt: <strong>{isAdmin ? 'administrator' : 'perdorues'}</strong></p>

          {isAdmin && (
            <p className="form__footer">
              <Link to="/shto">Shto nje produkt te ri</Link>
            </p>
          )}

          <button className="btn" type="button" onClick={logout}>Dil</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
