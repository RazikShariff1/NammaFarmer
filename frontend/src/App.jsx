import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Login from './components/Login';
import Signup from './components/Signup';
import AuthPage from './components/AuthPage';
import './App.css';
import './themes.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-theme', !isDarkMode);
    localStorage.setItem('darkMode', !isDarkMode);
  };

  useEffect(() => {
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModePreference);
    document.body.classList.toggle('dark-theme', darkModePreference);
  }, []);

  return (
    <Router>
      <div className={`App ${isDarkMode ? 'dark' : ''}`}>
        <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

        <div className="header-spacer"></div>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/account" element={<AuthPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App; // Ensure this is present
