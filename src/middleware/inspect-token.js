export function inspectToken(req, res, next) {
  const token = req.headers.authorization || ''
  let payload

  try {
    payload = jwt.verify(token, process.env.SECRET)
    res.locals.payload = payload
  } catch (e) {
    return res.status(401).json({ error: 'A valid token is required' })
  }

  const { id } = payload
  const newToken = jwt.sign({ id }, process.env.SECRET, { expiresIn: '1h' })
  res.setHeader('authorization', newToken)

  next()
}
