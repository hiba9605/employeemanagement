




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 

const Add = () => {
  const [employee, setEmployee] = useState({ username: "", email: "", status: "active" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://emplyeemanage-server.onrender.com/employees", employee); 
    navigate("/"); 
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-black'>
      <div className='w-50 border border-5 border-dark-subtle bg-white shadow-lg px-5 pt-3 pb-5 rounded'>
        <h1>Add Employee</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label htmlFor="username">Name:</label>
            <input
              onChange={handleChange}
              type="text"
              name='username' 
              id='username'
              className='form-control'
              placeholder='Enter Name'
              value={employee.username} 
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="email">Email:</label>
            <input
              onChange={handleChange}
              type="email"
              name='email'
              id='email'
              className='form-control'
              placeholder='Enter Email'
              value={employee.email} 
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="status">Status:</label><br />
            <select
              id="status"
              name="status" 
              className='form-control'
              onChange={handleChange}
              value={employee.status} 
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

export default Add;
