import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css";
 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');     //done
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset error messages
    setEmailError('');
    setPasswordError('');

    //Validate email
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
    }
 
    try {
      // If inputs are valid, attempt login
      const response = await Axios.post('https://localhost:7199/api/Auth/login', { email, password });
     
      if (response.data.message === "Login successful") {
        // Redirect to dashboard on successful login
        toast.success('Login Successfull');
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate("/dashboard");
      } else {
        // Display error message if login failed
        toast.error(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      // Handle network errors or other unexpected errors
      if (error.response) {
        if (error.response.status === 401) {
          toast.error(error.response.data.message || 'Unauthorized. Please try again.');
        } else if (error.response.status === 400) {
          toast.error(error.response.data.message || 'Bad request. Please check your inputs.');
        } else {
          toast.error('An unexpected error occurred. Please try again.');
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };
 
  return (
    <div className={'mainContainer'}>
       <ToastContainer />
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
 