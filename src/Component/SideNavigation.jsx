import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import '../css/SideNavigation.css'; // Import CSS file

const SideNavigation = () => {
  return (
    <nav className="sidenav">
      <ul>
       
        <li><Link to="/">Home</Link></li>
        <li><Link to="/opportunity">Opportunities</Link></li>
        <li><Link to="/signup">Register</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
