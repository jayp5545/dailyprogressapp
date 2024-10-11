import './globals.css'

export const metadata = {
  title: 'Learning Management',
  description: 'Manage your learnings',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
