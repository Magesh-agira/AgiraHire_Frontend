import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNavigation from './SideNavigation';
import './OpportunityList.css'; // Import CSS file

function Opportunity() {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://localhost:7199/api/Opportunities')
            .then(response => {
                setOpportunities(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching opportunities:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
      <>
      <SideNavigation/>
        <div className="opportunity-list-container">
            <h1>Opportunities</h1>
            <table className="opportunity-table">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Location</th>
                        <th>Employment Type</th>
                        <th>Qualification</th>
                        <th>Salary</th>
                        <th>Date Posted</th>
                        <th>No. of Openings</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {opportunities.map(opportunity => (
                        <tr key={opportunity.opportunity_Id}>
                            <td>{opportunity.position}</td>
                            <td>{opportunity.location}</td>
                            <td>{opportunity.employment_Type}</td>
                            <td>{opportunity.qualification}</td>
                            <td>{opportunity.salary}</td>
                            <td>{opportunity.date_Posted}</td>
                            <td>{opportunity.no_Of_Openings}</td>
                            <td>{opportunity.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default Opportunity;
