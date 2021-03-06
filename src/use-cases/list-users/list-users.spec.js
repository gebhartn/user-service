import { makeListUsers } from './'
import { makeUsersDb } from '../../data-access/users-db'
import { makeDb } from '../../../__tests__/fixtures/db'
import { makeFakeUser } from '../../../__tests__/fixtures/user'

describe('list users', () => {
  let usersDb, listUsers

  beforeAll(async () => {
    usersDb = makeUsersDb({ makeDb })
    listUsers = makeListUsers({ usersDb })
  })

  afterEach(async () => {
    await makeDb().clear()
  })

  it('sets start to 0 if negative', async () => {
    const user = makeFakeUser()
    await usersDb.insert({ user })

    const result = await listUsers({ start: -1, count: 10 })

    return expect(result[0].id).toBe(1)
  })

  it('sets count to 10 if greater than 10', async () => {
    await Promise.all(
      [
        { user: makeFakeUser() },
        { user: makeFakeUser() },
        { user: makeFakeUser() },
        { user: makeFakeUser() },
        { user: makeFakeUser() },
        { user: makeFakeUser() },
        { user: makeFakeUser() },
        { user: makeFakeUser() },
        { user: makeFakeUser() },
        { user: makeFakeUser() },
        { user: makeFakeUser() },
        { user: makeFakeUser() },
      ].map(usersDb.insert)
    )

    const result = await listUsers({ start: 0, count: 100 })

    return expect(result.length).toBe(10)
  })

  it('returns users without count or start', async () => {
    const user = makeFakeUser()
    await usersDb.insert({ user })

    const result = await listUsers({})

    return expect(result[0].id).toBe(1)
  })

  it('returns users without arguments', async () => {
    const user = makeFakeUser()
    await usersDb.insert({ user })

    const result = await listUsers()

    return expect(result[0].id).toBe(1)
  })
})
