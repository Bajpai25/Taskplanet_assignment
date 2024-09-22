import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        // If no token found, redirect to login
        return <Navigate to="/" />;
    }

    try {
        const decoded = jwtDecode(token);
        // Check if the user has an allowed role for this route
        if (allowedRoles && !allowedRoles.includes(decoded.role)) {
            return <Navigate to="/unauthorized" />; // Redirect to unauthorized page
        }
    } catch (error) {
        console.error('Error decoding token:', error);
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
