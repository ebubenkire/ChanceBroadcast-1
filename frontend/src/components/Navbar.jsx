import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './Navbar.css'

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">ChanceTV</Link>
      </div>
      <div className="navbar-links">
        <Link to="/events">Events</Link>
        <Link to="/academy">Academy</Link>
        <Link to="/auditions">Auditions</Link>
        <Link to="/voting">Voting</Link>
        {isAuthenticated ? (
          <>
            <Link to="/streaming">Live</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar 