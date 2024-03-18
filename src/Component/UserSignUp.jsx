import React, { useState } from 'react';
import axios from 'axios';
//import '../css/UserForm.css'; // Import CSS file


export default function UserSignUp() {
  const [empID, setEmpID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [empIDError, setEmpIDError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setEmpIDError("");
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    // Validate employee ID
    if (!empID) {
      setEmpIDError("Employee ID is required");
      hasError = true;
    }

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      hasError = true;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) {
      setFormError("Please fix the errors in the form");
      return;
    }

    try {
      const response = await axios.post('https://localhost:7199/api/User/addUser', {
        employeeId: empID,
        email: email,
        password: password,
        isDeleted: false
      });
      console.log('User signed up successfully:', response.data);
      // Optionally, redirect to another page after successful signup
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle errors (e.g., display error messages)
    }
  };

  const validateEmail = (email) => {
    // Basic email format validation
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div>
        <h5>User Signup</h5>
      </div>
      <div>
        <label>Employee ID</label>
        <input
          type="text"
          value={empID}
          onChange={(e) => setEmpID(e.target.value)}
        />
        {empIDError && <span className="error">{empIDError}</span>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <span className="error">{emailError}</span>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <span className="error">{passwordError}</span>}
      </div>
      {formError && <div className="error">{formError}</div>}
      <div>
        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
}
