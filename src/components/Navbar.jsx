import React from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react';
export default function Navbar() {
    const { user } = useContext(AuthContext);
  return (
    <nav className="navbar">
        <div className="navbar-container">
            <Link to="/" className='navbar-brand'>ShopHub</Link>
            <div className="navbar-links">
                <Link to="/" className='navbar-link'>Home</Link>
                <Link to="/checkout" className='navbar-link'>Cart</Link>
            </div>
            <div className="navbar-auth">
                <div className="navbar-auth-links">
                    {user ? (
                        <>
                            <span className='navbar-greeting'>Welcome, {user.email}</span>
                            <Link to="/auth" className='btn btn-secondary'>Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/auth" className='btn btn-secondary'>Login</Link>
                            <Link to="/auth" className='btn btn-primary'>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    </nav>
  )
}
