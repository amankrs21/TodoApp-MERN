import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import PrivateRoutes from "./components/PrivateRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path='/home' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
