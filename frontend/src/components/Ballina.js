import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import { API, request } from '../api';

const PER_PAGE = 6;

export default function Ballina() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await request('/allposts');
        if (!cancelled) setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  const filteredPosts = posts.filter(post =>
    (post.title || '').toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const currentPosts = filteredPosts.slice(start, start + PER_PAGE);

  function scrollToProducts() {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div>
      <div className="hero">
        <Header variant="light" onProductsClick={scrollToProducts} />
        <div className="hero__content">
          <h1 className="hero__title">Exclusive Deals of Furniture Collection</h1>
          <p className="hero__subtitle">Explore different categories. Find the best deals.</p>
          <button type="button" className="hero__cta" onClick={scrollToProducts}>
            Shop Now
          </button>
        </div>
      </div>

      <div id="products" className="products">
        <div className="products__inner">
          <div className="search">
            <FaSearch className="search__icon" />
            <input
              type="text"
              className="search__input"
              placeholder="Search products..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {loading ? (
            <p className="products__state">Duke ngarkuar...</p>
          ) : error ? (
            <p className="products__state">{error}</p>
          ) : filteredPosts.length === 0 ? (
            <p className="products__state">
              {search ? 'Nuk u gjet produkt me kete titull' : 'Nuk ka produkte akoma'}
            </p>
          ) : (
            <>
              <div className="products__grid">
                {currentPosts.map(post => (
                  <div className="card" key={post._id}>
                    {post.image && (
                      <img
                        className="card__image"
                        src={`${API}/uploads/${post.image}`}
                        alt={post.title}
                      />
                    )}
                    <div className="card__body">
                      <h3 className="card__title">{post.title}</h3>
                      <p className="card__text">{post.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination__arrow"
                    onClick={() => setPage(1)}
                    disabled={currentPage === 1}
                    aria-label="Faqja e pare"
                  >«</button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                    <button
                      key={pageNum}
                      className={`pagination__page${pageNum === currentPage ? ' pagination__page--active' : ''}`}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    className="pagination__arrow"
                    onClick={() => setPage(totalPages)}
                    disabled={currentPage === totalPages}
                    aria-label="Faqja e fundit"
                  >»</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
