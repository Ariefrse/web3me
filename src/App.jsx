import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Causes from './pages/Causes'
import Profile from './pages/Profile'
import DonationModal from './components/DonationModal'

function App() {
  const [selectedCause, setSelectedCause] = useState(null)

  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/causes" 
          element={<Causes onSelectCause={setSelectedCause} />} 
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {selectedCause && (
        <DonationModal 
          cause={selectedCause} 
          onClose={() => setSelectedCause(null)} 
        />
      )}
      <ToastContainer />
    </div>
  )
}

export default App
