export function health() {
  const check = {
    uptime: process.uptime(),
    message: 'ok',
    timestamp: new Date().toUTCString(),
  }

  return {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
    body: { ...check },
  }
}
