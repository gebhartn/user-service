import { makeDb } from '../../../__tests__/fixtures/db'
import { makeUsersDb } from './'
import { makeFakeUser } from '../../../__tests__/fixtures/user'

describe('users database', () => {
  let usersDb

  beforeEach(async () => {
    usersDb = makeUsersDb({ makeDb })
  })

  it('finds all users', async () => {
    const found = await usersDb.findAll({ count: 2, start: 0 })

    expect(found.length).toBe(2)
  })

  it('takes a count and a start', async () => {
    const found = await usersDb.findAll({ count: 2, start: 1 })

    expect(found[0].id).toBe(2)
    expect(found.length).toBe(2)
  })

  it('finds a user by id', async () => {
    const user = await usersDb.findById({ id: 1 })

    expect(user.email).toBe('juan@gmail.com')
  })

  it('finds a user by email', async () => {
    const user = await usersDb.findByEmail({ email: 'juan@gmail.com' })

    expect(user.id).toBe(1)
  })

  it('finds a user by hash', async () => {
    const user = await usersDb.findByHash({ hash: 'fake_hashcode1' })

    expect(user.email).toBe('juan@gmail.com')
  })

  it('inserts a new user', async () => {
    const user = makeFakeUser()
    const result = await usersDb.insert({ user })

    expect(result.email).toEqual(user.email)
  })

  it('updates an existing user', async () => {
    const fake = makeFakeUser()
    const firstName = 'Xxxtentacion'
    const result = await usersDb.insert({ user: fake })
    const user = await usersDb.update({
      id: result.id,
      user: {
        ...result,
        firstName,
        lastName: result.last_name,
        hash: 'hash_is_invalid',
      },
    })

    expect(user.first_name).toBe(firstName)
  })

  it('deletes an existing user', async () => {
    const newUser = makeFakeUser()
    await usersDb.insert({ user: newUser })
    const found = await usersDb.findAll({ count: 10, start: 0 })
    const deleting = found[found.length - 1]

    const result = await usersDb.remove({ id: deleting.id })

    expect(result.length).toBe(0)
  })
})
