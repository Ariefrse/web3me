import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Web3Service from '../utils/web3'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function DonationModal({ cause, onClose }) {
  const [donationAmount, setDonationAmount] = useState('')

  const handleDonate = async () => {
    try {
      // Placeholder cause address - replace with actual cause address
      const causeAddress = '0x1234567890123456789012345678901234567890'
      
      const receipt = await Web3Service.donate(causeAddress, donationAmount)
      
      toast.success(`Donation of ${donationAmount} ETH successful!`, {
        position: "top-right",
        autoClose: 5000
      })
      
      onClose()
    } catch (error) {
      toast.error(`Donation failed: ${error.message}`, {
        position: "top-right",
        autoClose: 5000
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4">{cause.title}</h2>
        <input 
          type="number" 
          placeholder="Enter donation amount (ETH)" 
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
          step="0.01"
          min="0"
        />
        <div className="flex space-x-4">
          <button 
            onClick={handleDonate} 
            className="btn-primary flex-1"
          >
            Confirm Donation
          </button>
          <button 
            onClick={onClose} 
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex-1"
          >
            Cancel
          </button>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  )
}

export default DonationModal
