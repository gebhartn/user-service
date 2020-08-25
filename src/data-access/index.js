import { makeUsersDb } from './users-db'
import { Pool } from 'pg'
import { dbConfig } from '../../config'

const pool = new Pool({
  connectionString: dbConfig.connectionString,
  ssl: dbConfig.ssl,
})

export function makeDb() {
  return Object.freeze({ query })

  async function query({ query }) {
    return pool.query(query)
  }
}

export const usersDb = makeUsersDb({ makeDb })
