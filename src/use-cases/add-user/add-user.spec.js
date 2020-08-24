import { makeAddUser } from './'
import { makeUsersDb } from '../../data-access/users-db'
import { makeFakeUser } from '../../../__tests__/fixtures/user'
import { makeDb } from '../../../__tests__/fixtures/db'

describe('add user', () => {
  let usersDb

  beforeAll(() => {
    usersDb = makeUsersDb({ makeDb })
  })

  it('inserts a user to the database', async () => {
    const newUser = makeFakeUser()
    const addUser = makeAddUser({ usersDb })

    const inserted = await addUser(newUser)
    expect(inserted.email).toBe(newUser.email)
  })

  it('throws if user exists', async () => {
    const newUser = makeFakeUser()
    const addUser = makeAddUser({ usersDb })

    await addUser(newUser)

    await expect(addUser(newUser)).rejects.toThrow('User already exists')
  })
})
