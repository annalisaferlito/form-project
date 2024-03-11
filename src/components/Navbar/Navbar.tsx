import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Sign up</a></li>
          </ul>
        </nav>
    </div>
  )
}

export default Navbar
