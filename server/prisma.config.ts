import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import path from 'path';

// Force load the .env from the current directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    // Accessing via process.env because we loaded it with dotenv above
    url: process.env.DATABASE_URL,
  },
});