import React, { useState, useEffect, useRef } from "react";
import "./ShopSection.css";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { useCart } from "../../context/CartContext";   // ← ADD

// ✅ FIX: localhost hardcode hataya — env variable se URL aata hai
const BASE_URL = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const imgUrl = (path) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http")) return path; // ✅ Cloudinary URL directly use karo
  return `${BASE_URL}${path}`;              // local path ke liye backend URL
};

const MIN_PRICE = 7000;
const MAX_PRICE = 800000;

const rams     = ["2GB", "3GB", "4GB", "6GB", "8GB", "12GB"];
const storages = ["32GB", "64GB", "128GB", "256GB", "512GB"];

const ShopSection = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();                    // ← ADD
  const productsStartRef = useRef(null);

  const [products,       setProducts]       = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [availableBrands,setAvailableBrands]= useState([]);

  const [filters, setFilters] = useState({
    brands:   [],
    rams:     [],
    storages: [],
    priceMin: MIN_PRICE,
    priceMax: MAX_PRICE,
    rating:   null,
    inStock:  false,
  });

  const [openSections, setOpenSections] = useState({
    brand: true, price: true, ram: true,
    storage: true, rating: true, availability: true,
  });

  const [sortBy,      setSortBy]      = useState("featured");
  const [viewMode,    setViewMode]    = useState("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, viewMode]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("limit", "100");

        if (filters.brands.length === 1)  params.append("brand",    filters.brands[0]);
        if (filters.rams.length === 1)    params.append("ram",      filters.rams[0]);
        if (filters.storages.length === 1)params.append("storage",  filters.storages[0]);
        if (filters.priceMin > MIN_PRICE) params.append("priceMin", filters.priceMin);
        if (filters.priceMax < MAX_PRICE) params.append("priceMax", filters.priceMax);
        if (filters.rating)               params.append("rating",   filters.rating);

        const { data } = await API.get(`/products?${params.toString()}`);
        let prods = data.products || [];

        if (filters.brands.length > 1)   prods = prods.filter(p => filters.brands.includes(p.brand));
        if (filters.rams.length > 1)     prods = prods.filter(p => filters.rams.includes(p.ram));
        if (filters.storages.length > 1) prods = prods.filter(p => filters.storages.includes(p.storage));
        if (filters.inStock)             prods = prods.filter(p => p.stock > 0);

        if (sortBy === "price-low")  prods.sort((a, b) => a.price - b.price);
        if (sortBy === "price-high") prods.sort((a, b) => b.price - a.price);
        if (sortBy === "rating")     prods.sort((a, b) => b.rating - a.rating);

        setProducts(prods);
        setAvailableBrands([...new Set(prods.map(p => p.brand))]);
      } catch (err) {
        console.error("Products fetch error:", err);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [filters, sortBy]);

  const toggleSection = (s) => setOpenSections(p => ({ ...p, [s]: !p[s] }));

  const toggleFilter = (key, value) =>
    setFilters(p => ({
      ...p,
      [key]: p[key].includes(value)
        ? p[key].filter(v => v !== value)
        : [...p[key], value],
    }));

  const clearAll = () =>
    setFilters({
      brands: [], rams: [], storages: [],
      priceMin: MIN_PRICE, priceMax: MAX_PRICE,
      rating: null, inStock: false,
    });

  const renderStars = (r) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < Math.floor(r) ? "filled" : i < r ? "half" : ""}`}>★</span>
    ));

  const activeCount =
    filters.brands.length + filters.rams.length + filters.storages.length +
    (filters.rating ? 1 : 0) + (filters.inStock ? 1 : 0) +
    (filters.priceMin > MIN_PRICE || filters.priceMax < MAX_PRICE ? 1 : 0);

  const leftPct  = ((filters.priceMin - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const rightPct = ((MAX_PRICE - filters.priceMax) / (MAX_PRICE - MIN_PRICE)) * 100;

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const goToPage = (page) => {
    const nextPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(nextPage);

    setTimeout(() => {
      productsStartRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  const getPaginationNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) end = 4;
    if (currentPage >= totalPages - 2) start = totalPages - 3;

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");

    pages.push(totalPages);
    return pages;
  };

  return (
    <section className="shop-section">

      <button className="mobile-filter-btn" onClick={() => setSidebarOpen(true)}>
        Filters {activeCount > 0 && <span className="filter-badge">{activeCount}</span>}
      </button>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* SIDEBAR */}
      <aside className={`shop-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <h3>Filters</h3>
          <div className="sidebar-header-right">
            {activeCount > 0 && (
              <button className="clear-btn" onClick={clearAll}>Clear ({activeCount})</button>
            )}
            <button className="close-sidebar-btn" onClick={() => setSidebarOpen(false)}>✕</button>
          </div>
        </div>

        {/* Brand */}
        <FilterGroup title="Brand" open={openSections.brand} toggle={() => toggleSection("brand")}>
          {availableBrands.map(b => (
            <label key={b} className="filter-label">
              <input type="checkbox"
                checked={filters.brands.includes(b)}
                onChange={() => toggleFilter("brands", b)}
              />
              <span>{b}</span>
              <span className="count">{products.filter(p => p.brand === b).length}</span>
            </label>
          ))}
        </FilterGroup>

        {/* Price */}
        <FilterGroup title="Price Range" open={openSections.price} toggle={() => toggleSection("price")}>
          <div className="price-display">
            <span>Rs. {filters.priceMin.toLocaleString()}</span>
            <span>Rs. {filters.priceMax.toLocaleString()}</span>
          </div>
          <div className="slider-wrapper">
            <div className="slider-track">
              <div className="slider-fill" style={{ left: `${leftPct}%`, right: `${rightPct}%` }} />
            </div>
            <input type="range" min={MIN_PRICE} max={MAX_PRICE} step={5000}
              value={filters.priceMin} className="range-input range-min"
              onChange={e => {
                const val = Math.min(Number(e.target.value), filters.priceMax - 5000);
                setFilters(p => ({ ...p, priceMin: val }));
              }}
            />
            <input type="range" min={MIN_PRICE} max={MAX_PRICE} step={5000}
              value={filters.priceMax} className="range-input range-max"
              onChange={e => {
                const val = Math.max(Number(e.target.value), filters.priceMin + 5000);
                setFilters(p => ({ ...p, priceMax: val }));
              }}
            />
          </div>
          <div className="price-inputs-row">
            <input type="number" className="price-input" placeholder="Min"
              value={filters.priceMin}
              onChange={e => {
                const val = Math.max(MIN_PRICE, Math.min(Number(e.target.value), filters.priceMax - 5000));
                setFilters(p => ({ ...p, priceMin: val }));
              }}
            />
            <span>—</span>
            <input type="number" className="price-input" placeholder="Max"
              value={filters.priceMax}
              onChange={e => {
                const val = Math.min(MAX_PRICE, Math.max(Number(e.target.value), filters.priceMin + 5000));
                setFilters(p => ({ ...p, priceMax: val }));
              }}
            />
          </div>
        </FilterGroup>

        {/* RAM */}
        <FilterGroup title="RAM" open={openSections.ram} toggle={() => toggleSection("ram")}>
          <div className="chip-group">
            {rams.map(r => (
              <button key={r}
                className={`chip ${filters.rams.includes(r) ? "chip-active" : ""}`}
                onClick={() => toggleFilter("rams", r)}
              >{r}</button>
            ))}
          </div>
        </FilterGroup>

        {/* Storage */}
        <FilterGroup title="Storage" open={openSections.storage} toggle={() => toggleSection("storage")}>
          <div className="chip-group">
            {storages.map(s => (
              <button key={s}
                className={`chip ${filters.storages.includes(s) ? "chip-active" : ""}`}
                onClick={() => toggleFilter("storages", s)}
              >{s}</button>
            ))}
          </div>
        </FilterGroup>

        {/* Rating */}
        <FilterGroup title="Customer Rating" open={openSections.rating} toggle={() => toggleSection("rating")}>
          {[4, 3, 2].map(r => (
            <label key={r} className="filter-label">
              <input type="radio" name="rating"
                checked={filters.rating === r}
                onChange={() => setFilters(p => ({ ...p, rating: r }))}
              />
              <span className="stars-row">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`star ${i < r ? "filled" : ""}`}>★</span>
                ))}
                <span className="rating-label">& above</span>
              </span>
            </label>
          ))}
        </FilterGroup>

        {/* Availability */}
        <FilterGroup title="Availability" open={openSections.availability} toggle={() => toggleSection("availability")}>
          <label className="filter-label">
            <input type="checkbox"
              checked={filters.inStock}
              onChange={() => setFilters(p => ({ ...p, inStock: !p.inStock }))}
            />
            <span>In Stock Only</span>
          </label>
        </FilterGroup>

      </aside>

      {/* MAIN */}
      <div className="shop-main">
        <div className="shop-topbar">
          <p className="result-count">
            Showing <strong>{products.length === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, products.length)}</strong> of <strong>{products.length}</strong> results
          </p>
          <div className="topbar-right">
            <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <button className={`view-btn ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}>⊞</button>
            <button className={`view-btn ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")}>☰</button>
          </div>
        </div>

        {loading ? (
          <div className="shop-loading"><p>Loading products...</p></div>
        ) : (
          <div ref={productsStartRef} className={`products-grid ${viewMode === "list" ? "list-view" : ""}`}>
            {products.length === 0 ? (
              <div className="no-results">
                <p>😔 No products found.</p>
                <button className="clear-btn" onClick={clearAll}>Clear All Filters</button>
              </div>
            ) : currentProducts.map(p => (
              <div
                key={p._id}
                className="product-card"
                onClick={() => navigate(`/product/${p._id}`)}
              >
                {p.badge && (
                  <span className={`badge ${
                    p.badge === "BEST SELLER" ? "badge-green" :
                    p.badge === "NEW"         ? "badge-green" : "badge-grey"
                  }`}>
                    {p.badge}
                  </span>
                )}
                {p.stock === 0 && <span className="badge badge-red">Out of Stock</span>}

                <div className="product-img-wrapper">
                  <img
                    src={imgUrl(p.image)}
                    alt={p.name}
                    className="product-img"
                    onError={e => { e.target.src = "/placeholder.png"; }}
                  />
                </div>

                <div className="product-info">
                  <p className="product-brand">{p.brand}</p>
                  <h4 className="product-name">{p.name}</h4>
                  <div className="product-stars">
                    {renderStars(p.rating || 0)}
                    <span className="review-count">({p.numReviews})</span>
                  </div>
                  <p className="product-specs">
                    {p.ram && `${p.ram}`}
                    {p.storage && ` • ${p.storage}`}
                    {p.specs?.camera && ` • ${p.specs.camera}`}
                  </p>
                  <p className="product-price">Rs. {p.price?.toLocaleString()}</p>

                  {/* ✅ Add to Cart — working! */}
                  <button
                    className="add-cart-btn"
                    disabled={p.stock === 0}
                    onClick={e => {
                      e.stopPropagation();   // card click nahi hoga
                      addToCart(p);          // ← CartContext
                    }}
                  >
                    {p.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && products.length > productsPerPage && (
          <div className="pagination-wrap">
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              Prev
            </button>

            <div className="pagination-numbers">
              {getPaginationNumbers().map((page, index) => (
                page === "..." ? (
                  <span key={`dots-${index}`} className="pagination-dots">...</span>
                ) : (
                  <button
                    key={page}
                    className={`pagination-number ${currentPage === page ? "active" : ""}`}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>

            <button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const FilterGroup = ({ title, open, toggle, children }) => (
  <div className="filter-group">
    <div className="filter-title" onClick={toggle}>
      <span>{title}</span>
      <span className="arrow">{open ? "▲" : "▼"}</span>
    </div>
    {open && <div className="filter-options">{children}</div>}
  </div>
);

export default ShopSection;