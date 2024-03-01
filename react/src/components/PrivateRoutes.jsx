import React from 'react'
import AuthUser from './AuthUser';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoutes() {
    const { isValidToken } = AuthUser();

    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // If the token is not valid, redirect to the login page
    if (!token || !isValidToken(token)) {
        return <Navigate to="404" />;
    }
    // If the token is valid, render the child routes
    return <Outlet />;
};
