export async function notFound() {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    body: { error: 'Not found.' },
    status: 404,
  }
}
