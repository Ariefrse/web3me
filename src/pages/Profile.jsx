import React, { useState } from 'react'

function Profile() {
  const [userStats, setUserStats] = useState({
    totalDonations: 1250,
    causesSupported: 5,
    rewardPoints: 350
  })

  const donationHistory = [
    {
      id: 1,
      cause: "Community Clean-Up Drive",
      amount: 500,
      date: "2023-08-15"
    },
    {
      id: 2,
      cause: "Local School Supplies Fund",
      amount: 750,
      date: "2023-07-22"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* User Stats Card */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Your Impact</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Donations</span>
              <span className="font-bold">${userStats.totalDonations}</span>
            </div>
            <div className="flex justify-between">
              <span>Causes Supported</span>
              <span className="font-bold">{userStats.causesSupported}</span>
            </div>
            <div className="flex justify-between">
              <span>Reward Points</span>
              <span className="font-bold">{userStats.rewardPoints}</span>
            </div>
          </div>
        </div>

        {/* Donation History Card */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Donation History</h2>
          {donationHistory.map(donation => (
            <div 
              key={donation.id} 
              className="border-b last:border-b-0 py-3"
            >
              <div className="flex justify-between">
                <span className="font-semibold">{donation.cause}</span>
                <span className="text-brand-primary">${donation.amount}</span>
              </div>
              <span className="text-gray-500 text-sm">{donation.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
