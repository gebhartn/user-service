import { makeUser } from '../user'

export function makeEditUser({ usersDb }) {
  return async function editUser({ id, ...changes } = {}) {
    const existing = await usersDb.findById({ id })

    if (!existing) throw new RangeError('User not found.')

    delete existing.password

    const user = makeUser({ ...existing, ...changes })

    if (user.getHash() === existing.hash_code) {
      return existing
    }

    const updated = await usersDb.update({
      id,
      user: {
        email: user.getEmail(),
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        hash: user.getHash(),
      },
    })

    return { ...existing, ...updated }
  }
}
