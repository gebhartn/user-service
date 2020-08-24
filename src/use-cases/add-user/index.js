import { makeUser } from '../../user'

export function makeAddUser({ usersDb }) {
  return async function addUser(body) {
    const user = makeUser(body)
    const exists = await usersDb.findByEmail({ email: user.getEmail() })

    if (exists) throw new Error('User already exists')

    return usersDb.insert({
      user: {
        email: user.getEmail(),
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        password: user.getPassword(),
        hash: user.getHash(),
      },
    })
  }
}
