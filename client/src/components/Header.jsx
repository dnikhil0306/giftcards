import React from 'react'
import{Link} from 'react-router-dom'
import Logo from '../images/Logo1.png'

const Header = () => {
  return (
    <nav>
      <div className="container nav__container">
            <Link to="/" className='nav__logo'>
                <img src={Logo} alt='Navbar Logo'/>
            </Link>
            <ul className="nav__menu">
                <li><Link to='/'>Home</Link></li>
                {/* <li><Link to='/create'>Add Link</Link></li> */}
                <li><Link to='/redeem'>Redeem</Link></li>
                <li><Link to='/about'>About</Link></li>
            </ul>
    </div>
    </nav>
  )
}

export default Header



