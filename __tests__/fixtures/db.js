import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : process.env.DATABASE_TEST

const ssl = process.env.DATABASE_URL ? { rejectUnauthorized: false } : null

const config = {
  connectionString,
  ssl,
}

const pool = new Pool({ ...config })

export function makeDb() {
  return Object.freeze({ query })

  async function query({ query }) {
    return pool.query(query)
  }
}
