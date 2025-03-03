import { useState, useEffect } from 'react'
import { auditionService } from '../services/auditionService'
import './Auditions.css'

const Auditions = () => {
  const [auditions, setAuditions] = useState([])
  const [selectedAudition, setSelectedAudition] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    portfolio: '',
    message: ''
  })

  useEffect(() => {
    const fetchAuditions = async () => {
      try {
        const data = await auditionService.getAuditions()
        setAuditions(data)
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to load auditions')
      } finally {
        setLoading(false)
      }
    }

    fetchAuditions()
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await auditionService.submitApplication(selectedAudition._id, formData)
      setSelectedAudition(null)
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: '',
        portfolio: '',
        message: ''
      })
      // Optionally show success message
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to submit application')
    }
  }

  if (loading) return <div className="loading">Loading auditions...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="auditions">
      <div className="auditions-hero">
        <h1>Auditions</h1>
        <p>Your next big break starts here</p>
      </div>

      <div className="auditions-container">
        <div className="auditions-grid">
          {auditions.map((audition) => (
            <div key={audition._id} className="audition-card">
              <div className="audition-header">
                <span className={`status ${audition.status}`}>{audition.status}</span>
                <h2>{audition.title}</h2>
              </div>
              
              <div className="audition-content">
                <p>{audition.description}</p>
                
                <div className="audition-details">
                  <div className="detail">
                    <i className="fas fa-calendar"></i>
                    <span>Date: {new Date(audition.date).toLocaleDateString()}</span>
                  </div>
                  <div className="detail">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Location: {audition.location}</span>
                  </div>
                  <div className="detail">
                    <i className="fas fa-user-friends"></i>
                    <span>Roles: {audition.roles.join(', ')}</span>
                  </div>
                </div>

                <div className="requirements">
                  <h3>Requirements:</h3>
                  <ul>
                    {audition.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => setSelectedAudition(audition)}
                  disabled={audition.status === 'closed'}
                  className="apply-btn"
                >
                  {audition.status === 'closed' ? 'Closed' : 'Apply Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedAudition && (
          <div className="application-modal">
            <div className="modal-content">
              <h2>Apply for {selectedAudition.title}</h2>
              <form onSubmit={handleSubmit} className="application-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="experience">Previous Experience</label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="portfolio">Portfolio Link (Optional)</label>
                  <input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Why should we choose you?</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">Submit Application</button>
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setSelectedAudition(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Auditions 