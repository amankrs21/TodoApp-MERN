import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./pages/login/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/home/Home";
import Vault from "./pages/vault/Vault";
import Notes from "./pages/notes/Notes";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" draggable={false} hideProgressBar={true} position="bottom-right" />
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path='/home' element={<Home />} />
          <Route path='/vault' element={<Vault />} />
          <Route path='/notes' element={<Notes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
