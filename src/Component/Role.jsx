import React, { useState } from 'react';
import axios from 'axios';
import './Roleform.css'; // Import CSS file
import SideNavigation from './SideNavigation';

const RoleForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7199/api/Auth/addRole', formData);
      console.log('Response:', response.data);
      // Reset form fields
      setFormData({
        name: '',
        description: ''
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <SideNavigation/>
    <div className="role-form-container">
      <h2>Role Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
};

export default RoleForm;
