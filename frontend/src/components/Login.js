import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { request } from '../api';
import { saveAuth } from '../auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    setError('');
    setBusy(true);

    try {
      const data = await request('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      saveAuth(data);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page">
      <Header />
      <div className="page__body">
        <form className="card-form" onSubmit={login}>
          <h3>Kyçu</h3>
          <input
            className="field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="btn" type="submit" disabled={busy}>
            {busy ? 'Duke u kyçur...' : 'Kyçu'}
          </button>

          {error && <p className="form__message form__message--error">{error}</p>}

          <p className="form__footer">
            Nuk ke llogari? <Link to="/register">Krijo llogari të re</Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}
