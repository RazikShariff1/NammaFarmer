import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header({ toggleDarkMode, isDarkMode }) {
  return (
    <header className="header">
      <h1>NammaFarmer</h1>
      <nav>
        <NavLink to="/" end activeClassName="active">Home</NavLink>
        <NavLink to="/features" activeClassName="active">Features</NavLink>
        <NavLink to="/how-it-works" activeClassName="active">How It Works</NavLink>
        <NavLink to="/testimonials" activeClassName="active">Testimonials</NavLink>
        <NavLink to="/contact" activeClassName="active">Contact</NavLink>
        <NavLink to="/account" activeClassName="active">Account</NavLink>
      </nav>
      <button className="toggle-dark-mode" onClick={toggleDarkMode}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </header>
  );
}
