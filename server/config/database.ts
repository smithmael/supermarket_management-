// server/config/database.ts
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';


// 1. Create the pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Add an error listener to the pool (helps debug connection drops)
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// 3. Setup the v7 Adapter
const adapter = new PrismaPg(pool);

// 4. Initialize the client
export const prisma = new PrismaClient({ adapter });

export default prisma;