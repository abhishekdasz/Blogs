"use client"
import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; 
import '../login/login.scss'

const login = () => {
  const router = useRouter();
  const[user, setUser] = useState({
    email:"",
    password:""
})

  const handleInputs = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user, [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      const response = await axios.post('/api/login', user)  
      // Set the status based on the response from the API route
      if (response.status === 200) 
      {
        console.log(response.data.message)
        setUser({
          email: "",
          password: ""
        })
        router.push('/profile')
      } 
      else 
      {
        console.log('error while sigin')
      }
    }
    catch (error) 
    {
      if (error.response) 
      {
        console.log(error.response.data.error);
      } 
      else 
      {
        console.log("An unexpected error occurred:", error);
      }
    }
  };
  return (
    <div className="login-sec">
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleInputs}
          placeholder="Enter your email..."
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleInputs}
          placeholder="Enter your password..."
        />

        <button type="submit">Sign In</button>
      </form>

      <p>
        Haven't registered yet?{' '}
        <Link href="/register">
          Register
        </Link>
      </p>
    </div>
    </div>
  )
}

export default login