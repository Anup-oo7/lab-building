import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './loginSignup.css';

import logo1 from './imagesUsed/logo1.png';
import logo2 from './imagesUsed/logo2.png';
import github from './imagesUsed/github.png';
import twitter from './imagesUsed/twitter.png';
import linkedin from './imagesUsed/linkedin.png';
import discord from './imagesUsed/discord.png';
import google from './imagesUsed/google.png';
import apple from './imagesUsed/apple.png';

function LoginSignup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  function isValidEmail(email) {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const gmailPattern = /@gmail\.com$/i;
    return emailPattern.test(email) && gmailPattern.test(email);
  }
  
  const navigateToUpload = () => {
    if (!isValidEmail(email)) {
      alert('Please enter a valid email to proceed.');
      return;
    } else if (!password) {
      alert('Please enter a password to proceed.');
      return;
    }
    navigate('/upload');
  };
  

  return (
    <div className='container'>
      <div className='leftBackground'>
        <div className='logo'>
          <img src={logo1} alt='' />
          <img className='subtract' src={logo2} alt='' />
        </div>
        <div className='base'>
          <p>BASE</p>
        </div>
        <div className='contacts'>
          <ul>
            <li><img src={github} alt='' /></li>
            <li><img src={twitter} alt='' /></li>
            <li><img src={linkedin} alt='' /></li>
            <li><img src={discord} alt='' /></li>
          </ul>
        </div>
      </div>
      <div className='rightside'>
        <div className='signin'>
          <p className='signinHead'>Signin</p>
          <p className='signinAccount'>Sign in to your account</p>

          <div className='signinWith'>
            <div className='signinWithGoogle'>
              <img src={google} alt='' />
              <span>Sign in with Google</span>
            </div>
            <div className='signinWithApple'>
              <img src={apple} alt='' />
              <span>Sign in with Apple</span>
            </div>
          </div>
          <form action='' className='signinForm'>
            <label htmlFor='email'>Email address</label>
            <input value={email} onChange={(e) => changeEmail(e)} type='text' />
            <label htmlFor='password'>Password</label>
            <input value={password} onChange={(e) => changePassword(e)} type='password' />
            <Link to='/forgot-password' className='forgotP'>Forgot password?</Link>

            <button className='signInbutton' onClick={navigateToUpload}>Sign in</button>
          </form>
          <p className='forRegister' style={{ color: '#858585' }}>Don't have an account?<Link to='/signup'>Register here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
