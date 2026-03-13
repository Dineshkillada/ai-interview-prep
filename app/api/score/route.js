import Groq from 'groq-sdk'
import { supabase } from '../../../lib/supabase'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req) {
  try {
    const { role, difficulty, question, answer } = await req.json()

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'user',
          content: `You are a senior ${role} engineer conducting a technical interview.

Question asked: "${question}"
Candidate's answer: "${answer}"

Evaluate this answer strictly and fairly for a ${difficulty}-level position.

Return ONLY valid JSON, no markdown, no extra text:
{
  "score": <integer 0-100>,
  "overall_feedback": "<2-3 sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<area to improve 1>", "<area to improve 2>"],
  "ideal_answer_hint": "<1-2 sentence hint about what a great answer covers>"
}`
        }
      ],
      max_tokens: 500,
    })

    let raw = completion.choices[0].message.content.trim()
    if (raw.startsWith('```')) raw = raw.split('\n').slice(1, -1).join('\n')
    const data = JSON.parse(raw)

    await supabase.from('sessions').insert({
      role, difficulty, question,
      user_answer: answer,
      score: data.score,
      feedback: data.overall_feedback,
      strengths: data.strengths,
      improvements: data.improvements,
    })

    return Response.json(data)
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}