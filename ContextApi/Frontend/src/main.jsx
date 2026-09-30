import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DemoContext,DemoProvider } from './Hooks/DemoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DemoProvider>
      <App />
    </DemoProvider>
    
  </StrictMode>,
)
