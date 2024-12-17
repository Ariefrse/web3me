import React, { useState } from 'react'

const SAMPLE_CAUSES = [
  {
    id: 1,
    title: "Community Clean-Up Drive",
    description: "Help clean local parks and streets",
    goal: 5000,
    raised: 2500,
    category: "Environment"
  },
  {
    id: 2,
    title: "Local School Supplies Fund",
    description: "Provide school materials for underprivileged children",
    goal: 10000,
    raised: 6500,
    category: "Education"
  }
]

function Causes({ onSelectCause }) {
  const [causes, setCauses] = useState(SAMPLE_CAUSES)

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Active Causes</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {causes.map(cause => (
          <div key={cause.id} className="card">
            <h3 className="text-xl font-semibold mb-2">{cause.title}</h3>
            <p className="text-gray-600 mb-4">{cause.description}</p>
            <div className="bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className="bg-brand-primary h-full rounded-full" 
                style={{width: `${(cause.raised / cause.goal) * 100}%`}}
              />
            </div>
            <div className="flex justify-between">
              <span>Raised: ${cause.raised}</span>
              <span>Goal: ${cause.goal}</span>
            </div>
            <button 
              onClick={() => onSelectCause(cause)}
              className="btn-primary mt-4 w-full"
            >
              Donate Now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Causes
