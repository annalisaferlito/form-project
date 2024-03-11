import React from 'react'
import './Navbar.css'
import { Page } from "../../types/Page";

interface NavbarProps {
  onPageChange: (page: Page) => void;
}
const Navbar: React.FC<NavbarProps> = ({ onPageChange }) => {
  return (
    <div>
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li onClick={() => onPageChange('login')}><a href="#">Log In</a></li>
            <li onClick={() => onPageChange('signup')}><a href="#">Sign Up</a></li>
          </ul>
        </nav>
    </div>
  )
}

export default Navbar
