export function makeCallback(controller) {
  return (req, res) => {
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

    controller(request)
      .then(response => {
        if (response.headers) {
          res.set(response.headers)
        }
        res.type('json')
        res.status(response.status).send(response.body)
      })
      .catch(() =>
        res.status(500).send({ error: 'An unknown error occurred.' })
      )
  }
}
