import { makeFakeUser } from '../../__tests__/fixtures/user'
import { makeUser } from './'

describe('user', () => {
  it('can have an email', () => {
    const email = 'Nicholas@gmail.com'

    const fakeUser = makeFakeUser({ email })
    const user = makeUser(fakeUser)

    expect(user.getEmail()).toBe(email)
  })

  it.todo('can have an email')

  it.todo('can have a password')

  it.todo('van have a hash')

  it.todo('can have a first name')

  it.todo('can have a last name')
})
