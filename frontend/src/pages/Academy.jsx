import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Academy.css'

const Academy = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const courses = [
    {
      id: 1,
      title: "Acting Fundamentals",
      category: "acting",
      instructor: "Sarah Johnson",
      duration: "8 weeks",
      level: "Beginner",
      price: "$299",
      image: "/courses/acting-101.jpg",
      description: "Master the basics of acting technique and character development"
    },
    {
      id: 2,
      title: "Advanced Cinematography",
      category: "technical",
      instructor: "Michael Chen",
      duration: "12 weeks",
      level: "Advanced",
      price: "$499",
      image: "/courses/cinematography.jpg",
      description: "Learn professional camera techniques and lighting"
    },
    // Add more courses...
  ]

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory)

  return (
    <div className="academy-page">
      <section className="academy-hero">
        <div className="hero-content">
          <h1>ChanceTV Academy</h1>
          <p>Learn from industry professionals and master your craft</p>
        </div>
      </section>

      <section className="courses-section">
        <div className="course-filters">
          <button 
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Courses
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'acting' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('acting')}
          >
            Acting
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'technical' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('technical')}
          >
            Technical
          </button>
        </div>

        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                <img src={course.image} alt={course.title} />
                <div className="course-level">{course.level}</div>
              </div>
              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-details">
                  <span><i className="fas fa-user"></i> {course.instructor}</span>
                  <span><i className="fas fa-clock"></i> {course.duration}</span>
                </div>
                <div className="course-footer">
                  <span className="course-price">{course.price}</span>
                  <Link to={`/academy/course/${course.id}`} className="btn-enroll">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Academy 