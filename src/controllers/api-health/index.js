export function health() {
  const check = {
    uptime: process.uptime(),
    message: 'ok',
    timestamp: new Date().toUTCString(),
  }

  try {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
      body: { ...check },
    }
  } catch (e) {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 503,
      body: { ...check, message: e },
    }
  }
}
