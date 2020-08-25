import { health } from './'

describe('api health', () => {
  it('returns 200', () => {
    const result = health()

    expect(result.status).toBe(200)
  })
})
