import { Outlet, Navigate } from 'react-router-dom';

import AuthUser from './AuthUser';
import Header from '../pages/header/Header';

export default function PrivateRoutes() {
    const { isValidToken } = AuthUser();

    const token = localStorage.getItem("token");

    // If the token is not valid, redirect to the login page
    if (!token || !isValidToken(token)) {
        return <Navigate to="404" />;
    }

    // If the token is valid, render the child routes
    return (
        <>
            <Header />
            <div style={{ marginTop: '9vh', height: '91vh', overflowY: 'auto' }}><Outlet /></div>
        </>
    );
};
