import React from 'react'
import { Link } from 'react-router-dom'
import WalletConnect from './WalletConnect'

function Navbar() {
  return (
    <nav className="bg-blockchain-blue text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">CommuniCrypt</Link>
        <div className="space-x-4 flex items-center">
          <Link to="/causes" className="hover:text-gray-200">Causes</Link>
          <Link to="/profile" className="hover:text-gray-200">Profile</Link>
          <WalletConnect />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
