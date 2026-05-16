// frontend/src/pages/ProductDetail/ProductDetail.jsx
import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import API, { IMG_BASE } from "../../utils/api";
import "./ProductDetail.css";
import { useCart } from "../../context/CartContext";
import assets from "../../assets/assets.js";
import { useAuth } from "../../context/AuthContext";

const imgUrl = (path) =>
  path ? (path.startsWith("http") ? path : `${IMG_BASE}${path}`) : "/placeholder.png";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [mainImg, setMainImg] = useState(0);
  const [activeTab, setActiveTab] = useState("specs");
  const [qty, setQty] = useState(1);
  const [activeSpecTab, setActiveSpecTab] = useState("Display");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data.product || data);
    } catch (err) {
      console.error("fetchProduct error:", err.response?.data || err);
      setProduct(null);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => { fetchProduct(); }, [fetchProduct]);

  useEffect(() => {
    if (!product) return;
    setSelectedColor(0); setSelectedVariant(0); setMainImg(0); setQty(1); setActiveSpecTab("Display");
  }, [product]);

  useEffect(() => setMainImg(0), [selectedColor]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setShowReviewModal(false); };
    if (showReviewModal) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showReviewModal]);

  const renderStars = (r) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`pd-star ${i < Math.floor(r) ? "filled" : i < r ? "half" : ""}`}>★</span>
    ));

  if (loading) return <div className="pd-page"><p style={{textAlign:'center',padding:'60px'}}>Loading...</p></div>;
  if (!product) return <div className="pd-page"><p style={{textAlign:'center',padding:'60px'}}>Product nahi mila!</p></div>;

  const colors = product.colors || [];
  const variants = product.variants || [];
  const features = product.features || [];
  const reviews = product.reviews || [];

  const currentPrice = variants[selectedVariant]?.price || product.price;
  const inStock = typeof product.stock === "number" ? product.stock > 0 : true;

  const currentImages =
    colors[selectedColor]?.images?.length > 0 ? colors[selectedColor].images
    : product.images?.length > 0 ? product.images : [product.image];

  const specsData = {
    Display: { Screen: product.specs?.display || "—" },
    Processor: { Processor: product.specs?.processor || "—", OS: product.specs?.os || "—" },
    Camera: { Camera: product.specs?.camera || "—" },
    Battery: { Battery: product.specs?.battery || "—" },
    Memory: { RAM: product.ram || "—", Storage: product.storage || "—" },
    Connectivity: { SIM: product.specs?.sim || "Dual SIM" },
  };
  const specTabs = Object.keys(specsData);

  const handleAddToCart = () => {
    const selectedVar = variants[selectedVariant];
    const cartProduct = {
      ...product,
      price: selectedVar?.price || product.price,
      ram: selectedVar?.ram || product.ram,
      storage: selectedVar?.storage || product.storage,
      qty,
    };
    addToCart(cartProduct, qty);
    alert("Added to cart");
  };

  const handleBuyNow = () => { handleAddToCart(); window.location.href = "/cart"; };

  const handleOpenReviewModal = () => { setReviewForm({ rating:5, comment:"" }); setShowReviewModal(true); };
  const handleCloseReviewModal = () => { setShowReviewModal(false); setReviewForm({ rating:5, comment:"" }); };

  const recalcRatingAfterAppend = (existingReviews, newReview) => {
    const all = [newReview, ...existingReviews];
    const sum = all.reduce((s, r) => s + Number(r.rating || 0), 0);
    return { newAvg: all.length ? sum / all.length : 0, newCount: all.length, newList: all };
  };

  const handleSubmitReview = async () => {
    if (submittingReview) return;
    if (!reviewForm.comment.trim()) { alert("Please write a review!"); return; }
    setSubmittingReview(true);
    try {
      const payload = {
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        name: user?.name || (() => { try { return JSON.parse(localStorage.getItem("shaheenUser")||"{}").name || "Anonymous"; } catch { return "Anonymous"; } })()
      };

      console.log("Review payload:", payload);

      const res = await API.post(`/products/${id}/reviews`, payload);
      console.log("Review response:", res?.data);

      const data = res?.data || {};

      if (data?.success && data.product) {
        setProduct(data.product);
      } else if (data?.success && data.reviews) {
        setProduct((p) => ({ ...p, reviews: data.reviews, rating: data.rating ?? p.rating, numReviews: data.numReviews ?? p.numReviews }));
      } else if (data?.review) {
        const created = data.review;
        const { newAvg, newCount, newList } = recalcRatingAfterAppend(reviews, {
          ...created,
          createdAt: created.createdAt || new Date().toISOString(),
          name: created.name || payload.name
        });
        setProduct((p) => ({ ...p, reviews: newList, rating: newAvg, numReviews: newCount }));
      } else {
        await fetchProduct();
      }

      // Notify other pages (Profile) to refresh reviews
      try {
        window.dispatchEvent(new CustomEvent('review:submitted', { detail: { productId: id } }));
      } catch (e) { /* ignore */ }

      alert("Review submitted successfully!");
      handleCloseReviewModal();
    } catch (err) {
      console.error("submit review error:", err.response?.data || err);
      alert("Error submitting review: " + (err.response?.data?.message || err.message || "Unknown"));
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="pd-page">
      <div className="pd-breadcrumb">
        <Link to="/">Home</Link><span>/</span>
        <Link to="/shop">Shop</Link><span>/</span>
        <Link to={`/shop?brand=${product.brand}`}>{product.brand}</Link><span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="pd-main">
        <div className="pd-gallery" aria-label="Product images gallery">
          <div className="pd-main-img-wrap">
            {product.badge && <span className={`pd-badge ${product.badge==="BEST SELLER"?"badge-green":product.badge==="NEW"?"badge-green":"badge-grey"}`}>{product.badge}</span>}
            <img src={imgUrl(currentImages[mainImg] || product.image)} alt={product.name} className="pd-main-img"
              onError={(e)=>{e.target.onerror=null;e.target.src='/placeholder.png'}} />
          </div>

          <div className="pd-thumbs" role="list">
            {currentImages.map((img,i)=>(
              <div role="button" tabIndex={0} aria-pressed={mainImg===i} key={i}
                className={`pd-thumb ${mainImg===i?"active":""}`}
                onClick={()=>setMainImg(i)}
                onKeyDown={(e)=>{ if(e.key==="Enter"||e.key===" ") setMainImg(i); if(e.key==="ArrowLeft") setMainImg(m=>Math.max(0,m-1)); if(e.key==="ArrowRight") setMainImg(m=>Math.min(currentImages.length-1,m+1)); }}>
                <img src={imgUrl(img)} alt={`thumbnail-${i}`} loading="lazy" onError={(e)=>{e.target.onerror=null;e.target.src='/placeholder.png'}} />
              </div>
            ))}
          </div>
        </div>

        <div className="pd-info">
          <p className="pd-brand">{product.brand}</p>
          <h1 className="pd-name">{product.name}</h1>

          <div className="pd-rating-row">
            <div className="pd-stars">{renderStars(product.rating || 0)}</div>
            <span className="pd-rating-num">{(product.rating||0).toFixed(1)}</span>
            <span className="pd-reviews">({product.numReviews || reviews.length} reviews)</span>
          </div>

          <div className="pd-price-row">
            <span className="pd-price">Rs. {Number(currentPrice||0).toLocaleString()}</span>
            {inStock ? <span className="pd-instock">✓ In Stock</span> : <span className="pd-outstock">✗ Out of Stock</span>}
          </div>

          <p className="pd-desc">{product.description}</p>
          {features.length>0 && <div className="pd-highlights">{features.map((h,i)=><span key={i} className="pd-highlight-chip">✓ {h}</span>)}</div>}
          <div className="pd-divider" />

          {colors.length>0 && (
            <div className="pd-option-group">
              <p className="pd-option-label">Color: <strong>{colors[selectedColor]?.name}</strong></p>
              <div className="pd-colors" role="radiogroup" aria-label="Choose color">
                {colors.map((c,i)=>(
                  <button key={i} className={`pd-color-btn ${selectedColor===i?"active":""}`} style={{background:c.hex||"#fff"}} onClick={()=>{setSelectedColor(i);setMainImg(0)}} title={c.name} role="radio" aria-checked={selectedColor===i} />
                ))}
              </div>
            </div>
          )}

          {variants.length>0 && (
            <div className="pd-option-group">
              <p className="pd-option-label">Storage: <strong>{variants[selectedVariant]?.ram} / {variants[selectedVariant]?.storage}</strong></p>
              <div className="pd-variants" role="list">
                {variants.map((v,i)=>(
                  <button key={i} className={`pd-variant-btn ${selectedVariant===i?"active":""}`} onClick={()=>setSelectedVariant(i)} aria-pressed={selectedVariant===i}>
                    <div style={{fontWeight:700}}>{v.ram} / {v.storage}</div>
                    <span className="variant-price">Rs. {v.price?.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pd-divider" />
          <div className="pd-actions">
            <div className="pd-qty">
              <button onClick={()=>setQty(q=>Math.max(1,q-1))}>−</button>
              <span>{qty}</span>
              <button onClick={()=>setQty(q=>q+1)}>+</button>
            </div>

            <button className="pd-cart-btn" disabled={!inStock} onClick={handleAddToCart}>Add to Cart</button>
            <button className="pd-wishlist-btn">♡</button>
          </div>

          <div className="pd-delivery-info">
            <div className="pd-delivery-item">
              {assets?.fast_delivery && <img src={assets.fast_delivery} alt="Free Delivery" onError={(e)=>{e.target.onerror=null;e.target.src='/placeholder.png'}} className="delivery-icon" />}
              <div><strong>Free Delivery</strong><p>On orders above Rs. 10,000</p></div>
            </div>

            <div className="pd-delivery-item">
              {assets?.number_7 && <img src={assets.number_7} alt="7 Days Return" onError={(e)=>{e.target.onerror=null;e.target.src='/placeholder.png'}} className="delivery-icon" />}
              <div><strong>7 Days Return</strong><p>Easy return policy</p></div>
            </div>

            <div className="pd-delivery-item">
              {assets?.secure && <img src={assets.secure} alt="Official Warranty" onError={(e)=>{e.target.onerror=null;e.target.src='/placeholder.png'}} className="delivery-icon" />}
              <div><strong>Official Warranty</strong><p>Brand warranty included</p></div>
            </div>
          </div>
        </div>
      </div>

      <div className="pd-tabs-section">
        <div className="pd-tabs">
          {["specs","description","reviews"].map(t=>(
            <button key={t} className={`pd-tab ${activeTab===t?"active":""}`} onClick={()=>setActiveTab(t)}>
              {t==="specs"?"Specifications":t==="description"?"Description":`Reviews (${reviews.length})`}
            </button>
          ))}
        </div>

        {activeTab==="specs" && (
          <div className="pd-specs">
            <div className="specs-nav">{specTabs.map(cat=>(
              <button key={cat} className={`spec-nav-btn ${activeSpecTab===cat?"active":""}`} onClick={()=>setActiveSpecTab(cat)}>{cat}</button>
            ))}</div>
            <div className="specs-table">{Object.entries(specsData[activeSpecTab]||{}).map(([k,v])=>(
              <div key={k} className="spec-row"><span className="spec-key">{k}</span><span className="spec-val">{v}</span></div>
            ))}</div>
          </div>
        )}

        {activeTab==="description" && (
          <div className="pd-description"><h3>About {product.name}</h3><p>{product.description}</p>{features.length>0 && <><h4>Key Highlights</h4><ul>{features.map((h,i)=><li key={i}>✓ {h}</li>)}</ul></>}</div>
        )}

        {activeTab==="reviews" && (
          <div className="pd-reviews-section">
            <div className="reviews-card-shell">
              <div className="reviews-top">
                <div>
                  <h3>Reviews</h3>
                  <p>Customer ratings and verified product feedback.</p>
                </div>

                <button className="btn-write-review" onClick={handleOpenReviewModal}>
                  {assets?.marker_pen && <img src={assets.marker_pen} alt="Write review" onError={(e)=>{e.target.onerror=null;e.target.src='/placeholder.png'}} className="icon-white" />}
                  Write a Review
                </button>
              </div>

              <div className="reviews-overview">
                <div className="review-score-box">
                  <span className="big-num">{(product.rating||0).toFixed(1)}</span>
                  <div className="pd-stars">{renderStars(product.rating||0)}</div>
                  <p>{product.numReviews||reviews.length} ratings</p>
                </div>

                <div className="review-bars">
                  {[5,4,3,2,1].map(s=>{
                    const count = reviews.filter(r=>Math.round(r.rating)===s).length;
                    const pct = reviews.length ? Math.round((count/reviews.length)*100) : 0;
                    return (
                      <div key={s} className="review-bar-row">
                        <span className="review-bar-label">{s}.0</span>
                        <div className="review-bar-bg"><div className="review-bar-fill" style={{width:`${pct}%`}}/></div>
                        <span className="review-bar-count">{count} reviews</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {reviews.length===0 ? (
                <div className="reviews-empty">
                  <div className="reviews-empty-icon">★</div>
                  <h4>No reviews yet</h4>
                  <p>Be the first customer to share your experience with this product.</p>
                  <button className="btn-write-review" onClick={handleOpenReviewModal}>
                    {assets?.marker_pen && <img src={assets.marker_pen} alt="Write" className="icon-white" />}
                    Be the first to review
                  </button>
                </div>
              ) : (
                <div className="reviews-list">
                  {reviews.map((rev,i)=>(
                    <div key={i} className="review-card">
                      <div className="reviewer-avatar">{rev.name?.charAt(0) || 'U'}</div>

                      <div className="review-body">
                        <div className="review-header">
                          <div>
                            <p className="reviewer-name">{rev.name||'User'}</p>
                            <p className="reviewer-date">{new Date(rev.createdAt||Date.now()).toLocaleDateString('en-PK',{year:'numeric',month:'short',day:'numeric'})}</p>
                          </div>

                          <div className="review-rating-side">
                            <span>{Number(rev.rating||0).toFixed(1)}</span>
                            <div className="review-stars">{renderStars(rev.rating||0)}</div>
                          </div>
                        </div>

                        <p className="review-comment">{rev.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showReviewModal && (
        <div className="modal-overlay" onClick={handleCloseReviewModal}>
          <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
            <div className="modal-header"><h2>Write Your Review</h2><button className="modal-close" onClick={handleCloseReviewModal}>✕</button></div>
            <div className="product-info-modal"><img src={imgUrl(product.image)} alt={product.name} onError={(e)=>{e.target.onerror=null;e.target.src='/placeholder.png'}} /><div><h4>{product.name}</h4><p>{product.brand}</p></div></div>
            <div className="form-group"><label>Your Rating</label><div className="rating-input">{[1,2,3,4,5].map(star=>(
              <span key={star} role="button" tabIndex={0} className={`star-btn ${reviewForm.rating>=star?'selected':''}`} onClick={()=>setReviewForm({...reviewForm,rating:star})} onKeyDown={(e)=>{if(e.key==='Enter') setReviewForm({...reviewForm,rating:star})}} aria-pressed={reviewForm.rating>=star}>★</span>
            ))}</div></div>

            <div className="form-group"><label>Your Review</label><textarea placeholder="Share your experience..." value={reviewForm.comment} onChange={(e)=>setReviewForm({...reviewForm,comment:e.target.value})} /></div>

            <div className="form-actions">
              <button className="btn-submit" onClick={handleSubmitReview} disabled={submittingReview}>{submittingReview?'Submitting...':'Submit Review'}</button>
              <button className="btn-cancel" onClick={handleCloseReviewModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;