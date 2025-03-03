import { useState } from 'react'
import './Careers.css'

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    portfolio: '',
    resume: null,
    coverLetter: ''
  })

  const jobs = [
    {
      id: 1,
      title: "Makeup Artist",
      department: "Production",
      type: "Full-time",
      location: "Los Angeles",
      experience: "3+ years",
      description: "We're seeking a talented makeup artist to join our production team...",
      requirements: [
        "Professional certification in makeup artistry",
        "Experience in film or television production",
        "Knowledge of HD makeup techniques",
        "Strong portfolio of work"
      ]
    },
    {
      id: 2,
      title: "Associate Producer",
      department: "Production",
      type: "Full-time",
      location: "New York",
      experience: "5+ years",
      description: "Looking for an experienced associate producer to oversee production processes...",
      requirements: [
        "Bachelor's degree in Film Production or related field",
        "Previous experience in film/TV production",
        "Strong organizational and leadership skills",
        "Budget management experience"
      ]
    },
    {
      id: 3,
      title: "Cinematographer",
      department: "Photography",
      type: "Project-based",
      location: "Miami",
      experience: "7+ years",
      description: "Seeking an experienced cinematographer for upcoming feature film...",
      requirements: [
        "Proven experience as a cinematographer",
        "Strong technical knowledge of cameras and lighting",
        "Experience with latest film equipment",
        "Award-winning portfolio"
      ]
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
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implement application submission logic here
    console.log('Application submitted:', { ...formData, jobTitle: selectedJob.title })
    setSelectedJob(null)
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      experience: '',
      portfolio: '',
      resume: null,
      coverLetter: ''
    })
  }

  return (
    <div className="careers">
      <div className="careers-hero">
        <h1>Join Our Team</h1>
        <p>Be part of the next generation of filmmaking</p>
      </div>

      <div className="container">
        <div className="careers-grid">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h2>{job.title}</h2>
              <div className="job-info">
                <span>{job.department}</span>
                <span>{job.type}</span>
                <span>{job.location}</span>
              </div>
              <p className="job-description">{job.description}</p>
              <div className="requirements">
                <h3>Requirements:</h3>
                <ul>
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              <button 
                className="btn btn-primary"
                onClick={() => setSelectedJob(job)}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {selectedJob && (
          <div className="application-modal">
            <div className="modal-content">
              <h2>Apply for {selectedJob.title}</h2>
              <form onSubmit={handleSubmit} className="application-form">
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
                  <label htmlFor="experience">Years of Experience</label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="portfolio">Portfolio URL (if applicable)</label>
                  <input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="resume">Resume (PDF)</label>
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

                <div className="form-group">
                  <label htmlFor="coverLetter">Cover Letter</label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                    rows="5"
                  ></textarea>
                </div>

                <div className="form-buttons">
                  <button type="submit" className="btn btn-primary">
                    Submit Application
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setSelectedJob(null)}
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

export default Careers 