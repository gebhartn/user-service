import { makeUsersDb } from './users-db'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === 'production'
      ? process.env.DATABASE_URL
      : process.env.DATABASE_LOCAL,
})

export function makeDb() {
  return Object.freeze({ query })

  async function query({ query }) {
    return pool.query(query)
  }
}

export const usersDb = makeUsersDb({ makeDb })
