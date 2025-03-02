import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Where Talent Meets Opportunity</h1>
          <p>Join the next generation of filmmakers and artists</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/about" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose MoviePro</h2>
          <div className="features-grid">
            <div className="feature-card">
              <i className="fas fa-film"></i>
              <h3>Professional Training</h3>
              <p>Learn from industry experts and master the art of filmmaking</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-users"></i>
              <h3>Network Building</h3>
              <p>Connect with fellow artists and industry professionals</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-star"></i>
              <h3>Career Growth</h3>
              <p>Take your career to the next level with our opportunities</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-video"></i>
              <h3>Latest Technology</h3>
              <p>Access state-of-the-art equipment and facilities</p>
            </div>
          </div>
        </div>
      </section>

      <section className="programs">
        <div className="container">
          <h2 className="section-title">Our Programs</h2>
          <div className="programs-grid">
            <div className="program-card">
              <div className="program-image academy"></div>
              <div className="program-content">
                <h3>Academy</h3>
                <p>Comprehensive film education programs for all skill levels</p>
                <Link to="/academy" className="btn btn-outline">Learn More</Link>
              </div>
            </div>
            <div className="program-card">
              <div className="program-image auditions"></div>
              <div className="program-content">
                <h3>Auditions</h3>
                <p>Opportunities to showcase your talent and land your dream role</p>
                <Link to="/auditions" className="btn btn-outline">Learn More</Link>
              </div>
            </div>
            <div className="program-card">
              <div className="program-image streaming"></div>
              <div className="program-content">
                <h3>Streaming</h3>
                <p>Watch exclusive content and stay updated with latest trends</p>
                <Link to="/streaming" className="btn btn-outline">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join MoviePro today and take the first step towards your dreams</p>
            <Link to="/register" className="btn btn-primary">Get Started Now</Link>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Members Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <p>"{testimonial.quote}"</p>
                </div>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const testimonials = [
  {
    quote: "MoviePro transformed my career. The training and networking opportunities are unmatched.",
    name: "Sarah Johnson",
    role: "Film Director",
    image: "/testimonial1.jpg"
  },
  {
    quote: "The academy provided me with the skills and confidence I needed to succeed in the industry.",
    name: "Michael Chen",
    role: "Cinematographer",
    image: "/testimonial2.jpg"
  },
  {
    quote: "Thanks to MoviePro's audition platform, I landed my first major role in a feature film.",
    name: "Emily Rodriguez",
    role: "Actor",
    image: "/testimonial3.jpg"
  }
]

export default Home 