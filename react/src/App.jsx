import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Router } from "react-router-dom"
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './pages/navbar/Header.jsx';
import Footer from './pages/navbar/Footer.jsx';
import getLPTheme from "./components/getLPTheme.jsx";
import ToggleColorMode from "./components/ToggleColorMode.jsx";

import Home from './pages/home/Home'
import PageNotFound from './components/PageNotFound.jsx';
import PrivateRoutes from './components/PrivateRoutes.jsx';
import Todos from './pages/todo/Todos';


export default function App() {
  const [mode, setMode] = React.useState('dark');
  const LPtheme = React.useMemo(() => createTheme(getLPTheme(mode)), [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <BrowserRouter>
        <ToastContainer theme="colored" draggable={false} hideProgressBar={true} position="bottom-right" />
        <Header mode={mode} />
        <div style={{ marginTop: 100 }}>
          <Routes>
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path='/' element={<Navigate to='/welcome' />} />
            <Route path="/welcome" element={<Home />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="/" element={<PrivateRoutes />}>
              <Route path='/todo' element={<Todos />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: "999" }}>
        <ToggleColorMode style={{ backgroundColor: "transparent", border: "none", color: "white" }} mode={mode} toggleColorMode={toggleColorMode} />
      </div>
    </ThemeProvider>
  )
}
