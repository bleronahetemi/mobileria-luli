import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { request } from '../api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setBusy(true);

    try {
      const data = await request('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      setSuccess(data.message);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="page">
      <Header />
      <div className="page__body">
        <form className="card-form" onSubmit={register}>
          <h3>Regjistrohu</h3>
          <input
            className="field"
            placeholder="Emri"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
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
            {busy ? 'Duke u regjistruar...' : 'Regjistrohu'}
          </button>

          {error && <p className="form__message form__message--error">{error}</p>}
          {success && <p className="form__message form__message--success">{success}</p>}

          <p className="form__footer">
            Ke llogari? <Link to="/login">Kyçu ketu</Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}
