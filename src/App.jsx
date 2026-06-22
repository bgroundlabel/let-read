	import { useState, useEffect, useRef } from "react";

const CATEGORIES = ["Tous", "Roman", "Science-Fiction", "Histoire", "Biographie", "Jeunesse", "Philosophie", "Art & Design"];

const BOOKS = [
  { id: 1, title: "Les Misérables", author: "Victor Hugo", category: "Roman", price: 18.90, oldPrice: 24.00, rating: 4.9, reviews: 3841, badge: "Bestseller", color: "#8B2635", pages: 1500, year: 1862, popular: true, cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1411852091i/24280.jpg" },
  { id: 2, title: "Dune", author: "Frank Herbert", category: "Science-Fiction", price: 14.50, oldPrice: null, rating: 4.8, reviews: 2917, badge: "Top Vente", color: "#C9A84C", pages: 896, year: 1965, popular: true, cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg" },
  { id: 3, title: "Sapiens", author: "Yuval Noah Harari", category: "Histoire", price: 22.00, oldPrice: 28.00, rating: 4.7, reviews: 5203, badge: "Populaire", color: "#2D6A4F", pages: 512, year: 2011, popular: true, cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1420585954i/23692271.jpg" },
  { id: 4, title: "Steve Jobs", author: "Walter Isaacson", category: "Biographie", price: 19.90, oldPrice: null, rating: 4.6, reviews: 4120, badge: null, color: "#4A4A5A", pages: 656, year: 2011, popular: true, cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1511288482i/11084145.jpg" },
  { id: 5, title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", category: "Jeunesse", price: 9.90, oldPrice: 12.00, rating: 4.9, reviews: 8921, badge: "Classique", color: "#1D4E89", pages: 96, year: 1943, popular: true, cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1367545443i/157993.jpg" },
  { id: 6, title: "L'Étranger", author: "Albert Camus", category: "Philosophie", price: 8.50, oldPrice: null, rating: 4.7, reviews: 2654, badge: null, color: "#7B4F20", pages: 184, year: 1942, popular: false, cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1590930002i/49552.jpg" },
  { id: 7, title: "Fondation", author: "Isaac Asimov", category: "Science-Fiction", price: 12.90, oldPrice: 16.00, rating: 4.8, reviews: 1876, badge: "Nouveau", color: "#2C3E6B", pages: 320, year: 1951, popular: true, cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1417900846i/29579.jpg" },
  { id: 8, title: "Madame Bovary", author: "Gustave Flaubert", category: "Roman", price: 7.90, oldPrice: null, rating: 4.5, reviews: 1432, badge: null, color: "#6B2D6B", pages: 418, year: 1857, popular: false, cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1709131894i/2175.jpg" },
  { id: 9, title: "Design Graphique Mondial", author: "Steven Heller", category: "Art & Design", price: 45.00, oldPrice: 58.00, rating: 4.6, reviews: 789, badge: "Premium", color: "#E55B4D", pages: 320, year: 2022, popular: false, cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348369390i/215169.jpg" },
  { id: 10, title: "Le Seigneur des Anneaux", author: "J.R.R. Tolkien", category: "Roman", price: 32.00, oldPrice: 40.00, rating: 4.9, reviews: 7234, badge: "Légendaire", color: "#4A7C59", pages: 1200, year: 1954, popular: true, cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg" },
  { id: 11, title: "1984", author: "George Orwell", category: "Science-Fiction", price: 10.50, oldPrice: null, rating: 4.8, reviews: 6102, badge: "Incontournable", color: "#2C2C2C", pages: 328, year: 1949, popular: true, cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg" },
  { id: 12, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", category: "Philosophie", price: 17.90, oldPrice: 22.00, rating: 4.7, reviews: 3298, badge: "Nobel", color: "#1A5276", pages: 499, year: 2011, popular: true, cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1317793965i/11468377.jpg" },
];

const SORT_OPTIONS = [
  { value: "popular", label: "Popularité" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating", label: "Mieux notés" },
  { value: "newest", label: "Plus récents" },
];

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 12 12" fill={s <= Math.round(rating) ? "#C9A84C" : "#ddd"}>
          <path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.2L6 8.5 3 10.1l.6-3.3L1.2 4.5l3.3-.5z" />
        </svg>
      ))}
      <span style={{ fontSize: "11px", color: "#888", marginLeft: "4px" }}>{rating}</span>
    </div>
  );
}

function BookCard({ book, view }) {
  const [hover, setHover] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd(e) {
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (view === "list") {
    return (
      <div style={{
        display: "flex", gap: "20px", background: "#fff", borderRadius: "12px",
        padding: "20px", boxShadow: hover ? "0 8px 32px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.06)",
        transition: "all 0.3s", cursor: "pointer", marginBottom: "14px",
      }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div style={{
          width: "80px", height: "110px", borderRadius: "6px", overflow: "hidden",
          flexShrink: 0, boxShadow: "4px 4px 16px rgba(0,0,0,0.2)"
        }}>
          <img src={book.cover} alt={book.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
            <div>
              {book.badge && <span style={{ fontSize: "10px", fontFamily: "Courier Prime, monospace", background: book.color, color: "#fff", padding: "2px 8px", borderRadius: "20px", marginBottom: "6px", display: "inline-block" }}>{book.badge}</span>}
              <h3 style={{ margin: "4px 0 2px", fontSize: "17px", fontFamily: "Playfair Display, serif", color: "#0D0D0D", fontWeight: "700" }}>{book.title}</h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#888", fontFamily: "Inter, sans-serif" }}>par {book.author}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "22px", fontWeight: "800", color: "#0D0D0D", fontFamily: "Playfair Display, serif" }}>{book.price.toFixed(2)} €</div>
              {book.oldPrice && <div style={{ fontSize: "13px", color: "#bbb", textDecoration: "line-through" }}>{book.oldPrice.toFixed(2)} €</div>}
            </div>
          </div>
          <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <StarRating rating={book.rating} />
            <span style={{ fontSize: "12px", color: "#aaa" }}>{book.reviews.toLocaleString()} avis</span>
            <span style={{ fontSize: "11px", background: "#F5F0E8", color: "#4A4A5A", padding: "2px 10px", borderRadius: "20px", fontFamily: "Inter, sans-serif" }}>{book.category}</span>
            <span style={{ fontSize: "11px", color: "#aaa" }}>{book.pages} pages</span>
          </div>
        </div>
        <button onClick={handleAdd} style={{
          alignSelf: "center", padding: "10px 22px", background: added ? "#2D6A4F" : "#0D0D0D",
          color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px",
          fontFamily: "Inter, sans-serif", fontWeight: "600", transition: "all 0.2s", whiteSpace: "nowrap",
        }}>{added ? "✓ Ajouté" : "Ajouter"}</button>
      </div>
    );
  }

  return (
    <div style={{
      background: "#fff", borderRadius: "14px", overflow: "hidden",
      boxShadow: hover ? "0 16px 48px rgba(0,0,0,0.16)" : "0 2px 16px rgba(0,0,0,0.07)",
      transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)", cursor: "pointer",
      transform: hover ? "translateY(-6px)" : "none", position: "relative",
    }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {book.badge && (
        <div style={{
          position: "absolute", top: "12px", left: "12px", zIndex: 2,
          background: book.color, color: "#fff", fontSize: "10px",
          fontFamily: "Courier Prime, monospace", padding: "3px 10px", borderRadius: "20px",
          letterSpacing: "0.5px", fontWeight: "700",
        }}>{book.badge}</div>
      )}
      {book.oldPrice && (
        <div style={{
          position: "absolute", top: "12px", right: "12px", zIndex: 2,
          background: "#8B2635", color: "#fff", fontSize: "10px",
          fontFamily: "Inter, sans-serif", padding: "3px 8px", borderRadius: "6px", fontWeight: "700",
        }}>-{Math.round((1 - book.price / book.oldPrice) * 100)}%</div>
      )}
      <div style={{ height: "220px", overflow: "hidden", position: "relative", background: book.color + "33" }}>
        <img src={book.cover} alt={book.title} style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hover ? "scale(1.05)" : "scale(1)", transition: "transform 0.4s",
        }} onError={e => { e.target.style.opacity = "0.3"; }} />
        <div style={{
          position: "absolute", inset: 0,
          background: hover ? "rgba(13,13,13,0.4)" : "rgba(13,13,13,0)",
          transition: "background 0.3s", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {hover && (
            <button onClick={handleAdd} style={{
              padding: "12px 28px", background: added ? "#2D6A4F" : "#C9A84C",
              color: "#0D0D0D", border: "none", borderRadius: "8px", cursor: "pointer",
              fontSize: "14px", fontFamily: "Inter, sans-serif", fontWeight: "700",
              transform: "translateY(0)", boxShadow: "0 4px 20px rgba(201,168,76,0.5)",
            }}>{added ? "✓ Ajouté !" : "+ Panier"}</button>
          )}
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        <p style={{ margin: "0 0 4px", fontSize: "11px", color: "#C9A84C", fontFamily: "Courier Prime, monospace", textTransform: "uppercase", letterSpacing: "1px" }}>{book.category}</p>
        <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontFamily: "Playfair Display, serif", color: "#0D0D0D", fontWeight: "700", lineHeight: "1.3", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{book.title}</h3>
        <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#888", fontFamily: "Inter, sans-serif" }}>{book.author}</p>
        <StarRating rating={book.rating} />
        <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#bbb" }}>{book.reviews.toLocaleString()} avis</p>
        <div style={{ marginTop: "12px", display: "flex", alignItems: "baseline", gap: "8px" }}>
          <span style={{ fontSize: "20px", fontWeight: "800", color: "#0D0D0D", fontFamily: "Playfair Display, serif" }}>{book.price.toFixed(2)} €</span>
          {book.oldPrice && <span style={{ fontSize: "13px", color: "#bbb", textDecoration: "line-through" }}>{book.oldPrice.toFixed(2)} €</span>}
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ items, onClose, onRemove }) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "min(420px, 100vw)",
        background: "#fff", padding: "32px 24px", overflowY: "auto",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <h2 style={{ margin: 0, fontFamily: "Playfair Display, serif", fontSize: "24px" }}>Mon Panier</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#888" }}>×</button>
        </div>
        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#bbb" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📚</div>
            <p style={{ fontFamily: "Playfair Display, serif", fontSize: "18px", color: "#888" }}>Votre panier est vide</p>
          </div>
        ) : (
          <>
            <div style={{ flex: 1 }}>
              {items.map(item => (
                <div key={item.id} style={{ display: "flex", gap: "14px", marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #F5F0E8" }}>
                  <img src={item.cover} alt={item.title} style={{ width: "60px", height: "84px", objectFit: "cover", borderRadius: "6px", boxShadow: "2px 4px 12px rgba(0,0,0,0.15)" }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: "0 0 4px", fontFamily: "Playfair Display, serif", fontSize: "15px", fontWeight: "700", color: "#0D0D0D" }}>{item.title}</p>
                    <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#888" }}>{item.author}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "14px", fontWeight: "700" }}>x{item.qty}</span>
                        <span style={{ fontSize: "16px", fontWeight: "800", fontFamily: "Playfair Display, serif" }}>{(item.price * item.qty).toFixed(2)} €</span>
                      </div>
                      <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", color: "#8B2635", cursor: "pointer", fontSize: "13px", fontFamily: "Inter, sans-serif" }}>Retirer</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "2px solid #0D0D0D", paddingTop: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: "20px", fontWeight: "700" }}>Total</span>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: "24px", fontWeight: "800" }}>{total.toFixed(2)} €</span>
              </div>
              <button style={{
                width: "100%", padding: "16px", background: "#0D0D0D", color: "#fff",
                border: "none", borderRadius: "10px", fontSize: "16px", fontFamily: "Inter, sans-serif",
                fontWeight: "700", cursor: "pointer", letterSpacing: "0.5px",
              }}>Commander →</button>
              <button onClick={onClose} style={{ width: "100%", padding: "12px", background: "none", color: "#888", border: "1px solid #ddd", borderRadius: "10px", fontSize: "14px", fontFamily: "Inter, sans-serif", cursor: "pointer", marginTop: "10px" }}>Continuer mes achats</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function BookStore() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [sortBy, setSortBy] = useState("popular");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 60]);
  const [minRating, setMinRating] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  function addToCart(book) {
    setCart(prev => {
      const exists = prev.find(i => i.id === book.id);
      if (exists) return prev.map(i => i.id === book.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...book, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  let filtered = BOOKS.filter(b => {
    if (activeCategory !== "Tous" && b.category !== activeCategory) return false;
    if (b.price < priceRange[0] || b.price > priceRange[1]) return false;
    if (b.rating < minRating) return false;
    if (search && !b.title.toLowerCase().includes(search.toLowerCase()) && !b.author.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "popular") return b.reviews - a.reviews;
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "newest") return b.year - a.year;
    return 0;
  });

  const featuredBooks = BOOKS.filter(b => b.popular).slice(0, 4);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#FAF8F5", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@400;500;600;700;800&family=Courier+Prime:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f1f1f1; } ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 3px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @media (max-width: 768px) {
          .hero-title { font-size: 38px !important; }
          .hero-sub { font-size: 15px !important; }
          .sidebar { display: none !important; }
          .sidebar.open { display: block !important; position: fixed; inset: 0; z-index: 200; overflow-y: auto; background: white; padding: 20px; }
          .main-grid { grid-template-columns: 1fr !important; }
          .book-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .featured-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .nav-links { display: none !important; }
          .filter-btn { display: flex !important; }
          .hero-books { display: none !important; }
        }
        @media (max-width: 480px) { .book-grid { grid-template-columns: 1fr !important; } .featured-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100, background: "rgba(13,13,13,0.97)",
        backdropFilter: "blur(16px)", borderBottom: "1px solid #222",
      }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", background: "#C9A84C", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "18px" }}>📖</span>
            </div>
            <span style={{ fontFamily: "Playfair Display, serif", fontSize: "22px", color: "#fff", fontWeight: "900", letterSpacing: "-0.5px" }}>Librairie <span style={{ color: "#C9A84C" }}>Lumière</span></span>
          </div>

          <div className="nav-links" style={{ display: "flex", gap: "32px" }}>
            {["Catalogue", "Nouveautés", "Promotions", "À propos"].map(l => (
              <a key={l} href="#" style={{ color: "#aaa", textDecoration: "none", fontSize: "14px", fontWeight: "500", letterSpacing: "0.3px", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#C9A84C"} onMouseLeave={e => e.target.style.color = "#aaa"}>{l}</a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#1A1A1A", borderRadius: "8px", padding: "8px 14px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..." style={{ background: "none", border: "none", outline: "none", color: "#fff", fontSize: "13px", width: "160px", fontFamily: "Inter, sans-serif" }} />
            </div>
            <button onClick={() => setShowCart(true)} style={{
              position: "relative", background: "#C9A84C", border: "none", borderRadius: "8px",
              padding: "10px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#0D0D0D", fontFamily: "Inter, sans-serif" }}>Panier</span>
              {cartCount > 0 && <span style={{ background: "#8B2635", color: "#fff", borderRadius: "50%", width: "18px", height: "18px", fontSize: "10px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0D0D0D 0%, #1A1A2E 50%, #0D0D0D 100%)", padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "10%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(139,38,53,0.1) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px" }}>
          <div style={{ flex: 1, animation: heroVisible ? "fadeUp 0.8s ease forwards" : "none", opacity: heroVisible ? 1 : 0 }}>
            <p style={{ color: "#C9A84C", fontFamily: "Courier Prime, monospace", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "20px" }}>✦ Librairie en ligne depuis 2020</p>
            <h1 className="hero-title" style={{ fontFamily: "Playfair Display, serif", fontSize: "62px", color: "#fff", margin: "0 0 20px", lineHeight: "1.1", fontWeight: "900" }}>
              Des livres qui<br /><span style={{ color: "#C9A84C", fontStyle: "italic" }}>transforment</span><br />votre monde
            </h1>
            <p className="hero-sub" style={{ color: "#888", fontSize: "17px", lineHeight: "1.7", maxWidth: "480px", marginBottom: "36px", fontFamily: "Inter, sans-serif" }}>
              Explorez notre collection de plus de <strong style={{ color: "#C9A84C" }}>12 000 titres</strong> soigneusement sélectionnés — romans, essais, sciences, art et bien plus.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button style={{ padding: "16px 36px", background: "#C9A84C", color: "#0D0D0D", border: "none", borderRadius: "10px", fontSize: "15px", fontFamily: "Inter, sans-serif", fontWeight: "700", cursor: "pointer", letterSpacing: "0.3px" }}>Explorer le catalogue →</button>
              <button style={{ padding: "16px 28px", background: "transparent", color: "#fff", border: "1px solid #333", borderRadius: "10px", fontSize: "15px", fontFamily: "Inter, sans-serif", fontWeight: "500", cursor: "pointer" }}>Voir les promotions</button>
            </div>
            <div style={{ marginTop: "48px", display: "flex", gap: "36px", flexWrap: "wrap" }}>
              {[["12K+", "Titres"], ["4.8★", "Note moyenne"], ["Free", "Livraison > 25€"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: "28px", color: "#fff", fontWeight: "900" }}>{n}</div>
                  <div style={{ fontSize: "12px", color: "#666", fontFamily: "Courier Prime, monospace", letterSpacing: "1px", textTransform: "uppercase" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-books" style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
            {featuredBooks.slice(0, 3).map((book, i) => (
              <div key={book.id} style={{
                width: i === 1 ? "140px" : "110px",
                height: i === 1 ? "200px" : "160px",
                borderRadius: "8px", overflow: "hidden",
                boxShadow: "8px 16px 40px rgba(0,0,0,0.6)",
                animation: `float ${2.5 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
                transform: i === 0 ? "rotate(-6deg)" : i === 2 ? "rotate(5deg)" : "none",
              }}>
                <img src={book.cover} alt={book.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES PILLS */}
      <div style={{ background: "#fff", borderBottom: "1px solid #F0ECE4", position: "sticky", top: "68px", zIndex: 90 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px", display: "flex", gap: "8px", overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: "14px 20px", background: activeCategory === cat ? "#0D0D0D" : "transparent",
              color: activeCategory === cat ? "#fff" : "#666", border: "none", cursor: "pointer",
              fontSize: "13px", fontFamily: "Inter, sans-serif", fontWeight: activeCategory === cat ? "700" : "500",
              whiteSpace: "nowrap", borderBottom: activeCategory === cat ? "3px solid #C9A84C" : "3px solid transparent",
              transition: "all 0.2s",
            }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* FEATURED SECTION */}
      {activeCategory === "Tous" && !search && (
        <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "56px 24px 0" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "28px" }}>
            <h2 style={{ margin: 0, fontFamily: "Playfair Display, serif", fontSize: "32px", color: "#0D0D0D", fontWeight: "900" }}>Coups de cœur</h2>
            <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "12px", color: "#C9A84C", letterSpacing: "2px", textTransform: "uppercase" }}>✦ Sélection</span>
          </div>
          <div className="featured-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {featuredBooks.map(book => <BookCard key={book.id} book={book} view="grid" />)}
          </div>
        </section>
      )}

      {/* MAIN CATALOG */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "56px 24px" }}>
        <div className="main-grid" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "32px" }}>

          {/* SIDEBAR */}
          <aside className={`sidebar${mobileMenuOpen ? " open" : ""}`} style={{ display: "block" }}>
            {mobileMenuOpen && (
              <button onClick={() => setMobileMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", fontSize: "16px", cursor: "pointer", marginBottom: "20px", color: "#0D0D0D", fontFamily: "Inter, sans-serif", fontWeight: "600" }}>← Fermer les filtres</button>
            )}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", position: "sticky", top: "140px" }}>
              <h3 style={{ margin: "0 0 24px", fontFamily: "Playfair Display, serif", fontSize: "20px", color: "#0D0D0D", fontWeight: "700" }}>Filtres</h3>

              <div style={{ marginBottom: "28px" }}>
                <h4 style={{ margin: "0 0 14px", fontSize: "12px", fontFamily: "Courier Prime, monospace", color: "#C9A84C", letterSpacing: "2px", textTransform: "uppercase" }}>Catégorie</h4>
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                    display: "block", width: "100%", textAlign: "left", padding: "9px 12px",
                    background: activeCategory === cat ? "#F5F0E8" : "transparent",
                    color: activeCategory === cat ? "#0D0D0D" : "#666",
                    border: "none", borderRadius: "8px", cursor: "pointer",
                    fontSize: "14px", fontFamily: "Inter, sans-serif",
                    fontWeight: activeCategory === cat ? "700" : "400",
                    borderLeft: activeCategory === cat ? "3px solid #C9A84C" : "3px solid transparent",
                    transition: "all 0.15s",
                  }}>{cat}</button>
                ))}
              </div>

              <div style={{ marginBottom: "28px" }}>
                <h4 style={{ margin: "0 0 14px", fontSize: "12px", fontFamily: "Courier Prime, monospace", color: "#C9A84C", letterSpacing: "2px", textTransform: "uppercase" }}>Prix max</h4>
                <input type="range" min="0" max="60" value={priceRange[1]} onChange={e => setPriceRange([0, +e.target.value])}
                  style={{ width: "100%", accentColor: "#C9A84C" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#888", marginTop: "6px" }}>
                  <span>0 €</span><span style={{ color: "#0D0D0D", fontWeight: "700" }}>{priceRange[1]} €</span>
                </div>
              </div>

              <div style={{ marginBottom: "28px" }}>
                <h4 style={{ margin: "0 0 14px", fontSize: "12px", fontFamily: "Courier Prime, monospace", color: "#C9A84C", letterSpacing: "2px", textTransform: "uppercase" }}>Note minimum</h4>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {[0, 4, 4.5, 4.8].map(r => (
                    <button key={r} onClick={() => setMinRating(r)} style={{
                      padding: "6px 14px", background: minRating === r ? "#0D0D0D" : "#F5F0E8",
                      color: minRating === r ? "#fff" : "#666", border: "none", borderRadius: "20px",
                      fontSize: "12px", cursor: "pointer", fontFamily: "Inter, sans-serif", fontWeight: "600",
                    }}>{r === 0 ? "Tous" : `${r}+`}</button>
                  ))}
                </div>
              </div>

              <button onClick={() => { setActiveCategory("Tous"); setPriceRange([0, 60]); setMinRating(0); setSearch(""); }}
                style={{ width: "100%", padding: "12px", background: "#F5F0E8", color: "#666", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontFamily: "Inter, sans-serif", fontWeight: "600" }}>
                Réinitialiser les filtres
              </button>
            </div>
          </aside>

          {/* CATALOG */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h2 style={{ margin: "0 0 4px", fontFamily: "Playfair Display, serif", fontSize: "28px", color: "#0D0D0D", fontWeight: "900" }}>
                  {activeCategory === "Tous" ? "Tous les livres" : activeCategory}
                </h2>
                <p style={{ margin: 0, fontSize: "13px", color: "#888" }}>{filtered.length} titre{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button className="filter-btn" onClick={() => setMobileMenuOpen(true)} style={{ display: "none", alignItems: "center", gap: "6px", padding: "10px 16px", background: "#fff", border: "1px solid #ddd", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontFamily: "Inter, sans-serif", fontWeight: "600" }}>
                  ⚙️ Filtres
                </button>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                  padding: "10px 14px", background: "#fff", border: "1px solid #ddd", borderRadius: "8px",
                  fontSize: "13px", fontFamily: "Inter, sans-serif", cursor: "pointer", outline: "none", color: "#0D0D0D",
                }}>
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <div style={{ display: "flex", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
                  {["grid", "list"].map(v => (
                    <button key={v} onClick={() => setView(v)} style={{
                      padding: "10px 12px", background: view === v ? "#0D0D0D" : "#fff",
                      color: view === v ? "#fff" : "#888", border: "none", cursor: "pointer", lineHeight: 1,
                    }}>
                      {v === "grid" ? "⊞" : "≡"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", background: "#fff", borderRadius: "16px" }}>
                <div style={{ fontSize: "56px", marginBottom: "16px" }}>🔍</div>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "24px", color: "#0D0D0D", margin: "0 0 8px" }}>Aucun résultat</h3>
                <p style={{ color: "#888", fontFamily: "Inter, sans-serif" }}>Essayez d'autres mots-clés ou filtres.</p>
              </div>
            ) : view === "list" ? (
              <div>{filtered.map(b => <BookCard key={b.id} book={b} view="list" />)}</div>
            ) : (
              <div className="book-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                {filtered.map(b => <BookCard key={b.id} book={b} view="grid" />)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section style={{ background: "linear-gradient(135deg, #8B2635, #C9454D)", margin: "0 24px 60px", borderRadius: "20px", padding: "48px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px", maxWidth: "1352px", marginLeft: "auto", marginRight: "auto" }}>
        <div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Courier Prime, monospace", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 12px" }}>Offre spéciale</p>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "36px", color: "#fff", margin: "0 0 10px", fontWeight: "900" }}>Livraison gratuite</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Inter, sans-serif", fontSize: "16px", margin: 0 }}>Pour toute commande supérieure à <strong>25 €</strong> — partout en France</p>
        </div>
        <button style={{ padding: "16px 36px", background: "#fff", color: "#8B2635", border: "none", borderRadius: "10px", fontSize: "15px", fontFamily: "Inter, sans-serif", fontWeight: "800", cursor: "pointer" }}>En profiter →</button>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0D0D0D", color: "#888", padding: "56px 24px 32px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "48px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ width: "32px", height: "32px", background: "#C9A84C", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>📖</div>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: "18px", color: "#fff", fontWeight: "900" }}>Librairie <span style={{ color: "#C9A84C" }}>Lumière</span></span>
              </div>
              <p style={{ fontSize: "13px", lineHeight: "1.7", color: "#666", fontFamily: "Inter, sans-serif" }}>Votre librairie en ligne de référence depuis 2020. Des milliers de titres, livrés chez vous.</p>
            </div>
            {[
              { title: "Catalogue", links: ["Romans", "Science-Fiction", "Histoire", "Art & Design", "Biographie"] },
              { title: "Service", links: ["Livraison", "Retours", "FAQ", "Contact", "Newsletter"] },
              { title: "À propos", links: ["Notre histoire", "Presse", "Partenaires", "CGV", "Confidentialité"] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ margin: "0 0 16px", fontSize: "13px", fontFamily: "Courier Prime, monospace", color: "#C9A84C", letterSpacing: "2px", textTransform: "uppercase" }}>{col.title}</h4>
                {col.links.map(l => <div key={l} style={{ marginBottom: "10px" }}><a href="#" style={{ color: "#666", textDecoration: "none", fontSize: "14px", fontFamily: "Inter, sans-serif", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#666"}>{l}</a></div>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #1A1A1A", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <p style={{ margin: 0, fontSize: "13px", fontFamily: "Inter, sans-serif" }}>© 2024 Librairie Lumière. Tous droits réservés.</p>
            <p style={{ margin: 0, fontSize: "12px", fontFamily: "Courier Prime, monospace", color: "#444" }}>🇫🇷 Fait avec passion en France</p>
          </div>
        </div>
      </footer>

      {showCart && <CartDrawer items={cart} onClose={() => setShowCart(false)} onRemove={removeFromCart} />}
    </div>
  );
}
