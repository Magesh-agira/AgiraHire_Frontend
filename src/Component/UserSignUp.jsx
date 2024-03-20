import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideNavigation from './SideNavigation';

export default function UserSignUp() {
  const [empID, setEmpID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeEmpID = (e) => {
    const value = e.target.value;
    console.log('EmpID:', value); // Debugging statement
    setEmpID(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Validation checks
    if (!empID || !email || !password) {
      setError("All fields are required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      const response = await axios.post('https://localhost:7199/api/User/addUser', {
        employee_Id: empID,
        email: email,
        password: password,
        isDeleted: false
      });
      alert('User signed up successfully:', response.data);
      navigate('/dashboard');

      // Optionally, redirect to another page after successful signup
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle errors (e.g., display error messages)
      if (error.response && error.response.data) {
        setError(error.response.data); // Display error message from backend
      }  else {
        setError("An error occurred while signing up. Please try again later.");
      }
    }
  };

  const validateEmail = (email) => {
    // Basic email format validation
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <>
      <SideNavigation/>
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h2>User Signup</h2>
      <div style={{ marginBottom: '20px' }}>
        <label>Employee ID:</label>
        <input
          type="text"
          value={empID}
          onChange={handleChangeEmpID}
          style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <button type="submit" style={{ width: '100%', padding: '10px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Sign Up</button>
      </div>
    </form>
    </>
  );
}
