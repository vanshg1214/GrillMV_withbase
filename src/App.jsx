import React, { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  Environment, 
  ContactShadows, 
  useGLTF, 
  OrbitControls,
  Html,
  useProgress,
  Line
} from '@react-three/drei'
import * as THREE from 'three'

// --- 3D COMPONENTS ---

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center position={[0, 0.8, 0]}>
      <div className="loader-container">
        <div className="loader"></div>
        <div style={{color: '#841619', fontSize: '0.8rem', fontWeight: 700, marginTop: '10px'}}>
          {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  )
}

function RectangularDimension({ box }) {
  const size = box.getSize(new THREE.Vector3())
  const boxCenter = box.getCenter(new THREE.Vector3())
  const width = size.x
  const depth = size.z
  const cy = boxCenter.y + size.y / 2 - 0.35
  const cx = boxCenter.x
  const cz = boxCenter.z
  const marginOffset = Math.max(width, depth) * 0.15
  const zFront = cz + depth / 2 + marginOffset
  const xLeft = cx - width / 2
  const xRight = cx + width / 2
  const xSide = cx + width / 2 + marginOffset
  const zBack = cz - depth / 2
  const zFrontEdge = cz + depth / 2

  return (
    <group>
      <Line points={[[xLeft, cy, zFront], [xRight, cy, zFront]]} color="#841619" lineWidth={2} />
      <Line points={[[xLeft, cy, zFront - 0.05], [xLeft, cy, zFront + 0.05]]} color="#841619" lineWidth={2} />
      <Line points={[[xRight, cy, zFront - 0.05], [xRight, cy, zFront + 0.05]]} color="#841619" lineWidth={2} />
      <Html position={[cx, cy, zFront + 0.08]} center className="dimension-label">
        51"
      </Html>
      <Line points={[[xSide, cy, zBack], [xSide, cy, zFrontEdge]]} color="#841619" lineWidth={2} />
      <Line points={[[xSide - 0.05, cy, zBack], [xSide + 0.05, cy, zBack]]} color="#841619" lineWidth={2} />
      <Line points={[[xSide - 0.05, cy, zFrontEdge], [xSide + 0.05, cy, zFrontEdge]]} color="#841619" lineWidth={2} />
      <Html position={[xSide + 0.08, cy, cz]} center className="dimension-label">
        24"
      </Html>
    </group>
  )
}

function Model({ url, onCentered, ...props }) {
  const { scene } = useGLTF(url)
  const groupRef = useRef()
  const { box, center, size } = useMemo(() => {
    const clonedScene = scene.clone()
    const box = new THREE.Box3().setFromObject(clonedScene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    return { box, center, size }
  }, [scene])

  useEffect(() => {
    if (onCentered) onCentered({ center, size })
  }, [center, size, onCentered])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.05)
      groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, 1, 0.05)
      groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, 1, 0.05)
    }
  })

  return (
    <group {...props}>
      <group ref={groupRef} scale={[0, 0, 0]}>
        <group position={[-center.x, -(center.y - size.y / 2), -center.z]}>
          <primitive object={scene} />
          {!props.hideDimensions && <RectangularDimension box={box} />}
        </group>
      </group>
    </group>
  )
}

// --- MAIN APP COMPONENT ---

export default function App() {
  const modelUrl = '/scene (28).glb'
  const arViewerRef = useRef(null)
  const [orbitTarget, setOrbitTarget] = useState([0, 0.8, 0])
  const [showQR, setShowQR] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  const handleARClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                     (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    if (!isMobile) { setShowQR(true); return }
    if (arViewerRef.current) { arViewerRef.current.activateAR() }
  }

  return (
    <div className="page-wrapper">
      {/* Client-like Header */}
      <div className="top-bar">
        <span className="top-bar-text">MAKE ENTERTAINING A LIFESTYLE! CALL 626-628-7405 FOR A FREE QUOTE</span>
        <span className="top-bar-login">Login</span>
      </div>
      
      <header className="middle-bar">
        <div className="search-container">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="logo-container">
          <img src="/imafes/image.png" alt="L.A. Grill Islands" className="main-logo" />
        </div>
        <div className="header-icons">
          <span>Wishlist</span>
          <span>Account</span>
          <span>Cart (0)</span>
        </div>
      </header>

      <nav className="nav-bar">
        <span>Browse Categories</span>
        <span>Home</span>
        <span>Make A Payment</span>
        <span>FAQ</span>
        <span>Contact Us</span>
      </nav>

      {/* Breadcrumbs */}
      <div className="breadcrumbs-container">
        Home {'>'} Online Store {'>'} AOG Grill Products {'>'} 24" T-Series Grill
      </div>

      <main className="product-main">
        {/* Left Column: 3D Viewer in a Box Structure */}
        <section className="viewer-section">
          <div className="box-structure" onPointerDown={() => setHasInteracted(true)}>
            <Canvas shadows camera={{ position: [0, 1.5, 3], fov: 40 }} gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}>
              <color attach="background" args={['#ffffff']} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
              <Suspense fallback={<Loader />}>
                <Model url={modelUrl} hideDimensions={showQR} onCentered={({ size }) => setOrbitTarget([0, size.y * 0.5, 0])} />
                <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={15} blur={1.5} far={4} color="#000" />
                <Environment files="/cedar_bridge_sunset_1_4k.hdr" environmentIntensity={1.2} />
              </Suspense>
              <OrbitControls makeDefault target={orbitTarget} minDistance={1} maxDistance={10} />
            </Canvas>

            {/* Google Search style 3D rotate prompt overlay */}
            {!hasInteracted && (
              <div className="interaction-prompt-overlay">
                <div className="gesture-circle">
                  <svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24" className="gesture-icon">
                    <path d="M12 2c-.55 0-1 .45-1 1v7.67L8.85 9.49c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l3.52 3.52c.38.38.89.6 1.42.6H19c1.1 0 2-.9 2-2V8c0-.55-.45-1-1-1s-1 .45-1 1v2h-1V5c0-.55-.45-1-1-1s-1 .45-1 1v5h-1V4c0-.55-.45-1-1-1s-1 .45-1 1v6h-1V2c0-.55-.45-1-1-1zM4 14c0-2.21 1.79-4 4-4 .55 0 1-.45 1-1s-.45-1-1-1c-3.31 0-6 2.69-6 6s2.69 6 6 6c.55 0 1-.45 1-1s-.45-1-1-1c-2.21 0-4-1.79-4-4z"/>
                  </svg>
                </div>
              </div>
            )}

            <button className="ar-trigger" onClick={handleARClick}>
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '6px' }}>
                <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h2A1.5 1.5 0 0 1 5 1.5v1A1.5 1.5 0 0 1 3.5 4h-2A1.5 1.5 0 0 1 0 2.5v-1zm11 0A1.5 1.5 0 0 1 12.5 0h2A1.5 1.5 0 0 1 16 1.5v1A1.5 1.5 0 0 1 14.5 4h-2A1.5 1.5 0 0 1 11 2.5v-1zm-11 11A1.5 1.5 0 0 1 1.5 11h2A1.5 1.5 0 0 1 5 12.5v1A1.5 1.5 0 0 1 3.5 16h-2A1.5 1.5 0 0 1 0 14.5v-1zm11 0A1.5 1.5 0 0 1 12.5 11h2a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-2a1.5 1.5 0 0 1-1.5-1.5v-1z"/>
              </svg>
              View in 3D
            </button>
          </div>

          <div className="thumbnail-row">
            <div className="thumb active" style={{borderColor: '#841619', display: 'flex', gap: '6px', alignItems: 'center'}}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h2A1.5 1.5 0 0 1 5 1.5v1A1.5 1.5 0 0 1 3.5 4h-2A1.5 1.5 0 0 1 0 2.5v-1zm11 0A1.5 1.5 0 0 1 12.5 0h2A1.5 1.5 0 0 1 16 1.5v1A1.5 1.5 0 0 1 14.5 4h-2A1.5 1.5 0 0 1 11 2.5v-1zm-11 11A1.5 1.5 0 0 1 1.5 11h2A1.5 1.5 0 0 1 5 12.5v1A1.5 1.5 0 0 1 3.5 16h-2A1.5 1.5 0 0 1 0 14.5v-1zm11 0A1.5 1.5 0 0 1 12.5 11h2a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-2a1.5 1.5 0 0 1-1.5-1.5v-1z"/>
              </svg>
              3D
            </div>
            {[1, 2, 3].map(i => (
              <div key={i} className="thumb">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 13l4-4 5 5 5-5 4 4"/></svg>
              </div>
            ))}
          </div>

          <div className="email-friend">
             <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"/></svg>
             Email a friend
          </div>
        </section>

        {/* Right Column: Product Info */}
        <section className="product-info-right">
          <h1>AOG 24" T-Series Grill w/In-Ground Post</h1>
          <div className="rating-row">★★★★★ (154 reviews)</div>

          <div className="price-box">
            <span className="price-label">Your Price:</span>
            <span className="price-value">$2,499.00</span>
          </div>

          <div className="product-meta">
            <span>Part Number: 24T-IGP</span>
            <span>Availability: In Stock</span>
          </div>

          <div className="options-section">
            <div className="options-title">Choose Options</div>
            <div className="option-item">
              <label>Gas Type *</label>
              <select>
                <option>Select Gas Type</option>
                <option>Natural Gas</option>
                <option>Propane</option>
              </select>
            </div>
          </div>

          <div className="cart-controls">
            <div className="qty-input">
              <button className="qty-btn">-</button>
              <input type="text" defaultValue="1" />
              <button className="qty-btn">+</button>
            </div>
            <button className="add-to-cart-btn">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
              Add to Cart
            </button>
          </div>
        </section>
      </main>

      {/* Tabs */}
      <section className="tabs-container">
        <div className="tab-headers">
          <button className="tab-btn active">Description</button>
          <button className="tab-btn">Specifications</button>
          <button className="tab-btn">Shipping</button>
          <button className="tab-btn">Legal Disclaimers</button>
        </div>
        <div style={{padding: '30px 0', borderTop: '1px solid #e5e5e5', color: '#555'}}>
          <p>Bring the ultimate outdoor cooking experience to your backyard. Crafted from heavy-duty 304 stainless steel with advanced burner technology, this grill delivers high performance and durability for years of family barbecues. The in-ground post provides a permanent, secure installation for your outdoor kitchen setup.</p>
        </div>
      </section>

      {/* QR Code Modal */}
      {showQR && (
        <div className="qr-overlay" onClick={() => setShowQR(false)}>
          <div className="qr-card" onClick={e => e.stopPropagation()}>
            <h2>Scan for AR</h2>
            <p>Open your camera and scan the code to place this grill in your backyard!</p>
            <div style={{background: '#f9f9f9', padding: '20px', borderRadius: '8px', display: 'inline-block', margin: '20px 0'}}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=0&data=${encodeURIComponent(currentUrl)}`}
                alt="QR Code"
                width="200"
                height="200"
              />
            </div>
            <button className="add-to-cart-btn" style={{width: '100%', justifyContent: 'center'}} onClick={() => setShowQR(false)}>Got it</button>
          </div>
        </div>
      )}

      {/* Hidden AR engine */}
      <model-viewer ref={arViewerRef} src={modelUrl} ar ar-scale="fixed" ar-placement="floor" ar-modes="scene-viewer webxr quick-look" shadow-intensity="1" scale="1.15 1.15 1.15" style={{ display: 'none' }} />
    </div>
  )
}

useGLTF.preload('/scene (28).glb')
