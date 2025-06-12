import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function POST(req: Request) {
  try {
    const { category, context, tone, format, length } = await req.json();

    const prompt = `Generate a ${length.toLowerCase()} ${format.toLowerCase()} prompt for ${category.toLowerCase()} with a ${tone.toLowerCase()} tone. Context: ${context}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.PAYLOAD_PUBLIC_SERVER_URL,
        'X-Title': 'AI Prompt Generator',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-coder-33b-instruct',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant that generates high-quality prompts.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate prompt');
    }

    const data = await response.json();
    const generatedPrompt = data.choices[0].message.content;

    return NextResponse.json({ result: generatedPrompt });
  } catch (error) {
    console.error('Error generating prompt:', error);
    return NextResponse.json(
      { error: 'Failed to generate prompt' },
      { status: 500 }
    );
  }
}
