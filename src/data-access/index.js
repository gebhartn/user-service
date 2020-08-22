import { makeUsersDb } from './users-db'
import { Pool } from 'pg'

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
})

export function makeDb() {
  return Object.freeze({ query })

  async function query({ query }) {
    return pool.query(query)
  }
}

export const usersDb = makeUsersDb({ makeDb })
