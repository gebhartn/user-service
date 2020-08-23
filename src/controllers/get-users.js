export function makeGetUsers({ listUsers }) {
  return async function getUsers(request) {
    const headers = {
      'Content-Type': 'application/json',
    }

    try {
      const users = await listUsers({
        start: request.query.start,
        count: request.query.count,
      })

      return {
        headers,
        status: 200,
        body: users,
      }
    } catch (e) {
      console.error(e)

      return {
        headers,
        status: 400,
        body: { error: e.message },
      }
    }
  }
}
