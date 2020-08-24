import { Pool } from 'pg'

const config = { connectionString: process.env.DB_HEROKU }

const pool = new Pool({ ...config })

export function makeDb() {
  return Object.freeze({ query })

  async function query({ query }) {
    return pool.query(query)
  }
}
