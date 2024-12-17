import React, { useState, useEffect } from 'react'
import Web3Service from '../utils/web3'

function WalletConnect() {
  const [walletAddress, setWalletAddress] = useState(null)
  const [balance, setBalance] = useState(null)

  const connectWallet = async () => {
    try {
      const address = await Web3Service.connectWallet()
      setWalletAddress(address)
      
      // Fetch and display wallet balance
      const walletBalance = await Web3Service.getBalance()
      setBalance(parseFloat(walletBalance).toFixed(4))
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      {walletAddress ? (
        <div className="flex items-center space-x-2">
          <span className="text-sm">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
          {balance && (
            <span className="text-xs text-gray-500">
              {balance} ETH
            </span>
          )}
        </div>
      ) : (
        <button 
          onClick={connectWallet} 
          className="btn-primary"
        >
          Connect Wallet
        </button>
      )}
    </div>
  )
}

export default WalletConnect
