import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset error messages
    setEmailError('');
    setPasswordError('');

    // Validate email
    if (!email) {
      setEmailError('Please enter your email');
      return;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    // Validate password
    if (!password) {
      setPasswordError('Please enter a password');
      return;
    } else if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }

    // If inputs are valid, attempt login
    Axios.post('https://localhost:7199/api/Auth/login', { email, password })
      .then((res) => {
        alert('Login Successful');
        console.log(`Data Saved ${res.data}`);
        // Redirect after successful login
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log(`Error occurred during login: ${err}`);
        alert('Login failed. Please try again.');
      });
  };

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <div className={'inputContainer'}>
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            value={password}
            type="password"
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input className={'inputButton'} type="submit" value={'Log in'} />
        </div>
      </form>
    </div>
  );
};

export default Login;
