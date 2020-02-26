require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
},{
  skip: (req) => req.method !== 'POST'
}))
app.use(morgan('tiny', { skip: (req) => req.method === 'POST' }))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res, next) => {

  Person.find({})
    .then(people => {
      res.send(`
            <p> Phonebook has info for ${people.length} people </p>
            <p>${new Date()}</p> 
        `)
    })
    .catch(err => next(err))
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people.map(person => person.toJSON()))
  })

})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    person ? res.json(person.toJSON()) : res.status(204).end()
  })
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {

  const { name, number } = req.body

  const person = new Person({
    name,
    number,
  })

  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => res.json(savedAndFormattedPerson))
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  const person = {
    name,
    number,
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedNote => res.json(updatedNote))
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: unknownEndpoint })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.error(err.message)
  if(err.name === 'CastError' && err.kind === 'ObjectId') return res.status(400).send({ error: 'malformatted id' })
  if(err.name === 'ValidationError') return res.status(400).json({ error: err.message })
  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
