export function makePatchUser({ editUser }) {
  return async function patchUser(request) {
    try {
      const { ...user } = request.body

      const updating = {
        ...user,
        id: request.params.id,
      }

      const patched = await editUser(updating)

      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString(),
        },
        status: 200,
        body: { patched },
      }
    } catch (e) {
      if (e.name === 'RangeError') {
        return {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 404,
          body: { error: e.message },
        }
      }
      return {
        headers: {
          'Content-Type': 'applcation/json',
        },
        status: 400,
        body: { error: e.message },
      }
    }
  }
}
