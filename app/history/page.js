'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Navbar from '../../components/Navbar'
import Link from 'next/link'

export default function HistoryPage() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    async function fetchSessions() {
      const { data } = await supabase
        .from('sessions').select('*')
        .order('created_at', { ascending: false }).limit(20)
      setSessions(data || [])
      setLoading(false)
    }
    fetchSessions()
  }, [])

  const avg = sessions.length
    ? Math.round(sessions.reduce((a, s) => a + s.score, 0) / sessions.length) : 0

  const scoreColor = s => s >= 80 ? 'text-green-400' : s >= 60 ? 'text-yellow-400' : 'text-red-400'

  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <Navbar />
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Session History</h1>
            <p className="text-gray-500 mt-1">{sessions.length} sessions completed</p>
          </div>
          {sessions.length > 0 && (
            <div className="glass rounded-2xl px-6 py-4 text-center">
              <div className={`text-3xl font-bold ${scoreColor(avg)}`}>{avg}</div>
              <div className="text-gray-500 text-xs mt-1">Avg Score</div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="glass rounded-3xl p-12 text-center">
            <p className="text-gray-500">Loading sessions...</p>
          </div>
        ) : !sessions.length ? (
          <div className="glass rounded-3xl p-12 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h2 className="text-xl font-semibold mb-2">No sessions yet</h2>
            <p className="text-gray-500 mb-6">Complete your first interview to see history here.</p>
            <Link href="/interview">
              <button className="btn-primary px-8 py-3 rounded-xl font-bold text-white">
                Start Practicing →
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map(s => (
              <div key={s.id} className="glass rounded-2xl p-6 hover:border-white/10 transition-all">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-violet-500/10 text-violet-300 border border-violet-500/20">{s.role}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-blue-500/10 text-blue-300 border border-blue-500/20">{s.difficulty}</span>
                    </div>
                    <p className="text-white font-medium text-sm mb-2">{s.question}</p>
                    <p className="text-gray-500 text-xs">{new Date(s.created_at).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric', hour:'2-digit', minute:'2-digit' })}</p>
                  </div>
                  <div className={`text-3xl font-extrabold ${scoreColor(s.score)}`}>{s.score}</div>
                </div>
                {s.feedback && <p className="text-gray-600 text-xs mt-3">{s.feedback}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}