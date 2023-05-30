import React, { useState, useEffect } from 'react'
import '../styles.css'
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {


  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    // Perform login logic here, such as sending the data to the server

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const responseData = await response.json();
      
    if (response.ok) {
      const { token, user } = responseData
      localStorage.clear()
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      // onStateChange(localStorage.getItem('user'))
      // await getUser()
      if(user.role === "Manufacturer" && token) {
        navigate('/homeManufacturer')
      }
      else if(token) {
        navigate('/homeTransporter')
      }
      
    } else {
      alert('Error during login')
    }
  } catch (error) {
    alert('Error during loginn')
  }
    // Clear the input fields after login
    setEmail('')
    setPassword('')
  }


  const getUser = async () => {
    try {
      // Retrieve the token from local storage or wherever it is stored
      const token = localStorage.getItem('token')
      const email = localStorage.getItem('email')
      // Make the API request to fetch user data
      const response = await fetch(`http://localhost:3001/users/role/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
  
      // Check if the API request was successful
      if (response.ok) {
        // Parse the response data
        const userData = await response.json()
        console.log('User data:', userData)
        // Handle the user data as needed
      } else {
        // Handle the error if the API request failed
        console.error('Failed to fetch user:', response.status);
      }
    } catch (error) {
      // Handle any other errors that occurred during the request
      console.error('Error fetching user:', error);
    }
  }

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage
