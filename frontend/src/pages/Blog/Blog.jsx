import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Blog.css';

export const featuredPosts = [
  {
    id: 1,
    category: 'Mobile Reviews',
    tag: 'review',
    title: 'realme 15T 5G — Pakistan’s First Truly Practical 5G Phone',
    excerpt:
      'Dimensity 6400 Max, 7000mAh Titan Battery, and 120Hz AMOLED. At Rs. 89,999, this is one of the best all-round options in its class.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=85',
    author: 'Shaheen Mobiles',
    date: 'March 10, 2026',
    readTime: '5 min',
    rating: 4.5,
    content: `The realme 15T 5G opens a new chapter for 5G phones in Pakistan. After testing it thoroughly, we can confidently say this is one of the strongest all-around packages in its price segment.

**Display and Design**

The 6.72-inch 120Hz AMOLED display looks excellent, even at night. The punch-hole design feels modern and clean. Although the phone uses premium plastic, the in-hand feel is still solid and refined.

**Performance**

The Dimensity 6400 Max chipset performs very well in gaming and multitasking. Titles like PUBG Mobile and Genshin Impact run smoothly without noticeable thermal issues during regular sessions.

**Battery Life**

The 7000mAh Titan battery is the biggest highlight. Even with heavy usage, the phone can easily last up to two days. With 45W charging, it reaches full charge in about an hour.

**Camera**

The 50MP main camera captures sharp daylight shots. Night mode is also respectable for this price range. The 16MP front camera is suitable for social media and video calls.

**Final Verdict**

At Rs. 89,999, the realme 15T 5G is a complete package. If you want a future-ready 5G phone with strong battery and performance, this should be on your shortlist.`,
    pros: [
      'Massive 7000mAh battery life',
      '120Hz AMOLED display',
      'True 5G connectivity',
      '45W fast charging',
      'Strong Dimensity 6400 Max performance',
    ],
    cons: [
      'No wireless charging',
      'Plastic build (no glass back)',
      'Low-light camera needs improvement',
    ],
  },
  {
    id: 2,
    category: 'Buying Guide',
    tag: 'guide',
    title: 'Best Budget Phones Under Rs. 25,000 in Pakistan — 2026 Edition',
    excerpt:
      'On a tight budget? Here are our top-value picks, from itel A100 C to realme Note 60x.',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&q=85',
    author: 'Shaheen Mobiles',
    date: 'March 7, 2026',
    readTime: '7 min',
    rating: 4.3,
    content: `The budget phone market in 2026 has matured significantly. Under Rs. 25,000, buyers can now get smoother displays, faster charging, and better overall usability.

**Top Pick #1 — itel A100 C (Rs. 19,999)**

itel’s budget option offers a 6.6-inch 90Hz display, a 5000mAh battery, and a clean everyday Android experience at a very competitive price.

**Top Pick #2 — realme Note 60x (Rs. 22,999)**

realme Note 60x includes a 6.67-inch 90Hz display, 5000mAh battery, and 33W charging. Camera consistency is also strong for this segment.

**Top Pick #3 — itel CITY 100 (Rs. 24,500)**

CITY 100 has a premium-looking design and a large display. For basic daily use, media, and social apps, it performs reliably.

**What Should You Prioritize in a Budget Phone?**

Battery should be your first priority, followed by display quality. Camera can be third, since low-light limitations are still common in this class.

**Final Recommendation**

Choose itel A100 C for max value and battery balance. Pick realme Note 60x if you want a more rounded overall experience.`,
    pros: [
      'Excellent value for money',
      'Good battery life across all picks',
      'Smooth high-refresh displays available',
      'Easy daily-use software experience',
    ],
    cons: [
      'No 5G in this range',
      'Average low-light camera output',
      'Mostly plastic builds',
    ],
  },
  {
    id: 3,
    category: 'Tech News',
    tag: 'news',
    title: 'itel S26 Ultra — AMOLED at This Price?',
    excerpt:
      '144Hz 1.5K 3D-curved AMOLED and IP65 protection at just Rs. 49,999. A bold move in the value segment.',
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=1200&q=85',
    author: 'Shaheen Mobiles',
    date: 'March 5, 2026',
    readTime: '4 min',
    rating: 4.3,
    content: `With the launch of itel S26 Ultra, the affordable smartphone segment has received a major upgrade. A 144Hz 1.5K curved AMOLED panel at this price is genuinely uncommon.

**Display — The Highlight**

A 1.5K resolution with 144Hz refresh rate at Rs. 49,999 was previously reserved for much pricier devices. The curved edges add a premium look and immersive media feel.

**Build and Protection**

IP65 rating gives practical splash and dust resistance. Build quality feels surprisingly sturdy, and the overall finish is visually premium.

**Performance**

Helio G99 handles daily tasks and moderate gaming smoothly. With 8GB RAM, app switching is fluid. Extended heavy gaming can raise thermals, but it remains manageable.

**Camera**

The 50MP Sony sensor performs very well in daylight. Portrait mode is natural, and low-light shots are respectable for the category.

**Conclusion**

itel S26 Ultra proves that premium display quality is no longer limited to expensive phones. This launch raises expectations in the budget-performance market.`,
    pros: [
      '144Hz 1.5K AMOLED display',
      'IP65 splash/dust protection',
      'Premium curved design',
      '50MP Sony main sensor',
    ],
    cons: [
      'Heating under sustained heavy gaming',
      '5000mAh battery is decent, not class-leading',
      'After-sales network still limited in some areas',
    ],
  },
];

export const allPosts = [
  {
    id: 4,
    category: 'Mobile Reviews',
    tag: 'review',
    title: 'realme C71 Full Review — 120Hz Display on a Budget',
    excerpt:
      '6.67" 120Hz display, 6300mAh battery, and 45W SUPERVOOC charging. Strong value at Rs. 38,999.',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=900&q=85',
    author: 'Shaheen Mobiles',
    date: 'March 3, 2026',
    readTime: '6 min',
    rating: 4.2,
    content: `realme C71 is a reliable budget device. Its combination of a 120Hz display and 6300mAh battery is especially attractive in this segment.

**Display Performance**

The 6.67-inch 120Hz IPS LCD is smooth and reasonably sharp. Colors are balanced and outdoor visibility is acceptable.

**Battery and Charging**

The 6300mAh battery with 45W SUPERVOOC charging is one of its biggest strengths. A full day of mixed-heavy use is easy, and full recharge takes around 70 minutes.

**Daily Performance**

Unisoc T612 is adequate for social media, browsing, and routine app usage. It is not designed for high-end gaming, but day-to-day performance remains stable.

**Camera Quality**

The 50MP rear camera performs well in good lighting. 1080p video recording is supported. The front camera is fine for standard selfies and calls.`,
    pros: [
      'Large 6300mAh battery',
      '45W fast charging',
      '120Hz smooth display',
      'Clean realme software experience',
    ],
    cons: [
      'Average gaming performance',
      'No 5G support',
      'Plastic back can scratch easily',
    ],
  },
  {
    id: 5,
    category: 'Comparison',
    tag: 'comparison',
    title: 'realme C71 vs itel CITY 100 — Which One Should You Buy?',
    excerpt:
      'Two popular models tested side by side: specs, cameras, and real-world usability.',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=900&q=85',
    author: 'Shaheen Mobiles',
    date: 'Feb 28, 2026',
    readTime: '8 min',
    content: `realme C71 and itel CITY 100 are both strong sellers, but they target different priorities.

**Price Difference**

realme C71 is priced at Rs. 38,999, while itel CITY 100 comes in at Rs. 24,500. This gap is significant and should drive your decision.

**Display Comparison**

C71’s 120Hz panel has the edge in smoothness. CITY 100 still offers a good daily display, but C71 is clearly better.

**Battery Battle**

C71’s 6300mAh battery outlasts CITY 100’s 5000mAh in most usage patterns.

**Camera Face-off**

In daylight, C71 captures better detail and dynamic range. CITY 100 remains decent for social media use in this price bracket.

**Verdict**

If your budget is strict, CITY 100 is excellent value. If you can stretch, C71 delivers a noticeably better overall experience.`,
    pros: ['Clear side-by-side analysis', 'Real-world focus', 'Strong value breakdown'],
    cons: ['Neither offers 5G', 'Gaming is limited on both'],
  },
  {
    id: 6,
    category: 'Tips & Tricks',
    tag: 'tips',
    title: '10 Practical Tips to Improve Phone Battery Life',
    excerpt:
      'Battery draining too fast? These tested habits can improve battery life by 30–40% in daily use.',
    image: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=900&q=85',
    author: 'Shaheen Mobiles',
    date: 'Feb 25, 2026',
    readTime: '5 min',
    content: `Battery optimization is mostly about consistent habits. These practical steps can noticeably improve endurance.

**Tip 1: Manage Brightness**

Use auto-brightness or keep manual brightness around 40–50%.

**Tip 2: Restrict Background Activity**

Disable background activity for apps you rarely use.

**Tip 3: Enable Dark Mode**

On AMOLED devices, dark mode can save meaningful power.

**Tip 4: Control Location Access**

Allow location only for apps that truly need it.

**Tip 5: Limit Push Notifications**

Reduce unnecessary alerts and background wakeups.

**Tip 6: Prefer Wi‑Fi When Available**

Wi‑Fi usually consumes less power than weak cellular data usage.

**Tip 7: Use Battery Saver Early**

Enable saver mode around 20% to extend emergency screen time.`,
    pros: ['Easy to apply', 'No extra cost', 'Works on most Android phones'],
    cons: ['Requires habit changes', 'Dark mode benefit depends on screen type'],
  },
  {
    id: 7,
    category: 'Tech News',
    tag: 'news',
    title: 'itel A100 C Launch — 90Hz Display at Rs. 19,999',
    excerpt:
      'itel launches a strong entry-level option with a 6.6" 90Hz display and 5000mAh battery.',
    image: 'https://images.unsplash.com/photo-1519248708452-2c393f8dc725?w=900&q=85',
    author: 'Shaheen Mobiles',
    date: 'Feb 20, 2026',
    readTime: '3 min',
    content: `itel A100 C is an important launch in Pakistan’s entry segment.

**Launch Details**

Officially launched at Rs. 19,999 and available through major retailers including Shaheen Mobiles.

**Key Specifications**

6.6-inch 90Hz display, 5000mAh battery, 3GB RAM + 64GB storage, Android 14.

**Why It Matters**

A 90Hz panel at this price improves daily smoothness for first-time smartphone users and budget buyers.

**Availability**

Available nationwide in Blue and Black with official one-year warranty support.`,
    pros: ['90Hz at aggressive pricing', 'Android 14 out of the box', 'Good battery capacity'],
    cons: ['Entry-level chipset', 'No fast charging', 'Basic camera setup'],
  },
  {
    id: 8,
    category: 'Buying Guide',
    tag: 'guide',
    title: 'How to Choose the Right Phone in 2026',
    excerpt:
      'Camera? Battery? Gaming? Use this step-by-step guide to find the right phone for your needs.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=85',
    author: 'Shaheen Mobiles',
    date: 'Feb 15, 2026',
    readTime: '9 min',
    content: `With so many options in 2026, choosing the right phone can feel overwhelming. This framework helps simplify your decision.

**Step 1: Fix Your Budget**

Set a strict budget range first. It instantly removes confusion.

**Step 2: Define Your Main Use Case**

Gaming, camera, battery, social apps, or business use — this decides your priority specs.

**Step 3: List Must-Have Features**

Need 5G? AMOLED? Fast charging? High storage? Write non-negotiables.

**Step 4: Check After-Sales Support**

Reliable support and service centers are critical for long-term peace of mind.

**Step 5: Read Real Reviews**

Specs alone don’t tell the full story. Real-world testing shows stability, battery behavior, and camera consistency.`,
    pros: ['Clear framework', 'Useful for all budgets', 'Real-world buying approach'],
    cons: ['Final choice still depends on personal preference'],
  },
  {
    id: 9,
    category: 'Mobile Reviews',
    tag: 'review',
    title: 'itel POWER 70 Review — 6000mAh Powerhouse at Rs. 24,999',
    excerpt:
      'With a charging case and huge practical battery endurance, this phone targets heavy users.',
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=900&q=85',
    author: 'Shaheen Mobiles',
    date: 'Feb 10, 2026',
    readTime: '6 min',
    rating: 4.4,
    content: `itel POWER 70 stands out due to its battery-focused concept and utility-driven design.

**Unique Selling Point**

A smart charging case provides additional backup power, making the phone ideal for travelers and long-day users.

**Display Quality**

The 120Hz panel offers smooth daily navigation and acceptable visibility.

**Performance**

Daily performance is stable for social media, media playback, and moderate multitasking.

**Camera**

Daylight output is good enough for social sharing. Low-light quality is average for the price.

**Battery Verdict**

For buyers prioritizing endurance over raw gaming, this model is one of the strongest choices in its segment.`,
    pros: [
      'Battery-focused design',
      'Strong practical endurance',
      'Smooth display experience',
      'Useful for travel-heavy users',
    ],
    cons: [
      'Extra battery solution adds some bulk',
      'Not built for heavy gaming',
      'Night photography is average',
    ],
  },
  {
    id: 10,
    category: 'Tips & Tricks',
    tag: 'tips',
    title: 'How to Transfer Data When Switching Phones',
    excerpt:
      'Bought a new phone? Use these three methods to transfer data safely and quickly.',
    image: 'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?w=900&q=85',
    author: 'Shaheen Mobiles',
    date: 'Feb 5, 2026',
    readTime: '4 min',
    content: `Data transfer is one of the most common pain points after buying a new phone. These methods keep it simple.

**Method 1: Google Backup (Recommended)**

Enable backup in Google settings on the old phone. Sign in with the same account on the new phone to restore essentials.

**Method 2: Brand Transfer Tools**

Use built-in migration apps for wireless transfer of photos, apps, and settings.

**Method 3: Manual USB Transfer**

For very large media libraries, PC transfer via cable is often fastest and most reliable.

**WhatsApp Note**

Always create a separate chat backup before moving to a new device.`,
    pros: ['Simple steps', 'Works across brands', 'No paid tools required'],
    cons: ['Large transfers can take time', 'Some apps require manual re-login'],
  },
  {
    id: 11,
    category: 'Comparison',
    tag: 'comparison',
    title: 'realme Note 70 vs Note 60x — What’s the Real Difference?',
    excerpt:
      'Same lineup, different priorities. Is the price difference worth paying?',
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=900&q=85',
    author: 'Shaheen Mobiles',
    date: 'Jan 30, 2026',
    readTime: '7 min',
    content: `realme Note 70 and Note 60x are both popular, but they serve different buyer needs.

**Price Breakdown**

Note 60x is more budget-friendly, while Note 70 asks for a premium due to upgraded internals.

**Processor Difference**

Note 70 offers stronger overall speed and better sustained app performance.

**Display Comparison**

Both are smooth enough for daily use, with Note 70 having a slight quality edge.

**Camera Upgrade**

Note 70 captures better detail and performs better in lower light conditions.

**Battery and Charging**

Battery capacities are similar, but charging speed and tuning are improved on the higher model.

**Verdict**

Choose Note 60x for value. Choose Note 70 if camera and performance are your top priorities.`,
    pros: ['Clear upgrade explanation', 'Good value context', 'Practical recommendations'],
    cons: ['Price gap may be hard to justify for light users'],
  },
];

const categories = ['All', 'Mobile Reviews', 'Buying Guide', 'Tech News', 'Tips & Tricks', 'Comparison'];

const quickStats = [
  ['10K+', 'Monthly Readers'],
  ['120+', 'Phone Reviews'],
  ['4.8★', 'Trust Score'],
];

const editorialHighlights = [
  { icon: '⚡', label: 'Best Battery', value: '7000mAh Picks', note: 'Long-lasting phones for daily use' },
  { icon: '✦', label: 'Best Display', value: 'AMOLED Guides', note: 'Smooth screens and premium viewing' },
  { icon: '◈', label: 'Best Value', value: 'Under Rs. 25K', note: 'Budget phones worth buying' },
];

const comparisonItems = [
  ['Battery', 'realme 15T', 'itel POWER 70'],
  ['Display', 'itel S26 Ultra', 'realme C71'],
  ['Budget', 'itel A100 C', 'realme Note 60x'],
];

const Blog = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [sortBy, setSortBy] = useState('latest');

  const activeFeatured = featuredPosts[featuredIdx];
  const recentPosts = allPosts.slice(0, 4);

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const matches = allPosts
      .filter((post) => activeCategory === 'All' || post.category === activeCategory)
      .filter((post) => !query || `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(query));

    return [...matches].sort((a, b) => {
      if (sortBy === 'readTime') return parseInt(b.readTime, 10) - parseInt(a.readTime, 10);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return b.id - a.id;
    });
  }, [activeCategory, searchQuery, sortBy]);

  const categoryCounts = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category] =
        category === 'All'
          ? allPosts.length
          : allPosts.filter((post) => post.category === category).length;
      return acc;
    }, {});
  }, []);

  const goToPost = (id) => navigate(`/blog/${id}`);

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <main className="blog-page">
      <div className="noise-layer" aria-hidden="true" />

      <section className="blog-hero">
        <div className="hero-glow g1" aria-hidden="true" />
        <div className="hero-glow g2" aria-hidden="true" />

        <div className="hero-copy reveal-up">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Shaheen Mobiles Journal
          </span>

          <h1>
            Premium Mobile
            <em> Insights</em>
            <br />for Smart Buyers.
          </h1>

          <p>
            Latest reviews, buying guides, comparisons, and real-world phone tips —
            clean, honest, Pakistan-focused content.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={() =>
                document
                  .querySelector('.blog-filter-bar')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Explore Articles <span className="arrow">↓</span>
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => setActiveCategory('Buying Guide')}
            >
              Buying Guides
            </button>
          </div>

          <div className="hero-stats">
            {quickStats.map(([value, label]) => (
              <div className="stat-pill" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual reveal-up delay-1" aria-hidden="true">
          <div className="visual-card floating">
            <img src={activeFeatured.image} alt="Featured phone" />
            <div className="visual-badge">
              <span className="badge-label">Editor&apos;s Pick</span>
              <strong>5G Performance Guide</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-strip reveal-up delay-2">
        {editorialHighlights.map((item, i) => (
          <div className="ed-tile" key={item.label} style={{ animationDelay: `${i * 80}ms` }}>
            <span className="ed-icon">{item.icon}</span>
            <div className="ed-text">
              <small>{item.label}</small>
              <strong>{item.value}</strong>
              <p>{item.note}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="featured-shell reveal-up delay-2">
        <div className="section-label">
          <span>Featured Story</span>
          <small>
            {featuredIdx + 1} / {featuredPosts.length}
          </small>
        </div>

        <article className="featured-card" onClick={() => goToPost(activeFeatured.id)}>
          <div className="featured-media">
            <img src={activeFeatured.image} alt={activeFeatured.title} />
            <div className="media-scrim" />
            {activeFeatured.rating && <span className="rating-chip">★ {activeFeatured.rating}</span>}
          </div>

          <div className="featured-body">
            <span className="cat-tag">{activeFeatured.category}</span>
            <h2>{activeFeatured.title}</h2>
            <p>{activeFeatured.excerpt}</p>
            <div className="meta-row">
              <span>{activeFeatured.author}</span>
              <span>{activeFeatured.date}</span>
              <span>{activeFeatured.readTime} read</span>
            </div>
            <button
              type="button"
              className="btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                goToPost(activeFeatured.id);
              }}
            >
              Read Full Article <span className="arrow">→</span>
            </button>
          </div>
        </article>

        <div className="dot-nav">
          {featuredPosts.map((_, i) => (
            <button
              type="button"
              key={i}
              className={featuredIdx === i ? 'dot active' : 'dot'}
              onClick={() => setFeaturedIdx(i)}
              aria-label={`Featured ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <div className="blog-filter-bar">
        <div className="filter-inner">
          <div className="cat-scroll">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                className={activeCategory === cat ? 'cat-btn active' : 'cat-btn'}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
                <span className="count">{categoryCounts[cat]}</span>
              </button>
            ))}
          </div>

          <label className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              type="search"
              placeholder="Search reviews, guides, news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>

          <label className="sort-wrap">
            <span>Sort</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="latest">Latest</option>
              <option value="readTime">Deep Reads</option>
              <option value="category">Category</option>
            </select>
          </label>
        </div>
      </div>

      <section className="content-layout">
        <div className="articles-col">
          <div className="col-header">
            <div>
              <span className="col-eyebrow">Latest Articles</span>
              <h3>{activeCategory === 'All' ? 'Fresh From The Blog' : activeCategory}</h3>
            </div>
            <small>{filtered.length} articles</small>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">◎</span>
              <h4>No articles found</h4>
              <p>Try another keyword or reset your filters.</p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="posts-grid">
              {filtered.map((post, i) => (
                <article
                  key={post.id}
                  className="post-card"
                  style={{ animationDelay: `${i * 60}ms` }}
                  onClick={() => goToPost(post.id)}
                >
                  <div className="card-image">
                    <img src={post.image} alt={post.title} />
                    <span className="card-cat">{post.category}</span>
                  </div>
                  <div className="card-body">
                    <div className="card-meta">
                      <span>{post.date}</span>
                      <span>{post.readTime} read</span>
                    </div>
                    <h4>{post.title}</h4>
                    <p>{post.excerpt}</p>
                    <div className="card-footer">
                      <div className="author-chip">
                        <span className="author-av">S</span>
                        <div>
                          <strong>{post.author}</strong>
                          <small>Editorial</small>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="read-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToPost(post.id);
                        }}
                      >
                        Read →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <aside className="sidebar">
          <div className="sb-card profile-sb">
            <div className="sb-logo">SM</div>
            <h4>Shaheen Mobiles</h4>
            <p>Premium devices, honest reviews, and trusted buying advice.</p>
          </div>

          <div className="sb-card compare-sb">
            <h4>Quick Matchups</h4>
            {comparisonItems.map(([label, left, right]) => (
              <div className="matchup-row" key={label}>
                <small>{label}</small>
                <div className="matchup-vs">
                  <span>{left}</span>
                  <b>vs</b>
                  <span>{right}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="sb-card">
            <h4>Recent Posts</h4>
            <div className="recent-list">
              {recentPosts.map((post) => (
                <button type="button" key={post.id} className="recent-item" onClick={() => goToPost(post.id)}>
                  <img src={post.image} alt="" />
                  <span>
                    <small>{post.category}</small>
                    {post.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="sb-card newsletter-sb">
            <span className="nl-star">✦</span>
            <h4>Weekly Updates</h4>
            <p>Get top deals, reviews, and tips delivered to your inbox.</p>
            {subscribed ? (
              <div className="nl-success">Subscribed!</div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            )}
          </div>

          <div className="sb-card">
            <h4>Popular Tags</h4>
            <div className="tag-cloud">
              {['5G', 'Budget', 'AMOLED', 'Battery', 'Camera', 'realme', 'itel', 'Gaming', 'Pakistan', 'Tips'].map(
                (tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </aside>
      </section>

      <section className="insight-lab">
        <div className="insight-copy">
          <span className="col-eyebrow">Buyer Intelligence</span>
          <h2>Advanced mobile research, simplified.</h2>
          <p>
            Our editorial scoring helps you evaluate performance, camera, battery, and value before making a purchase.
          </p>
        </div>
        <div className="score-board">
          {[
            ['Performance', 92],
            ['Battery', 96],
            ['Camera', 84],
            ['Value', 89],
          ].map(([label, score]) => (
            <div className="score-row" key={label}>
              <div className="score-label">
                <span>{label}</span>
                <strong>{score}%</strong>
              </div>
              <div className="score-bar">
                <div className="score-fill" style={{ width: `${score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bottom-cta">
        <div className="cta-copy">
          <span className="col-eyebrow light">Never Miss An Update</span>
          <h2>Stay ahead with smarter mobile buying decisions.</h2>
          <p>Join thousands of readers getting premium mobile insights from Shaheen Mobiles.</p>
        </div>
        <div className="cta-form-wrap">
          {subscribed ? (
            <strong className="cta-done">You are subscribed ✓</strong>
          ) : (
            <form onSubmit={handleSubscribe} className="cta-form">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-white">
                Join Now
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Blog;