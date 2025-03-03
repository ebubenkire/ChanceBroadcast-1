import { useState } from 'react'
import './Voting.css'

const Voting = () => {
  const [selectedContestant, setSelectedContestant] = useState(null)
  const [voteCount, setVoteCount] = useState(1)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const contestants = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Lead Actress",
      project: "The Last Stand",
      image: "/contestant1.jpg",
      votes: 1250,
      description: "Playing the role of Detective Sarah Martinez in 'The Last Stand'",
      performance: "Powerful performance showcasing emotional depth and range."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Supporting Actor",
      project: "Dark Waters",
      image: "/contestant2.jpg",
      votes: 980,
      description: "Playing Officer James Chen in 'Dark Waters'",
      performance: "Compelling portrayal of a complex character with moral dilemmas."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Lead Actress",
      project: "Sunset Dreams",
      image: "/contestant3.jpg",
      votes: 1540,
      description: "Playing Maria in 'Sunset Dreams'",
      performance: "Breathtaking performance capturing the essence of hope and perseverance."
    }
  ]

  const handleVoteChange = (e) => {
    setVoteCount(parseInt(e.target.value))
  }

  const handleVoteClick = (contestant) => {
    setSelectedContestant(contestant)
    setIsPaymentModalOpen(true)
  }

  const handlePayment = async () => {
    // Implement payment gateway integration here
    try {
      // Simulate payment process
      console.log('Processing payment for votes...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(`Voted ${voteCount} times for ${selectedContestant.name}`)
      setIsPaymentModalOpen(false)
      setSelectedContestant(null)
      setVoteCount(1)
    } catch (error) {
      console.error('Payment failed:', error)
    }
  }

  return (
    <div className="voting">
      <div className="voting-hero">
        <h1>Vote for Your Favorite</h1>
        <p>Support talented artists and help them win</p>
      </div>

      <div className="container">
        <section className="voting-info">
          <h2>How Voting Works</h2>
          <div className="voting-rules">
            <div className="rule-card">
              <h3>1. Choose Your Favorite</h3>
              <p>Select the contestant you want to support</p>
            </div>
            <div className="rule-card">
              <h3>2. Select Vote Amount</h3>
              <p>Each vote costs $1. Vote multiple times to show more support</p>
            </div>
            <div className="rule-card">
              <h3>3. Complete Payment</h3>
              <p>Process your secure payment to submit your votes</p>
            </div>
          </div>
        </section>

        <section className="contestants-section">
          <h2>Current Contestants</h2>
          <div className="contestants-grid">
            {contestants.map((contestant) => (
              <div key={contestant.id} className="contestant-card">
                <div className="contestant-image">
                  <img src={contestant.image} alt={contestant.name} />
                </div>
                <div className="contestant-details">
                  <h3>{contestant.name}</h3>
                  <p className="contestant-role">{contestant.role}</p>
                  <p className="contestant-project">{contestant.project}</p>
                  <p className="contestant-description">{contestant.description}</p>
                  <p className="contestant-performance">{contestant.performance}</p>
                  <div className="vote-count">
                    <strong>Current Votes:</strong> {contestant.votes}
                  </div>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleVoteClick(contestant)}
                  >
                    Vote Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {isPaymentModalOpen && selectedContestant && (
          <div className="voting-modal">
            <div className="modal-content">
              <h2>Vote for {selectedContestant.name}</h2>
              <div className="vote-details">
                <div className="form-group">
                  <label htmlFor="voteCount">Number of Votes ($1 per vote)</label>
                  <input
                    type="number"
                    id="voteCount"
                    min="1"
                    value={voteCount}
                    onChange={handleVoteChange}
                    className="form-control"
                  />
                </div>
                <p className="total-amount">Total Amount: ${voteCount}</p>
              </div>
              <div className="form-buttons">
                <button 
                  className="btn btn-primary"
                  onClick={handlePayment}
                >
                  Pay & Vote
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsPaymentModalOpen(false)
                    setSelectedContestant(null)
                    setVoteCount(1)
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Voting 