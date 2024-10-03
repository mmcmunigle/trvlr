import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const CITIES_RESPONSE_TEMPLATE = `[
  {
    "name": "name of city",
    "description": "brief description",
  },
]`;

type ChatGPTResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
};

const GenerateCitiesSchema = z.object({
  country: z.string().min(3, 'Country is required').max(255),
});

export type CitiesGPTRequest = z.infer<typeof GenerateCitiesSchema>;

export async function POST(request: NextRequest) {
  const body: CitiesGPTRequest = await request.json();
  const validation = GenerateCitiesSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  try {
    const message = `Please provide city recommendations for an amazing trip to ${body.country}. 
    The response should be provided as a valid json object in the following format ${CITIES_RESPONSE_TEMPLATE}.
    Please provide at least 10 recommended cities. Nearby islands and neighboring cities may be included.`;

    const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: message }],
      }),
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      cache: 'force-cache',
    });

    const gptData: ChatGPTResponse = await gptResponse.json();
    console.log(gptData);

    let content = gptData.choices[0].message.content;
    if (content.includes('```json')) {
      content = content.replace('```json', '').replace('```', '');
    }

    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    return NextResponse.json({ error: 'Error communicating with OpenAI' }, { status: 500 });
  }
}
