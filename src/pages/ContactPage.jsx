import React, { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'aog-24-t',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate API call
    setSubmitted(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="contact-container">
      <div className="contact-layout">
        {/* Info Column */}
        <div className="contact-info-panel">
          <span className="contact-tag">Get In Touch</span>
          <h2>Connect with a Grill Expert</h2>
          <p className="contact-intro">
            Whether you want to inquire about custom patio measurements, request a package deal, or need support with your outdoor kitchen setup—we are here to help.
          </p>

          <div className="info-blocks">
            <div className="info-block">
              <div className="info-icon">📞</div>
              <div className="info-details">
                <h4>Call Support</h4>
                <p>626-628-7405</p>
              </div>
            </div>
            <div className="info-block">
              <div className="info-icon">✉️</div>
              <div className="info-details">
                <h4>Email Inquiries</h4>
                <p>sales@lagrillislands.com</p>
              </div>
            </div>
            <div className="info-block">
              <div className="info-icon">📍</div>
              <div className="info-details">
                <h4>Design Showroom</h4>
                <p>Los Angeles, California</p>
              </div>
            </div>
          </div>

          <div className="glass-hours-card">
            <h4>Showroom Hours</h4>
            <div className="hours-row">
              <span>Monday – Friday</span>
              <span>9:00 AM – 6:00 PM</span>
            </div>
            <div className="hours-row">
              <span>Saturday</span>
              <span>10:00 AM – 4:00 PM</span>
            </div>
            <div className="hours-row">
              <span>Sunday</span>
              <span>Closed</span>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="contact-form-panel">
          {submitted ? (
            <div className="success-message-panel">
              <div className="success-icon">✓</div>
              <h3>Thank You!</h3>
              <p>Your message has been sent successfully. One of our design experts will get in touch with you shortly.</p>
              <button className="btn btn-primary" style={{ display: 'inline-block', margin: '0 auto' }} onClick={() => setSubmitted(false)}>Send Another Message</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Request a Quote</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="interest">Model of Interest</label>
                  <select 
                    id="interest" 
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                  >
                    <option value="aog-24-t">AOG 24" T-Series Grill</option>
                    <option value="american-24-outdoor">American Premium 24" Grill</option>
                    <option value="american-outdoor-classic">American Classic Outdoor Grill</option>
                    <option value="american-outdoor-animated">American Interactive Animated Grill</option>
                    <option value="custom-island">Custom Outdoor Kitchen Island</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message / Custom Requirements *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your backyard layout or ask specific questions..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary submit-btn">Submit Inquiry</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
