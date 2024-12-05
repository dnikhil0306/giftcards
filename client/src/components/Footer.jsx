import React from 'react'
import{Link} from 'react-router-dom'


const Footer = () => {
  return (
    <footer>

      <ul className="footer__categories">
        <li><Link to="/redeem">Redeem Your Card</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/">Terms & Conditions</Link></li>
        {/* <li><Link to="/posts/categories/Business">Business</Link></li>
        <li><Link to="/posts/categories/Technology">Technology</Link></li> */}
      </ul>

      <div className="footer__copyright">
        <small>All Rights Reserved &copy; Copyright GiftCards.</small>
      </div>
    </footer>
  )
}

export default Footer