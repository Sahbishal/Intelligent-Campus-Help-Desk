import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { CAMPUS_DATA } from '@/lib/campusData';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not set in environment variables.' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
   const model = genAI.getGenerativeModel({ model: 'gemini-pro' });


    const prompt = `
You are an intelligent campus help desk assistant.
Use the following "Campus Handbook" data to answer the student's question.
If the answer is not in the handbook, politely say you don't have that information and suggest contacting the relevant department.
Keep answers concise, friendly, and helpful.

--- CAMPUS HANDBOOK ---
${CAMPUS_DATA}
-----------------------

Student Question: ${message}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
