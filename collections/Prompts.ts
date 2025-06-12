import { CollectionConfig } from 'payload/types';

export const Prompts: CollectionConfig = {
  slug: 'prompts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Coders', value: 'coders' },
        { label: 'Content Creators', value: 'content-creators' },
        { label: 'Researchers', value: 'researchers' },
      ],
      required: true,
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
    },
    {
      name: 'tone',
      type: 'select',
      options: [
        { label: 'Professional', value: 'professional' },
        { label: 'Casual', value: 'casual' },
        { label: 'Friendly', value: 'friendly' },
      ],
      required: true,
    },
    {
      name: 'format',
      type: 'select',
      options: [
        { label: 'Paragraph', value: 'paragraph' },
        { label: 'List', value: 'list' },
        { label: 'Table', value: 'table' },
      ],
      required: true,
    },
    {
      name: 'length',
      type: 'select',
      options: [
        { label: 'Short', value: 'short' },
        { label: 'Medium', value: 'medium' },
        { label: 'Long', value: 'long' },
      ],
      required: true,
    },
  ],
}; 