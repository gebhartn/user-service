export function makeRemoveUser({ usersDb }) {
  const doNothing = () => ({ count: 0, message: 'User not found' })

  const hardDelete = async ({ user }) => {
    await usersDb.remove({ id: user.id })
    return { count: 1, message: 'Deleted' }
  }

  return async function removeUser({ id } = {}) {
    if (!id) throw new Error('You must supply an ID')

    const user = await usersDb.findById({ id })

    if (!user) return doNothing()

    return hardDelete({ user })
  }
}
