import { Pool } from 'pg'
import { dbMock } from '../../config'

const pool = new Pool({
  connectionString: dbMock.connectionString,
  ssl: dbMock.ssl,
})

export function makeDb() {
  return Object.freeze({ query, clear })

  async function query({ query }) {
    return pool.query(query)
  }

  async function clear() {
    await Promise.all([
      pool.query('delete from users'),
      pool.query('alter sequence users_id_seq restart with 1'),
    ])
  }
}
