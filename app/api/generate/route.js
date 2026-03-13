import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req) {
  try {
    const { role, difficulty } = await req.json()

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'user',
          content: `Generate one ${difficulty}-level technical interview question for a ${role} developer position.
Rules:
- Make it realistic and specific to the role
- Answerable in 3-5 minutes verbally
- Do NOT include the answer
- Return ONLY the question text, nothing else`
        }
      ],
      max_tokens: 200,
    })

    const question = completion.choices[0].message.content.trim()
    return Response.json({ question })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}