import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, useGLTF } from '@react-three/drei'
import { PRODUCTS } from '../data/products'

function FeatureModelViewer() {
  // Flagship product (AOG 24" Grill)
  const { scene } = useGLTF('/scene (28).glb')
  
  return (
    <div className="hero-model-container">
      <Canvas camera={{ position: [0, 1.2, 2.5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6} contactShadow={{ opacity: 0.6, blur: 2 }}>
            <primitive object={scene.clone()} scale={0.8} />
          </Stage>
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
      </Canvas>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="home-container">
      {/* Premium Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">WebAR Premium Collection</span>
          <h1 className="hero-title">Elevate Your Outdoor Culinary Experience</h1>
          <p className="hero-subtitle">
            Explore our professional-grade custom grill selection in immersive 3D and place them directly in your backyard with augmented reality.
          </p>
          <div className="hero-actions">
            <a href="#grills-collection" className="btn btn-primary">Browse Grills</a>
            <Link to="/contact" className="btn btn-secondary">Request Custom Quote</Link>
          </div>
        </div>
        <FeatureModelViewer />
      </section>

      {/* Feature Badges */}
      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Google Search Ready</h3>
          <p>Optimized with structured metadata to display interactive 3D models directly in mobile search results.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Instant WebAR</h3>
          <p>No downloads required. Scan the QR code to project commercial-grade grills in 1:1 scale into your outdoor patio.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🛠️</div>
          <h3>304 Stainless Steel</h3>
          <p>Crafted with premium materials to guarantee ultimate durability, superior heat control, and modern aesthetics.</p>
        </div>
      </section>

      {/* Products Collection */}
      <section id="grills-collection" className="products-collection-section">
        <div className="section-header">
          <span className="section-tagline">Our Inventory</span>
          <h2>Professional Grill Systems</h2>
          <div className="section-divider"></div>
        </div>

        <div className="products-grid">
          {PRODUCTS.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-card-visual">
                {/* Visual Placeholder representing luxury metallic feel */}
                <div className="visual-gradient-bg">
                  <span className="visual-overlay-badge">3D & AR Enabled</span>
                  <svg viewBox="0 0 24 24" className="grill-icon-svg" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 2v20M17 5H7a3 3 0 00-3 3v4a3 3 0 003 3h10a3 3 0 003-3V8a3 3 0 00-3-3zM8 17h8M9 20h6" />
                  </svg>
                </div>
              </div>
              <div className="product-card-body">
                <span className="product-sku">Part: {product.partNumber}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description-short">
                  {product.description.substring(0, 95)}...
                </p>
                <div className="product-card-footer">
                  <div className="product-price">{product.price}</div>
                  <Link to={`/product/${product.id}`} className="btn btn-card-action">
                    <span>View in 3D</span>
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
