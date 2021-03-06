import { makeAddUser } from './'
import { makeUsersDb } from '../../data-access/users-db'
import { makeFakeUser } from '../../../__tests__/fixtures/user'
import { makeDb } from '../../../__tests__/fixtures/db'

describe('add user', () => {
  let usersDb

  beforeAll(() => {
    usersDb = makeUsersDb({ makeDb })
  })

  afterEach(async () => {
    await makeDb().clear()
  })

  it('inserts a user to the database', async () => {
    const newUser = makeFakeUser()
    const addUser = makeAddUser({ usersDb })

    const inserted = await addUser(newUser)

    return expect(inserted.email).toBe(newUser.email)
  })

  it('throws if a user already exists', async () => {
    const newUser = makeFakeUser()
    const addUser = makeAddUser({ usersDb })

    await addUser(newUser)

    try {
      await addUser(newUser)
    } catch (e) {
      return expect(e.message).toMatch('User already exists')
    }
  })
})
