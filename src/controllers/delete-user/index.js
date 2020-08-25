export function makeDeleteUser({ removeUser }) {
  return async function deleteUser(request) {
    const headers = {
      'Content-Type': 'application/json',
    }

    try {
      const deleted = await removeUser({ id: request.params.id })
      return {
        headers,
        status: deleted.count === 0 ? 404 : 200,
        body: { deleted },
      }
    } catch (e) {
      return { headers, status: 400, body: { error: e.message } }
    }
  }
}
