import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../main'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { 
          email: email.trim(), 
          password: password,
          confirmPassword: confirmPassword,
          role: "Patient" 
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(res.data.message);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigateTo("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className='container form-component login-form'>
      <h2>Sign In</h2>
      <p>Please Login to continue</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi quasi saepe quam temporibus laborum doloribus.</p>

      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder='Email'
          required
        />

        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder='Password'
          required
        />

        <input 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder='Confirm Password'
          required
        />
        
        <div 
          style={{
            gap: "10px",  
            justifyContent: "flex-end", 
            flexDirection: "row",
          }}
        > 
          <p style={{ marginBottom: 0 }}>Not Registered?</p>
          <Link 
            to={"/register"} 
            style={{ textDecoration: "none", alignItems: "center" }}
          >
            Register Now
          </Link>
        </div>
        
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login