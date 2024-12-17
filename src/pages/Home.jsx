import React from 'react'
import { motion } from 'framer-motion'

function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">
          Empower Communities Through Blockchain
        </h1>
        <p className="text-xl mb-8">
          Transparent, traceable donations that make a real difference
        </p>
        <div className="flex justify-center space-x-4">
          <button className="btn-primary">Explore Causes</button>
          <button className="bg-brand-secondary text-white px-4 py-2 rounded-lg">
            How It Works
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Home
