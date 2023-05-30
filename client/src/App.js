import './styles.css'
import React, { useState} from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './scenes/login'
import DemoFilePage from './scenes/demoFile'
import RegisterPage from './scenes/register'
import DashboardPage1 from './scenes/manufacturerDashboard'
import DashboardPage2 from './scenes/transporterDashboard'


    
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        
        <Route path="/homeTransporter" element={<DashboardPage2 />} />
        <Route path="/homeManufacturer" element={<DashboardPage1 />} />
          
          
        <Route path="/register" element={<RegisterPage />} />
          
        {/* <Redirect to="/" /> */}
      </Routes>
    </Router>
  )
}

export default App
