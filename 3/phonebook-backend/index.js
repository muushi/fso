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

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  }
]

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

app.get('/api/persons/:id', (request, response) => {
  Contact.findById(request.params.id).then(note => {
    response.json(note)
  })
  /* const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  } */
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
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
  })
  /*
  // check if name exists
  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000),
  }
  persons = persons.concat(person)

  response.json(person)
  */
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})