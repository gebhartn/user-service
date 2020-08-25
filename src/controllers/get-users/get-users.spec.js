import { makeGetUsers } from './'
import { makeFakeUser } from '../../../__tests__/fixtures/user'

describe('get users', () => {
  it('returns 200 on success', async () => {
    const getUsers = makeGetUsers({ listUsers: u => u })

    const user = makeFakeUser()
    const result = await getUsers({ body: user, query: { start: 0, count: 1 } })

    expect(result.status).toBe(200)
  })

  it('returns 400 on error', async () => {
    const getUsers = makeGetUsers({
      listUsers: () => {
        throw new Error('Whoops')
      },
    })

    const result = await getUsers({})

    expect(result.status).toBe(400)
  })
})
