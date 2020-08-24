const inputError = (err, _req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: err.message })
  }
  next()
}

const handleInputError = app => {
  app.use(inputError)
}

export const errors = [handleInputError]
