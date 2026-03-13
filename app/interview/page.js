'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import ScoreCard from '../../components/ScoreCard'

const ROLES  = ['Frontend Dev', 'Backend Dev', 'Full Stack', 'DevOps', 'Data Science']
const LEVELS = ['Junior', 'Mid-level', 'Senior']

export default function InterviewPage() {
  const [step, setStep]       = useState('setup')
  const [role, setRole]       = useState('')
  const [difficulty, setDiff] = useState('')
  const [question, setQ]      = useState('')
  const [answer, setAnswer]   = useState('')
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function startInterview() {
    if (!role || !difficulty) { setError('Please select a role and level.'); return }
    setError(''); setLoading(true)
    try {
      const res  = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, difficulty })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setQ(data.question); setStep('question')
    } catch (e) { setError(e.message) }
    setLoading(false)
  }

  async function submitAnswer() {
    if (answer.trim().length < 20) { setError('Please write a more detailed answer.'); return }
    setError(''); setLoading(true)
    try {
      const res  = await fetch('/api/score', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, difficulty, question, answer })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data); setStep('result')
    } catch (e) { setError(e.message) }
    setLoading(false)
  }

  function reset() {
    setStep('setup'); setAnswer(''); setQ(''); setResult(null); setError('')
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <Navbar />
      <div className="max-w-2xl mx-auto">

        {step === 'setup' && (
          <div className="glass rounded-3xl p-8 glow-purple">
            <h1 className="text-3xl font-bold mb-2">Start Interview</h1>
            <p className="text-gray-500 mb-8">Choose your target role and experience level.</p>

            <label className="block text-sm text-gray-400 mb-2 font-medium">Job Role</label>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {ROLES.map(r => (
                <button key={r} onClick={() => setRole(r)}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all
                    ${role === r
                      ? 'bg-violet-600/20 border-violet-500 text-violet-300'
                      : 'glass border-white/5 text-gray-400 hover:border-white/20'}`}>
                  {r}
                </button>
              ))}
            </div>

            <label className="block text-sm text-gray-400 mb-2 font-medium">Experience Level</label>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {LEVELS.map(l => (
                <button key={l} onClick={() => setDiff(l)}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all
                    ${difficulty === l
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'glass border-white/5 text-gray-400 hover:border-white/20'}`}>
                  {l}
                </button>
              ))}
            </div>

            {error && <p className="text-red-400 text-sm mb-4">⚠️ {error}</p>}

            <button onClick={startInterview} disabled={loading}
              className="btn-primary w-full py-4 rounded-xl font-bold text-white text-lg disabled:opacity-50">
              {loading ? '⏳ Generating question...' : 'Generate Question →'}
            </button>
          </div>
        )}

        {step === 'question' && (
          <div className="space-y-6">
            <div className="glass rounded-3xl p-8 glow-blue">
              <div className="flex gap-3 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">{role}</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">{difficulty}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-300 mb-2">Question</h2>
              <p className="text-white text-xl leading-relaxed font-medium">{question}</p>
            </div>

            <div className="glass rounded-3xl p-8">
              <h2 className="text-lg font-semibold text-gray-300 mb-3">Your Answer</h2>
              <textarea value={answer} onChange={e => setAnswer(e.target.value)} rows={8}
                placeholder="Type your answer as you would explain it in a real interview..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 resize-none focus:outline-none focus:border-violet-500/50 text-sm leading-relaxed" />
              <div className="flex justify-between mt-2">
                <span className="text-gray-600 text-xs">{answer.length} characters</span>
                <span className="text-gray-600 text-xs">Aim for 150+ for a detailed answer</span>
              </div>
              {error && <p className="text-red-400 text-sm mt-3">⚠️ {error}</p>}
              <div className="flex gap-3 mt-6">
                <button onClick={reset}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-all text-sm font-medium">
                  ← Start Over
                </button>
                <button onClick={submitAnswer} disabled={loading}
                  className="flex-[2] btn-primary py-3 rounded-xl font-bold text-white disabled:opacity-50">
                  {loading ? '⏳ AI is scoring...' : 'Submit Answer →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'result' && result && (
          <div className="space-y-6">
            <ScoreCard result={result} question={question} answer={answer} />
            <div className="flex gap-3">
              <button onClick={reset} className="flex-1 btn-primary py-4 rounded-xl font-bold text-white">
                Practice Again →
              </button>
              <a href="/history"
                className="flex-1 py-4 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-all text-sm font-medium text-center flex items-center justify-center">
                View History
              </a>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}