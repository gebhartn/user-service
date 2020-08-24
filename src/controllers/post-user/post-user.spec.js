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
})
