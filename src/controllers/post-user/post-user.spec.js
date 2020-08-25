import { makePostUser } from './'
import { hash, validate } from '../'
import { makeFakeUser } from '../../../__tests__/fixtures/user'

describe('post user controller', () => {
  it('successfully posts a user', async () => {
    const postUser = makePostUser({ addUser: u => u, hash, validate })
    const user = makeFakeUser()
    const request = {
      body: user,
    }

    const actual = await postUser(request)

    expect(actual.status).toBe(201)
  })

  it('reports user errors', async () => {
    const postUser = makePostUser({
      addUser: () => {
        throw Error('Whoops!')
      },
      hash,
      validate,
    })

    const request = { body: makeFakeUser() }

    const actual = await postUser(request)

    expect(actual.status).toBe(400)
  })

  it('throws on invalid email', async () => {
    const postUser = makePostUser({ addUser: u => u, hash, validate })
    const user = makeFakeUser({ email: 'weak' })

    try {
      await postUser({ body: user })
    } catch (e) {
      expect(e.message).toMatch('User must have a valid email')
    }
  })

  it('throws on invalid password', async () => {
    const postUser = makePostUser({ addUser: u => u, hash, validate })
    const user = makeFakeUser({ password: 'weak' })

    try {
      await postUser({ body: user })
    } catch (e) {
      expect(e.message).toMatch('Password too weak')
    }
  })
})
