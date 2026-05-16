import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./ExploreBrands.css";

const brands = [
  {
    id: 1,
    name: "Samsung",
    image: assets.samsung,
    description:
      "Explore Samsung's premium lineup — from flagship Galaxy S series to budget-friendly A series. Powerful performance, stunning displays, and trusted reliability.",
  },
  {
    id: 2,
    name: "Xiaomi",
    image: assets.xiaomi,
    description:
      "Xiaomi brings you feature-packed smartphones at unbeatable prices. Experience cutting-edge technology with sleek design and long-lasting battery life.",
  },
  {
    id: 3,
    name: "Infinix",
    image: assets.infinix,
    description:
      "Infinix delivers stylish, high-performance smartphones built for the modern user. Great cameras, fast charging, and vibrant displays at affordable prices.",
  },
  {
    id: 4,
    name: "realme",
    image: assets.realme,
    description:
      "Realme offers bold design and powerful specs for the youth. Fast processors, impressive cameras, and trendy styles that stand out from the crowd.",
  },
  {
    id: 5,
    name: "Itel",
    image: assets.itel,
    description:
      "Itel provides reliable and affordable smartphones perfect for everyday use. Simple, durable, and efficient — ideal for those seeking value for money.",
  },
];

const ExploreBrands = () => {
  const navigate = useNavigate();

  const handleBrandClick = (brand) => {
    navigate(`/shop?brand=${encodeURIComponent(brand.name)}`);
  };

  return (
    <section className="explore-brands">
      {/* Header */}
      <div className="explore-header">
        <h2 className="explore-title">Explore Our Brands</h2>
        <p className="explore-desc">
          Choose from our carefully curated selection of top smartphone brands.
          We bring you trusted names with the latest models and best deals — all under one roof.
        </p>
      </div>

      {/* Brand Circles */}
      <div className="brands-list">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="brand-item"
            onClick={() => handleBrandClick(brand)}
          >
            <div className="brand-circle">
              <img src={brand.image} alt={brand.name} />
            </div>
            <p className="brand-name">{brand.name}</p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="explore-divider"></div>
    </section>
  );
};

export default ExploreBrands;