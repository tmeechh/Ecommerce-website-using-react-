import React from 'react'
import './Footer.css'
import footer from '../Assets/logo_big.png'
import instagram from '../Assets/instagram_icon.png'
import pintester from '../Assets/pintester_icon.png'
import whatsapp from '../Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
          <div className="footer-logo">
              <img src={footer} alt="" />
              <p>MEECH</p>
          </div>
          <ul className="footer-links">
              <li>Company</li>
              <li>Product</li>
              <li>Offices</li>
              <li>About</li>
              <li>Contact</li>
          </ul>
          <div className='footer-social-icon'>
              <div className="footer-icons-container">
                  <img src={instagram} alt="" />
              </div>
              <div className="footer-icons-container">
                  <img src={pintester} alt="" />
              </div>
              <div className="footer-icons-container">
                  <img src={whatsapp} alt="" />
              </div>
          </div>
          <div className="footer-copyright">
              <hr />
              <p>Copyright  &copy; 2024 - ALL Right Reserved</p>
          </div>
    </div>
  )
}

export default Footer