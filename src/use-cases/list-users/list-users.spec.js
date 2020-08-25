import { makeListUsers } from './'
import { makeUsersDb } from '../../data-access/users-db'
import { makeDb } from '../../../__tests__/fixtures/db'

describe('list users', () => {
  let usersDb, listUsers

  beforeAll(() => {
    usersDb = makeUsersDb({ makeDb })
    listUsers = makeListUsers({ usersDb })
  })

  it('sets start to 0 if negative', async () => {
    const result = await listUsers({ start: -1, count: 10 })

    expect(result[0].id).toBe(1)
  })

  it('sets count to 10 if greater than 10', async () => {
    const result = await listUsers({ start: 0, count: 100 })

    expect(result[0].id).toBe(1)
  })

  it('returns users without count or start', async () => {
    const result = await listUsers({})

    expect(result[0].id).toBe(1)
  })

  it('returns users without arguments', async () => {
    const result = await listUsers()

    expect(result[0].id).toBe(1)
  })
})
