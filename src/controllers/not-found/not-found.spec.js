import { notFound } from './'

describe('not found', () => {
  it('returns not found', async () => {
    const result = await notFound()

    expect(result.status).toBe(404)
  })
})
