require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')
const app = express()

morgan.token('payload', function getPayload(req) {
  return req.body && JSON.stringify(req.body)
})

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :payload'))

app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

app.get('/info', (request, response) => {
  Contact.find({}).then(contacts => {
    response.send(`Phonebook has info for ${contacts.length} people<br><br>${new Date()}`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id).then(note => {
    response.json(note)
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id).then(result => {
    response.status(204).end()
  }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  // check for name
  if (!body.name) {
    return response.status(400).json({ 
      error: 'no name' 
    })
  }
  // check for number
  if (!body.number) {
    return response.status(400).json({ 
      error: 'no number' 
    })
  }
  const contact = new Contact({
    name: body.name,
    number: body.number
  })
  contact.save().then(savedContact => {
    response.json(savedContact)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  // check for name
  if (!body.name) {
    return response.status(400).json({ 
      error: 'no name' 
    })
  }
  // check for number
  if (!body.number) {
    return response.status(400).json({ 
    error: 'no number' 
    })
  }
  const contact = {
    name: body.name,
    number: body.number
  }
  Contact.findByIdAndUpdate(request.params.id, contact, {new: true})
    .then(updatedContact => {
      response.json(updatedContact)
    }).catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.error(err.message)
  if (err.name === 'CastError') {
    return res.status(400).send({error: 'malformatted id'})
  }
  if (err.name ==='ValidationError') {
    return res.status(400).send({error: err.message})
  }

  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})