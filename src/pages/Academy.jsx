import { useState } from 'react'
import './Academy.css'

const Academy = () => {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    motivation: ''
  })

  const courses = [
    {
      id: 1,
      title: "Film Direction",
      duration: "6 months",
      price: 2500,
      startDate: "2024-09-01",
      image: "/direction-course.jpg",
      description: "Master the art of film direction with industry professionals.",
      highlights: [
        "Practical directing experience",
        "Script analysis and visualization",
        "Working with actors",
        "Production planning"
      ]
    },
    {
      id: 2,
      title: "Cinematography",
      duration: "4 months",
      price: 2000,
      startDate: "2024-08-15",
      image: "/cinematography-course.jpg",
      description: "Learn advanced cinematography techniques and equipment handling.",
      highlights: [
        "Camera operations",
        "Lighting techniques",
        "Composition theory",
        "Digital cinematography"
      ]
    },
    {
      id: 3,
      title: "Screenwriting",
      duration: "3 months",
      price: 1500,
      startDate: "2024-07-01",
      image: "/screenwriting-course.jpg",
      description: "Develop your storytelling skills and learn screenplay formatting.",
      highlights: [
        "Story structure",
        "Character development",
        "Dialogue writing",
        "Script formatting"
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

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implement application submission logic here
    console.log('Application submitted:', { ...formData, course: selectedCourse.title })
    setSelectedCourse(null)
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      education: '',
      experience: '',
      motivation: ''
    })
  }

  return (
    <div className="academy">
      <div className="academy-hero">
        <h1>Film Academy</h1>
        <p>Transform your passion into profession</p>
      </div>

      <div className="container">
        <section className="academy-intro">
          <h2>Why Choose Our Academy?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Industry Experts</h3>
              <p>Learn from experienced professionals</p>
            </div>
            <div className="feature-card">
              <h3>Practical Training</h3>
              <p>Hands-on experience with professional equipment</p>
            </div>
            <div className="feature-card">
              <h3>Career Support</h3>
              <p>Job placement assistance and networking opportunities</p>
            </div>
          </div>
        </section>

        <section className="courses-section">
          <h2>Our Courses</h2>
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-image">
                  <img src={course.image} alt={course.title} />
                </div>
                <div className="course-details">
                  <h3>{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  <div className="course-info">
                    <p><strong>Duration:</strong> {course.duration}</p>
                    <p><strong>Start Date:</strong> {course.startDate}</p>
                    <p className="course-price"><strong>Price:</strong> ${course.price}</p>
                  </div>
                  <div className="course-highlights">
                    <h4>Course Highlights:</h4>
                    <ul>
                      {course.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setSelectedCourse(course)}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {selectedCourse && (
          <div className="application-modal">
            <div className="modal-content">
              <h2>Apply for {selectedCourse.title}</h2>
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
                  <label htmlFor="education">Educational Background</label>
                  <textarea
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                    rows="3"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="experience">Relevant Experience (if any)</label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="form-control"
                    rows="3"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="motivation">Why do you want to join this course?</label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
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
                    onClick={() => setSelectedCourse(null)}
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

export default Academy 