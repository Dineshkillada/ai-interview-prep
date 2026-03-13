import Link from 'next/link'
import Navbar from '../components/Navbar'

const roles = [
  { icon: '⚛️', title: 'Frontend Dev',  desc: 'React, CSS, JavaScript' },
  { icon: '⚙️', title: 'Backend Dev',   desc: 'APIs, Databases, Architecture' },
  { icon: '🔷', title: 'Full Stack',    desc: 'End-to-end development' },
  { icon: '☁️', title: 'DevOps',        desc: 'CI/CD, Cloud, Infrastructure' },
]

const features = [
  { icon: '🤖', title: 'AI-Generated Questions', desc: 'Fresh, role-specific questions every session.' },
  { icon: '📊', title: 'Instant Scoring',        desc: 'Get scored 0–100 with detailed feedback.' },
  { icon: '💡', title: 'Actionable Feedback',    desc: 'Know exactly what to improve.' },
  { icon: '📈', title: 'Track Progress',         desc: 'Every session saved — watch your scores grow.' },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-40 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20 mb-6">
            ✨ Powered by Google Gemini AI
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Ace Your Next
            <span className="gradient-text"> Tech Interview</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Practice with AI-generated questions tailored to your role and level.
            Get scored instantly with expert feedback — just like a real interview.
          </p>
          <Link href="/interview">
            <button className="btn-primary px-10 py-4 rounded-xl text-lg font-bold text-white inline-block">
              Start Practicing Free →
            </button>
          </Link>
          <p className="text-gray-600 text-sm mt-4">No signup required · 100% free</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-3xl font-bold mb-3">Pick Your Role</h2>
          <p className="text-center text-gray-500 mb-10">Questions tailored to your exact job target</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {roles.map(r => (
              <Link href="/interview" key={r.title}>
                <div className="glass rounded-2xl p-6 text-center hover:border-violet-500/30 transition-all cursor-pointer group">
                  <div className="text-4xl mb-3">{r.icon}</div>
                  <div className="font-semibold text-white group-hover:text-violet-300 transition-colors">{r.title}</div>
                  <div className="text-gray-500 text-sm mt-1">{r.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-3xl font-bold mb-3">Everything You Need</h2>
          <p className="text-center text-gray-500 mb-10">Built to make your prep smarter, not harder</p>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map(f => (
              <div key={f.title} className="glass rounded-2xl p-6 flex gap-4 items-start">
                <span className="text-3xl">{f.icon}</span>
                <div>
                  <div className="font-semibold text-white mb-1">{f.title}</div>
                  <div className="text-gray-500 text-sm leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto glass rounded-3xl p-12 glow-purple">
          <h2 className="text-4xl font-bold mb-4">Ready to get hired?</h2>
          <p className="text-gray-400 mb-8">Start your first AI-powered mock interview right now.</p>
          <Link href="/interview">
            <button className="btn-primary px-10 py-4 rounded-xl text-lg font-bold text-white">
              Start Interview →
            </button>
          </Link>
        </div>
      </section>

      <footer className="text-center text-gray-700 text-sm pb-8">
        Built with Next.js · Supabase · Google Gemini AI
      </footer>
    </main>
  )
}