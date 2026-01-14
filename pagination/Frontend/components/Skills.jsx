import { useEffect, useRef } from 'react'

export default function Skills() {
  const skillCardsRef = useRef([])

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

    skillCardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => {
      skillCardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card)
      })
    }
  }, [])

  const skills = [
    {
      icon: '⚛️',
      title: 'React.js',
      description: 'Building dynamic and interactive user interfaces with React.js, hooks, and modern patterns.',
      tags: ['React', 'Hooks', 'Context API', 'React Router']
    },
    {
      icon: '🎨',
      title: 'Frontend Design',
      description: 'Creating beautiful and responsive designs with CSS, Tailwind CSS, and modern design principles.',
      tags: ['CSS3', 'Tailwind CSS', 'Responsive Design', 'UI/UX']
    },
    {
      icon: '⚡',
      title: 'Performance',
      description: 'Optimizing web applications for speed and efficiency using modern techniques.',
      tags: ['Code Splitting', 'Lazy Loading', 'Optimization']
    },
    {
      icon: '🔧',
      title: 'Tools & Libraries',
      description: 'Working with various tools and libraries to enhance development workflow.',
      tags: ['Git', 'Webpack', 'Vite', 'npm/yarn']
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Building mobile-first applications that work seamlessly across all devices.',
      tags: ['Mobile First', 'Flexbox', 'Grid', 'Media Queries']
    },
    {
      icon: '🚀',
      title: 'Modern JavaScript',
      description: 'Writing clean, efficient code using ES6+ features and modern JavaScript patterns.',
      tags: ['ES6+', 'Async/Await', 'Promises', 'Modules']
    }
  ]

  return (
    <section id="skills" className="section">
      <h2 className="section-title">Skills</h2>
      <p className="section-subtitle">
        Technologies and tools I work with to bring ideas to life
      </p>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div
            key={index}
            ref={(el) => (skillCardsRef.current[index] = el)}
            className="skill-card"
          >
            <span className="skill-icon">{skill.icon}</span>
            <h3>{skill.title}</h3>
            <p>{skill.description}</p>
            <div className="skill-tags">
              {skill.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="skill-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
