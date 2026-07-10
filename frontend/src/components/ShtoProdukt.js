import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { request } from '../api';
import { getToken } from '../auth';

export default function ShtoProdukt() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function shtoProdukt(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim() || !text.trim()) {
      setError('Titulli dhe pershkrimi jane te detyrueshem!');
      return;
    }

    setBusy(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    if (image) formData.append('image', image);

    try {
      // Pa 'Content-Type': shfletuesi e cakton vete bashke me boundary-n e FormData.
      await request('/posts', {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData
      });

      setSuccess('Produkti u shtua!');
      setTitle('');
      setText('');
      setImage(null);
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="page">
      <Header />
      <div className="page__body">
        <form className="card-form" onSubmit={shtoProdukt}>
          <h2>Shto Produkt</h2>

          <input
            className="field"
            placeholder="Titulli"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="field field--textarea"
            placeholder="Përshkrimi"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <input
            className="field field--file"
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files[0] ?? null)}
          />

          <button className="btn" type="submit" disabled={busy}>
            {busy ? 'Duke shtuar...' : 'Shto'}
          </button>

          {error && <p className="form__message form__message--error">{error}</p>}
          {success && <p className="form__message form__message--success">{success}</p>}
        </form>
      </div>
      <Footer />
    </div>
  );
}
