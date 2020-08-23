export function makeCallback(controller) {
  return async (req, res) => {
    const request = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
      },
    }

    try {
      const response = await controller(request)

      if (response.headers) {
        res.set(response.headers)
      }
      res.type('json')
      res.status(response.status).send(response.body)
    } catch (e) {
      res.status(500).send({ error: 'An unknown error occurred.' })
    }
  }
}
