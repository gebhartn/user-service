export function makePostUser({ addUser, hash }) {
  return async function postUser(request) {
    try {
      const { ...user } = request.body
      const response = await addUser({
        ...user,
        password: hash(user.password),
      })

      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString(),
        },
        status: 201,
        body: { ...response },
      }
    } catch (e) {
      return {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
        body: { error: e.message },
      }
    }
  }
}
