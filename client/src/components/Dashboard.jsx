import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { Link , useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching users:', error);
      setLoading(false);
    }
  };
  const logout=()=>{
    localStorage.removeItem('token');
    navigate('/');
  }

  useEffect(() => {
    // Fetch the initial list of users when the component mounts
    fetchUsers();

    // Initialize Socket.io connection to the backend
    const socket = io('http://localhost:5000'); // Connect to the backend's Socket.io server

    // Listen for the 'new-user' event emitted by the backend
    socket.on('new-user', (newUser) => {
      console.log('New user added:', newUser);
      toast.info('New data added')
      // Update the users list dynamically with the new user
      setUsers((prevUsers) => [newUser, ...prevUsers]);
    });

    // Clean up the Socket.io connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []); // The empty dependency array ensures this only runs once when the component mounts

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Dashboard Header */}
      <header className="bg-white shadow p-4 mb-8 sm:flex sm:flex-row sm:justify-between flex flex-col gap-4">
        <div>
        <h1 className="text-2xl font-semibold text-gray-700">
          Admin Dashboard
        </h1>
        <p className="text-gray-500">Manage users and view their data</p>
        </div>
        <div>
       
          <button onClick={()=>{
            logout()
          }} className='bg-red-500 text-white rounded-md p-2 w-auto h-auto'>Log Out</button>
        </div>
      </header>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color={"#4A90E2"} loading={loading} size={100} />
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user._id} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="text-gray-500">
                Social Media Handle:
                <hr />
                <a
                  href={user.socialMediaHandle}
                  className="text-blue-600 truncate block w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={user.socialMediaHandle} 
                >
                  {user.socialMediaHandle}
                </a>
              </p>

              {/* User Images */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {user.images.map((imageUrl, index) => (
                  <a href={imageUrl} target='_blank' key={index}>
                    <img
                      src={imageUrl}
                      alt={`User ${user.name}'s image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg shadow"
                    />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
      <ToastContainer/>
    </div>

  );
};

export default Dashboard;
