const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: unknownEndpoint })
}

const errorHandler = (err, req, res, next) => {
  console.error(err.message)
  if(err.name === 'CastError' && err.kind === 'ObjectId') return res.status(400).send({ error: 'malformatted id' })
  if(err.name === 'ValidationError') return res.status(400).json({ error: err.message })
  if(err.name === 'JsonWebTokenError') return res.status(401).json({error: 'invalid token'})
  next(err)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}