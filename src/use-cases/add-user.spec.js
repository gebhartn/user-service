import { makeAddUser } from './add-user'
import { makeUsersDb } from '../data-access/users-db'

import { makeFakeUser } from '../../__test__/figures/user'
import { makeDb } from '../../__test__/fixtures/db'

describe('add user', () => {
  let usersDb

  beforeAll(() => {
    usersDb = makeUsersDb({ makeDb })
  })

  it('inserts a user to the database', async () => {
    throw new Error('Not yet implemented', {
      usersDb,
      makeAddUser,
      makeFakeUser,
    })
  })

  it('returns existing user', async () => {
    throw new Error('Not yet implemented', {
      usersDb,
      makeAddUser,
      makeFakeUser,
    })
  })
})
