export function makeUsersDb({ makeDb }) {
  return Object.freeze({
    findAll,
    findById,
    findByEmail,
    findByHash,
    insert,
    update,
    remove,
  })

  async function findAll() {
    throw new Error('Not yet implemented', { makeDb })
  }

  async function findById({ id }) {
    throw new Error('Not yet implemented', { id, makeDb })
  }

  async function findByEmail({ email }) {
    throw new Error('Not yet implemented', { email, makeDb })
  }

  async function findByHash({ user }) {
    throw new Error('Not yet implemented', { user, makeDb })
  }

  async function insert({ user }) {
    throw new Error('Not yet implemented', { user, makeDb })
  }

  async function update({ id }) {
    throw new Error('Not yet implemented', { id, makeDb })
  }

  async function remove({ id }) {
    throw new Error('Not yet implemented', { id, makeDb })
  }
}
