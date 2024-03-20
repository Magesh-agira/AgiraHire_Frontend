import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNavigation from './SideNavigation';
import './UserList.css'; // Import CSS file

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://localhost:7199/api/User/getUser')
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
      <>
      <SideNavigation/>
        <div className="user-list-container">
            <h1>Users</h1>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Employee ID</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.employee_Id}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default UserList;
