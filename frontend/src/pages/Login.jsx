import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import './Login.css'

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await authService.login(formData)
      setIsAuthenticated(true)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred')
    }
  }

  return (
    <div className="login">
      <div className="login-container">
        <h1>Welcome Back</h1>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Register</Link></p>
          <Link to="#" className="forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  )
}

export default Login 