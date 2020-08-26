import { makeFakeUser } from '../../__tests__/fixtures/user'
import { makeUser } from './'

describe('user', () => {
  it('can have an email', () => {
    const email = 'Nicholas@gmail.com'

    const fakeUser = makeFakeUser({ email })
    const user = makeUser(fakeUser)

    expect(user.getEmail()).toBe(email)
  })

  it('can have a password', () => {
    const password = 'ordinarycorrupthumanlove'

    const fakeUser = makeFakeUser({ password })
    const user = makeUser(fakeUser)

    expect(user.getPassword()).toBe(password)
  })

  it('can have a hash', () => {
    const overrides = {
      email: 'Nicholas@gmail.com',
      firstName: 'Nicholas',
      lastName: 'Gebhart',
    }

    const fakeUser = makeFakeUser({ ...overrides })
    const user = makeUser(fakeUser)

    expect(user.getHash()).toBe('f10433f8166a05df94c50bea588fd652')
  })

  it('can have a first name', () => {
    const firstName = 'Nicholas'

    const fakeUser = makeFakeUser({ firstName })
    const user = makeUser(fakeUser)

    expect(user.getFirstName()).toBe(firstName)
  })

  it('can have a last name', () => {
    const lastName = 'Gebhart'

    const fakeUser = makeFakeUser({ lastName })
    const user = makeUser(fakeUser)

    expect(user.getLastName()).toBe(lastName)
  })

  it('hashes without first + last', () => {
    let firstName,
      lastName = undefined

    let user = makeUser({ firstName, lastName })

    expect(user.getHash()).not.toBe(null)
    expect(user.getFirstName()).toBe(undefined)
    expect(user.getLastName()).toBe(undefined)
  })
})
