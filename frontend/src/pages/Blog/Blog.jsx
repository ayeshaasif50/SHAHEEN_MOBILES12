import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Blog.css';

export const featuredPosts = [
  {
    id: 1,
    category: 'Mobile Reviews',
    tag: 'review',
    title: 'realme 15T 5G — Pakistan Ka Pehla Sahi 5G Phone',
    excerpt:
      'Dimensity 6400 Max, 7000mAh Titan Battery, 120Hz AMOLED. Rs. 89,999 mein yeh phone sab se best option hai — har angle se.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=85',
    author: 'Shaheen Mobiles',
    date: 'March 10, 2026',
    readTime: '5 min',
    rating: 4.5,
    content: `realme 15T 5G Pakistan mein 5G ka ek naya chapter likhta hai. Is phone ko test karne ke baad hum confirm kar sakte hain ke yeh apni price range mein best overall package hai.

**Display aur Design**

6.72-inch 120Hz AMOLED display raat ko bhi zabardast lagti hai. Punch-hole design clean aur modern hai. Build quality premium plastic se banay hone ke bawajood premium feel deta hai.

**Performance**

Dimensity 6400 Max chipset gaming aur multitasking dono mein behtareen perform karta hai. Genshin Impact aur PUBG Mobile smoothly chalte hain bina kisi heating issue ke.

**Battery Life**

7000mAh ki titan battery is phone ka sabse bada plus point hai. Heavy use mein bhi 2 din aasaani se nikal jaate hain. 45W charging se 1 ghante mein full charge ho jaata hai.

**Camera**

50MP main camera daylight mein shaandar photos leta hai. Night mode bhi iss price range ke liye impressive hai. Selfie camera 16MP ka hai jo video calls ke liye perfect hai.

**Final Verdict**

Rs. 89,999 mein realme 15T 5G ek complete package hai. Agar aap 5G future-proofing chahte hain to yeh phone miss mat karo.`,
    pros: [
      '7000mAh massive battery life',
      '120Hz AMOLED display',
      'True 5G connectivity',
      '45W fast charging',
      'Dimensity 6400 Max performance',
    ],
    cons: [
      'No wireless charging',
      'Plastic build (no glass back)',
      'Camera struggles in low light',
    ],
  },
  {
    id: 2,
    category: 'Buying Guide',
    tag: 'guide',
    title: 'Best Budget Phones Under Rs. 25,000 in Pakistan — 2026 Edition',
    excerpt:
      'Tight budget? Hamare top picks jo aapko best value denge — itel A100 C se le ke realme Note 60x tak.',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&q=85',
    author: 'Shaheen Mobiles',
    date: 'March 7, 2026',
    readTime: '7 min',
    rating: 4.3,
    content: `Budget phones ka market 2026 mein kaafi matured ho gaya hai. Rs. 25,000 ke andar ab aapko AMOLED displays, fast charging, aur capable cameras mil sakte hain.

**Top Pick #1 — itel A100 C (Rs. 19,999)**

itel ka latest budget champion 6.6-inch 90Hz Super Clear Display ke saath aata hai. 5000mAh battery aur clean Android experience is price par outstanding value hai.

**Top Pick #2 — realme Note 60x (Rs. 22,999)**

realme Note 60x mein 6.67-inch 90Hz display, 5000mAh battery, aur 33W charging milti hai. Camera performance is range mein sabse zyada consistent hai.

**Top Pick #3 — itel CITY 100 (Rs. 24,500)**

CITY 100 ka design premium lagta hai. 6.78-inch display aur dual camera setup daily use ke liye bilkul perfect hai.

**Kya Dekhna Chahiye Budget Phone Mein?**

Battery life sabse pehle priority honi chahiye. Display quality doosre number par. Camera third priority par rakhein kyon ke budget cameras mein bohot fark nahi hota.

**Final Recommendation**

Agar battery aur value chahiye to itel A100 C. Agar balanced phone chahiye to realme Note 60x best choice hai.`,
    pros: [
      'Excellent value for money',
      'Good battery life across all picks',
      '90Hz smooth displays available',
      'Clean software experience',
    ],
    cons: [
      'No 5G in this price range',
      'Average low-light cameras',
      'Plastic builds throughout',
    ],
  },
  {
    id: 3,
    category: 'Tech News',
    tag: 'news',
    title: 'itel S26 Ultra — AMOLED Display Itni Sasti Price Mein?',
    excerpt:
      '144Hz 1.5K 3D-Curved AMOLED aur IP65 protection sirf Rs. 49,999 mein. itel ne budget game badal di.',
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=1200&q=85',
    author: 'Shaheen Mobiles',
    date: 'March 5, 2026',
    readTime: '4 min',
    rating: 4.3,
    content: `itel S26 Ultra ke launch ke saath budget smartphone market mein ek naya benchmark set ho gaya hai. 144Hz 1.5K 3D-Curved AMOLED display is price mein simply unbelievable hai.

**Display — Star of the Show**

1.5K resolution ke saath 144Hz refresh rate mil raha hai Rs. 49,999 mein — yeh pehle sirf premium phones mein dakhta tha. 3D curved edges content viewing experience ko cinematic bana dete hain.

**Build aur Protection**

IP65 rating matlab dust aur water splash se protection guaranteed hai. Build quality surprisingly solid hai. Curved glass back premium feel deta hai.

**Performance**

Helio G99 chipset casual gaming aur daily tasks ke liye smooth hai. 8GB RAM ke saath multitasking seamless rehti hai. Heavy gaming mein thodi heating notice ki gayi lekin manageable hai.

**Camera**

50MP Sony sensor daylight mein excellent results deta hai. Portrait mode bokeh natural lagta hai. Night photography is range mein behtareen performance hai.

**Conclusion**

itel S26 Ultra ne prove kar diya hai ke premium display ab sirf expensive phones ka haq nahi. Is phone ke launch se budget market permanently change ho gaya hai.`,
    pros: [
      '144Hz 1.5K AMOLED display — market-leading',
      'IP65 water resistance',
      'Premium curved design',
      'Sony 50MP camera sensor',
    ],
    cons: [
      'Heating under sustained gaming load',
      'Battery only 5000mAh (no extra large)',
      'Limited after-sales service centers',
    ],
  },
];

export const allPosts = [
  {
    id: 4,
    category: 'Mobile Reviews',
    tag: 'review',
    title: 'realme C71 Full Review — 120Hz Display Budget Mein',
    excerpt:
      '6.67" 120Hz display, 6300mAh battery, aur 45W SUPERVOOC charging. Rs. 38,999 mein yeh deal miss mat karo.',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=900&q=85',
    author: 'Shaheen Mobiles',
    date: 'March 3, 2026',
    readTime: '6 min',
    rating: 4.2,
    content: `realme C71 budget segment mein ek reliable choice hai. Iska 120Hz display aur 6300mAh battery combination is price range mein hard to beat hai.

**Display Performance**

6.67-inch 120Hz IPS LCD display sharp aur smooth hai. Colors accurate hain aur outdoor visibility decent hai. Budget mein yeh display quality appreciable hai.

**Battery aur Charging**

6300mAh battery aur 45W SUPERVOOC charging iska sabse bada USP hai. Ek raat ki charging se poora din aaram se nikal jata hai. 45W charging se 70 minute mein full charge possible hai.

**Daily Performance**

Unisoc T612 chipset daily apps aur social media ke liye adequate hai. Gaming mein limitations hain lekin casual gameplay chalti hai. 6GB RAM multitasking smooth rakhta hai.

**Camera Quality**

50MP main camera daylight mein solid results deta hai. Video 1080p 30fps tak record hoti hai. Front camera 8MP ka hai selfies ke liye reasonable quality ke saath.`,
    pros: [
      '6300mAh large battery',
      '45W fast charging',
      '120Hz smooth display',
      'Clean realme UI',
    ],
    cons: [
      'Chipset average for gaming',
      'No 5G support',
      'Plastic back scratches easily',
    ],
  },
  {
    id: 5,
    category: 'Comparison',
    tag: 'comparison',
    title: 'realme C71 vs itel CITY 100 — Kaun Sa Lena Chahiye?',
    excerpt:
      'Do popular mid-range phones ek saath test kiye. Specs, camera, aur real-world performance — poori comparison.',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=900&q=85',
    author: 'Shaheen Mobiles',
    date: 'Feb 28, 2026',
    readTime: '8 min',
    content: `realme C71 aur itel CITY 100 dono Pakistan ke mid-range market mein top sellers hain. Lekin dono mein kaafi fundamental differences hain jo buying decision affect karte hain.

**Price Difference**

realme C71 Rs. 38,999 par hai jabke itel CITY 100 Rs. 24,500 par available hai. Rs. 14,000 ka yeh fark significant hai aur sabse pehle consider karna chahiye.

**Display Comparison**

realme C71 ka 120Hz display clearly winner hai. itel CITY 100 ka 90Hz panel bhi smooth hai lekin C71 se peeche hai. Dono phones bright daylight mein useable hain.

**Battery Battle**

realme C71 ka 6300mAh battery itel ke 5000mAh se clearly aage hai. Daily use mein realme ek full day extra deta hai without question.

**Camera Face-off**

Daylight mein realme C71 better dynamic range aur detail capture karta hai. Budget shooting ke liye itel CITY 100 bhi decent results deta hai.

**Verdict**

Budget tight hai to itel CITY 100 excellent value hai. Extra spend karne ki capacity hai to realme C71 better overall experience deta hai.`,
    pros: ['Clear winner comparison', 'Real-world testing', 'Price-to-performance analysis'],
    cons: ['Both have no 5G', 'Average gaming on both'],
  },
  {
    id: 6,
    category: 'Tips & Tricks',
    tag: 'tips',
    title: '10 Tips: Apne Phone Ki Battery Life Kaise Badhayein',
    excerpt:
      'Battery jaldi khatam ho jaati hai? In 10 tested tricks se aap apni battery life 30–40% tak badha sakte hain.',
    image: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=900&q=85',
    author: 'Shaheen Mobiles',
    date: 'Feb 25, 2026',
    readTime: '5 min',
    content: `Battery optimization ek art hai. Yeh 10 tips aapki phone ki battery life dramatically improve kar sakte hain without sacrificing usability.

**Tip 1: Screen Brightness Reduce Karein**

Auto-brightness enable karna sabse easy aur effective step hai. Manual brightness ko 40-50% par rakhna bhi bohot helpful hai.

**Tip 2: Background App Refresh Band Karein**

Settings mein jakar unused apps ka background refresh disable karein. Yeh akela tip 15-20% battery bachaa sakta hai.

**Tip 3: Dark Mode Enable Karein**

AMOLED screens par dark mode genuine battery savings deta hai. Up to 30% savings possible hain heavy dark mode use par.

**Tip 4: Location Services Manage Karein**

Sirf wo apps ko location access den jo zaroorat hai. Background location tracking major battery drain hai.

**Tip 5: Push Notifications Manage Karein**

Har app ko push notifications ki zaroorat nahi. Unnecessary notifications disable karein.

**Tip 6: Wi-Fi vs Mobile Data**

Wi-Fi use karna mobile data se zyada battery efficient hai. Jab Wi-Fi available ho to use karein.

**Tip 7: Battery Saver Mode**

20% se neeche hone par battery saver mode manually enable karein. Is se last stretch mein significant extra time milta hai.`,
    pros: ['Easy to implement', 'No cost solutions', 'Works on all Android phones'],
    cons: ['Some tips require habit change', 'Dark mode needs AMOLED to be effective'],
  },
  {
    id: 7,
    category: 'Tech News',
    tag: 'news',
    title: 'itel A100 C Launch — 90Hz Display Sirf Rs. 19,999 Mein',
    excerpt:
      'itel ne apna budget champion launch kar diya — 6.6" 90Hz Super Clear Display aur 5000mAh battery.',
    image: 'https://images.unsplash.com/photo-1519248708452-2c393f8dc725?w=900&q=85',
    author: 'Shaheen Mobiles',
    date: 'Feb 20, 2026',
    readTime: '3 min',
    content: `itel A100 C ka launch Pakistan ke entry-level market mein ek important moment hai. Rs. 19,999 mein 90Hz display offer karna previously unheard of tha.

**Launch Details**

itel A100 C officially Pakistan mein launch ho gaya hai. Yeh Rs. 19,999 ki price par available hai leading retailers aur Shaheen Mobiles ke through.

**Key Specifications**

6.6-inch 90Hz Super Clear Display, 5000mAh battery, 3GB RAM with 64GB storage, aur Android 14 out of the box. MediaTek Helio A22 chipset daily tasks smooth karta hai.

**Why It Matters**

Is launch se pehle 90Hz displays Rs. 25,000+ phones mein milte the. itel ne yeh barrier tod di hai jo budget buyers ke liye game-changing hai.

**Availability**

Nationwide available hai immediately. Blue aur Black colors mein available hai. Warranty 1 saal official itel Pakistan se milti hai.`,
    pros: ['90Hz at Rs. 19,999 unprecedented', 'Android 14 out of box', 'Large 5000mAh battery'],
    cons: ['Basic chipset', 'No fast charging', '8MP camera only'],
  },
  {
    id: 8,
    category: 'Buying Guide',
    tag: 'guide',
    title: '2026 Mein Apne Liye Sahi Phone Kaise Choose Karein?',
    excerpt:
      'Camera chahiye? Battery? Gaming? Hamari step-by-step guide se apna perfect phone find karo — Pakistan ke liye.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=85',
    author: 'Shaheen Mobiles',
    date: 'Feb 15, 2026',
    readTime: '9 min',
    content: `2026 mein phone buying overwhelmingly confusing ho sakta hai. Itne options ke saath sahi choice karna mushkil hai. Yeh step-by-step guide aapki help karti hai.

**Step 1: Budget Fix Karein**

Sabse pehle ek strict budget decide karein. Under Rs. 20K, Rs. 20-40K, Rs. 40-70K, ya Rs. 70K+ mein se choose karein. Budget fix hone ke baad options dramatically kam ho jaate hain.

**Step 2: Primary Use Case Identify Karein**

Social media aur calls ke liye koi bhi budget phone chalega. Gaming ke liye processor priority hai. Camera ke liye sensor size aur software matter karta hai. Battery priority ke liye 6000mAh+ dekhein.

**Step 3: Must-Have Features List Banayein**

5G future-proofing chahiye? Fast charging zaroorat hai? AMOLED display must-have hai? In questions ke answers aapko automatically sahi segment mein le jaayenge.

**Step 4: Brand After-Sales Check Karein**

Pakistan mein realme, itel, aur Samsung ki service centers ki reach best hai. Warranty claim karna agar zaroorat pade to available service center important hai.

**Step 5: Reviews Parhen**

Sirf specs mat dekhein. Real-world reviews se actual performance pata chalta hai. Shaheen Mobiles ke reviews Pakistan-specific testing par based hain.`,
    pros: ['Comprehensive guide', 'Pakistan-specific advice', 'All budget ranges covered'],
    cons: ['Preferences vary person to person'],
  },
  {
    id: 9,
    category: 'Mobile Reviews',
    tag: 'review',
    title: 'itel POWER 70 Review — 6000mAh Powerhouse Rs. 24,999 Mein',
    excerpt:
      'Charging case ke saath total 10,000mAh, 120Hz display, aur aik poori din ki battery — yeh phone alag hai.',
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=900&q=85',
    author: 'Shaheen Mobiles',
    date: 'Feb 10, 2026',
    readTime: '6 min',
    rating: 4.4,
    content: `itel POWER 70 ek unique product hai. Charging case ke concept ko smartphone world mein lane wala yeh pehla affordable phone hai Pakistan mein.

**The Unique Selling Point**

POWER 70 ke saath ek smart charging case aata hai jo 4000mAh extra power deta hai. Total 10,000mAh effective capacity milti hai. Travelers aur heavy users ke liye yeh revolutionary hai.

**Display Quality**

6.6-inch 120Hz display is price range mein excellent hai. Colors vivid aur bright hain. Outdoor use mein visibility achi hai.

**Performance**

Unisoc T606 chipset daily use ke liye perfectly adequate hai. Social media, YouTube, casual gaming — sab smooth hai. Heavy gaming ke liye nahi banaya gaya.

**Camera System**

50MP main camera consistent daylight results deta hai. Portrait mode decent hai. Night photography average hai lekin acceptable for the price.

**Battery King Status**

6000mAh internal + 4000mAh case = 10,000mAh. 2-3 din bina charge ke possible hai light users ke liye. Heavy users ko bhi 1.5 din aaram se milenge.`,
    pros: [
      'Unique charging case concept',
      '10,000mAh effective capacity',
      '120Hz display at this price',
      'Excellent for travelers',
    ],
    cons: [
      'Charging case adds bulk',
      'Average processor for gaming',
      'Night photography could be better',
    ],
  },
  {
    id: 10,
    category: 'Tips & Tricks',
    tag: 'tips',
    title: 'Phone Switch Karte Waqt Data Transfer Kaise Karein?',
    excerpt:
      'Naya phone liya? In 3 aasan methods se apna sara data safe aur fast transfer karo — step by step guide.',
    image: 'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?w=900&q=85',
    author: 'Shaheen Mobiles',
    date: 'Feb 5, 2026',
    readTime: '4 min',
    content: `Naya phone lene ke baad sabse bada dard data transfer hota hai. Yeh 3 methods se yeh process smooth aur complete ho jaata hai.

**Method 1: Google Account Backup (Recommended)**

Purane phone mein Settings > Google > Backup par jaayein aur backup enable karein. Naye phone setup ke waqt same Google account se sign in karein — contacts, calendar, apps, aur most settings automatically restore ho jaayenge.

**Method 2: Brand-Specific Transfer Apps**

realme se realme ke liye Smart Transfer app use karein. itel ke phones mein Phone Clone feature hota hai. Samsung se kisi bhi phone par Smart Switch free hai. Yeh apps photos, videos, aur apps direct transfer karte hain wirelessly.

**Method 3: Manual USB Transfer**

Agar bohot zyada photos aur videos hain to USB cable se PC se transfer fastest method hai. Photos gallery app se select karein aur copy karein PC par. Phir naye phone mein paste karein.

**WhatsApp Backup Special Note**

WhatsApp ka alag backup process hai. WhatsApp Settings > Chats > Chat Backup se Google Drive backup zaroor karein pehle. Naye phone mein WhatsApp install karne par restore option aayega.`,
    pros: ['Multiple methods for all situations', 'Free solutions available', 'Works across brands'],
    cons: ['WhatsApp needs separate backup', 'Large files take time'],
  },
  {
    id: 11,
    category: 'Comparison',
    tag: 'comparison',
    title: 'realme Note 70 vs Note 60x — Kya Farak Hai Dono Mein?',
    excerpt:
      'Same series, alag specs. Rs. 10,000 ka fark worth it hai? Processor, battery, camera — sab compare kiya.',
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=900&q=85',
    author: 'Shaheen Mobiles',
    date: 'Jan 30, 2026',
    readTime: '7 min',
    content: `realme Note series Pakistan mein popular hai. Note 70 aur Note 60x ke darmiyan Rs. 10,000 ka fark hai — kya yeh worth it hai?

**Price Breakdown**

Note 60x Rs. 22,999 par available hai. Note 70 Rs. 32,999 par hai. Rs. 10,000 ka yeh gap significant hai.

**Processor Difference**

Note 70 mein Dimensity 6300 hai jo Note 60x ke Helio G88 se noticeably faster hai. Gaming aur heavy multitasking mein fark clearly dikh ta hai.

**Display Comparison**

Dono 6.67-inch 90Hz displays hain. Note 70 ka panel slightly brighter hai lekin daily use mein fark minimal hai.

**Camera Upgrade**

Note 70 ka 108MP camera Note 60x ke 50MP se clearly better detail capture karta hai especially crop mein. Portrait aur night photography bhi improved hai.

**Battery aur Charging**

Dono 5000mAh battery ke saath aate hain. Note 70 mein 45W charging hai jabke Note 60x 33W par hai. Note 70 faster charge hota hai clearly.

**Verdict**

Regular users ke liye Note 60x excellent value hai. Gaming ya camera priority hai to Note 70 Rs. 10,000 extra justify karta hai.`,
    pros: ['Clear upgrade path visible', 'Both solid options', 'Detailed spec-by-spec breakdown'],
    cons: ['Rs. 10,000 gap is significant', 'Not everyone needs Note 70 upgrades'],
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
      acc[category] = category === 'All' ? allPosts.length : allPosts.filter((post) => post.category === category).length;
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
      {/* NOISE OVERLAY */}
      <div className="noise-layer" aria-hidden="true" />

      {/* ── HERO ── */}
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
            Latest reviews, buying guides, comparisons aur real-world phone tips —
            clean, honest, Pakistan-focused content.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={() => document.querySelector('.blog-filter-bar')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Articles <span className="arrow">↓</span>
            </button>
            <button type="button" className="btn-ghost" onClick={() => setActiveCategory('Buying Guide')}>
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
              <span className="badge-label">Editor's Pick</span>
              <strong>5G Performance Guide</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL STRIP ── */}
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

      {/* ── FEATURED ── */}
      <section className="featured-shell reveal-up delay-2">
        <div className="section-label">
          <span>Featured Story</span>
          <small>{featuredIdx + 1} / {featuredPosts.length}</small>
        </div>

        <article className="featured-card" onClick={() => goToPost(activeFeatured.id)}>
          <div className="featured-media">
            <img src={activeFeatured.image} alt={activeFeatured.title} />
            <div className="media-scrim" />
            {activeFeatured.rating && (
              <span className="rating-chip">★ {activeFeatured.rating}</span>
            )}
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
              onClick={(e) => { e.stopPropagation(); goToPost(activeFeatured.id); }}
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

      {/* ── FILTER BAR ── */}
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

      {/* ── CONTENT LAYOUT ── */}
      <section className="content-layout">
        {/* Articles */}
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
              <p>Try another keyword or reset filters.</p>
              <button type="button" className="btn-primary" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
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
                        onClick={(e) => { e.stopPropagation(); goToPost(post.id); }}
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

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sb-card profile-sb">
            <div className="sb-logo">SM</div>
            <h4>Shaheen Mobiles</h4>
            <p>Premium devices, honest reviews, trusted buying advice.</p>
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
            <p>Best phone deals, reviews aur tips seedha inbox mein.</p>
            {subscribed ? (
              <div className="nl-success">Subscribed!</div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">Subscribe</button>
              </form>
            )}
          </div>

          <div className="sb-card">
            <h4>Popular Tags</h4>
            <div className="tag-cloud">
              {['5G', 'Budget', 'AMOLED', 'Battery', 'Camera', 'realme', 'itel', 'Gaming', 'Pakistan', 'Tips'].map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* ── INSIGHT LAB ── */}
      <section className="insight-lab">
        <div className="insight-copy">
          <span className="col-eyebrow">Buyer Intelligence</span>
          <h2>Advanced mobile research, simplified.</h2>
          <p>Our editorial scoring helps you understand performance, camera, battery, aur price value before you buy.</p>
        </div>
        <div className="score-board">
          {[['Performance', 92], ['Battery', 96], ['Camera', 84], ['Value', 89]].map(([label, score]) => (
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

      {/* ── BOTTOM CTA ── */}
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
              <input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button type="submit" className="btn-white">Join Now</button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Blog;
