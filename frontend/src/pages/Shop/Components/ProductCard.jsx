import { useNavigate } from 'react-router-dom';
import './ProductCard.css';
import { useCart } from '../../../context/CartContext';  // ← 3 dots! (../../.. )

// ✅ FIX: localhost hardcode hataya — env variable se URL aata hai
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const getImageUrl = (image) => {
  if (!image) return '/placeholder.png';
  if (image.startsWith('http')) return image; // ✅ Cloudinary URL directly use karo
  return `${API_BASE}${image}`;               // local path ke liye backend URL
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const imageUrl = getImageUrl(product.image);

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {product.badge && (
        <span className={`badge badge-${product.badge.toLowerCase().replace(' ', '-')}`}>
          {product.badge}
        </span>
      )}

      <div className="product-image">
        <img
          src={imageUrl}
          alt={product.name}
          onError={(e) => { e.target.src = '/placeholder.png' }}
        />
      </div>

      <div className="product-info">
        <p className="product-brand">{product.brand}</p>
        <h4 className="product-name">{product.name}</h4>
        <p className="product-specs">
          {product.ram && `${product.ram}`}
          {product.storage && ` • ${product.storage}`}
          {product.specs?.camera && ` • ${product.specs.camera}`}
        </p>
        <p className="product-price">
          Rs. {product.price?.toLocaleString()}
        </p>
        <button
          className="btn-add-cart"
          disabled={product.stock === 0}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          {product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;