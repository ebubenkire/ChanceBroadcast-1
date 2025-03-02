import './About.css'

const About = () => {
  return (
    <div className="about">
      <section className="about-hero">
        <div className="container">
          <h1>About MoviePro</h1>
          <p>Empowering the next generation of filmmakers</p>
        </div>
      </section>

      <section className="about-mission">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>To revolutionize the film industry by providing innovative platforms, education, and opportunities for emerging talent.</p>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>10K+</h3>
                <p>Active Members</p>
              </div>
              <div className="stat-card">
                <h3>500+</h3>
                <p>Success Stories</p>
              </div>
              <div className="stat-card">
                <h3>50+</h3>
                <p>Industry Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="container">
          <h2>Our Leadership Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
                <div className="social-links">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <i className="fas fa-star"></i>
              <h3>Excellence</h3>
              <p>Striving for the highest quality in everything we do</p>
            </div>
            <div className="value-card">
              <i className="fas fa-handshake"></i>
              <h3>Collaboration</h3>
              <p>Building strong partnerships and community</p>
            </div>
            <div className="value-card">
              <i className="fas fa-lightbulb"></i>
              <h3>Innovation</h3>
              <p>Pushing boundaries and embracing new ideas</p>
            </div>
            <div className="value-card">
              <i className="fas fa-heart"></i>
              <h3>Passion</h3>
              <p>Dedicated to the art of filmmaking</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const teamMembers = [
  {
    name: "Sarah Anderson",
    role: "CEO & Founder",
    bio: "Former Hollywood producer with 15+ years of industry experience.",
    image: "/team/sarah.jpg",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Michael Chen",
    role: "Chief Creative Officer",
    bio: "Award-winning director and cinematographer.",
    image: "/team/michael.jpg",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Education",
    bio: "Film educator with expertise in emerging technologies.",
    image: "/team/emily.jpg",
    linkedin: "#",
    twitter: "#"
  }
]

export default About 