import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold gradient-text">
          ⚡ InterviewAI
        </Link>
        <div className="flex gap-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/interview" className="hover:text-white transition-colors">Practice</Link>
          <Link href="/history" className="hover:text-white transition-colors">History</Link>
        </div>
      </div>
    </nav>
  )
}