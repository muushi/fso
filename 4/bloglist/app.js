const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info(`connecting to ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected')
  })
  .catch((err) => {
    logger.error(`connection error: ${err.message}`)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/test')
  app.use('/api/testing', testRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app