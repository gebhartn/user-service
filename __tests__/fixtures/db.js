import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : process.env.DB_LOCAL

const config = {
  connectionString,
  ssl: { rejectUnauthorized: false },
}

const pool = new Pool({ ...config })

export function makeDb() {
  return Object.freeze({ query })

  async function query({ query }) {
    return pool.query(query)
  }
}
