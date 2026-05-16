import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  UserRound,
  ClipboardList,
  BookOpenText,
  ShoppingBag,
  Star,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Tag,
  Share2,
} from 'lucide-react';

import { featuredPosts, allPosts } from './Blog';
import './BlogDetail.css';

const allBlogPosts = [...featuredPosts, ...allPosts];

const renderStars = (rating) =>
  Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={16}
      className={i < Math.floor(rating) ? 'bd-star filled' : 'bd-star empty'}
      fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
    />
  ));

const CategoryBadge = ({ category }) => {
  const iconMap = {
    'Mobile Reviews': '📱',
    'Buying Guide':   '🧭',
    'Tech News':      '⚡',
    'Tips & Tricks':  '💡',
    'Comparison':     '⚖️',
  };
  return (
    <span className="bd-cat-badge">
      <span>{iconMap[category] || '◈'}</span>
      {category}
    </span>
  );
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = allBlogPosts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="bd-not-found">
        <span className="bd-404">404</span>
        <h2>Article not found</h2>
        <p>This article doesn't exist or may have been moved.</p>
        <button className="bd-back-btn" onClick={() => navigate('/blog')}>
          <ArrowLeft size={16} /> Back to Blog
        </button>
      </div>
    );
  }

  const related = allBlogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const paragraphs = (post.content || post.excerpt)
    .trim()
    .split('\n')
    .filter((line) => line.trim() !== '');

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    const links = {
      facebook:  `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter:   `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      whatsapp:  `https://wa.me/?text=${text}%20${url}`,
    };
    if (links[platform]) window.open(links[platform], '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bd-page">

      {/* ── HERO ── */}
      <header className="bd-hero">
        <div className="bd-hero-bg">
          <img src={post.image} alt="" aria-hidden="true" />
          <div className="bd-hero-scrim" />
        </div>

        <div className="bd-hero-inner">
          <button className="bd-breadcrumb" onClick={() => navigate('/blog')}>
            <ArrowLeft size={15} />
            Blog
          </button>

          <CategoryBadge category={post.category} />

          <h1>{post.title}</h1>

          <div className="bd-meta-strip">
            <span><UserRound size={13} /> {post.author}</span>
            <span className="meta-sep">·</span>
            <span><CalendarDays size={13} /> {post.date}</span>
            <span className="meta-sep">·</span>
            <span><Clock3 size={13} /> {post.readTime} read</span>
            {post.rating && (
              <>
                <span className="meta-sep">·</span>
                <span className="meta-rating">★ {post.rating} / 5</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="bd-container">
        <div className="bd-layout">

          {/* LEFT — SIDEBAR */}
          <aside className="bd-sidebar">
            {/* Author */}
            <div className="bd-sb-card">
              <div className="bd-author">
                <div className="bd-author-av">{post.author?.charAt(0)}</div>
                <div>
                  <strong className="bd-author-name">{post.author}</strong>
                  <span className="bd-author-role">Editorial Team</span>
                </div>
              </div>
              <p className="bd-author-bio">Pakistan's trusted mobile store — honest reviews &amp; latest updates since 2010.</p>
            </div>

            {/* Article Info */}
            <div className="bd-sb-card">
              <h4 className="bd-sb-title"><ClipboardList size={14} /> Article Info</h4>
              <dl className="bd-info-list">
                <div className="bd-info-row">
                  <dt>Category</dt>
                  <dd>{post.category}</dd>
                </div>
                <div className="bd-info-row">
                  <dt>Published</dt>
                  <dd>{post.date}</dd>
                </div>
                <div className="bd-info-row">
                  <dt>Read Time</dt>
                  <dd>{post.readTime}</dd>
                </div>
                {post.rating && (
                  <div className="bd-info-row">
                    <dt>Rating</dt>
                    <dd>{post.rating} / 5</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="bd-sb-card">
                <h4 className="bd-sb-title"><BookOpenText size={14} /> Related Articles</h4>
                <div className="bd-related">
                  {related.map((rp) => (
                    <button
                      key={rp.id}
                      className="bd-related-item"
                      onClick={() => { navigate(`/blog/${rp.id}`); window.scrollTo(0, 0); }}
                    >
                      <div className="bd-related-thumb">
                        <img src={rp.image} alt={rp.title} />
                      </div>
                      <div className="bd-related-text">
                        <span className="bd-related-cat">{rp.category}</span>
                        <p>{rp.title}</p>
                        <small>{rp.date}</small>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Shop CTA */}
            <div className="bd-sb-card bd-shop-card">
              <ShoppingBag size={22} />
              <h4>Shop Latest Phones</h4>
              <p>Browse the latest smartphones available in Pakistan now.</p>
              <button className="bd-shop-btn" onClick={() => navigate('/shop')}>
                Visit Shop →
              </button>
            </div>
          </aside>

          {/* RIGHT — ARTICLE */}
          <article className="bd-article">
            {/* Excerpt / Pull Quote */}
            <blockquote className="bd-pullquote">{post.excerpt}</blockquote>

            {/* Content */}
            <div className="bd-content">
              {paragraphs.map((para, i) => {
                const isHeading = para.startsWith('**') && para.endsWith('**');
                const hasBold = para.includes('**');

                if (isHeading) {
                  return (
                    <h3 key={i} className="bd-subheading">
                      {para.replace(/\*\*/g, '')}
                    </h3>
                  );
                }

                if (hasBold) {
                  const parts = para.split(/(\*\*[^*]+\*\*)/g);
                  return (
                    <p key={i} className="bd-para">
                      {parts.map((part, j) =>
                        part.startsWith('**') ? (
                          <strong key={j}>{part.replace(/\*\*/g, '')}</strong>
                        ) : (
                          <span key={j}>{part}</span>
                        )
                      )}
                    </p>
                  );
                }

                return <p key={i} className="bd-para">{para}</p>;
              })}
            </div>

            {/* Pros & Cons */}
            {(post.pros || post.cons) && (
              <div className="bd-verdict-section">
                <h3 className="bd-verdict-title">Verdict</h3>
                <div className="bd-pros-cons">
                  {post.pros && (
                    <div className="bd-pros">
                      <h4><CheckCircle2 size={15} /> Pros</h4>
                      <ul>
                        {post.pros.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}
                  {post.cons && (
                    <div className="bd-cons">
                      <h4><XCircle size={15} /> Cons</h4>
                      <ul>
                        {post.cons.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Rating */}
            {post.rating && (
              <div className="bd-rating-card">
                <div className="bd-rating-left">
                  <span className="bd-rating-label">Our Rating</span>
                  <div className="bd-stars">{renderStars(post.rating)}</div>
                </div>
                <div className="bd-rating-score">
                  <strong>{post.rating}</strong>
                  <span>/ 5</span>
                </div>
              </div>
            )}

            {/* Share */}
            <div className="bd-share-section">
              <span>Share this article</span>
              <div className="bd-share-btns">
                <button className="bd-share-btn" onClick={() => handleShare('facebook')} aria-label="Share on Facebook">
                  <Share2 size={13} /> Facebook
                </button>
                <button className="bd-share-btn" onClick={() => handleShare('twitter')} aria-label="Share on Twitter">
                  <Share2 size={13} /> Twitter
                </button>
                <button className="bd-share-btn wp" onClick={() => handleShare('whatsapp')} aria-label="Share on WhatsApp">
                  <MessageCircle size={13} /> WhatsApp
                </button>
              </div>
            </div>

            {/* Back */}
            <button className="bd-back-link" onClick={() => navigate('/blog')}>
              <ArrowLeft size={15} /> Back to all articles
            </button>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
