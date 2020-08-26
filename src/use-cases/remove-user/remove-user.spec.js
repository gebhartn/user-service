import { makeRemoveUser } from './'
import { makeFakeUser } from '../../../__tests__/fixtures/user'
import { makeUsersDb } from '../../data-access/users-db'
import { makeDb } from '../../../__tests__/fixtures/db'

describe('edit user', () => {
  let usersDb

  beforeAll(async () => {
    await makeDb().clear()
    usersDb = makeUsersDb({ makeDb })
  })

  afterAll(async () => {
    await makeDb().clear()
  })

  it('should error with no id', async () => {
    const removeUser = makeRemoveUser({ usersDb })
    const user = makeFakeUser({ id: undefined })

    expect(removeUser({ id: user.id })).rejects.toThrow('You must supply an ID')
  })

  it('should error with empty object', async () => {
    const removeUser = makeRemoveUser({ usersDb })

    expect(removeUser()).rejects.toThrow('You must supply an ID')
  })

  it('should do nothing if it finds no user', async () => {
    const removeUser = makeRemoveUser({ usersDb })
    const result = await removeUser({ id: 5 })

    expect(result.count).toBe(0)
  })

  it('should hard delete a user when found', async () => {
    const removeUser = makeRemoveUser({ usersDb })

    const user = makeFakeUser()
    await usersDb.insert({ user })

    const result = await removeUser({ id: 1 })

    expect(result.count).toBe(1)
  })
})
