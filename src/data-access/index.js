import { makeUsersDb } from './users-db'
import { Pool } from 'pg'

const connectionString =
  process.env.NODE_ENV === 'production'
    ? process.env.HEROKU_POSTGRESQL_ONYX_URL
    : process.env.DATABASE_LOCAL

const ssl = process.env.DATABASE_URL ? { rejectUnauthorized: false } : null

const pool = new Pool({
  connectionString,
  ssl,
})

export function makeDb() {
  return Object.freeze({ query })

  async function query({ query }) {
    return pool.query(query)
  }
}

export const usersDb = makeUsersDb({ makeDb })
