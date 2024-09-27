import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/login/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/home/Home";
import Vault from "./pages/vault/Vault";
import Notes from "./pages/notes/Notes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
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
