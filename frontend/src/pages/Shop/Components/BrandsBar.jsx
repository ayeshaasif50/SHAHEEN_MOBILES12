import { assets } from "../../../assets/assets";

const brands = [
  {
    name:   "Samsung",
    image:  assets.samsung,
    series: ["A Series", "S Series", "Z Series"],
  },
  {
    name:   "Xiaomi",
    image:  assets.xiaomi,
    series: ["A Series", "C Series", "Number Series", "Note 14 Series"],
  },
  {
    name:   "Infinix",
    image:  assets.infinix,
    series: ["Hot", "Note", "Zero", "Smart"],
  },
  {
    name:   "realme",         // ✅ lowercase — DB se match
    image:  assets.realme,
    series: ["Note Series", "C Series", "Number Series"],
  },
  {
    name:   "Itel",           // ✅ DB se match
    image:  assets.itel,
    series: [
      "A Series",
      "P Series",
      "S Series",
      "CITY Series",          // ✅ DB mein "CITY Series" hai
    ],
  },
  
];

const BrandsBar = ({ selectedBrand, onBrandClick }) => {
  return (
    <div className="brands-section">
      <h2>Explore Our Brands</h2>
      <p>
        Choose from our carefully curated selection of top smartphone brands.
        We bring you trusted names with the latest models and best deals — all under one roof.
      </p>
      <div className="brands-row">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className={`brand-card ${selectedBrand === brand.name ? "active" : ""}`}
            onClick={() => onBrandClick(brand.name)}
          >
            <div className="brand-logo-circle">
              <img src={brand.image} alt={brand.name} />
            </div>
            <p>{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { brands };
export default BrandsBar;