import './globals.css'

export const metadata = {
  title: 'Portfolio | Frontend Developer',
  description: 'Portfolio of a Frontend Developer with 1 year of experience in React.js and modern web technologies',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
