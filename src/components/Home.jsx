



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("https://emplyeemanage-server.onrender.com/employees"); 
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch employees");
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`https://emplyeemanage-server.onrender.com/employees/${id}`); 
      fetchEmployees();
    } catch (error) {
      setError("Failed to delete employee");
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-black vh-100'>
      <h1 style={{ color: 'white' }}>Employee Management</h1>
      <div className='w-75 rounded bg-white border shadow-lg p-4 border border-5 border-dark-subtle'>
        <div className='d-flex justify-content-end'>
          <Link to='/add' className='btn btn-success'>ADD +</Link>
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>ID</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td style={{ padding: "12px" }}>{employee.id}</td>
                <td style={{ padding: "12px" }}>{employee.username}</td>
                <td style={{ padding: "12px" }}>{employee.email}</td>
                <td style={{ padding: "12px" }}>{employee.status}</td>
                <td style={{ padding: "12px", display: 'flex' }}>
                  <Link
                    to={`/edit/${employee.id}`}
                   
                  ><button className='btn btn-info '>
                    EDIT
                  </button>
                    
                  </Link>
                  <button className='btn btn-danger' style={{marginLeft:'20px'}}
                  
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;