import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const User_Form = () => {
  const navigate=useNavigate();
  const [name, setName] = useState('');
  const [socialMediaHandle, setSocialMediaHandle] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  const logout=()=>{
    localStorage.removeItem('token');
    navigate('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader

    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialMediaHandle', socialMediaHandle);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      await axios.post('http://localhost:5000/api/users/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Submission successful!');
      setName('');
      setSocialMediaHandle('');
      setImages([]);
    } catch (error) {
      toast.error('Error submitting form. Please try again.',error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <header className="bg-white shadow p-4 mb-8 sm:flex sm:flex-row sm:justify-around flex flex-col gap-4">
        <div>
        <h1 className="text-2xl font-semibold text-gray-700">
          User Dashboard
        </h1>
        <p className="text-gray-500">Add and manage your data</p>
        </div>
        <div>
       
          <button onClick={()=>{
            logout()
          }} className='bg-red-500 text-white rounded-md p-2 w-auto h-auto'>Log Out</button>
        </div>
      </header>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          User Submission Form
        </h1>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="socialMediaHandle" className="block text-sm font-medium text-gray-700">
            Social Media Handle
          </label>
          <input
            id="socialMediaHandle"
            type="text"
            value={socialMediaHandle}
            onChange={(e) => setSocialMediaHandle(e.target.value)}
            placeholder="Enter your social media handle"
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Upload Images
          </label>
          <input
            id="images"
            type="file"
            onChange={(e) => setImages(e.target.files)}
            multiple
            accept="image/*"
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center">
              <ClipLoader color={'#4A90E2'} loading={loading} size={35} />
            </div>
          ) : (
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          )}
        </div>
      </form>
     
    </div>
    <ToastContainer/>
    </>
  );
};

export default User_Form;
