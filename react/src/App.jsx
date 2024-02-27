import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Todos from './pages/todo/Todos';
import HomeAdmin from './pages/navbar/HomeAdmin';

function App() {

  return (
    <BrowserRouter>
      <ToastContainer theme="colored" draggable={false} hideProgressBar={true} />
      <Routes>
        <Route path='/' element={<HomeAdmin {...<Todos />} />}>
          <Route path="/todo" element={<Todos />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
