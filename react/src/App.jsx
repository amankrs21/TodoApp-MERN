import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/login/Login'
import Register from './pages/register/Register'
import AdminNavbar from './pages/navbar/AdminNavbar'
import Todos from './pages/todo/Todos';
import AdminRoute from './components/AdminRoute';
import LandingPage from './pages/navbar/Landing';

function App() {

  return (
    <BrowserRouter>
      <ToastContainer theme="colored" draggable={false} hideProgressBar={true} />
      <Routes>
        <Route path='/' element={<AdminRoute />}>
          <Route path="/todo" element={<Todos />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
