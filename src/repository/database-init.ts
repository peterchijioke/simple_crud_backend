import { Client } from 'pg';

export async function ensureDatabaseExists(
  dbConfig: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  }
): Promise<void> {
  const { host, port, user, password, database } = dbConfig;

  const client = new Client({
    host,
    port,
    user,
    password,
    database: 'postgres', 
  });

  try {
    await client.connect();

    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [database]
    );

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${database}"`);
      console.log(`Database "${database}" created successfully.`);
    } else {
      console.log(`Database "${database}" already exists.`);
    }
  } catch (error) {
    console.error('Error ensuring database exists:', error.message);
    throw error;
  } finally {
    await client.end();
  }
}