import { buildConfig } from 'payload/config';
import path from 'path';
import { Users } from './collections/Users';
import { Prompts } from './collections/Prompts';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Prompts,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: {
    postgres: {
      pool: {
        connectionString: process.env.DATABASE_URI,
      },
    },
  },
}); 