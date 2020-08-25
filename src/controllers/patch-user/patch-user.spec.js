import { makePatchUser } from './'
import { makeFakeUser } from '../../../__tests__/fixtures/user'

describe('patch user controller', () => {
  it('successfully patches a user', async () => {
    const fakeUser = makeFakeUser()
    const patchUser = makePatchUser({ editUser: u => u })

    const result = await patchUser({
      params: { id: fakeUser.id, body: fakeUser },
    })

    expect(result.status).toBe(200)
  })

  it('reports user error', async () => {
    const fakeUser = makeFakeUser()
    const patchUser = makePatchUser({
      editUser: () => {
        throw new Error('whoops')
      },
    })

    const result = await patchUser({ id: fakeUser.id, body: fakeUser })

    expect(result.status).toBe(400)
  })

  it('handles range errors', async () => {
    const fakeUser = makeFakeUser()
    const patchUser = makePatchUser({
      editUser: () => {
        throw RangeError()
      },
    })

    const result = await patchUser({
      params: { id: fakeUser.id },
      body: fakeUser,
    })

    expect(result.status).toBe(404)
  })
})
