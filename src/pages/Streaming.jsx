import React from 'react';
import './Streaming.css';

const Streaming = () => {
  return (
    <div className="streaming-page">
      <section className="streaming-hero">
        <div className="hero-content">
          <h1>Live Streaming Experience</h1>
          <p>Watch exclusive content from your favorite creators and join the community</p>
        </div>
      </section>

      <section className="featured-streams">
        <h2 className="section-title">Featured Streams</h2>
        <div className="streams-grid">
          {/* Example stream cards */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="stream-card">
              <div className="stream-thumbnail">
                <img src={`/stream-${i}.jpg`} alt="Stream thumbnail" />
                <div className="live-badge">LIVE</div>
              </div>
              <div className="stream-info">
                <h3 className="stream-title">Amazing Performance Stream</h3>
                <div className="streamer-info">
                  <div className="streamer-avatar">
                    <img src="/avatar.jpg" alt="Streamer" />
                  </div>
                  <span className="streamer-name">John Performer</span>
                </div>
                <div className="stream-stats">
                  <div className="stat">
                    <i className="fas fa-eye"></i>
                    <span>1.2K</span>
                  </div>
                  <div className="stat">
                    <i className="fas fa-heart"></i>
                    <span>423</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="categories">
        <h2 className="section-title">Popular Categories</h2>
        <div className="categories-grid">
          {['Music', 'Dance', 'Theater', 'Comedy'].map((category) => (
            <div key={category} className="category-card">
              <img src={`/category-${category.toLowerCase()}.jpg`} alt={category} />
              <div className="category-overlay">
                <h3 className="category-name">{category}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Streaming; 