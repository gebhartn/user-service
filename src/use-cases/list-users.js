export function makeListUsers({ usersDb }) {
  return async function listUsers({ start = 0, count = 10 } = {}) {
    if (start < 0) start = 0
    if (count > 10 || count < 1) count = 10

    const users = await usersDb.findAll({ start, count })

    return users
  }
}
