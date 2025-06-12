import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function DELETE(
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

    // First, verify ownership
    const promptResponse = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/prompts/${params.id}`,
      {
        headers: {
          'Authorization': `JWT ${token}`,
        },
      }
    );

    if (!promptResponse.ok) {
      throw new Error('Failed to fetch prompt');
    }

    const prompt = await promptResponse.json();
    if (prompt.createdBy !== token.sub) {
      return NextResponse.json(
        { error: 'Not authorized to delete this prompt' },
        { status: 403 }
      );
    }

    // Delete the prompt
    const response = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/prompts/${params.id}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `JWT ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete prompt');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting prompt:', error);
    return NextResponse.json(
      { error: 'Failed to delete prompt' },
      { status: 500 }
    );
  }
} 