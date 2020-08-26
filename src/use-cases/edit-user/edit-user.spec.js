import faker from 'faker'

import { makeEditUser } from './'
import { makeFakeUser } from '../../../__tests__/fixtures/user'
import { makeUsersDb } from '../../data-access/users-db'
import { makeDb } from '../../../__tests__/fixtures/db'

describe('edit user', () => {
  let usersDb

  beforeAll(async () => {
    usersDb = makeUsersDb({ makeDb })
  })

  afterEach(async () => {
    await makeDb().clear()
  })

  it('should error with no id', async () => {
    const editUser = makeEditUser({ usersDb })
    const userEdit = makeFakeUser({ id: undefined })

    await expect(editUser(userEdit)).rejects.toThrow('User not found.')
  })

  it('should error with no arguments', async () => {
    const editUser = makeEditUser({ usersDb })

    await expect(editUser()).rejects.toThrow('User not found.')
  })

  it('should combine existing user with incoming', async () => {
    const editUser = makeEditUser({ usersDb })

    const fake = makeFakeUser()
    await usersDb.insert({ user: fake })

    const existing = await usersDb.findById({ id: 1 })
    const user = await editUser({
      id: 1,
      changes: { first_name: faker.name.firstName },
    })

    delete user.password
    delete existing.password

    expect(user).toStrictEqual({ ...existing, ...user })
  })

  it('should return existing if nothing changes', async () => {
    const editUser = makeEditUser({ usersDb })

    const fake = makeFakeUser()
    await usersDb.insert({ user: fake })

    const existing = await usersDb.findById({ id: 1 })
    const user = await editUser({
      id: 1,
      ...fake,
    })

    return expect(user.hash_code).toBe(existing.hash_code)
  })

  it('should edit a user', async () => {
    const editUser = makeEditUser({ usersDb })

    const fake = makeFakeUser()
    await usersDb.insert({ user: fake })

    const userEdit = makeFakeUser({ id: 1 })

    const existingUser = await usersDb.findById({ id: 1 })
    const newUser = await editUser({ ...userEdit, id: 1 })

    return expect(newUser.hash_code).not.toBe(existingUser.hash_code)
  })
})
