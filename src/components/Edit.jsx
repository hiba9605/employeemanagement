


import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({ username: "", email: "", status: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`https://emplyeemanage-server.onrender.com/employees/${id}`);
      setEmployee(response.data);
    } catch (error) {
      console.error("Error fetching employee data", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://emplyeemanage-server.onrender.com/employees/${id}`, employee);
      navigate("/"); 
    } catch (error) {
      console.error("Error updating employee", error);
    }
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-black'>
      <div className='w-50 border border-5 border-dark-subtle bg-white shadow-lg px-5 pt-3 pb-5 rounded'>
        <h1>Edit Employee</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label htmlFor="username">Name:</label>
            <input
              value={employee.username}
              onChange={handleChange}
              type="text"
              name='username' 
              className='form-control'
              placeholder='Enter Name'
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="email">Email:</label>
            <input
              value={employee.email}
              onChange={handleChange}
              type="email"
              name='email' 
              className='form-control'
              placeholder='Enter Email'
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="status">Status:</label><br />
            <select
              id="status"
              name="status" 
              className='form-control'
              value={employee.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <button type="submit" className='btn btn-success mt-5'>Submit</button>
            <Link to="/" className='btn btn-primary ms-3 mt-5'>Back</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;