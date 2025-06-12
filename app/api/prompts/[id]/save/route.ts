import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/users/${token.sub}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
        body: JSON.stringify({
          savedPrompts: {
            add: [params.id],
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to save prompt');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving prompt:', error);
    return NextResponse.json(
      { error: 'Failed to save prompt' },
      { status: 500 }
    );
  }
} 