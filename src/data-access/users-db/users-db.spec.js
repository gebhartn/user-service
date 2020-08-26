import { makeDb } from '../../../__tests__/fixtures/db'
import { makeUsersDb } from './'
import { makeFakeUser } from '../../../__tests__/fixtures/user'

describe('users database', () => {
  let usersDb

  beforeEach(async () => {
    usersDb = makeUsersDb({ makeDb })
  })

  afterEach(async () => {
    await makeDb().clear()
  })

  it('finds all users', async () => {
    const inserts = await Promise.all(
      [
        { user: makeFakeUser() },
        { user: makeFakeUser() },
        { user: makeFakeUser() },
      ].map(usersDb.insert)
    )

    const found = await usersDb.findAll({})

    return expect(found.length).toBe(inserts.length)
  })

  it('takes a count and a start', async () => {
    await Promise.all(
      [
        { user: makeFakeUser() },
        { user: makeFakeUser() },
        { user: makeFakeUser() },
      ].map(usersDb.insert)
    )

    const found = await usersDb.findAll({ count: 2, start: 0 })

    expect(found.length).toBe(2)
  })

  it('finds a user by id', async () => {
    const user = await makeFakeUser()
    await usersDb.insert({ user })

    const found = await usersDb.findById({ id: 1 })

    expect(found.firstName).toEqual(user.firstName)
  })

  it('finds a user by email', async () => {
    const user = await makeFakeUser()
    await usersDb.insert({ user })

    const found = await usersDb.findByEmail({ email: user.email })

    expect(found.email).toBe(user.email)
  })

  it('finds a user by hash', async () => {
    const user = await makeFakeUser()
    await usersDb.insert({ user })

    const found = await usersDb.findByHash({ hash: user.hash })

    expect(found.hash).toBe(user.hash)
  })

  it('inserts a new user', async () => {
    const user = makeFakeUser()
    const found = await usersDb.insert({ user })

    expect(found.email).toEqual(user.email)
  })

  it('updates an existing user', async () => {
    const fake = makeFakeUser()
    const firstName = 'ThisNameDoesNotExist'
    const inserted = await usersDb.insert({ user: fake })
    const updated = await usersDb.update({
      id: inserted.id,
      user: {
        ...inserted,
        firstName,
      },
    })

    expect(updated.firstName).toBe(firstName)
  })

  it('deletes an existing user', async () => {
    await Promise.all(
      [
        { user: makeFakeUser() },
        { user: makeFakeUser() },
        { user: makeFakeUser() },
      ].map(usersDb.insert)
    )

    const before = await usersDb.findAll({ count: 10, start: 0 })

    await usersDb.remove({ id: 1 })
    const after = await usersDb.findAll({ count: 10, start: 0 })

    expect(after.length).toBe(before.length - 1)
  })
})
