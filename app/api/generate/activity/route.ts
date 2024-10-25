import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { z } from 'zod';

const ACITVITY_RESPONSE_TEMPLATE = `[
  {
    "title": "activity title",
    "description": "brief description",
    "location": "location"
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

const GenerateActivitySchema = z.object({
  city: z.string().min(1, 'Country is required').max(255),
  activityLevel: z.number().min(1, 'Activity Level is required').max(5),
});

export type ActivityGPTRequest = z.infer<typeof GenerateActivitySchema>;

export async function POST(request: NextRequest) {
  const body: ActivityGPTRequest = await request.json();
  const validation = GenerateActivitySchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  try {
    const message = `You are a travel influencer tasked with providing activities and experiences in ${body.city}.
      You have extensive knowledge of various destinations and can plan trips tailored to specific preferences.
      Your goal is to create an incredible list of 12+ activities based the following information:
      Travel style: Adventurous but want to see the highlights of the city.
      The response should be provided as a valid json object in the following format ${ACITVITY_RESPONSE_TEMPLATE}`;

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
