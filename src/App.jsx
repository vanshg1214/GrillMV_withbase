import React, { useState, useRef, useEffect } from 'react'
import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import FAQPage from './pages/FAQPage'
import ContactPage from './pages/ContactPage'
import { PRODUCTS } from './data/products'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.partNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSuggestions(filtered)
      setIsDropdownOpen(true)
    } else {
      setSuggestions([])
      setIsDropdownOpen(false)
    }
  }, [searchQuery])

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSuggestionClick = (productId) => {
    setSearchQuery('')
    setIsDropdownOpen(false)
    navigate(`/product/${productId}`)
  }

  return (
    <div className="page-wrapper">
      {/* Top Bar */}
      <div className="top-bar">
        <span className="top-bar-text">MAKE ENTERTAINING A LIFESTYLE! CALL 626-628-7405 FOR A FREE QUOTE</span>
        <span className="top-bar-login">Login</span>
      </div>

      {/* Middle Bar */}
      <header className="middle-bar">
        <div className="search-container" ref={dropdownRef}>
          <input 
            type="text" 
            placeholder="Search grills by name or SKU..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.trim() && setIsDropdownOpen(true)}
          />
          {isDropdownOpen && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map(product => (
                <div 
                  key={product.id} 
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(product.id)}
                >
                  <div className="suggestion-info">
                    <span className="suggestion-name">{product.name}</span>
                    <span className="suggestion-sku">SKU: {product.partNumber}</span>
                  </div>
                  <span className="suggestion-price">{product.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="logo-container">
          <Link to="/">
            <img src="/imafes/image.png" alt="L.A. Grill Islands" className="main-logo" />
          </Link>
        </div>

        <div className="header-icons">
          <span>Wishlist</span>
          <span>Account</span>
          <span>Cart (0)</span>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav-bar">
        <span className="nav-browse-tag" style={{ color: '#fff', marginRight: '20px', fontWeight: 900 }}>Browse Categories</span>
        <div className="nav-links" style={{ display: 'flex', gap: '20px' }}>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
          <NavLink to="/faq" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>FAQ</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact Us</NavLink>
        </div>
      </nav>

      {/* Main Content Area with Routes */}
      <div className="routes-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-grid">
          <div className="footer-col">
            <img src="/imafes/image.png" alt="L.A. Grill Islands" className="footer-logo" />
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginTop: '10px' }}>
              Crafting premium custom outdoor grill islands and barbecues since 1999. Immersive 3D/AR previews help you design your dream backyard.
            </p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          <div className="footer-col">
            <h4>Contact Info</h4>
            <p><strong>Phone:</strong> 626-628-7405</p>
            <p><strong>Email:</strong> sales@lagrillislands.com</p>
            <p><strong>Address:</strong> Los Angeles, California</p>
          </div>
        </div>
        <div className="footer-bottom" style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '0.8rem' }}>
          <p>&copy; {new Date().getFullYear()} L.A. Grill Islands. All Rights Reserved. Custom WebAR Solutions.</p>
        </div>
      </footer>
    </div>
  )
}
