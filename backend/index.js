const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./mongo') // already connected
const PhoneItem = require('./models/Phonebook')
const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')
const { response } = require('express')

// Create server
const server = express()
server.use(cors())
server.use(express.json())

// init express app
const serverPort = process.env.PORT || 3001

const theServer = server.listen(serverPort, () => {
  console.log(`listening at localhost:${serverPort}`)
})

// static SERVER
const staticServerPath = './build' // ruta relativa del proyecto
server.use(express.static(staticServerPath))

// ENDPOINTS
// listado ALL personas GET
// server.get('/api/persons', (req, res, next) => {
//   PhoneItem.find({})
//     .then((items) => res.json(items))
//     .catch((err) => next(err))
// })

//CON ASYNC AWAIT para que se vea en código síncrono.
server.get('/api/persons', async (req, res) => {
  const persons = await PhoneItem.find({})
  res.json(persons)
})

// POST add Persons con ASYNC-AWAIT
server.post('/api/persons', async (req, res, next) => {
  const pers = req.body
  if (!pers) {
    return res.status(400).json({
      error: 'content missing',
    })
  } else if (!pers.name) {
    res.status(400).json({
      error: 'name missing',
    })
  } else if (isNaN(pers.number)) {
    res.status(400).json({
      error: 'phone missing',
    })
  } else {
    const newPers = new PhoneItem({
      name: pers.name,
      number: pers.number,
    })

    // newPers
    //   .save()
    //   .then((savedPers) => {
    //     res.json(savedPers)
    //   })
    //   .catch((err) => console.log(err))
    try {
      const savedPers = await newPers.save()
      res.json(savedPers)
    } catch (err) {
      next(err)
    }
  }
  // }
})

// PUT Update
server.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  const pers = req.body

  // console.log(pers)
  PhoneItem.findByIdAndUpdate(id, pers, { new: true })
    .then((resp) => {
      console.log(resp)
      if (resp === null) res.status(400).end()
      else res.send(resp)
    })
    .catch((err) => {
      next(err)
    })
})
// Info 1 persona
server.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  const params = { name: { $regex: `.*${id}.*`, $options: 'i' } }
  console.log(params)
  PhoneItem.find(params)
    .then((resp) => {
      console.log('resp', resp)
      if (resp.length === 0) {
        // console.log('vacio')
        res.status(404).end()
      } else {
        res.send(resp)
      }
    })

    .catch((err) => {
      console.log(err)
      next(err)
    })
})

// DELETE person
server.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const params = { _id: id }
  console.log(params)
  PhoneItem.deleteOne(params).then((resp) => {
    if (resp.deletedCount === 1) res.status(204).end()
    res.status(404).end()
  })
})

// info
server.get('/info', (req, res) => {
  let people = []
  PhoneItem.find({}).then((items) => {
    people = items
    const message = `<p>Phonebook has info for ${people.length} people</p>`
    const date = new Date()
    const response = message + `<p>${date}</p>`
    res.send(response)
  })
})

// Middleware errores
server.use(notFound)
server.use(handleErrors)

module.exports = { server, theServer }
