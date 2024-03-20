import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNavigation from './SideNavigation';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RoleList.css';

function UserRoleList() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://localhost:7199/api/Auth/roles')
            .then(response => {
                setRoles(response.data);
                setLoading(false);
                
                toast.success("Role added sucessfully");
            })
            .catch(error => {
                console.error('Error fetching roles:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
      <>
       
      <SideNavigation/>
        <div className="role-list-container">
       
            <h1>Roles</h1>
            <table className="role-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map(role => (
                        <tr key={role.id}>
                            <td>{role.name}</td>
                            <td>{role.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );  
    
}

export default UserRoleList;
