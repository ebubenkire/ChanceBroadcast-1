import { useState, useEffect } from 'react'
import api from '../services/api'
import './Events.css'

const Events = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get('/events')
        setEvents(data)
      } catch (err) {
        console.error('Error fetching events:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Upcoming Events</h1>
        <p>Join our exciting events and showcase your talent</p>
      </div>
      
      <div className="events-grid">
        {events.map(event => (
          <div key={event._id} className="event-card">
            <div className="event-image">
              <img src={event.image} alt={event.title} />
              <div className="event-date">
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="event-content">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div className="event-details">
                <span><i className="fas fa-map-marker-alt"></i> {event.location}</span>
                <span><i className="fas fa-clock"></i> {event.time}</span>
              </div>
              <button className="btn-register">Register Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Events 