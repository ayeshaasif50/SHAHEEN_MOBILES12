import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';

dotenv.config();

const products = [

  // ==================== ITEL S SERIES — S26 Ultra ====================
  {
    name:        'itel S26 Ultra',
    brand:       'Itel',
    series:      'S Series',
    price:       49999,
    description: 'itel S26 Ultra features 144Hz 1.5K 3D-Curved AMOLED display with 6000mAh battery and IP65 protection.',
    image: '/uploads/itel/s-series/s26-ultra/front.jpg',
    images: [
      '/uploads/itel/s-series/s26-ultra/front.jpg',
      '/uploads/itel/s-series/s26-ultra/colors/white.jpg',
      '/uploads/itel/s-series/s26-ultra/colors/blue.jpg',
      '/uploads/itel/s-series/s26-ultra/colors/back.jpg',
      '/uploads/itel/s-series/s26-ultra/colors/grey.jpg',
    ],
    colors: [
      { name: 'White', hex: '#f5f5f5', images: ['/uploads/itel/s-series/s26-ultra/colors/white.jpg'] },
      { name: 'Blue',  hex: '#003087', images: ['/uploads/itel/s-series/s26-ultra/colors/blue.jpg'] },
      { name: 'Grey',  hex: '#808080', images: ['/uploads/itel/s-series/s26-ultra/colors/grey.jpg'] },
      { name: 'Back',  hex: '#1a1a1a', images: ['/uploads/itel/s-series/s26-ultra/colors/back.jpg'] },
    ],
    ram: '8GB', storage: '256GB',
    specs: {
      camera: '50+2/32MP', battery: '6000mAh',
      display: '144Hz 1.5K 3D-Curved AMOLED',
      processor: 'itel Octa Core', os: 'Android 14', sim: 'Dual SIM',
    },
    variants: [{ ram: '8GB', storage: '256GB', price: 49999 }],
    features: ['144Hz 1.5K 3D-Curved AMOLED', '6000mAh Battery', 'IP65 Protection', '50MP Camera'],
    stock: 20, badge: 'NEW', rating: 4.3, numReviews: 2,
    reviews: [
      { name: 'Ahmed', rating: 5, comment: 'Amazing AMOLED display!' },
      { name: 'Sara',  rating: 4, comment: 'Battery life is excellent.' },
    ],
  },

  // ==================== ITEL S SERIES — S25 ====================
  {
    name:        'itel S25',
    brand:       'Itel',
    series:      'S Series',
    price:       33499,
    description: 'itel S25 features 6.78" 120Hz AMOLED display with 50/32MP camera setup and 5000mAh battery.',
    image: '/uploads/itel/s-series/s25/colors/itel-s25-official-image.webp',
    images: [
      '/uploads/itel/s-series/s25/colors/itel-s25-official-image.webp',
      '/uploads/itel/s-series/s25/colors/itel-s25-black-image.webp',
      '/uploads/itel/s-series/s25/colors/itel-s25-sahara-gleam-official-image.webp',
      '/uploads/itel/s-series/s25/back.webp',
    ],
    colors: [
      {
        name: 'Official', hex: '#4a90d9',
        images: [
          '/uploads/itel/s-series/s25/colors/itel-s25-official-image.webp',
          '/uploads/itel/s-series/s25/back.webp',
        ],
      },
      { name: 'Midnight Black', hex: '#1a1a1a', images: ['/uploads/itel/s-series/s25/colors/itel-s25-black-image.webp'] },
      { name: 'Sahara Gleam',   hex: '#c8a96e', images: ['/uploads/itel/s-series/s25/colors/itel-s25-sahara-gleam-official-image.webp'] },
    ],
    ram: '6GB', storage: '128GB',
    specs: {
      camera: '50/32MP', battery: '5000mAh',
      display: '6.78" 120Hz AMOLED',
      processor: 'itel Octa Core', os: 'Android 13', sim: 'Dual SIM',
    },
    variants: [{ ram: '6GB', storage: '128GB', price: 33499 }],
    features: ['6.78" AMOLED', '120Hz Refresh Rate', '5000mAh Battery', '50/32MP Camera'],
    stock: 20, badge: '', rating: 4.2, numReviews: 0, reviews: [],
  },

  // ==================== ITEL CITY SERIES — CITY 100 ====================
  {
    name:        'itel CITY 100',
    brand:       'Itel',
    series:      'CITY Series',
    price:       28999,
    description: 'itel CITY 100 comes with a 6.75" high brightness display, 13/8MP camera, and 5200mAh battery.',
    image: '/uploads/itel/city-series/city-100/colors/itel-city-100-navy-blue-image.webp',
    images: [
      '/uploads/itel/city-series/city-100/colors/itel-city-100-fairy-purple-official.webp',
      '/uploads/itel/city-series/city-100/colors/itel-city-100-navy-blue-image.webp',
      '/uploads/itel/city-series/city-100/colors/itel-city-100-pure-titanium-image.webp',
      '/uploads/itel/city-series/city-100/itel-city-100-camera-side-image.webp',
    ],
    colors: [
      { name: 'Fairy Purple',  hex: '#9b59b6', images: ['/uploads/itel/city-series/city-100/colors/itel-city-100-fairy-purple-official.webp'] },
      { name: 'Navy Blue',     hex: '#003087', images: ['/uploads/itel/city-series/city-100/colors/itel-city-100-navy-blue-image.webp'] },
      { name: 'Pure Titanium', hex: '#808080', images: ['/uploads/itel/city-series/city-100/colors/itel-city-100-pure-titanium-image.webp'] },
    ],
    ram: '6GB', storage: '128GB',
    specs: {
      camera: '13/8MP', battery: '5200mAh',
      display: '6.75" High Brightness',
      processor: 'itel Octa Core', os: 'Android 13', sim: 'Dual SIM',
    },
    variants: [{ ram: '6GB', storage: '128GB', price: 28999 }],
    features: ['6.75" Display', 'High Brightness', '5200mAh Battery', '13/8MP Camera'],
    stock: 20, badge: 'NEW', rating: 4.1, numReviews: 0, reviews: [],
  },

  // ==================== ITEL P SERIES — POWER 70 ====================
  {
    name:        'itel POWER 70',
    brand:       'Itel',
    series:      'P Series',
    price:       24999,
    description: 'itel POWER 70 features a 6.67" 120Hz display, 6000mAh battery, and 4000mAh charging case support.',
    image: '/uploads/itel/p-series/power-70/large_itel-power-70_1.jpg',
    images: [
      '/uploads/itel/p-series/power-70/large_itel-power-70_1.jpg',
      '/uploads/itel/p-series/power-70/large_itel-power-70_5.jpg',
      '/uploads/itel/p-series/power-70/colors/large_itel-power-70_2.jpg',
      '/uploads/itel/p-series/power-70/colors/large_itel-power-70_3.jpg',
      '/uploads/itel/p-series/power-70/colors/large_itel-power-70_4.jpg',
    ],
    colors: [
      { name: 'Color 1', hex: '#2c3e50', images: ['/uploads/itel/p-series/power-70/large_itel-power-70_1.jpg', '/uploads/itel/p-series/power-70/large_itel-power-70_5.jpg'] },
      { name: 'Color 2', hex: '#27ae60', images: ['/uploads/itel/p-series/power-70/colors/large_itel-power-70_2.jpg'] },
      { name: 'Color 3', hex: '#8e44ad', images: ['/uploads/itel/p-series/power-70/colors/large_itel-power-70_3.jpg'] },
      { name: 'Color 4', hex: '#e67e22', images: ['/uploads/itel/p-series/power-70/colors/large_itel-power-70_4.jpg'] },
    ],
    ram: '4GB', storage: '128GB',
    specs: {
      camera: '13/8MP', battery: '6000mAh',
      display: '6.67" 120Hz',
      processor: 'itel Octa Core', os: 'Android 13', sim: 'Dual SIM',
    },
    variants: [{ ram: '4GB', storage: '128GB', price: 24999 }],
    features: ['6.67" Display', '120Hz Refresh Rate', '6000mAh Battery', '4000mAh Charging Case'],
    stock: 20, badge: '', rating: 4.1, numReviews: 0, reviews: [],
  },

  // ==================== ITEL A SERIES — A100 ====================
  {
    name:        'itel A100',
    brand:       'Itel',
    series:      'A Series',
    price:       23999,
    description: 'itel A100 offers a 6.75" high brightness display, 8/8MP camera, and 5000mAh battery.',
    image: '/uploads/itel/a-series/a100/large_itel-a100_1.jpg',
    images: [
      '/uploads/itel/a-series/a100/large_itel-a100_1.jpg',
      '/uploads/itel/a-series/a100/large_itel-a100_5.jpg',
      '/uploads/itel/a-series/a100/colors/large_itel-a100_2.jpg',
      '/uploads/itel/a-series/a100/colors/large_itel-a100_3.jpg',
      '/uploads/itel/a-series/a100/colors/large_itel-a100_4.jpg',
    ],
    colors: [
      { name: 'Color 1', hex: '#2c3e50', images: ['/uploads/itel/a-series/a100/large_itel-a100_1.jpg', '/uploads/itel/a-series/a100/large_itel-a100_5.jpg'] },
      { name: 'Color 2', hex: '#16a085', images: ['/uploads/itel/a-series/a100/colors/large_itel-a100_2.jpg'] },
      { name: 'Color 3', hex: '#8e44ad', images: ['/uploads/itel/a-series/a100/colors/large_itel-a100_3.jpg'] },
      { name: 'Color 4', hex: '#d35400', images: ['/uploads/itel/a-series/a100/colors/large_itel-a100_4.jpg'] },
    ],
    ram: '4GB', storage: '128GB',
    specs: {
      camera: '8/8MP', battery: '5000mAh',
      display: '6.75" High Brightness',
      processor: 'itel Octa Core', os: 'Android 13', sim: 'Dual SIM',
    },
    variants: [{ ram: '4GB', storage: '128GB', price: 23999 }],
    features: ['6.75" Display', 'High Brightness', '5000mAh Battery', '8/8MP Camera'],
    stock: 20, badge: '', rating: 4.0, numReviews: 0, reviews: [],
  },

  // ==================== ITEL A SERIES — A100 C ====================
  {
    name:        'itel A100 C',
    brand:       'Itel',
    series:      'A Series',
    price:       19999,
    description: 'itel A100 C comes with a 6.6" 90Hz Super Clear Display, 8/5MP camera, and 5000mAh battery.',
    image: '/uploads/itel/a-series/a100-c/itel-a100c-4g-pure-black-front-side-image.webp',
    images: [
      '/uploads/itel/a-series/a100-c/itel-a100c-4g-pure-black-front-side-image.webp',
      '/uploads/itel/a-series/a100-c/itel-a100c-4g-pure-black-back-side-image.webp',
      '/uploads/itel/a-series/a100-c/colors/itel-a100c-4g-pure-black-official.webp',
      '/uploads/itel/a-series/a100-c/colors/itel-a100c-4g-blaze-blue-official.webp',
      '/uploads/itel/a-series/a100-c/colors/itel-a100c-4g-silk-green-official.webp',
      '/uploads/itel/a-series/a100-c/colors/itel-a100c-4g-titanium-gold-official.webp',
    ],
    colors: [
      {
        name: 'Pure Black', hex: '#1a1a1a',
        images: [
          '/uploads/itel/a-series/a100-c/itel-a100c-4g-pure-black-front-side-image.webp',
          '/uploads/itel/a-series/a100-c/itel-a100c-4g-pure-black-back-side-image.webp',
          '/uploads/itel/a-series/a100-c/colors/itel-a100c-4g-pure-black-official.webp',
        ],
      },
      { name: 'Blaze Blue',    hex: '#1a6fd4', images: ['/uploads/itel/a-series/a100-c/colors/itel-a100c-4g-blaze-blue-official.webp'] },
      { name: 'Silk Green',    hex: '#2ecc71', images: ['/uploads/itel/a-series/a100-c/colors/itel-a100c-4g-silk-green-official.webp'] },
      { name: 'Titanium Gold', hex: '#d4ac0d', images: ['/uploads/itel/a-series/a100-c/colors/itel-a100c-4g-titanium-gold-official.webp'] },
    ],
    ram: '4GB', storage: '64GB',
    specs: {
      camera: '8/5MP', battery: '5000mAh',
      display: '6.6" 90Hz Super Clear Display',
      processor: 'itel Octa Core', os: 'Android 13 Go', sim: 'Dual SIM',
    },
    variants: [{ ram: '4GB', storage: '64GB', price: 19999 }],
    features: ['6.6" Display', '90Hz Refresh Rate', 'Super Clear Display', '5000mAh Battery'],
    stock: 20, badge: 'NEW', rating: 4.0, numReviews: 0, reviews: [],
  },

  // ==================== ITEL A SERIES — A90 ====================
  {
    name:        'itel A90',
    brand:       'Itel',
    series:      'A Series',
    price:       19999,
    description: 'itel A90 features a 6.6" durable screen, 13/8MP camera, and 5000mAh battery.',
    image: '/uploads/itel/a-series/a90/itel-a90-128gb-space-titanium.png',
    images: [
      '/uploads/itel/a-series/a90/itel-a90-128gb-space-titanium.png',
      '/uploads/itel/a-series/a90/44e62da8-0174-43cf-b566-e5230989a578-1000x1000-yApA4KNsbtES3fKid4JJOuil9R15CR96m64DoRcj.webp',
      '/uploads/itel/a-series/a90/itel-a90-pakistan-priceoye-z7vrg-500x500_2e918c3e-eea8-4108-be5e-100b1110e359.webp',
    ],
    colors: [
      {
        name: 'Space Titanium', hex: '#5a5a5a',
        images: [
          '/uploads/itel/a-series/a90/itel-a90-128gb-space-titanium.png',
          '/uploads/itel/a-series/a90/44e62da8-0174-43cf-b566-e5230989a578-1000x1000-yApA4KNsbtES3fKid4JJOuil9R15CR96m64DoRcj.webp',
          '/uploads/itel/a-series/a90/itel-a90-pakistan-priceoye-z7vrg-500x500_2e918c3e-eea8-4108-be5e-100b1110e359.webp',
        ],
      },
    ],
    ram: '4GB', storage: '64GB',
    specs: {
      camera: '13/8MP', battery: '5000mAh',
      display: '6.6" Durable Screen',
      processor: 'itel Octa Core', os: 'Android 13', sim: 'Dual SIM',
    },
    variants: [{ ram: '4GB', storage: '64GB', price: 19999 }],
    features: ['6.6" Durable Screen', '5000mAh Battery', '13/8MP Camera', 'A Series Value Phone'],
    stock: 20, badge: '', rating: 4.0, numReviews: 0, reviews: [],
  },

  // ==================== ITEL A SERIES — A50c ====================
  {
    name:        'itel A50c',
    brand:       'Itel',
    series:      'A Series',
    price:       16999,
    description: 'itel A50c offers a 6.6" durable screen, 8/5MP camera, and 4000mAh battery in an affordable package.',
    image: '/uploads/itel/a-series/a50-c/a50c-pakistan-priceoye-dckrv-500x500.webp',
    images: [
      '/uploads/itel/a-series/a50-c/a50c-pakistan-priceoye-dckrv-500x500.webp',
      '/uploads/itel/a-series/a50-c/a50c-pakistan-priceoye-t51xg-270x270.webp',
      '/uploads/itel/a-series/a50-c/a50c-pakistan-priceoye-u63tl-500x500.webp',
      '/uploads/itel/a-series/a50-c/a50c-pakistan-priceoye-zdg4m-500x500.webp',
    ],
    colors: [
      {
        name: 'Color 1', hex: '#8a8a8a',
        images: [
          '/uploads/itel/a-series/a50-c/a50c-pakistan-priceoye-dckrv-500x500.webp',
          '/uploads/itel/a-series/a50-c/a50c-pakistan-priceoye-t51xg-270x270.webp',
        ],
      },
      {
        name: 'Color 2', hex: '#3d85c8',
        images: [
          '/uploads/itel/a-series/a50-c/a50c-pakistan-priceoye-u63tl-500x500.webp',
          '/uploads/itel/a-series/a50-c/a50c-pakistan-priceoye-zdg4m-500x500.webp',
        ],
      },
    ],
    ram: '2GB', storage: '64GB',
    specs: {
      camera: '8/5MP', battery: '4000mAh',
      display: '6.6" Durable Screen',
      processor: 'itel Quad Core', os: 'Android 13 Go', sim: 'Dual SIM',
    },
    variants: [{ ram: '2GB', storage: '64GB', price: 16999 }],
    features: ['6.6" Durable Screen', '4000mAh Battery', '8/5MP Camera', 'Budget Friendly'],
    stock: 20, badge: '', rating: 3.9, numReviews: 0, reviews: [],
  },

  // ==================== REALME NOTE 60x — 3GB ====================
  {
    name:        'realme Note 60x',
    brand:       'realme',
    series:      'Note Series',
    price:       23999,
    description: 'realme Note 60x features a 6.74" 90Hz display, UNISOC T612 chipset, 5000mAh battery, and 8MP rear camera.',
    // ✅ Exact folder: "realme note60x" — spaces encode hote hain
    image: '/uploads/realme/realme%20note60x/images.jpg',
    images: [
      '/uploads/realme/realme%20note60x/images.jpg',
      '/uploads/realme/realme%20note60x/realme-note-60x-99.webp',
      '/uploads/realme/realme%20note60x/RealmeNote60x-b.jpg',
      '/uploads/realme/realme%20note60x/wilderness%20Green.jpg',
    ],
    colors: [
      {
        name: 'Wilderness Green', hex: '#5f6f52',
        images: ['/uploads/realme/realme%20note60x/wilderness%20Green.jpg'],
      },
      {
        name: 'Marble Black', hex: '#1f1f1f',
        images: ['/uploads/realme/realme%20note60x/realme-note-60x-99.webp'],
      },
      {
        name: 'Back View', hex: '#111111',
        images: ['/uploads/realme/realme%20note60x/RealmeNote60x-b.jpg'],
      },
    ],
    ram: '3GB', storage: '64GB',
    specs: {
      camera: '8/5MP', battery: '5000mAh',
      display: '6.74" 90Hz HD+ Eye Comfort Display',
      processor: 'UNISOC T612',
      os: 'realme UI based on Android 14', sim: 'Dual SIM',
    },
    variants: [{ ram: '3GB', storage: '64GB', price: 23999 }],
    features: ['6.74" 90Hz Display', '5000mAh Battery', 'UNISOC T612', 'IP54 Protection'],
    stock: 20, badge: '', rating: 4.1, numReviews: 0, reviews: [],
  },

  // ==================== REALME NOTE 60x — 4GB/64GB ====================
  {
    name:        'realme Note 60x',
    brand:       'realme',
    series:      'Note Series',
    price:       27999,
    description: 'realme Note 60x features a 6.74" 90Hz display, UNISOC T612 chipset, 5000mAh battery, and 8MP rear camera.',
    image: '/uploads/realme/realme%20note60x/images.jpg',
    images: [
      '/uploads/realme/realme%20note60x/images.jpg',
      '/uploads/realme/realme%20note60x/realme-note-60x-99.webp',
      '/uploads/realme/realme%20note60x/RealmeNote60x-b.jpg',
      '/uploads/realme/realme%20note60x/wilderness%20Green.jpg',
    ],
    colors: [
      { name: 'Wilderness Green', hex: '#5f6f52', images: ['/uploads/realme/realme%20note60x/wilderness%20Green.jpg'] },
      { name: 'Marble Black',     hex: '#1f1f1f', images: ['/uploads/realme/realme%20note60x/realme-note-60x-99.webp'] },
      { name: 'Back View',        hex: '#111111', images: ['/uploads/realme/realme%20note60x/RealmeNote60x-b.jpg'] },
    ],
    ram: '4GB', storage: '64GB',
    specs: {
      camera: '8/5MP', battery: '5000mAh',
      display: '6.74" 90Hz HD+ Eye Comfort Display',
      processor: 'UNISOC T612',
      os: 'realme UI based on Android 14', sim: 'Dual SIM',
    },
    variants: [{ ram: '4GB', storage: '64GB', price: 27999 }],
    features: ['6.74" 90Hz Display', '5000mAh Battery', 'UNISOC T612', 'IP54 Protection'],
    stock: 20, badge: '', rating: 4.1, numReviews: 0, reviews: [],
  },

  // ==================== REALME NOTE 60x — 4GB/128GB ====================
  {
    name:        'realme Note 60x',
    brand:       'realme',
    series:      'Note Series',
    price:       29999,
    description: 'realme Note 60x features a 6.74" 90Hz display, UNISOC T612 chipset, 5000mAh battery, and 8MP rear camera.',
    image: '/uploads/realme/realme%20note60x/images.jpg',
    images: [
      '/uploads/realme/realme%20note60x/images.jpg',
      '/uploads/realme/realme%20note60x/realme-note-60x-99.webp',
      '/uploads/realme/realme%20note60x/RealmeNote60x-b.jpg',
      '/uploads/realme/realme%20note60x/wilderness%20Green.jpg',
    ],
    colors: [
      { name: 'Wilderness Green', hex: '#5f6f52', images: ['/uploads/realme/realme%20note60x/wilderness%20Green.jpg'] },
      { name: 'Marble Black',     hex: '#1f1f1f', images: ['/uploads/realme/realme%20note60x/realme-note-60x-99.webp'] },
      { name: 'Back View',        hex: '#111111', images: ['/uploads/realme/realme%20note60x/RealmeNote60x-b.jpg'] },
    ],
    ram: '4GB', storage: '128GB',
    specs: {
      camera: '8/5MP', battery: '5000mAh',
      display: '6.74" 90Hz HD+ Eye Comfort Display',
      processor: 'UNISOC T612',
      os: 'realme UI based on Android 14', sim: 'Dual SIM',
    },
    variants: [{ ram: '4GB', storage: '128GB', price: 29999 }],
    features: ['6.74" 90Hz Display', '5000mAh Battery', 'UNISOC T612', 'IP54 Protection'],
    stock: 20, badge: '', rating: 4.1, numReviews: 0, reviews: [],
  },

  // ==================== REALME NOTE 70 — 4GB ====================
  {
    name:        'realme Note 70',
    brand:       'realme',
    series:      'Note Series',
    price:       33999,
    description: 'realme Note 70 offers a 6.74" 90Hz display, 6300mAh battery, UNISOC T7250 chipset, and 13MP rear camera.',
    image: '/uploads/realme/realme%20Note%2070/front.jpg',
    images: [
      '/uploads/realme/realme%20Note%2070/front.jpg',
      '/uploads/realme/realme%20Note%2070/Beach%20Gold.webp',
      '/uploads/realme/realme%20Note%2070/Obsidian%20Black.jpg',
      '/uploads/realme/realme%20Note%2070/realme%20Note%2070%20Back.webp',
    ],
    colors: [
      {
        name: 'Beach Gold', hex: '#c9a86a',
        images: ['/uploads/realme/realme%20Note%2070/Beach%20Gold.webp'],
      },
      {
        name: 'Obsidian Black', hex: '#1b1b1b',
        images: ['/uploads/realme/realme%20Note%2070/Obsidian%20Black.jpg'],
      },
      {
        name: 'Back View', hex: '#111111',
        images: ['/uploads/realme/realme%20Note%2070/realme%20Note%2070%20Back.webp'],
      },
    ],
    ram: '4GB', storage: '128GB',
    specs: {
      camera: '13/5MP', battery: '6300mAh',
      display: '6.74" 90Hz HD+ Eye Comfort Display',
      processor: 'UNISOC T7250',
      os: 'realme UI based on Android 14', sim: 'Dual SIM',
    },
    variants: [{ ram: '4GB', storage: '128GB', price: 33999 }],
    features: ['6.74" 90Hz Display', '6300mAh Battery', 'UNISOC T7250', '15W VOOC Charge'],
    stock: 20, badge: '', rating: 4.2, numReviews: 0, reviews: [],
  },

  // ==================== REALME NOTE 70 — 6GB ====================
  {
    name:        'realme Note 70',
    brand:       'realme',
    series:      'Note Series',
    price:       35999,
    description: 'realme Note 70 offers a 6.74" 90Hz display, 6300mAh battery, UNISOC T7250 chipset, and 13MP rear camera.',
    image: '/uploads/realme/realme%20Note%2070/front.jpg',
    images: [
      '/uploads/realme/realme%20Note%2070/front.jpg',
      '/uploads/realme/realme%20Note%2070/Beach%20Gold.webp',
      '/uploads/realme/realme%20Note%2070/Obsidian%20Black.jpg',
      '/uploads/realme/realme%20Note%2070/realme%20Note%2070%20Back.webp',
    ],
    colors: [
      { name: 'Beach Gold',     hex: '#c9a86a', images: ['/uploads/realme/realme%20Note%2070/Beach%20Gold.webp'] },
      { name: 'Obsidian Black', hex: '#1b1b1b', images: ['/uploads/realme/realme%20Note%2070/Obsidian%20Black.jpg'] },
      { name: 'Back View',      hex: '#111111', images: ['/uploads/realme/realme%20Note%2070/realme%20Note%2070%20Back.webp'] },
    ],
    ram: '6GB', storage: '128GB',
    specs: {
      camera: '13/5MP', battery: '6300mAh',
      display: '6.74" 90Hz HD+ Eye Comfort Display',
      processor: 'UNISOC T7250',
      os: 'realme UI based on Android 14', sim: 'Dual SIM',
    },
    variants: [{ ram: '6GB', storage: '128GB', price: 35999 }],
    features: ['6.74" 90Hz Display', '6300mAh Battery', 'UNISOC T7250', '15W VOOC Charge'],
    stock: 20, badge: '', rating: 4.2, numReviews: 0, reviews: [],
  },

  // ==================== REALME C71 — 6GB ====================
  {
    name:        'realme C71',
    brand:       'realme',
    series:      'C Series',
    price:       38999,
    description: 'realme C71 comes with a 6.67" 120Hz display, 6300mAh battery, 45W charging, and a 50MP AI camera.',
    // ✅ folder name: "realme c70" (tumhare PC mein yahi hai)
    image: '/uploads/realme/realme%20c70/realme%20C71%20Front.jpg',
    images: [
      '/uploads/realme/realme%20c70/realme%20C71%20Front.jpg',
      '/uploads/realme/realme%20c70/Realme-C71-White-Swan-1.png',
      '/uploads/realme/realme%20c70/images.jpg',
      '/uploads/realme/realme%20c70/ealme%20C71%20Back.jpg',
    ],
    colors: [
      {
        name: 'White Swan', hex: '#f3f3f0',
        images: [
          '/uploads/realme/realme%20c70/Realme-C71-White-Swan-1.png',
          '/uploads/realme/realme%20c70/realme%20C71%20Front.jpg',
        ],
      },
      {
        name: 'Forest Owl', hex: '#4b5d46',
        images: ['/uploads/realme/realme%20c70/images.jpg'],
      },
      {
        name: 'Back View', hex: '#111111',
        images: ['/uploads/realme/realme%20c70/ealme%20C71%20Back.jpg'],
      },
    ],
    ram: '6GB', storage: '128GB',
    specs: {
      camera: '50/5MP', battery: '6300mAh',
      display: '6.67" 120Hz HD+ Eye Comfort Display',
      processor: 'UNISOC T7250',
      os: 'realme UI based on Android 14', sim: 'Dual SIM',
    },
    variants: [{ ram: '6GB', storage: '128GB', price: 38999 }],
    features: ['6.67" 120Hz Display', '6300mAh Battery', '45W SUPERVOOC', '50MP AI Camera'],
    stock: 20, badge: '', rating: 4.3, numReviews: 0, reviews: [],
  },

  // ==================== REALME C71 — 8GB ====================
  {
    name:        'realme C71',
    brand:       'realme',
    series:      'C Series',
    price:       41999,
    description: 'realme C71 comes with a 6.67" 120Hz display, 6300mAh battery, 45W charging, and a 50MP AI camera.',
    image: '/uploads/realme/realme%20c70/realme%20C71%20Front.jpg',
    images: [
      '/uploads/realme/realme%20c70/realme%20C71%20Front.jpg',
      '/uploads/realme/realme%20c70/Realme-C71-White-Swan-1.png',
      '/uploads/realme/realme%20c70/images.jpg',
      '/uploads/realme/realme%20c70/ealme%20C71%20Back.jpg',
    ],
    colors: [
      { name: 'White Swan', hex: '#f3f3f0', images: ['/uploads/realme/realme%20c70/Realme-C71-White-Swan-1.png', '/uploads/realme/realme%20c70/realme%20C71%20Front.jpg'] },
      { name: 'Forest Owl', hex: '#4b5d46', images: ['/uploads/realme/realme%20c70/images.jpg'] },
      { name: 'Back View',  hex: '#111111', images: ['/uploads/realme/realme%20c70/ealme%20C71%20Back.jpg'] },
    ],
    ram: '8GB', storage: '128GB',
    specs: {
      camera: '50/5MP', battery: '6300mAh',
      display: '6.67" 120Hz HD+ Eye Comfort Display',
      processor: 'UNISOC T7250',
      os: 'realme UI based on Android 14', sim: 'Dual SIM',
    },
    variants: [{ ram: '8GB', storage: '128GB', price: 41999 }],
    features: ['6.67" 120Hz Display', '6300mAh Battery', '45W SUPERVOOC', '50MP AI Camera'],
    stock: 20, badge: '', rating: 4.3, numReviews: 0, reviews: [],
  },

  // ==================== REALME 15T 5G ====================
  {
    name:        'realme 15T 5G',
    brand:       'realme',
    series:      'Number Series',
    price:       89999,
    description: 'realme 15T 5G features a 6.57" 120Hz AMOLED display, Dimensity 6400 Max chipset, 7000mAh battery, and 50MP cameras.',
    image: '/uploads/realme/realme%2015T%205G/realme%2015T%20Front.jpg',
    images: [
      '/uploads/realme/realme%2015T%205G/realme%2015T%20Front.jpg',
      '/uploads/realme/realme%2015T%205G/Flowing%20Silver.jpg',
      '/uploads/realme/realme%2015T%205G/Suit%20Titanium.jpg',
      '/uploads/realme/realme%2015T%205G/realme%2015T%20Back.avif',
    ],
    colors: [
      {
        name: 'Flowing Silver', hex: '#c0c0c0',
        images: ['/uploads/realme/realme%2015T%205G/Flowing%20Silver.jpg'],
      },
      {
        name: 'Suit Titanium', hex: '#6d7278',
        images: ['/uploads/realme/realme%2015T%205G/Suit%20Titanium.jpg'],
      },
      {
        name: 'Back View', hex: '#111111',
        images: ['/uploads/realme/realme%2015T%205G/realme%2015T%20Back.avif'],
      },
    ],
    ram: '8GB', storage: '256GB',
    specs: {
      camera: '50+2/50MP', battery: '7000mAh',
      display: '6.57" 120Hz 4000nit AMOLED',
      processor: 'Dimensity 6400 Max 5G',
      os: 'realme UI 6.0 based on Android 15', sim: 'Dual SIM 5G',
    },
    variants: [{ ram: '8GB', storage: '256GB', price: 89999 }],
    features: ['6.57" 120Hz AMOLED', '7000mAh Titan Battery', '60W Fast Charge', 'Dimensity 6400 Max 5G'],
    stock: 15, badge: 'NEW', rating: 4.5, numReviews: 0, reviews: [],
  },
 // Product entry — update this in your seeder or DB
{
  name: 'Redmi A3X',
  brand: 'Xiaomi',
  series: 'A Series',
  price: 18239,
  description: 'Redmi A3X features a large 6.71" HD+ display, reliable performance for daily tasks, and a long-lasting 5000mAh battery.',
  // main image (web path, spaces encoded)
  image: '/uploads/Redmi/Redmi%20A%20Series/Redmi%20A3X/images__4_-removebg-preview.png',
  images: [
    '/uploads/Redmi/Redmi%20A%20Series/Redmi%20A3X/images__4_-removebg-preview.png',
    '/uploads/Redmi/Redmi%20A%20Series/Redmi%20A3X/images-removebg-preview.png',
    '/uploads/Redmi/Redmi%20A%20Series/Redmi%20A3X/images__1_-removebg-preview.png',
    '/uploads/Redmi/Redmi%20A%20Series/Redmi%20A3X/images__2_-removebg-preview.png',
    '/uploads/Redmi/Redmi%20A%20Series/Redmi%20A3X/images__3_-removebg-preview.png'
  ],
  colors: [
    {
      name: 'Midnight Black',
      hex: '#1a1a1a',
      images: ['/uploads/Redmi/Redmi%20A%20Series/Redmi%20A3X/images-removebg-preview.png']
    },
    {
      name: 'white',
      hex: '#dedede',
      images: ['/uploads/Redmi/Redmi%20A%20Series/Redmi%20A3X/images__2_-removebg-preview.png']
    },
    {
      name: 'Ocean Green',
      hex: '#48bf91',
      images: ['/uploads/Redmi/Redmi%20A%20Series/Redmi%20A3X/images__1_-removebg-preview.png']
    }
  ],
  ram: '3GB',
  storage: '64GB',
  specs: {
    camera: '8MP / 5MP',
    battery: '5000mAh',
    display: '6.71" HD+ IPS LCD',
    processor: 'MediaTek Helio G36',
    os: 'Android 13 (MIUI)',
    sim: 'Dual SIM'
  },
  variants: [
    { ram: '3GB', storage: '64GB', price: 18239 }
  ],
  features: [
    '6.71" Large Display',
    '5000mAh Battery',
    'AI Face Unlock',
    'MediaTek Helio Processor'
  ],
  stock: 20,
  badge: '',
  rating: 4.1,
  numReviews: 0,
  reviews: []
},
// Updated Redmi A5 product (web paths, spaces encoded)
{
  name: 'Redmi A5',
  brand: 'Xiaomi',
  series: 'A Series',
  price: 26879,
  description: 'Redmi A5 comes with a big 6.88" display, powerful battery life, and smooth everyday performance.',
  image: '/uploads/Redmi/Redmi%20A%20Series/Redmi%20A5/images__5_-removebg-preview.png',
  images: [
    '/uploads/Redmi/Redmi%20A%20Series/Redmi%20A5/images__5_-removebg-preview.png',
    '/uploads/Redmi/Redmi%20A%20Series/Redmi%20A5/images__6_-removebg-preview.png',
    '/uploads/Redmi/Redmi%20A%20Series/Redmi%20A5/images__7_-removebg-preview.png',
    '/uploads/Redmi/Redmi%20A%20Series/Redmi%20A5/images__8_-removebg-preview.png'
  
  ],
  colors: [
    {
      name: 'Midnight Black',
      hex: '#111111',
      images: ['/uploads/Redmi/Redmi%20A%20Series/Redmi%20A5/images__6_-removebg-preview.png']
    },
    {
      name: 'Sandy Gold',
      hex: '#F1D581',
      images: ['/uploads/Redmi/Redmi%20A%20Series/Redmi%20A5/images__5_-removebg-preview.png']
    },
    {
      name: 'Ocean Blue',
      hex: '#0077BE',
      images: ['/uploads/Redmi/Redmi%20A%20Series/Redmi%20A5/images__8_-removebg-preview.png'] // keep original if that's where file is
    },
    {
      name: 'Lake Green',
      hex: '#547D78',
      images: ['/uploads/Redmi/Redmi%20A%20Series/Redmi%20A5/images__7_-removebg-preview.png'] // keep original if that's where file is
    }
  ],
  ram: '4GB',
  storage: '64GB',
  specs: {
    camera: '32MP / 8MP',
    battery: '5200mAh',
    display: '6.88" HD+ IPS LCD',
    processor: 'MediaTek Helio G36',
    os: 'Android 14 (MIUI)',
    sim: 'Dual SIM'
  },
  variants: [
    { ram: '4GB', storage: '64GB', price: 26879 }
  ],
  features: [
    '6.88" Large Display',
    '5200mAh Battery',
    '32MP AI Camera',
    'Smooth Performance'
  ],
  stock: 20,
  badge: 'NEW',
  rating: 4.2,
  numReviews: 0,
  reviews: []
},
// Updated Redmi 14C product entry — web-friendly paths (spaces encoded)
{
  name: 'Redmi 14C',
  brand: 'Xiaomi',
  series: 'C Series',
  price: 25919,
  description: 'Redmi 14C offers a large 6.88" display, powerful 5160mAh battery, and a 50MP AI camera designed for everyday photography.',
  // main image (choose the 6GB promo image as primary)
  image: '/uploads/Redmi/Redmi%20C%20Series/Redmi%2014C/Redmi_14C_6gb-removebg-preview.png',
  images: [
    // files you provided (placed first)
    '/uploads/Redmi/Redmi%20C%20Series/Redmi%2014C/Redmi_14C_6gb-removebg-preview.png',
    '/uploads/Redmi/Redmi%20C%20Series/Redmi%2014C/images__10_-removebg-preview.png',
    '/uploads/Redmi/Redmi%20C%20Series/Redmi%2014C/images__9_-removebg-preview.png',
    '/uploads/Redmi/Redmi%20C%20Series/Redmi%2014C/1729006286_black__1_-removebg-preview.png'
    
  ],
  colors: [
    {
      name: 'Midnight Black',
      hex: '#1a1a1a',
      // map to the black image you provided (1729006286_... looks like black)
      images: ['/uploads/Redmi/Redmi%20C%20Series/Redmi%2014C/1729006286_black__1_-removebg-preview.png']
    },
    {
      name: 'Dreamy Purple',
      hex: '#cf9dc9',
      images: ['/uploads/Redmi/Redmi%20C%20Series/Redmi%2014C/images__9_-removebg-preview.png']
    },
    {
      name: 'Sage Green',
      hex: '#5dc562',
      images: ['/uploads/Redmi/Redmi%20C%20Series/Redmi%2014C/images__10_-removebg-preview.png']
    },
     {
      name: 'Starry Blue',
      hex: '#34759a',
      images: ['/uploads/Redmi/Redmi%20C%20Series/Redmi%2014C/images__10_-removebg-preview.png']
    }
  ],
  ram: '4GB',
  storage: '128GB',
  specs: {
    camera: '50MP / 13MP',
    battery: '5160mAh',
    display: '6.88" HD+ IPS LCD',
    processor: 'MediaTek Helio G85',
    os: 'Android 14 (HyperOS)',
    sim: 'Dual SIM'
  },
  variants: [
    { ram: '4GB', storage: '128GB', price: 25919 },
    { ram: '6GB', storage: '128GB', price: 28799 }
  ],
  features: [
    '6.88" Large Display',
    '50MP AI Camera',
    '5160mAh Battery',
    'Side Fingerprint Sensor'
  ],
  stock: 20,
  badge: '',
  rating: 4.2,
  numReviews: 0,
  reviews: []
},
{
  name: 'Redmi 15C',
  brand: 'Xiaomi',
  series: 'C Series',
  price: 33791,
  description: 'Redmi 15C features a big 6.9" display, powerful 6000mAh battery, and 50MP AI camera for long-lasting performance.',
  image: '/uploads/Redmi/Redmi%20C%20Series/Redmi%2015C/download__1_-removebg-preview.png',
  images: [
     '/uploads/Redmi/Redmi%20C%20Series/Redmi%2015C/download__1_-removebg-preview.png',
    '/uploads/Redmi/Redmi%20C%20Series/Redmi%2015C/download__2_-removebg-preview.png',
    '/uploads/Redmi/Redmi%20C%20Series/Redmi%2015C/download-removebg-preview.png',
    '/uploads/Redmi/Redmi%20C%20Series/Redmi%2015C/Xiaomi-Redmi-15C-128GB-Storage-4GB-Ram-3-removebg-preview.png'
  ],
  colors: [
    {
      name: 'Midnight Black',
      hex: '#111111',
      images: ['/uploads/Redmi/Redmi%20C%20Series/Redmi%2015C/download__2_-removebg-preview.png']
    },
    {
      name: 'Mint Green',
      hex: '#2cb797',
      images: ['/uploads/Redmi/Redmi%20C%20Series/Redmi%2015C/Xiaomi-Redmi-15C-128GB-Storage-4GB-Ram-3-removebg-preview.png']
    },
    {
      name: 'Moonlight Blue',
      hex: '#0a3786',
      images: ['/uploads/Redmi/Redmi%20C%20Series/Redmi%2015C/download__1_-removebg-preview.png']
    },
     {
      name: 'Twilight Orange',
      hex: '#ead699',
      images: ['/uploads/Redmi/Redmi%20C%20Series/Redmi%2015C/download-removebg-preview.png']
    }
  ],
  ram: '4GB',
  storage: '128GB',
  specs: {
    camera: '50MP / 8MP',
    battery: '6000mAh',
    display: '6.9" HD+ IPS LCD',
    processor: 'MediaTek Helio G88',
    os: 'Android 14 (HyperOS)',
    sim: 'Dual SIM'
  },
  variants: [
    { ram: '4GB', storage: '128GB', price: 33791 },
    { ram: '6GB', storage: '128GB', price: 35711 }
  ],
  features: [
    '6.9" Large Display',
    '6000mAh Massive Battery',
    '50MP AI Camera',
    'Smooth Performance'
  ],
  stock: 20,
  badge: 'NEW',
  rating: 4.3,
  numReviews: 0,
  reviews: []
},
{
  name: 'Redmi 13',
  brand: 'Xiaomi',
  series: 'Number Series',
  price: 33599,
  description: 'Redmi 13 features a stylish glass design, powerful 108MP camera, smooth 90Hz display, and a large 5030mAh battery.',
  image: '/uploads/Redmi/Redmi%20Number%20Series/Redmi%2013/666aa0d185629_1718264017-removebg-preview.png',
  images: [
    '/uploads/Redmi/Redmi%20Number%20Series/Redmi%2013/666aa0d185629_1718264017-removebg-preview.png',
    '/uploads/Redmi/Redmi%20Number%20Series/Redmi%2013/ijgoaheghiojahgiaoghgaiojkgla-removebg-preview.png',
    '/uploads/Redmi/Redmi%20Number%20Series/Redmi%2013/images__11_-removebg-preview.png',
    '/uploads/Redmi/Redmi%20Number%20Series/Redmi%2013/redmi_13_black-removebg-preview.png'
  ],
  colors: [
    {
      name: 'Midnight Black',
      hex: '#111111',
      images: ['/uploads/Redmi/Redmi%20Number%20Series/Redmi%2013/redmi_13_black-removebg-preview.png']
    },
    {
      name: 'Sandy Gold',
      hex: '#3f7dbd',
      images: ['/uploads/Redmi/Redmi%20Number%20Series/Redmi%2013/images__11_-removebg-preview.png']
    },
    {
      name: 'Ocean Blue',
      hex: '#f3c1cc',
      images: ['/uploads/Redmi/Redmi%20Number%20Series/Redmi%2013/ijgoaheghiojahgiaoghgaiojkgla-removebg-preview.png']
    }
  ],
  ram: '8GB',
  storage: '128GB',
  specs: {
    camera: '108+2MP / 13MP',
    battery: '5030mAh',
    display: '6.79" FHD+ 90Hz IPS LCD',
    processor: 'MediaTek Helio G91 Ultra',
    os: 'HyperOS based on Android 14',
    sim: 'Dual SIM'
  },
  variants: [
    { ram: '8GB', storage: '128GB', price: 33599 }
  ],
  features: [
    '108MP AI Camera',
    '6.79" 90Hz Display',
    '5030mAh Battery',
    'Glass Back Design'
  ],
  stock: 20,
  badge: '',
  rating: 4.3,
  numReviews: 0,
  reviews: []
},
{
  name: 'Redmi 15',
  brand: 'Xiaomi',
  series: 'Number Series',
  price: 47039,
  description: 'Redmi 15 comes with a smooth 120Hz display, powerful performance, and a massive 7000mAh battery for long-lasting usage.',
  image: '/uploads/Redmi/Redmi%20Number%20Series/Redmi%2015/images__12_-removebg-preview.png',
  images: [
    '/uploads/Redmi/Redmi%20Number%20Series/Redmi%2015/images__12_-removebg-preview.png',
    '/uploads/Redmi/Redmi%20Number%20Series/Redmi%2015/productimagescopy-removebg-preview.png',
    '/uploads/Redmi/Redmi%20Number%20Series/Redmi%2015/redmi-15-purple-cellmart-removebg-preview.png'
  ],
  colors: [
    {
      name: 'Midnight Black',
      hex: '#121212',
      images: ['/uploads/Redmi/Redmi%20Number%20Series/Redmi%2015/productimagescopy-removebg-preview.png']
    },
    {
      name: 'Titan Gray',
      hex: '#626b73',
      images: ['/uploads/Redmi/Redmi%20Number%20Series/Redmi%2015/images__12_-removebg-preview.png']
    },
    {
      name: 'Purple',
      hex: '#9a5d8e',
      images: ['/uploads/Redmi/Redmi%20Number%20Series/Redmi%2015/redmi-15-purple-cellmart-removebg-preview.png']
    }
  ],
  ram: '8GB',
  storage: '128GB',
  specs: {
    camera: '50+2MP / 8MP',
    battery: '7000mAh',
    display: '6.9" 120Hz IPS LCD',
    processor: 'Snapdragon 6 Gen Series',
    os: 'HyperOS based on Android 14',
    sim: 'Dual SIM'
  },
  variants: [
    { ram: '8GB', storage: '128GB', price: 47039 }
  ],
  features: [
    '120Hz Smooth Display',
    '7000mAh Massive Battery',
    '50MP AI Camera',
    'Fast Performance'
  ],
  stock: 20,
  badge: '',
  rating: 4.4,
  numReviews: 0,
  reviews: []
},
{
  name: 'Redmi Note 14',
  brand: 'Xiaomi',
  series: 'Note 14 Series',
  price: 39999,
  description: 'Redmi Note 14 comes with a 6.6" AMOLED display, 5000mAh battery, and 50MP AI triple camera setup for everyday photography and performance.',
  image: '/uploads/Redmi/Redmi%20Note%2014%20Series/Redmi%20Note%2014/images__13_-removebg-preview.png',
  images: [
       '/uploads/Redmi/Redmi%20Note%2014%20Series/Redmi%20Note%2014/images__13_-removebg-preview.png',
    '/uploads/Redmi/Redmi%20Note%2014%20Series/Redmi%20Note%2014/images__14_-removebg-preview.png',
    '/uploads/Redmi/Redmi%20Note%2014%20Series/Redmi%20Note%2014/images__15_-removebg-preview.png',
    '/uploads/Redmi/Redmi%20Note%2014%20Series/Redmi%20Note%2014/Redmi-Note-14-blue-cellmart-removebg-preview.png',
    '/uploads/Redmi/Redmi%20Note%2014%20Series/Redmi%20Note%2014/xiaomi-redmi-note-14-pakistan-priceoye-xhh9b-removebg-preview.png'

  ],
  colors: [
    { name: 'Black', hex: '#000000', images: ['/uploads/xiaomi/note-14-series/note14/colors/black.jpg'] },
    { name: 'Blue', hex: '#1E90FF', images: ['/uploads/xiaomi/note-14-series/note14/colors/blue.jpg'] },
    { name: 'Pink', hex: '#FF69B4', images: ['/uploads/xiaomi/note-14-series/note14/colors/pink.jpg'] }
  ],
  ram: '6GB',
  storage: '128GB',
  specs: {
    camera: '50MP + 2MP + 2MP',
    battery: '5000mAh',
    display: '6.6" AMOLED FHD+',
    processor: 'Snapdragon 6100',
    os: 'Android 14 (MIUI 15)',
    sim: 'Dual SIM'
  },
  variants: [
    { ram: '6GB', storage: '128GB', price: 39999 },
    { ram: '8GB', storage: '256GB', price: 45999 }
  ],
  features: ['6.6" AMOLED Display', '50MP Triple AI Camera', '5000mAh Battery', 'Side Fingerprint Sensor'],
  stock: 20,
  badge: '',
  rating: 4.3,
  numReviews: 0,
  reviews: []
},
{
  name: 'Redmi Note 14 Pro',
  brand: 'Xiaomi',
  series: 'Note 14 Series',
  price: 52999,
  description: 'Redmi Note 14 Pro features a 6.67" AMOLED display, 5000mAh battery, and 108MP AI quad-camera system for high-end photography and smooth performance.',
  image: '/uploads/Redmi/Redmi%20Note%2014%20Series/Redmi%20Note%2014%20Pro/images__16_-removebg-preview.png',
  images: [
       '/uploads/Redmi/Redmi%20Note%2014%20Series/Redmi%20Note%2014%20Pro/images__16_-removebg-preview.png',
    '/uploads/Redmi/Redmi%20Note%2014%20Series/Redmi%20Note%2014%20Pro/Redmi-Note-14-Pro-purple-cellmart-removebg-preview.png',
    '/uploads/Redmi/Redmi%20Note%2014%20Series/Redmi%20Note%2014%20Pro/xiaomi-redmi-note-14-pro-pakistan-priceoye-1o4ij-500x500-removebg-preview.png'

  ],
  colors: [
    { name: 'Black', hex: '#000000', images: ['/uploads/xiaomi/note-14-series/note14pro/colors/black.jpg'] },
    { name: 'Green', hex: '#228B22', images: ['/uploads/xiaomi/note-14-series/note14pro/colors/green.jpg'] },
    { name: 'Gold', hex: '#FFD700', images: ['/uploads/xiaomi/note-14-series/note14pro/colors/gold.jpg'] }
  ],
  ram: '8GB',
  storage: '128GB',
  specs: {
    camera: '108MP + 8MP + 2MP + 2MP',
    battery: '5000mAh',
    display: '6.67" AMOLED FHD+ 120Hz',
    processor: 'MediaTek Dimensity 6100+',
    os: 'Android 14 (MIUI 15)',
    sim: 'Dual SIM'
  },
  variants: [
    { ram: '8GB', storage: '128GB', price: 52999 },
    { ram: '12GB', storage: '256GB', price: 59999 }
  ],
  features: ['6.67" AMOLED 120Hz Display', '108MP Quad AI Camera', '5000mAh Battery', 'Fast Charging 67W'],
  stock: 20,
  badge: 'HOT',
  rating: 4.5,
  numReviews: 0,
  reviews: []
},
{
  name: 'Redmi Note 14 Pro+',
  brand: 'Xiaomi',
  series: 'Note 14 Series',
  price: 69999,
  description: 'Redmi Note 14 Pro+ comes with a 6.7" AMOLED display, 5000mAh battery, and 200MP AI quad-camera for professional photography and flagship performance.',
  image: '/uploads/Redmi/Redmi%20Note%2014%20Series/Redmi%20Note%2014%20Pro%2B/images__17_-removebg-preview.png',
  images: [
       '/uploads/Redmi/Redmi%20Note%2014%20Series/Redmi%20Note%2014%20Pro%2B/images__17_-removebg-preview.png',
    '/uploads/Redmi/Redmi%20Note%2014%20Series/Redmi%20Note%2014%20Pro%2B/images__18_-removebg-preview.png',
    '/uploads/Redmi/Redmi%20Note%2014%20Series/Redmi%20Note%2014%20Pro%2B/images__19_-removebg-preview.png'

  ],
  colors: [
    { name: 'Black', hex: '#000000', images: ['/uploads/xiaomi/note-14-series/note14proplus/colors/black.jpg'] },
    { name: 'Blue', hex: '#1E90FF', images: ['/uploads/xiaomi/note-14-series/note14proplus/colors/blue.jpg'] },
    { name: 'Silver', hex: '#C0C0C0', images: ['/uploads/xiaomi/note-14-series/note14proplus/colors/silver.jpg'] }
  ],
  ram: '12GB',
  storage: '256GB',
  specs: {
    camera: '200MP + 13MP + 2MP + 2MP',
    battery: '5000mAh',
    display: '6.7" AMOLED FHD+ 120Hz',
    processor: 'MediaTek Dimensity 6100 Ultra',
    os: 'Android 14 (MIUI 15)',
    sim: 'Dual SIM'
  },
  variants: [
    { ram: '12GB', storage: '256GB', price: 69999 },
    { ram: '16GB', storage: '512GB', price: 84999 }
  ],
  features: ['6.7" AMOLED 120Hz Display', '200MP Quad AI Camera', '5000mAh Battery', 'Super Fast Charging 120W'],
  stock: 15,
  badge: 'NEW',
  rating: 4.7,
  numReviews: 0,
  reviews: []
},
{
  name: 'Xiaomi 15T',
  brand: 'Xiaomi',
  series: '15 Series',
  price: 79999,
  description: 'Xiaomi 15T offers a 6.67" AMOLED display, Snapdragon 8 Gen 2 processor, and 108MP AI camera for flagship performance at a great price.',
  image: '/uploads/Redmi/Xiaomi%2015%20Series/Xiaomi%2015T/images__20_-removebg-preview.png',
  images: [
    '/uploads/xiaomi/15-series/15t/front.jpg',
    '/uploads/xiaomi/15-series/15t/back.jpg',
    '/uploads/xiaomi/15-series/15t/colors/black.jpg',
    '/uploads/xiaomi/15-series/15t/colors/silver.jpg'
  ],
  colors: [
    {
      name: 'Black',
      hex: '#000000',
      images: ['/uploads/xiaomi/15-series/15t/colors/black.jpg']
    },
    {
      name: 'Silver',
      hex: '#c0c0c0',
      images: ['/uploads/xiaomi/15-series/15t/colors/silver.jpg']
    }
  ],
  ram: '8GB',
  storage: '128GB',
  specs: {
    camera: '108MP / 13MP',
    battery: '5000mAh',
    display: '6.67" FHD+ AMOLED',
    processor: 'Snapdragon 8 Gen 2',
    os: 'Android 14 (MIUI 15)',
    sim: 'Dual SIM'
  },
  variants: [
    { ram: '8GB', storage: '128GB', price: 79999 },
    { ram: '12GB', storage: '256GB', price: 89999 }
  ],
  features: [
    '6.67" AMOLED Display',
    '108MP AI Camera',
    'Snapdragon 8 Gen 2',
    'Fast Charging 120W'
  ],
  stock: 15,
  badge: '',
  rating: 4.4,
  numReviews: 0,
  reviews: []
},
{
  name: 'Xiaomi 15T Pro',
  brand: 'Xiaomi',
  series: '15 Series',
  price: 99999,
  description: 'Xiaomi 15T Pro features top-tier Snapdragon 8 Gen 2 processor, 120Hz AMOLED display, and 200MP AI camera for ultimate flagship experience.',
  image: '/uploads/Redmi/Xiaomi%2015%20Series/Xiaomi%2015T%20Pro/images__24_-removebg-preview.png',
  images: [
    '/uploads/xiaomi/15-series/15t-pro/front.jpg',
    '/uploads/xiaomi/15-series/15t-pro/back.jpg',
    '/uploads/xiaomi/15-series/15t-pro/colors/black.jpg',
    '/uploads/xiaomi/15-series/15t-pro/colors/gold.jpg'
  ],
  colors: [
    {
      name: 'Black',
      hex: '#000000',
      images: ['/uploads/xiaomi/15-series/15t-pro/colors/black.jpg']
    },
    {
      name: 'Gold',
      hex: '#d4af37',
      images: ['/uploads/xiaomi/15-series/15t-pro/colors/gold.jpg']
    }
  ],
  ram: '12GB',
  storage: '256GB',
  specs: {
    camera: '200MP / 20MP',
    battery: '5000mAh',
    display: '6.67" FHD+ AMOLED 120Hz',
    processor: 'Snapdragon 8 Gen 2',
    os: 'Android 14 (MIUI 15)',
    sim: 'Dual SIM'
  },
  variants: [
    { ram: '12GB', storage: '256GB', price: 99999 },
    { ram: '16GB', storage: '512GB', price: 119999 }
  ],
  features: [
    '200MP AI Camera',
    '120Hz AMOLED Display',
    'Snapdragon 8 Gen 2',
    '120W Fast Charging'
  ],
  stock: 10,
  badge: 'NEW',
  rating: 4.6,
  numReviews: 0,
  reviews: []
},
{
  name: 'Xiaomi 15',
  brand: 'Xiaomi',
  series: '15 Series',
  price: 79999,
  description: 'Xiaomi 15 offers a sleek design, Snapdragon 8 Gen 3 processor, 50MP main camera, and 5000mAh battery for high performance and premium experience.',
  image: '/uploads/Redmi/Xiaomi%2015%20Series/Xiaomi%2015/images__29_-removebg-preview%20%281%29.png',
  images: [
    '/uploads/xiaomi/15-series/15/front.jpg',
    '/uploads/xiaomi/15-series/15/back.jpg',
    '/uploads/xiaomi/15-series/15/colors/cosmic-black.jpg',
    '/uploads/xiaomi/15-series/15/colors/sunrise-gold.jpg',
    '/uploads/xiaomi/15-series/15/colors/frost-white.jpg'
  ],
  colors: [
    { name: 'Cosmic Black', hex: '#0f0f0f', images: ['/uploads/xiaomi/15-series/15/colors/cosmic-black.jpg'] },
    { name: 'Sunrise Gold', hex: '#f9d07c', images: ['/uploads/xiaomi/15-series/15/colors/sunrise-gold.jpg'] },
    { name: 'Frost White', hex: '#f5f5f5', images: ['/uploads/xiaomi/15-series/15/colors/frost-white.jpg'] }
  ],
  ram: '8GB',
  storage: '256GB',
  specs: {
    camera: '50MP / 13MP / 5MP',
    battery: '5000mAh',
    display: '6.67" AMOLED, 120Hz',
    processor: 'Snapdragon 8 Gen 3',
    os: 'Android 14 (MIUI 16)',
    sim: 'Dual SIM'
  },
  variants: [
    { ram: '8GB', storage: '256GB', price: 79999 },
    { ram: '12GB', storage: '512GB', price: 89999 }
  ],
  features: [
    '120Hz AMOLED Display',
    '50MP Triple Camera',
    '5000mAh Battery',
    'Premium Design'
  ],
  stock: 25,
  badge: 'NEW',
  rating: 4.6,
  numReviews: 0,
  reviews: []
},
{
  name: 'Xiaomi 15 Ultra',
  brand: 'Xiaomi',
  series: '15 Series',
  price: 119999,
  description: 'Xiaomi 15 Ultra is a flagship powerhouse with Leica co-engineered 200MP main camera, 6.73" AMOLED display, Snapdragon 8 Gen 3+, and 5000mAh battery with ultra-fast charging.',
  image: '/uploads/Redmi/Xiaomi%2015%20Series/Xiaomi%2015%20Ultra/images__27_-removebg-preview.png',
  images: [
    '/uploads/xiaomi/15-series/15-ultra/front.jpg',
    '/uploads/xiaomi/15-series/15-ultra/back.jpg',
    '/uploads/xiaomi/15-series/15-ultra/colors/cosmic-black.jpg',
    '/uploads/xiaomi/15-series/15-ultra/colors/lunar-silver.jpg',
    '/uploads/xiaomi/15-series/15-ultra/colors/aurora-green.jpg'
  ],
  colors: [
    { name: 'Cosmic Black', hex: '#0a0a0a', images: ['/uploads/xiaomi/15-series/15-ultra/colors/cosmic-black.jpg'] },
    { name: 'Lunar Silver', hex: '#c7c7c7', images: ['/uploads/xiaomi/15-series/15-ultra/colors/lunar-silver.jpg'] },
    { name: 'Aurora Green', hex: '#7de0b2', images: ['/uploads/xiaomi/15-series/15-ultra/colors/aurora-green.jpg'] }
  ],
  ram: '12GB',
  storage: '512GB',
  specs: {
    camera: '200MP / 50MP / 48MP',
    battery: '5000mAh',
    display: '6.73" AMOLED, 120Hz',
    processor: 'Snapdragon 8 Gen 3+',
    os: 'Android 14 (MIUI 16)',
    sim: 'Dual SIM'
  },
  variants: [
    { ram: '12GB', storage: '512GB', price: 119999 },
    { ram: '16GB', storage: '1TB', price: 139999 }
  ],
  features: [
    '200MP Leica Camera',
    '6.73" 120Hz AMOLED Display',
    '5000mAh Ultra Battery',
    'Snapdragon 8 Gen 3+ Processor'
  ],
  stock: 15,
  badge: 'ULTRA',
  rating: 4.8,
  numReviews: 0,
  reviews: []
},

  // ==================== ZERO SERIES ====================
  // Updated Infinix product objects — image paths converted to web-friendly forward-slash URLs
// Spaces encoded as %20 and parentheses encoded where present.
// Paste/merge these objects into your seeder or DB update script.


  {
    name: 'Infinix Zero 40 4G',
    brand: 'Infinix',
    series: 'Zero',
    price: 60479,
    description: 'Infinix Zero 40 4G features a 6.67" AMOLED display, 5000mAh battery, and a flagship class camera setup.',
    image: '/uploads/infinix/zero%20series/Infinix-Zero-40-4G-Rock-Black-2-685x1024-removebg-preview.png',
    images: [
      '/uploads/infinix/zero%20series/Infinix-Zero-40-4G-Rock-Black-2-685x1024-removebg-preview.png'
    ],
    colors: [
      { name: 'Midnight Black', hex: '#0a0a0a', images: ['/uploads/infinix/zero%20series/Infinix-Zero-40-4G-Rock-Black-2-685x1024-removebg-preview.png'] },
      { name: 'Ocean Blue',   hex: '#1f4f91', images: ['/uploads/infinix/zero%20series/Infinix-Zero-40-4G-Rock-Black-2-685x1024-removebg-preview.png'] } // if you have a blue image, replace path
    ],
    specs: {
      display: '6.67" AMOLED 120Hz',
      battery: '5000mAh',
      camera: '108MP + 8MP + 2MP',
      processor: 'Mediatek Helio G99',
      os: 'Android 13 (XOS)',
      sim: 'Dual SIM'
    },
    variants: [{ ram: '8GB', storage: '256GB', price: 60479 }],
    features: ['120Hz AMOLED', '108MP Triple Camera', '5000mAh Battery'],
    stock: 15,
    badge: 'NEW',
    rating: 4.5,
    numReviews: 0,
    reviews: []
  },

  // NOTE SERIES
  {
    name: 'Infinix Note 50',
    brand: 'Infinix',
    series: 'Note',
    price: 66239,
    description: 'Infinix Note 50 comes with a 6.78" AMOLED display, 5200mAh battery and a powerful camera system.',
    image: '/uploads/infinix/note%20series/infinix-note-50-pakistan-Selecto-wypsm-500x500_2_1200x1200-removebg-preview%20%281%29.png',
    images: [
      '/uploads/infinix/note%20series/infinix-note-50-pakistan-Selecto-wypsm-500x500_2_1200x1200-removebg-preview%20%281%29.png',
      '/uploads/infinix/note%20series/Infinix-Note-50-Pro-4G-Titanium-Grey-1.jpeg', // if used as secondary image
      '/uploads/infinix/note%20series/Infinix-Note-50-Pro-12_256GB_1800x1800-removebg-preview.png', // optional
      '/uploads/infinix/note%20series/Infinix-Zero-40-4G-Rock-Black-2-685x1024-removebg-preview.png' // optional fallback
    ],
    colors: [
      { name: 'Phantom Black', hex: '#111111', images: ['/uploads/infinix/note%20series/infinix-note-50-pakistan-Selecto-wypsm-500x500_2_1200x1200-removebg-preview%20%281%29.png'] },
      { name: 'Emerald Green', hex: '#2e7d32', images: ['/uploads/infinix/note%20series/Infinix-Note-50-Pro-4G-Titanium-Grey-1.jpeg'] }
    ],
    specs: {
      display: '6.78" AMOLED',
      battery: '5200mAh',
      camera: '108MP + 8MP + 2MP',
      processor: 'Mediatek Helio G99',
      os: 'Android 13 (XOS)',
      sim: 'Dual SIM'
    },
    variants: [
      { ram: '8GB', storage: '256GB', price: 66239 },
      { ram: '12GB', storage: '256GB', price: 80639 }
    ],
    features: ['108MP Camera', 'AMOLED Display', 'Fast Charging'],
    stock: 20,
    badge: '',
    rating: 4.3,
    numReviews: 0,
    reviews: []
  },

  // HOT SERIES
  {
    name: 'Infinix Hot 60',
    brand: 'Infinix',
    series: 'Hot',
    price: 41479,
    description: 'Infinix Hot 60 features a 6.78" display, 5160mAh battery, and solid performance for everyday use.',
    image: '/uploads/infinix/hot%20series/infinix-HOT_60_PRO-removebg-preview.png',
    images: [
      '/uploads/infinix/hot%20series/infinix-HOT_60_PRO-removebg-preview.png',
      '/uploads/infinix/hot%20series/Infinix-Hot-50-Pro-4G-Titanium-Grey-1-removebg-preview.png',
      '/uploads/infinix/hot%20series/infinix-hot-60-pro-plus-removebg-preview.png',
      '/uploads/infinix/hot%20series/infinix-Hot-60i-Titanium-Silver-5-removebg-preview.png',
      '/uploads/infinix/hot%20series/infinix-hot-60i-pakistan-Selecto-6f4u5-500x500_1_1800x1800-removebg-preview.png'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#121212', images: ['/uploads/infinix/hot%20series/infinix-HOT_60_PRO-removebg-preview.png'] },
      { name: 'Sky Blue',       hex: '#2675b8', images: ['/uploads/infinix/hot%20series/Infinix-Hot-50-Pro-4G-Titanium-Grey-1-removebg-preview.png'] }
    ],
    specs: {
      display: '6.78" IPS LCD 90Hz',
      battery: '5160mAh',
      camera: '50MP + 2MP',
      processor: 'Unisoc T616',
      os: 'Android 13 (XOS)',
      sim: 'Dual SIM'
    },
    variants: [
      { ram: '6GB', storage: '128GB', price: 36479 },
      { ram: '8GB', storage: '256GB', price: 41279 }
    ],
    features: ['Large Display', '5160mAh Battery', '50MP AI Camera'],
    stock: 20,
    badge: '',
    rating: 4.1,
    numReviews: 0,
    reviews: []
  },

  {
    name: 'Infinix Hot 60 Pro',
    brand: 'Infinix',
    series: 'Hot',
    price: 47599,
    description: 'Infinix Hot 60 Pro upgrades performance and storage with enhanced camera and smooth UI.',
    image: '/uploads/infinix/hot%20series/Infinix-Hot-50-Pro-4G-Titanium-Grey-1-removebg-preview.png',
    images: [
      '/uploads/infinix/hot%20series/Infinix-Hot-50-Pro-4G-Titanium-Grey-1-removebg-preview.png',
      '/uploads/infinix/hot%20series/infinix-hot-60-pro-plus-removebg-preview.png'
    ],
    colors: [
      { name: 'Graphite Black', hex: '#0d0d0d', images: ['/uploads/infinix/hot%20series/Infinix-Hot-50-Pro-4G-Titanium-Grey-1-removebg-preview.png'] },
      { name: 'Silver Frost',   hex: '#c0c0c0', images: ['/uploads/infinix/hot%20series/infinix-hot-60-pro-plus-removebg-preview.png'] }
    ],
    specs: {
      display: '6.78" 120Hz',
      battery: '5160mAh',
      camera: '50MP + 8MP + 2MP',
      processor: 'Mediatek Helio G88',
      os: 'Android 13 (XOS)',
      sim: 'Dual SIM'
    },
    variants: [{ ram: '8GB', storage: '128GB', price: 47999 }],
    features: ['120Hz Refresh', 'Triple Camera', 'Smooth Performance'],
    stock: 15,
    badge: 'NEW',
    rating: 4.2,
    numReviews: 0,
    reviews: []
  },

  {
    name: 'Infinix Hot 60 Pro+',
    brand: 'Infinix',
    series: 'Hot',
    price: 59519,
    description: 'Infinix Hot 60 Pro+ equipped with better camera, display and battery management for enhanced experience.',
    image: '/uploads/infinix/hot%20series/infinix-hot-60-pro-plus-removebg-preview.png',
    images: [
      '/uploads/infinix/hot%20series/infinix-hot-60-pro-plus-removebg-preview.png',
      '/uploads/infinix/hot%20series/Infinix-Hot-60i-Titanium-Silver-5-removebg-preview.png'
    ],
    colors: [
      { name: 'Space Black', hex: '#101010', images: ['/uploads/infinix/hot%20series/infinix-hot-60-pro-plus-removebg-preview.png'] }
    ],
    specs: {
      display: '6.78" 120Hz AMOLED',
      battery: '5160mAh',
      camera: '64MP + 8MP + 2MP',
      processor: 'Mediatek Helio G99',
      os: 'Android 13 (XOS)',
      sim: 'Dual SIM'
    },
    variants: [{ ram: '8GB', storage: '256GB', price: 59519 }],
    features: ['AMOLED Display', '64MP AI Camera', 'Premium Experience'],
    stock: 10,
    badge: 'PRO+',
    rating: 4.4,
    numReviews: 0,
    reviews: []
  },

  // SMART SERIES (unchanged image structure but paths normalized)
  {
    name: 'Infinix Smart 10',
    brand: 'Infinix',
    series: 'Smart',
    price: 25919,
    description: 'Infinix Smart 10 comes with 5000mAh battery and everyday performance ideal for basic smartphone users.',
    image: '/uploads/infinix/smart%20series/images__30_-removebg-preview%20%281%29.png',
    images: [
      '/uploads/infinix/smart%20series/images__30_-removebg-preview%20%281%29.png'
    ],
    colors: [
      { name: 'Midnight Black', hex: '#000000', images: ['/uploads/infinix/smart%20series/smart-10/colors/black.jpg'] },
      { name: 'Aura Blue',     hex: '#2978b5', images: [] }
    ],
    specs: { display: '6.6" HD+', battery: '5000mAh', camera: '13MP + 5MP', processor: 'Unisoc SC9863A', os: 'Android 13 (XOS)', sim: 'Dual SIM' },
    variants: [{ ram: '4GB', storage: '64GB', price: 25919 }],
    features: ['6.6" Display', '5000mAh Battery', 'Compact Design'],
    stock: 20,
    badge: '',
    rating: 4.0,
    numReviews: 0,
    reviews: []
  },

  {
    name: 'Infinix Smart 10 Plus',
    brand: 'Infinix',
    series: 'Smart',
    price: 28799,
    description: 'Infinix Smart 10 Plus offers extended 6000mAh battery and upgraded design for longer usage.',
    image: '/uploads/infinix/smart%20series/Infinix-Smart-10-plus-black-cellmart-removebg-preview%20%281%29.png',
    images: [
      '/uploads/infinix/smart%20series/Infinix-Smart-10-plus-black-cellmart-removebg-preview%20%281%29.png'
    ],
    colors: [{ name: 'Black', hex: '#0d0d0d', images: ['/uploads/infinix/smart%20series/smart-10-plus/colors/black.jpg'] }],
    specs: { display: '6.6" HD+', battery: '6000mAh', camera: '13MP + 5MP', processor: 'Unisoc SC9863A', os: 'Android 13 (XOS)', sim: 'Dual SIM' },
    variants: [{ ram: '4GB', storage: '128GB', price: 28799 }],
    features: ['6000mAh Battery', 'Bright Display'],
    stock: 20,
    badge: 'NEW',
    rating: 4.1,
    numReviews: 0,
    reviews: []
  },

  {
    name: 'Infinix Smart 10 HD',
    brand: 'Infinix',
    series: 'Smart',
    price: 21599,
    description: 'Infinix Smart 10 HD is a budget smartphone with 5000mAh battery and HD+ display.',
    image: '/uploads/infinix/smart%20series/smart_10_hd-removebg-preview%20%281%29.png',
    images: [
     '/uploads/infinix/smart%20series/smart_10_hd-removebg-preview%20%281%29.png'
    ],
    colors: [{ name: 'Black', hex: '#000000', images: ['/uploads/infinix/smart%20series/smart-10-hd/colors/black.jpg'] }],
    specs: { display: '6.6" HD+', battery: '5000mAh', camera: '8MP + 2MP', processor: 'Unisoc SC9863A', os: 'Android 12 (XOS)', sim: 'Dual SIM' },
    variants: [{ ram: '2GB', storage: '64GB', price: 21599 }],
    features: ['HD+ Display', '5000mAh Battery'],
    stock: 20,
    badge: '',
    rating: 3.9,
    numReviews: 0,
    reviews: []
  },

  {
    name: 'Infinix Smart 8',
    brand: 'Infinix',
    series: 'Smart',
    price: 20639,
    description: 'Infinix Smart 8 is an entry-level smartphone with basic specs and easy usability.',
    image:  '/uploads/infinix/smart%20series/infinix-smart-8-gold-pakistan-phonehike.com_-removebg-preview%20%281%29.png',
    images: [ '/uploads/infinix/smart%20series/infinix-smart-8-gold-pakistan-phonehike.com_-removebg-preview%20%281%29.png'],
    colors: [{ name: 'Black', hex: '#000000', images: ['/uploads/infinix/smart%20series/smart-8/front.jpg'] }],
    specs: { display: '6.5" HD+', battery: '5000mAh', camera: '8MP + 2MP', processor: 'Unisoc SC9863A', os: 'Android 12 (XOS)', sim: 'Dual SIM' },
    variants: [{ ram: '2GB', storage: '64GB', price: 20639 }],
    features: ['Entry-Level Friendly', '5000mAh Battery'],
    stock: 20,
    badge: '',
    rating: 3.8,
    numReviews: 0,
    reviews: []
  },
  

  // ==================== A SERIES ====================
  
  {
    "name": "Samsung Galaxy A07",
    "brand": "Samsung",
    "series": "A Series",
    "price": 30500,
    "description": "Budget-friendly smartphone with 6.7\" display and reliable battery life.",
    "image": "/uploads/samsung/A%20series/samsung_A07-removebg-preview.png",
    "specs": {
      "display": "6.7\"",
      "battery": "5000mAh",
      "camera": "50MP + 2MP / 8MP",
      "processor": "Entry Level",
      "os": "Android",
      "sim": "Dual SIM"
    },
    "variants": [
      { "ram": "4GB", "storage": "64GB", "price": 30500 },
      { "ram": "4GB", "storage": "128GB", "price": 35500 },
      { "ram": "6GB", "storage": "128GB", "price": 42500 }
    ],
    "stock": 20
  },
  {
    "name": "Samsung Galaxy A17",
    "brand": "Samsung",
    "series": "A Series",
    "price": 59500,
    "image": "/uploads/samsung/A%20series/Samsung_Galaxy_A17-removebg-preview.png",
    "specs": {
      "display": "6.7\"",
      "battery": "5000mAh",
      "camera": "50MP + 5MP + 2MP / 13MP",
      "os": "Android"
    },
    "variants": [
      { "ram": "6GB", "storage": "128GB", "price": 59500 },
      { "ram": "8GB", "storage": "256GB", "price": 68500 }
    ],
    "stock": 20
  },
  {
    "name": "Samsung Galaxy A26",
    "brand": "Samsung",
    "series": "A Series",
    "price": 89999,
    "image": "/uploads/samsung/A%20series/samsung_A26-removebg-preview%20(1).png",
    "specs": {
      "display": "6.7\"",
      "battery": "5000mAh",
      "camera": "50MP + 8MP + 2MP",
      "os": "Android"
    },
    "variants": [
      { "ram": "8GB", "storage": "256GB", "price": 89999 }
    ],
    "stock": 15
  },
  {
    "name": "Samsung Galaxy A36",
    "brand": "Samsung",
    "series": "A Series",
    "price": 119999,
    "image": "/uploads/samsung/A%20series/Samsung-Galaxy-A36-cellmart-removebg-preview.png",
    "specs": {
      "display": "6.7\"",
      "battery": "5000mAh",
      "camera": "50MP + 8MP + 5MP / 12MP"
    },
    "variants": [
      { "ram": "8GB", "storage": "256GB", "price": 119999 }
    ],
    "stock": 12
  },
  {
    "name": "Samsung Galaxy A56",
    "brand": "Samsung",
    "series": "A Series",
    "price": 137999,
    "image": "/uploads/samsung/A%20series/Samsung-Galaxy-A56-cellmart-2-removebg-preview.png",
    "specs": {
      "display": "6.7\"",
      "battery": "5000mAh",
      "camera": "50MP + 12MP + 5MP / 12MP"
    },
    "variants": [
      { "ram": "8GB", "storage": "256GB", "price": 137999 },
      { "ram": "12GB", "storage": "256GB", "price": 150999 }
    ],
    "stock": 10
  },


  // ==================== S SERIES ====================
  {
    name: 'Samsung Galaxy S25',
    brand: 'Samsung',
    series: 'S Series',
    price: 334999,
    image: '/uploads/samsung/s-series/s25/front.jpg',
    specs: {
      display: '6.2"',
      battery: '4000mAh',
      camera: '50MP + 10MP + 12MP / 12MP'
    },
    variants: [
      { ram: '12GB', storage: '512GB', price: 334999 }
    ]
  },

  {
    name: 'Samsung Galaxy S25 Ultra',
    brand: 'Samsung',
    series: 'S Series',
    price: 459999,
    image: '/uploads/samsung/s-series/s25-ultra/front.jpg',
    specs: {
      display: '6.9"',
      battery: '5000mAh',
      camera: '200MP + 10MP + 50MP + 12MP / 12MP'
    },
    variants: [
      { ram: '12GB', storage: '512GB', price: 459999 }
    ]
  },

  {
    name: 'Samsung Galaxy S25 FE',
    brand: 'Samsung',
    series: 'S Series',
    price: 219999,
    image: '/uploads/samsung/s-series/s25-fe/front.jpg',
    specs: {
      display: '6.7"',
      battery: '4900mAh',
      camera: '50MP + 12MP + 8MP / 10MP'
    },
    variants: [
      { ram: '8GB', storage: '256GB', price: 219999 },
      { ram: '8GB', storage: '512GB', price: 254999 }
    ]
  },

  // ==================== Z SERIES ====================
  {
    name: 'Samsung Galaxy Z Flip 6',
    brand: 'Samsung',
    series: 'Z Series',
    price: 384999,
    image: '/uploads/samsung/z-series/z-flip-6/front.jpg',
    specs: {
      display: '6.7" Foldable',
      battery: '4000mAh',
      camera: '50MP + 12MP / 10MP'
    },
    variants: [
      { ram: '12GB', storage: '512GB', price: 384999 }
    ]
  },

  {
    name: 'Samsung Galaxy Z Fold 6',
    brand: 'Samsung',
    series: 'Z Series',
    price: 604999,
    image: '/uploads/samsung/z-series/z-fold-6/front.jpg',
    specs: {
      display: '7.6" Foldable',
      battery: '4400mAh',
      camera: '50MP + 12MP + 10MP / 10MP + 4MP'
    },
    variants: [
      { ram: '12GB', storage: '512GB', price: 604999 }
    ]
  }

,

  {
    name: 'Samsung Galaxy A07',
    brand: 'Samsung',
    series: 'A Series',
    price: 30500,
    image: '/uploads/samsung/a-series/a07/front.jpg',
    specs: {
      display: '6.7"',
      battery: '5000mAh',
      camera: '50MP + 2MP / 8MP'
    },
    variants: [
      { ram: '4GB', storage: '64GB', price: 30500 },
      { ram: '4GB', storage: '128GB', price: 35500 },
      { ram: '6GB', storage: '128GB', price: 42500 }
    ]
  },

  {
    name: 'Samsung Galaxy A17',
    brand: 'Samsung',
    series: 'A Series',
    price: 59500,
    image: '/uploads/samsung/a-series/a17/front.jpg',
    specs: {
      display: '6.7"',
      battery: '5000mAh',
      camera: '50MP + 5MP + 2MP / 13MP'
    },
    variants: [
      { ram: '6GB', storage: '128GB', price: 59500 },
      { ram: '8GB', storage: '256GB', price: 68500 }
    ]
  },

  {
    name: 'Samsung Galaxy A26',
    brand: 'Samsung',
    series: 'A Series',
    price: 89999,
    image: '/uploads/samsung/a-series/a26/front.jpg',
    specs: {
      display: '6.7"',
      battery: '5000mAh',
      camera: '50MP + 8MP + 2MP / 13MP'
    },
    variants: [
      { ram: '8GB', storage: '256GB', price: 89999 }
    ]
  },

  {
    name: 'Samsung Galaxy A36',
    brand: 'Samsung',
    series: 'A Series',
    price: 119999,
    image: '/uploads/samsung/a-series/a36/front.jpg',
    specs: {
      display: '6.7"',
      battery: '5000mAh',
      camera: '50MP + 8MP + 5MP / 12MP'
    },
    variants: [
      { ram: '8GB', storage: '256GB', price: 119999 }
    ]
  },

  {
    name: 'Samsung Galaxy A56',
    brand: 'Samsung',
    series: 'A Series',
    price: 137999,
    image: '/uploads/samsung/a-series/a56/front.jpg',
    specs: {
      display: '6.7"',
      battery: '5000mAh',
      camera: '50MP + 12MP + 5MP / 12MP'
    },
    variants: [
      { ram: '8GB', storage: '256GB', price: 137999 },
      { ram: '12GB', storage: '256GB', price: 150999 }
    ]
  },

  {
    name: 'Samsung Galaxy S25',
    brand: 'Samsung',
    series: 'C Series',
    price: 334999,
    image: '/uploads/samsung/c-series/s25/front.jpg',
    specs: {
      display: '6.2"',
      battery: '4000mAh',
      camera: '50MP + 10MP + 12MP / 12MP'
    },
    variants: [
      { ram: '12GB', storage: '512GB', price: 334999 }
    ]
  },

  {
    name: 'Samsung Galaxy S25 Ultra',
    brand: 'Samsung',
    series: 'C Series',
    price: 459999,
    image: '/uploads/samsung/c-series/s25-ultra/front.jpg',
    specs: {
      display: '6.9"',
      battery: '5000mAh',
      camera: '200MP + 10MP + 50MP + 50MP / 12MP'
    },
    variants: [
      { ram: '12GB', storage: '512GB', price: 459999 }
    ]
  },

  {
    name: 'Samsung Galaxy S25 FE',
    brand: 'Samsung',
    series: 'C Series',
    price: 219999,
    image: '/uploads/samsung/c-series/s25-fe/front.jpg',
    specs: {
      display: '6.7"',
      battery: '4900mAh',
      camera: '50MP + 12MP + 8MP / 10MP'
    },
    variants: [
      { ram: '8GB', storage: '256GB', price: 219999 },
      { ram: '8GB', storage: '512GB', price: 254999 }
    ]
  },

  {
    name: 'Samsung Galaxy Z Flip 6',
    brand: 'Samsung',
    series: 'Z Series',
    price: 384999,
    image: '/uploads/samsung/z-series/z-flip-6/front.jpg',
    specs: {
      display: '6.7" Foldable',
      battery: '4000mAh',
      camera: '50MP + 12MP / 10MP'
    },
    variants: [
      { ram: '12GB', storage: '512GB', price: 384999 }
    ]
  },

  {
    name: 'Samsung Galaxy Z Fold 6',
    brand: 'Samsung',
    series: 'Z Series',
    price: 604999,
    image: '/uploads/samsung/z-series/z-fold-6/front.jpg',
    specs: {
      display: '7.6" Foldable',
      battery: '4400mAh',
      camera: '50MP + 12MP + 10MP / 10MP + 4MP'
    },
    variants: [
      { ram: '12GB', storage: '512GB', price: 604999 }
    ]
  }





];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    await Product.deleteMany({ brand: { $in: ['Itel', 'realme','Xiaomi','Infinix', 'Samsung'] } });
    console.log('🗑️  Old Itel & realme products deleted');

    await Product.insertMany(products);
    console.log(`✅ ${products.length} products added! (8 Itel + 8 realme)`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedData();