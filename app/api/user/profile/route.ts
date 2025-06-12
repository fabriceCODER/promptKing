import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(req: Request) {
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
        headers: {
          'Authorization': `JWT ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const user = await response.json();
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { currentPassword, newPassword, ...updateData } = body;

    // If changing password, verify current password first
    if (currentPassword && newPassword) {
      const verifyResponse = await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: token.email,
            password: currentPassword,
          }),
        }
      );

      if (!verifyResponse.ok) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        );
      }

      updateData.password = newPassword;
    }

    const response = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/users/${token.sub}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.message || 'Failed to update profile');
    }

    const updatedUser = await response.json();
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update profile' },
      { status: 500 }
    );
  }
} 