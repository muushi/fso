const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
  logger.info('method:', req.method)
  logger.info('path:  ', req.path)
  logger.info('body:  ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  next(err)
}

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = auth.substring(7)
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const token = auth.substring(7)
    const decodedJwt = jwt.verify(token, process.env.SECRET)
    if (!decodedJwt.id) {
      return res.status(401).json({ error: 'invalid token' })
    }
    const user = await User.findById(decodedJwt.id)
    req.user = user
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}