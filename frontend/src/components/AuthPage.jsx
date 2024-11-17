import React, { useState } from 'react';
import './AuthPage.css';
import loginImage from '../assets/logsig.jpg'; // Add your own image path

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-page">
      <div className="auth-content">
        {/* Left Section */}
        <div className="auth-form">
          <h2>{isLogin ? 'Welcome Back!' : 'Join NammaFarmer'}</h2>
          <p className="auth-subtitle">
            {isLogin
              ? 'Log in to access your personalized dashboard.'
              : 'Sign up to connect with the farming community.'}
          </p>
          <form>
            {!isLogin && (
              <div className="input-group">
                <input type="text" id="name" required />
                <label htmlFor="name">Full Name</label>
              </div>
            )}
            <div className="input-group">
              <input type="email" id="email" required />
              <label htmlFor="email">Email Address</label>
            </div>
            <div className="input-group">
              <input type="password" id="password" required />
              <label htmlFor="password">{isLogin ? 'Password' : 'Create Password'}</label>
            </div>
            <button type="submit" className="cta-btn">
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>
          <p className="toggle-text">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={toggleForm} className="toggle-link">
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>

        {/* Right Section */}
        <div className="auth-image">
          <img src={loginImage} alt="Login illustration" />
        </div>
      </div>
    </div>
  );
}
