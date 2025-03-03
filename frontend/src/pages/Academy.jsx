import { useState, useEffect } from 'react'
import { academyService } from '../services/academyService'
import './Academy.css'

const Academy = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await academyService.getCourses()
        setCourses(data)
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to load courses')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const handleEnroll = async (courseId) => {
    try {
      await academyService.enrollCourse(courseId)
      // Refresh courses after enrollment
      const updatedCourses = await academyService.getCourses()
      setCourses(updatedCourses)
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to enroll in course')
    }
  }

  if (loading) return <div className="loading">Loading courses...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="academy">
      <div className="academy-hero">
        <h1>ChanceTV Academy</h1>
        <p>Master your craft with industry professionals</p>
      </div>

      <div className="courses-container">
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course._id} className="course-card">
              <div className="course-header">
                <span className={`level ${course.level}`}>{course.level}</span>
                <h2>{course.courseName}</h2>
              </div>
              
              <div className="course-content">
                <p>{course.description}</p>
                
                <div className="course-details">
                  <div className="detail">
                    <i className="fas fa-clock"></i>
                    <span>{course.duration} weeks</span>
                  </div>
                  <div className="detail">
                    <i className="fas fa-users"></i>
                    <span>{course.enrolledStudents.length}/{course.maxStudents} enrolled</span>
                  </div>
                  <div className="detail">
                    <i className="fas fa-dollar-sign"></i>
                    <span>${course.price}</span>
                  </div>
                </div>

                <div className="instructor-info">
                  <img src={course.instructor.avatar || '/default-avatar.png'} alt={course.instructor.name} />
                  <span>Instructor: {course.instructor.name}</span>
                </div>

                <button 
                  onClick={() => handleEnroll(course._id)}
                  disabled={course.enrolledStudents.length >= course.maxStudents}
                  className="enroll-btn"
                >
                  {course.enrolledStudents.length >= course.maxStudents 
                    ? 'Course Full' 
                    : 'Enroll Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Academy 