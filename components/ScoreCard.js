export default function ScoreCard({ result, question, answer }) {
  const { score, overall_feedback, strengths, improvements, ideal_answer_hint } = result

  const scoreColor = score >= 80 ? '#4ade80' : score >= 60 ? '#facc15' : '#f87171'
  const scoreLabel = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Work'

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-8 text-center glow-purple">
        <p className="text-gray-500 text-sm mb-2">Your Score</p>
        <div className="text-8xl font-extrabold mb-2" style={{ color: scoreColor }}>{score}</div>
        <div className="text-xl font-semibold" style={{ color: scoreColor }}>{scoreLabel}</div>
        <p className="text-gray-400 mt-4 leading-relaxed">{overall_feedback}</p>
      </div>

      {strengths?.length > 0 && (
        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold text-green-400 mb-3">✅ Strengths</h3>
          {strengths.map((s, i) => (
            <div key={i} className="flex gap-3 mb-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <p className="text-gray-300 text-sm leading-relaxed">{s}</p>
            </div>
          ))}
        </div>
      )}

      {improvements?.length > 0 && (
        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold text-amber-400 mb-3">💡 Areas to Improve</h3>
          {improvements.map((s, i) => (
            <div key={i} className="flex gap-3 mb-2">
              <span className="text-amber-500 mt-0.5">→</span>
              <p className="text-gray-300 text-sm leading-relaxed">{s}</p>
            </div>
          ))}
        </div>
      )}

      {ideal_answer_hint && (
        <div className="glass rounded-2xl p-6 border border-violet-500/20">
          <h3 className="font-semibold text-violet-400 mb-2">🎯 Ideal Answer Covers</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{ideal_answer_hint}</p>
        </div>
      )}
    </div>
  )
}