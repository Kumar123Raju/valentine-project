import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, answer } = body;

    // Log to server console
    console.log('\n========== USER MESSAGE RECEIVED ==========');
    console.log('Question:', question);
    console.log('Answer:', answer);
    console.log('Timestamp:', new Date().toISOString());
    console.log('==========================================\n');

    return NextResponse.json(
      { success: true, message: 'Message logged successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error logging message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to log message' },
      { status: 500 }
    );
  }
}
