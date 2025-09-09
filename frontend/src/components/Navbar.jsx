import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Context } from "../main"
import axios from 'axios'
import { toast } from 'react-toastify'
import {GiHamburgerMenu} from 'react-icons/gi'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
  const navigateTo = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true
      });
      toast.success(res.data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
      setIsOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed. Please try again.");
    }
  }

  const toggleMenu = () => {
    console.log("Toggle clicked, current state:", isOpen);
    setIsOpen(!isOpen);
  }

  console.log("Navbar render - isOpen:", isOpen);

  return (
    <>
      <nav className='container'>
        <div className='logo'>
          <Link to="/">MedConnect</Link>
        </div>
        
        {/* Navigation Links */}
        <div className={`navLinks ${isOpen ? 'show' : ''}`}>
          <div className="links">
            <Link to="/" onClick={() => setIsOpen(false)}>HOME</Link>
            <Link to="/appointment" onClick={() => setIsOpen(false)}>APPOINTMENT</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>ABOUT US</Link>
          </div>
          {isAuthenticated ? (
            <button className='logoutBtn btn' onClick={handleLogout}>LOGOUT</button>
          ) : (
            <button className='loginBtn btn' onClick={() => { navigateTo("/login"); setIsOpen(false); }}>
              LOGIN
            </button>
          )}
        </div>
        
        {/* Hamburger Menu */}
        <div className='hamburger' onClick={toggleMenu}>
          <GiHamburgerMenu/>
        </div>
      </nav>
      
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}>
        </div>
      )}
      
      
    </>
  )
}

export default Navbar

