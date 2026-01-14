export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Hi, I'm a Frontend Developer</h1>
        <p className="subtitle">Building Modern Web Experiences</p>
        <p className="description">
          Passionate about creating beautiful, responsive, and user-friendly web applications 
          using React.js and modern web technologies.
        </p>
        <div className="cta-buttons">
          <a href="#projects" className="btn btn-primary" onClick={(e) => { e.preventDefault(); scrollToSection('projects') }}>
            View My Work
          </a>
          <a href="#contact" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  )
}
