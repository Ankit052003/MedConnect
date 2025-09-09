import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../main'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function Register() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);
  
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    try {
      console.log("Registration data:", {
        firstName, lastName, email, phone, nic, dob, gender, password: "***"
      });
      
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/patient/register",
        { 
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          password
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("Registration response:", res.data);
      toast.success(res.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
      
      // Clear form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setPassword("");
    } catch (error) {
      console.error("Registration error:", error);
      console.error("Registration error:", error);
      console.error("Error response:", error.response?.data);
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className='container form-component register-form'>
      <h2>Sign Up</h2>
      <p>Please Register to continue</p>
      <p>Create your account to access our medical services</p>

      <form onSubmit={handleRegister}>
        <div>
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            placeholder='First Name'
            required
          />
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            placeholder='Last Name'
            required
          />
        </div>
        
        <div>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Email'
            required
          />
          <input 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder='Phone Number'
            required
          />
        </div>

        <div>
          <input 
            type="text" 
            value={nic} 
            onChange={(e) => setNic(e.target.value)} 
            placeholder='NIC'
            required
          />
          <input 
            type="date" 
            value={dob} 
            onChange={(e) => setDob(e.target.value)} 
            placeholder='Date of Birth'
            required
          />
        </div>

        <div>
          <select 
            value={gender} 
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Password'
            required
          />
        </div>
        
        <div 
          style={{
            gap: "10px",  
            justifyContent: "flex-end", 
            flexDirection: "row",
          }}
        > 
          <p style={{ marginBottom: 0 }}>Already Registered?</p>
          <Link 
            to={"/login"} 
            style={{ textDecoration: "none", alignItems: "center" }}
          >
            Login Now
          </Link>
        </div>
        
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
