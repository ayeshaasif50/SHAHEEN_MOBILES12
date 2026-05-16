import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../../utils/api';
import BrandsBar, { brands } from './Components/BrandsBar';
import SeriesBar from './Components/SeriesBar';
import ProductCard from './Components/ProductCard';
import './Shop.css';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts]         = useState([]);
  const [loading, setLoading]           = useState(true);

  const selectedBrand  = searchParams.get('brand')  || '';
  const selectedSeries = searchParams.get('series') || '';
  const searchQuery    = (searchParams.get('q') || '').trim();
  const focusSearch    = searchParams.get('focus') === '1';

  const searchRef = useRef(null);

  useEffect(() => {
    if (focusSearch && searchRef.current) {
      searchRef.current.focus();
    }
  }, [focusSearch]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedBrand)  params.append('brand',  selectedBrand);
        if (selectedSeries) params.append('series', selectedSeries);

        const { data } = await API.get(`/products?${params}`);
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [selectedBrand, selectedSeries]);

  const updateParams = (next = {}) => {
    const params = {};
    if (next.brand) params.brand = next.brand;
    if (next.series) params.series = next.series;
    if (next.q) params.q = next.q;
    if (next.focus) params.focus = next.focus;
    setSearchParams(params);
  };

  const handleBrandClick = (brandName) => {
    if (selectedBrand === brandName) {
      updateParams({ q: searchQuery });
    } else {
      updateParams({ brand: brandName, q: searchQuery });
    }
  };

  const handleSeriesClick = (seriesName) => {
    updateParams({ brand: selectedBrand, series: seriesName, q: searchQuery });
  };

  const resetSeries = () => {
    updateParams({ brand: selectedBrand, q: searchQuery });
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    updateParams({ brand: selectedBrand, series: selectedSeries, q: val });
  };

  const activeBrand = brands.find(b => b.name === selectedBrand);

  const heading = selectedSeries
    ? `${selectedBrand} — ${selectedSeries}`
    : selectedBrand
    ? `${selectedBrand} Mobiles`
    : 'All Mobiles';

  const normalizedQuery = searchQuery.toLowerCase();

  const filteredProducts = normalizedQuery
    ? products.filter(p =>
        (p.name || '').toLowerCase().includes(normalizedQuery)
      )
    : products;

  return (
    <div className="shop-page">

      <BrandsBar
        selectedBrand={selectedBrand}
        onBrandClick={handleBrandClick}
      />

      {activeBrand && (
        <SeriesBar
          brand={activeBrand}
          selectedSeries={selectedSeries}
          onSeriesClick={handleSeriesClick}
          onReset={resetSeries}
        />
      )}

      <div className="shop-heading">
        <h3>{heading}</h3>
        <span>{filteredProducts.length} results</span>
      </div>

      <div className="shop-search">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search mobiles..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className="shop-loading">
          <p>Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="shop-empty">
          <p>No products found.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Shop;