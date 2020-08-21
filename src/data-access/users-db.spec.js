import { makeUsersDb } from './users-db'

// import { makeDb } from '../../__test__/fixtures/db'
// import { makeFakeUser } from '../../__test__/fixtures/user'

describe('users database', () => {
  let usersDb

  beforeEach(async () => {
    usersDb = makeUsersDb({ makeDb })
  })

  it('finds all users', async () => {
    throw new Error('Not yet implemented', await usersDb.findAll())
  })

  it('finds a user by id', async () => {
    throw new Error('Not yet implemented', await usersDb.findById())
  })

  it('finds a user by email', async () => {
    throw new Error('Not yet implemented', await usersDb.findByEmail())
  })

  it('finds a user by hash', async () => {
    throw new Error('Not yet implemented', await usersDb.findByHash())
  })

  it('inserts a new user', async () => {
    throw new Error('Not yet implemented', await usersDb.insert())
  })

  it('updates an existing user', async () => {
    throw new Error('Not yet implemented', await usersDb.update())
  })

  it('deletes an existing user', async () => {
    throw new Error('Not yet implemented', await usersDb.remove())
  })
})
