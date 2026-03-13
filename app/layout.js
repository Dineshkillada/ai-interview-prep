import './globals.css'

export const metadata = {
  title: 'AI Interview Prep',
  description: 'Practice interviews and get scored by AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#080810] text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}