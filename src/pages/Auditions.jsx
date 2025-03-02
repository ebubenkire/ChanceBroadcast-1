import { useState } from 'react'
import './Auditions.css'

const Auditions = () => {
  const [selectedAudition, setSelectedAudition] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    experience: '',
    videoUrl: '',
    headshot: null,
    resume: null
  })

  const auditions = [
    {
      id: 1,
      title: "Feature Film: 'The Last Stand'",
      roles: [
        {
          name: "Lead Role - Michael",
          description: "Male, 25-35, strong dramatic actor",
          type: "Lead"
        },
        {
          name: "Supporting Role - Sarah",
          description: "Female, 20-30, versatile performer",
          type: "Supporting"
        }
      ],
      date: "2024-06-15",
      location: "Los Angeles",
      fee: 50,
      deadline: "2024-05-30"
    },
    {
      id: 2,
      title: "TV Series: 'Dark Waters'",
      roles: [
        {
          name: "Detective James",
          description: "Male, 35-45, experienced in crime drama",
          type: "Lead"
        },
        {
          name: "Officer Martinez",
          description: "Female/Male, 25-35, action sequences required",
          type: "Supporting"
        }
      ],
      date: "2024-07-01",
      location: "New York",
      fee: 75,
      deadline: "2024-06-15"
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }))
  }

  const handlePayment = async () => {
    // Implement payment gateway integration here
    try {
      // Simulate payment process
      console.log('Processing payment...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      handleSubmit()
    } catch (error) {
      console.error('Payment failed:', error)
    }
  }

  const handleSubmit = () => {
    // Submit application after successful payment
    console.log('Application submitted:', { ...formData, audition: selectedAudition.title })
    setSelectedAudition(null)
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      age: '',
      experience: '',
      videoUrl: '',
      headshot: null,
      resume: null
    })
  }

  return (
    <div className="auditions">
      <div className="auditions-hero">
        <h1>Auditions</h1>
        <p>Your next big role awaits</p>
      </div>

      <div className="container">
        <section className="current-auditions">
          <h2>Current Auditions</h2>
          <div className="auditions-grid">
            {auditions.map((audition) => (
              <div key={audition.id} className="audition-card">
                <h3>{audition.title}</h3>
                <div className="audition-details">
                  <p><strong>Date:</strong> {audition.date}</p>
                  <p><strong>Location:</strong> {audition.location}</p>
                  <p><strong>Application Fee:</strong> ${audition.fee}</p>
                  <p><strong>Deadline:</strong> {audition.deadline}</p>
                </div>
                <div className="roles-section">
                  <h4>Available Roles:</h4>
                  <ul>
                    {audition.roles.map((role, index) => (
                      <li key={index}>
                        <strong>{role.name}</strong>
                        <p>{role.description}</p>
                        <span className="role-type">{role.type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => setSelectedAudition(audition)}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {selectedAudition && (
          <div className="audition-modal">
            <div className="modal-content">
              <h2>Apply for {selectedAudition.title}</h2>
              <p className="fee-notice">Application Fee: ${selectedAudition.fee}</p>
              
              <form className="audition-form">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="experience">Acting Experience</label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                    rows="4"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="videoUrl">Self-Tape Video URL</label>
                  <input
                    type="url"
                    id="videoUrl"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                    placeholder="YouTube/Vimeo link"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="headshot">Headshot (JPG/PNG)</label>
                  <input
                    type="file"
                    id="headshot"
                    name="headshot"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="resume">Acting Resume (PDF)</label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf"
                    onChange={handleFileChange}
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-buttons">
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handlePayment}
                  >
                    Pay & Submit
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
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