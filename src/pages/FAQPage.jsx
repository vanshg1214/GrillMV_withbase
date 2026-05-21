import React, { useState } from 'react'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'How do I use the WebAR feature?',
      answer: 'On any product page, click the "View in AR" button. If you are on a desktop browser, a QR code modal will appear. Scan this code with your mobile device\'s camera to open the AR viewer. If you are on a mobile device, the AR viewer will open directly, allowing you to place the 3D model in your physical environment.'
    },
    {
      question: 'Do I need to install any app to use AR?',
      answer: 'No app installation is required! The WebAR viewer uses native browser capabilities (WebXR on Android and Quick Look on iOS) to project the 3D models directly in your room.'
    },
    {
      question: 'Are the 3D models to scale?',
      answer: 'Yes, the models are formatted in 1:1 real-world dimensions. When you place a grill using AR, it will appear in its exact real-world dimensions (e.g. 51" width for the AOG T-Series).'
    },
    {
      question: 'What materials are the grills made of?',
      answer: 'All our custom grills are built using premium, commercial-grade 304 stainless steel for unmatched durability, rust resistance, and optimal heat retention.'
    },
    {
      question: 'Can I request a custom grill island configuration?',
      answer: 'Absolutely! Visit our Contact Us page to submit your space requirements, and our team will provide a tailored design quote for a custom L.A. Grill Island.'
    }
  ]

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="faq-container">
      <div className="faq-header">
        <span className="faq-tag">Support Center</span>
        <h1>Frequently Asked Questions</h1>
        <div className="section-divider" style={{ margin: '15px auto' }}></div>
        <p>Everything you need to know about our premium WebAR grills and custom installations</p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'open' : ''}`}
          >
            <button 
              className="faq-toggle-btn" 
              onClick={() => toggleFaq(index)}
              aria-expanded={openIndex === index}
            >
              <span>{faq.question}</span>
              <span className="faq-icon-arrow">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            <div className="faq-answer-panel">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
