import { makeAddUser } from './'
import { makeUsersDb } from '../../data-access/users-db'
import { makeFakeUser } from '../../../__tests__/fixtures/user'
import { makeDb } from '../../../__tests__/fixtures/db'

describe('add user', () => {
  let usersDb

  beforeAll(() => {
    makeDb().clear()
    usersDb = makeUsersDb({ makeDb })
  })

  afterAll(async () => {
    await makeDb().clear()
  })

  it('inserts a user to the database', async done => {
    const newUser = makeFakeUser()
    const addUser = makeAddUser({ usersDb })

    const inserted = await addUser(newUser)
    expect(inserted.email).toBe(newUser.email)

    done()
  })

  it('throws if a user already exists', async done => {
    const newUser = makeFakeUser()
    const addUser = makeAddUser({ usersDb })

    await addUser(newUser)

    try {
      await addUser(newUser)
    } catch (e) {
      expect(e.message).toMatch('User already exists')
    }

    done()
  })
})
