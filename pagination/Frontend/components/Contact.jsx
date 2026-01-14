export default function Contact() {
  return (
    <section id="contact" className="section">
      <h2 className="section-title">Get In Touch</h2>
      <p className="section-subtitle">
        I'm always open to discussing new opportunities and interesting projects
      </p>
      <div className="contact-content">
        <div className="contact-info">
          <p>Feel free to reach out if you'd like to work together or just want to connect!</p>
          <p>I'm currently available for freelance projects and full-time opportunities.</p>
        </div>
        <div className="contact-links">
          <a href="mailto:your.email@example.com" className="contact-link">
            <span className="contact-icon">📧</span>
            <span>Email</span>
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="contact-link">
            <span className="contact-icon">💼</span>
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="contact-link">
            <span className="contact-icon">🔗</span>
            <span>GitHub</span>
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="contact-link">
            <span className="contact-icon">🐦</span>
            <span>Twitter</span>
          </a>
        </div>
      </div>
    </section>
  )
}
