import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

const Register = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: ''
  })
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      // Basic validation
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long')
        return
      }

      // Implement actual registration logic here
      // This is just a mock registration
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsAuthenticated(true)
      navigate('/')
    } catch (error) {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <div className="register">
      <div className="register-container">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit} className="register-form">
          {error && <div className="error-message">{error}</div>}
          
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
            <label htmlFor="phone">Phone Number</label>
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
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register 