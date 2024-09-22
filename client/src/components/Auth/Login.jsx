import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            // Send JSON payload
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            const token = response.data.token;
            localStorage.setItem('token', token); // Store the token
            const jwt_token=localStorage.getItem('token');
            const decoded = jwtDecode(jwt_token);
            if(decoded.role==='User'){
                navigate('/user_details');
            }
            else{
                navigate('/admin');
            }
            toast.success('Logged in successfully');
        } catch (err) {
            console.error('Error logging in', err);
            toast.error('Failed to log in. Check your credentials!');
        }
    };

    return (
        <div className="flex h-screen">
            <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                <div className="max-w-md text-center">
                    <img src="./image.svg" alt="image" />
                </div>
            </div>

            <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                <form onSubmit={loginUser} className="max-w-md w-full p-6">
                    <h1 className="text-3xl font-semibold mb-6 text-black text-center">Login</h1>
                    <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Visit Task Planet to earn more!</h1>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                    </div>
                    <div className='mt-2'>
                        <button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Login</button>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 text-center">
                        <Link to="/register"><p>New User <button className='ml-2 rounded-lg w-32 bg-blue-500 text-white p-2 hover:bg-blue-300'>Sign-Up</button></p></Link>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Login;
