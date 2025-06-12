import { CollectionConfig } from 'payload/types';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200, // 2 hours
    verify: true, // Enable email verification
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes
    useAPIKey: false,
    depth: 0,
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      domain: process.env.COOKIE_DOMAIN,
    },
    forgotPassword: {
      generateEmailHTML: (args) => `
        <p>Click the link below to reset your password:</p>
        <a href="${process.env.PAYLOAD_PUBLIC_SERVER_URL}/reset-password?token=${args?.token || ''}">Reset Password</a>
      `,
      generateEmailSubject: () => 'Reset your password',
    },
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' },
      ],
      defaultValue: 'user',
      required: true,
    },
    {
      name: 'savedPrompts',
      type: 'relationship',
      relationTo: 'prompts',
      hasMany: true,
    },
    {
      name: 'isVerified',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        readOnly: true,
      },
    },
  ],
}; 