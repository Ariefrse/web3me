import { ethers } from 'ethers'

// Deployment ABI and Address (replace with actual deployment)
const DONATION_CONTRACT_ABI = [
  // Paste full ABI from compilation output
]

const DONATION_CONTRACT_ADDRESS = '0x...' // Replace with actual deployed address

class Web3Service {
  constructor() {
    this.provider = null
    this.signer = null
    this.contract = null
  }

  async connectWallet() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        
        this.provider = new ethers.providers.Web3Provider(window.ethereum)
        this.signer = this.provider.getSigner()

        this.contract = new ethers.Contract(
          DONATION_CONTRACT_ADDRESS, 
          DONATION_CONTRACT_ABI, 
          this.signer
        )

        return await this.signer.getAddress()
      } catch (error) {
        console.error("Wallet connection failed:", error)
        throw error
      }
    } else {
      throw new Error('MetaMask not detected')
    }
  }

  async createCause(causeAddress, name, description, targetAmount) {
    try {
      const tx = await this.contract.createCause(
        causeAddress, 
        name, 
        description, 
        ethers.utils.parseEther(targetAmount.toString())
      )
      return await tx.wait()
    } catch (error) {
      console.error("Cause creation failed:", error)
      throw error
    }
  }

  async donate(causeId, amount) {
    try {
      const tx = await this.contract.donate(causeId, {
        value: ethers.utils.parseEther(amount.toString())
      })
      return await tx.wait()
    } catch (error) {
      console.error("Donation failed:", error)
      throw error
    }
  }

  async getCauseDetails(causeId) {
    try {
      return await this.contract.getCauseDetails(causeId)
    } catch (error) {
      console.error("Fetching cause details failed:", error)
      throw error
    }
  }
}

export default new Web3Service()
