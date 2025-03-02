import { useState } from 'react'
import './Events.css'

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null)

  const events = [
    {
      id: 1,
      title: "Movie Premiere: The Last Stand",
      date: "2024-05-15",
      time: "19:00",
      venue: "Grand Cinema Hall",
      price: 150,
      image: "/event1.jpg",
      description: "Join us for the star-studded premiere of our latest blockbuster."
    },
    {
      id: 2,
      title: "Film Workshop Series",
      date: "2024-05-20",
      time: "10:00",
      venue: "MoviePro Studios",
      price: 75,
      image: "/event2.jpg",
      description: "A hands-on workshop series featuring industry professionals."
    },
    {
      id: 3,
      title: "Screening: Director's Cut",
      date: "2024-05-25",
      time: "20:00",
      venue: "Artistic Theater",
      price: 100,
      image: "/event3.jpg",
      description: "Special screening of award-winning films with director commentary."
    }
  ]

  const handleTicketPurchase = (event) => {
    setSelectedEvent(event)
    // Implement payment gateway integration here
  }

  return (
    <div className="events">
      <div className="events-hero">
        <h1>Upcoming Events</h1>
        <p>Don't miss out on our exclusive events and premieres</p>
      </div>

      <div className="container">
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <img src={event.image} alt={event.title} />
              </div>
              <div className="event-details">
                <h2>{event.title}</h2>
                <p className="event-description">{event.description}</p>
                <div className="event-info">
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Time:</strong> {event.time}</p>
                  <p><strong>Venue:</strong> {event.venue}</p>
                  <p className="event-price"><strong>Price:</strong> ${event.price}</p>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleTicketPurchase(event)}
                >
                  Buy Tickets
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedEvent && (
          <div className="ticket-modal">
            <div className="modal-content">
              <h2>Purchase Tickets</h2>
              <h3>{selectedEvent.title}</h3>
              {/* Add ticket quantity selector and payment form here */}
              <button 
                className="btn btn-secondary"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Events 