import { makeDb } from './'

describe('data access', () => {
  it('can make a query', async () => {
    const db = makeDb()

    const result = await db.query({
      query: {
        text: 'select id from users limit 1',
      },
    })

    expect(result.rows[0].id).toBe(1)
  })
})
