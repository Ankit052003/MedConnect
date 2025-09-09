import React, { useContext } from 'react'
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Appointment from "./pages/Appointment.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Navbar from './components/Navbar.jsx'
import { AuthProtectedRoute } from './components/ProtectedRoute.jsx'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './main.jsx';

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  
  // Remove the automatic user fetching on app load
  // This was causing the logout button to appear immediately
  
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/appointment' element={<Appointment/>}></Route>
          <Route path='/about' element={<AboutUs/>}></Route>
          <Route path='/register' element={
            <AuthProtectedRoute>
              <Register/>
            </AuthProtectedRoute>
          }></Route>
          <Route path='/login' element={
            <AuthProtectedRoute>
              <Login/>
            </AuthProtectedRoute>
          }></Route>
        </Routes>
        <ToastContainer position='top-center'/>
      </Router>
    </>
  )
}
export default App