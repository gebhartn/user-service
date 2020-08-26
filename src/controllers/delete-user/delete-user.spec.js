import { makeDeleteUser } from '../delete-user'

describe('delete user', () => {
  it('deletes a user', async () => {
    const deleteUser = makeDeleteUser({
      removeUser: ({ id }) => ({ count: 1, id }),
    })

    const result = await deleteUser({ params: { id: 1 } })

    expect(result.status).toBe(200)
  })

  it('returns 404 on failure', async () => {
    const deleteUser = makeDeleteUser({
      removeUser: ({ id }) => ({ count: 0, id }),
    })

    const result = await deleteUser({ params: { id: 1 } })

    expect(result.status).toBe(404)
  })

  it('handles errors', async () => {
    const deleteUser = makeDeleteUser({
      removeUser: () => {
        throw Error('Whoops')
      },
    })

    const result = await deleteUser({ params: { id: 1 } })

    expect(result.status).toBe(400)
  })
})
