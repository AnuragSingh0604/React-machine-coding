import { useEffect, useRef } from 'react'

export default function Projects() {
  const projectCardsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    projectCardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => {
      projectCardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card)
      })
    }
  }, [])

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce application with shopping cart, product filtering, and user authentication built with React.js.',
      tech: ['React.js', 'Context API', 'CSS3', 'Local Storage'],
      image: '🛒',
      github: '#',
      demo: '#'
    },
    {
      title: 'Task Management App',
      description: 'A productivity app for managing tasks with drag-and-drop functionality, categories, and deadline tracking.',
      tech: ['React.js', 'Hooks', 'CSS3', 'Local Storage'],
      image: '✅',
      github: '#',
      demo: '#'
    },
    {
      title: 'Weather Dashboard',
      description: 'A responsive weather application that displays current conditions and forecasts using a weather API.',
      tech: ['React.js', 'API Integration', 'CSS3', 'Axios'],
      image: '🌤️',
      github: '#',
      demo: '#'
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website showcasing projects and skills with smooth animations.',
      tech: ['React.js', 'Next.js', 'CSS3', 'Responsive Design'],
      image: '💼',
      github: '#',
      demo: '#'
    },
    {
      title: 'Social Media Dashboard',
      description: 'A dashboard application displaying social media analytics with interactive charts and data visualization.',
      tech: ['React.js', 'Charts.js', 'CSS3', 'API'],
      image: '📊',
      github: '#',
      demo: '#'
    },
    {
      title: 'Recipe Finder App',
      description: 'An application to search and discover recipes with filtering options and detailed recipe information.',
      tech: ['React.js', 'API Integration', 'CSS3', 'Search'],
      image: '🍳',
      github: '#',
      demo: '#'
    }
  ]

  return (
    <section id="projects" className="section projects">
      <h2 className="section-title">Projects</h2>
      <p className="section-subtitle">
        A collection of projects I've worked on to showcase my skills and experience
      </p>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => (projectCardsRef.current[index] = el)}
            className="project-card"
          >
            <div className="project-image">
              {project.image}
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                  GitHub →
                </a>
                <a href={project.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                  Live Demo →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
