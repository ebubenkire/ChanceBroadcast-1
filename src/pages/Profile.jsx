import { useState } from 'react'
import './Profile.css'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('portfolio')

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-cover">
          <div className="profile-avatar">
            <img src="/avatars/default.jpg" alt="Profile" />
            <button className="edit-avatar">
              <i className="fas fa-camera"></i>
            </button>
          </div>
        </div>
        <div className="profile-info">
          <h1>John Doe</h1>
          <p className="role">Actor & Director</p>
          <div className="profile-stats">
            <div className="stat">
              <span className="count">12</span>
              <span className="label">Projects</span>
            </div>
            <div className="stat">
              <span className="count">1.2K</span>
              <span className="label">Followers</span>
            </div>
            <div className="stat">
              <span className="count">450</span>
              <span className="label">Following</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-nav">
        <button 
          className={activeTab === 'portfolio' ? 'active' : ''}
          onClick={() => setActiveTab('portfolio')}
        >
          Portfolio
        </button>
        <button 
          className={activeTab === 'achievements' ? 'active' : ''}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
        <button 
          className={activeTab === 'reviews' ? 'active' : ''}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'portfolio' && (
          <div className="portfolio-grid">
            {portfolioItems.map((item, index) => (
              <div key={index} className="portfolio-item">
                <img src={item.image} alt={item.title} />
                <div className="portfolio-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-card">
                <div className="achievement-icon">
                  <i className={achievement.icon}></i>
                </div>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <img src={review.authorImage} alt={review.author} />
                  <div>
                    <h3>{review.author}</h3>
                    <p className="review-date">{review.date}</p>
                  </div>
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`fas fa-star ${i < review.rating ? 'active' : ''}`}
                      ></i>
                    ))}
                  </div>
                </div>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const portfolioItems = [
  {
    title: "The Last Scene",
    role: "Lead Actor",
    image: "/portfolio/project1.jpg"
  },
  {
    title: "City Lights",
    role: "Director",
    image: "/portfolio/project2.jpg"
  },
  // Add more portfolio items
]

const achievements = [
  {
    icon: "fas fa-trophy",
    title: "Best New Actor",
    description: "MoviePro Awards 2023"
  },
  {
    icon: "fas fa-award",
    title: "Outstanding Direction",
    description: "Film Festival 2023"
  },
  // Add more achievements
]

const reviews = [
  {
    author: "Sarah Johnson",
    authorImage: "/reviews/sarah.jpg",
    date: "Oct 15, 2023",
    rating: 5,
    text: "Exceptional talent and professionalism. A pleasure to work with!"
  },
  // Add more reviews
]

export default Profile 