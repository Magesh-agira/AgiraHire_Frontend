import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
//import "../css/OpportunityForm.css"

export default function OpportunityForm() {
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [qualification, setQualification] = useState("");
  const [salary, setSalary] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [noOfOpenings, setNoOfOpenings] = useState(0);
  const [status, setStatus] = useState(0); // Default value for status

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7199/api/Opportunities', {
          position: position,
          location: location,
          employmentType: employmentType,
        qualification: qualification,
        salary: salary,
        datePosted: datePosted,
        noOfOpenings: noOfOpenings,
        status: status,
        isDeleted: false
      });
      console.log('Opportunity added successfully:', response.data);
      // Optionally, redirect to another page after successful form submission
    } catch (error) {
      console.error('Error adding opportunity:', error);
      // Handle errors (e.g., display error messages)
    }
  };

  return (
    <div className="opp_container">
    <form onSubmit={handleSubmit} className="opp_form">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Opportunity Form</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Position"
            name="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Employment Type"
            name="employmentType"
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Qualification"
            name="qualification"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Salary"
            name="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Date Posted"
            name="datePosted"
            type="date"
            value={datePosted}
            onChange={(e) => setDatePosted(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Number of Openings"
            name="noOfOpenings"
            type="number"
            value={noOfOpenings}
            onChange={(e) => setNoOfOpenings(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
            >
              <MenuItem value={0}>Open</MenuItem>
              <MenuItem value={1}>Closed</MenuItem>
              <MenuItem value={2}>Hold</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Grid>
      </Grid>
    </form>
    </div>
  );
}
