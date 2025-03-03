import { useState, useEffect } from 'react'
import { eventService } from '../services/eventService'
import './Events.css'

const Events = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getAllEvents()
        setEvents(data)
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to load events')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handleRegister = async (eventId) => {
    try {
      await eventService.registerForEvent(eventId)
      // Refresh events list after registration
      const updatedEvents = await eventService.getAllEvents()
      setEvents(updatedEvents)
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to register for event')
    }
  }

  if (loading) return <div className="loading">Loading events...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="events-container">
      <h1>Upcoming Events</h1>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            {event.image && (
              <img src={event.image} alt={event.title} className="event-image" />
            )}
            <div className="event-content">
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <div className="event-details">
                <span>
                  <i className="fas fa-calendar"></i>
                  {new Date(event.date).toLocaleDateString()}
                </span>
                <span>
                  <i className="fas fa-map-marker-alt"></i>
                  {event.location}
                </span>
              </div>
              <button 
                onClick={() => handleRegister(event._id)}
                disabled={event.registeredUsers.length >= event.capacity}
                className="register-btn"
              >
                {event.registeredUsers.length >= event.capacity 
                  ? 'Event Full' 
                  : 'Register Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Events 