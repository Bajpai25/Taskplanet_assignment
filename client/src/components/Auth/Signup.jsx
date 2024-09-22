import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();  // Corrected typo here
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', role);

        try {
            await axios.post('https://taskplanet-assignment-backend.onrender.com/api/auth/signup', formData);  // Removed Content-Type header
            toast.success('Registered successfully');
            navigate('/');
        } catch (err) {
            console.error('Error submitting the form', err);
            toast.error('Failed to register. Try again!');
        }
    };

    return (
      <div className="flex h-screen">
        <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
          <div className="max-w-md text-center">
            <img src="./image.svg" alt="image" />
          </div>
        </div>

        <form
          onSubmit={registerUser}
          className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center"
        >
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">
              Sign Up
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
              Visit Task Planet to earn more!
            </h1>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div className="my-4 rounded-md w-auto">
              <select
                onChange={(e) => setRole(e.target.value)}
                className="p-2 text-lg font-semibold font-sans text-gray-600 hover:border-2 border-gray-700 rounded-md"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>

            <div className="mt-2">
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Sign Up
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <Link to="/">
                <p>
                  Already have an account?{" "}
                  <button className="ml-2 rounded-lg w-32 bg-blue-500 text-white p-2 hover:bg-blue-300">
                    Login here
                  </button>
                </p>
              </Link>
            </div>
          </div>
        </form>
        <ToastContainer/>
      </div>
    );
};

export default Signup;
