import React, { useState } from 'react'
import "../styles.css"
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [address, setAddress] = useState('')

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleRoleChange = (e) => {
    setRole(e.target.value)
  }

  const handleAddressChange = (e) => {
    setAddress(e.target.value)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    // Perform registration logic here, such as sending the data to the server

    const user = {
      username,
      email,
      password,
      role,
      address,
    };
  
      // Make a POST request to the API endpoint
      try {
        const response = await fetch('http://localhost:3001/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        setUsername('')
        setEmail('')
        setPassword('')
        setRole('')
        setAddress('')
        const responseData = await response.json();
    
        if (response.ok) {
          navigate('/');
        } else {
          alert(responseData.msg)
          
        }
      } catch (error) {
        alert("Please check the credentials again")
      }
    
  }

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
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
        <div>
          <label htmlFor="role">Role:</label>
          <select id="role" value={role} onChange={handleRoleChange}>
            <option value="">Select role</option>
            <option value="Manufacturer">Manufacturer</option>
            <option value="Transporter">Transporter</option>
          </select>
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <textarea id="address" value={address} onChange={handleAddressChange} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage
