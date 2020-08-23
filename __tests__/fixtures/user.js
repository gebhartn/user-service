import { createHash } from 'crypto'
import { name, internet } from 'faker'
import { hashSync } from 'bcryptjs'

function md5(text) {
  return createHash('md5').update(text, 'utf-8').digest('hex')
}

let id = 0

export function makeFakeUser(overrides) {
  const firstName = name.firstName()
  const lastName = name.lastName()
  const email = internet.email()
  const password = internet.password()

  const user = {
    id: ++id,
    email,
    firstName,
    lastName,
    email,
    password: hashSync(password, 8),
    createdOn: new Date().toUTCString(),
    updatedOn: new Date().toUTCString(),
  }

  user.hash = md5(email)

  return {
    ...user,
    ...overrides,
  }
}