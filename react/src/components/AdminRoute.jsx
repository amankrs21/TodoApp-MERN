import React from 'react'
import AuthUser from './AuthUser'
import { Outlet, Navigate } from 'react-router-dom';

export default function AdminRoute() {
  const { isValidToken, isAdmin } = AuthUser();
  const token = localStorage.getItem('token');

  if (!isValidToken(token) && !isAdmin(token)) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}
