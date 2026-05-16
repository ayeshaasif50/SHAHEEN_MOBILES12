import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar        from './components/Navbar/Navbar'
import Footer        from './components/Footer/Footer'
import Home          from './pages/Home/Home'
import Shop          from './pages/Shop/Shop'
import Blog          from './pages/Blog/Blog'
import BlogDetail    from './pages/Blog/BlogDetail'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Cart          from './pages/Cart/Cart'
import Checkout      from './pages/Checkout/Checkout'
import Login         from './pages/Login/Login'
import Contact       from './pages/Contact/Contact'
import About         from './pages/About/About'          // <- new about page import
import AccountPage   from './pages/Account'              // <- account page import

import './App.css'

function App() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <BrowserRouter>
      {/* showLogin modal (if used) */}
      {showLogin && <Login setShowLogin={setShowLogin} />}

      <Navbar setShowLogin={setShowLogin} />

      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/shop"        element={<Shop />} />
        <Route path="/blog"        element={<Blog />} />
        <Route path="/blog/:id"    element={<BlogDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart"        element={<Cart />} />
        <Route path="/checkout"    element={<Checkout />} />
        <Route path="/contact"     element={<Contact />} />
        <Route path="/about"       element={<About />} />          {/* <- new about route */}
        <Route path="/account"     element={<AccountPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App