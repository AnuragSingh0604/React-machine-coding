export default function About() {
  return (
    <section id="about" className="section about">
      <h2 className="section-title">About Me</h2>
      <p className="section-subtitle">
        Get to know more about my journey and passion for frontend development
      </p>
      <div className="about-content">
        <div className="about-text">
          <p>
            Hello! I'm a Frontend Developer with 1 year of experience specializing in React.js 
            and modern web development. I'm passionate about creating intuitive user interfaces 
            and seamless user experiences.
          </p>
          <p>
            My journey in web development started with a curiosity about how websites work, 
            and it has evolved into a deep passion for building responsive, performant, and 
            accessible web applications.
          </p>
          <p>
            I enjoy working with modern technologies and staying up-to-date with the latest 
            trends in frontend development. When I'm not coding, I love learning new 
            technologies, contributing to open-source projects, and sharing knowledge with 
            the developer community.
          </p>
        </div>
        <div className="about-image">
          <div style={{
            width: '100%',
            height: '400px',
            background: 'var(--gradient-1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem',
            color: 'white'
          }}>
            👨‍💻
          </div>
        </div>
      </div>
    </section>
  )
}
