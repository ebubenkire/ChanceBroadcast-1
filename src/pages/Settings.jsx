import { useState } from 'react'
import './Settings.css'

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile')
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    bio: 'Actor & Director based in Los Angeles',
    phone: '+1 (555) 123-4567',
    location: 'Los Angeles, CA',
    website: 'www.johndoe.com',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false
    }
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNotificationToggle = (type) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }))
  }

  const handlePrivacyChange = (setting, value) => {
    setFormData(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [setting]: value
      }
    }))
  }

  return (
    <div className="settings">
      <div className="settings-container">
        <div className="settings-sidebar">
          <h2>Settings</h2>
          <nav className="settings-nav">
            <button
              className={activeSection === 'profile' ? 'active' : ''}
              onClick={() => setActiveSection('profile')}
            >
              <i className="fas fa-user"></i>
              Profile Settings
            </button>
            <button
              className={activeSection === 'account' ? 'active' : ''}
              onClick={() => setActiveSection('account')}
            >
              <i className="fas fa-lock"></i>
              Account Security
            </button>
            <button
              className={activeSection === 'notifications' ? 'active' : ''}
              onClick={() => setActiveSection('notifications')}
            >
              <i className="fas fa-bell"></i>
              Notifications
            </button>
            <button
              className={activeSection === 'privacy' ? 'active' : ''}
              onClick={() => setActiveSection('privacy')}
            >
              <i className="fas fa-shield-alt"></i>
              Privacy
            </button>
          </nav>
        </div>

        <div className="settings-content">
          {activeSection === 'profile' && (
            <div className="settings-section">
              <h2>Profile Settings</h2>
              <form className="settings-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="btn-save">Save Changes</button>
              </form>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Preferences</h2>
              <div className="notification-settings">
                <div className="notification-option">
                  <div>
                    <h3>Email Notifications</h3>
                    <p>Receive updates via email</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={formData.notifications.email}
                      onChange={() => handleNotificationToggle('email')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                {/* Add more notification options */}
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="settings-section">
              <h2>Privacy Settings</h2>
              <div className="privacy-settings">
                <div className="privacy-option">
                  <div>
                    <h3>Profile Visibility</h3>
                    <p>Control who can see your profile</p>
                  </div>
                  <select
                    value={formData.privacy.profileVisibility}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="connections">Connections Only</option>
                  </select>
                </div>
                {/* Add more privacy options */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings 