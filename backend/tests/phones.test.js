const supertest = require('supertest')
const mongoose = require('mongoose')
const { server, theServer } = require('../index')
const PhoneItem = require('../models/Phonebook')
const api = supertest(server)

const { testPhones } = require('./helper')

beforeEach(async () => {
  await PhoneItem.deleteMany()

  const pers1 = new PhoneItem(testPhones[0])
  await pers1.save()
  const pers2 = new PhoneItem(testPhones[1])
  await pers2.save()
})

test('phones are returned as json', async () => {
  await api
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two pers', async () => {
  const response = await api.get('/api/persons')
  expect(response.body).toHaveLength(testPhones.length)
})

test('First name is aprendiendo test', async () => {
  const response = await api.get('/api/persons')
  expect(response.body[0].name).toBe('Aprendiendo Test')
})
test('A name  is Será que es muy parecida', async () => {
  const response = await api.get('/api/persons')
  const names = response.body.map((pers) => pers.name)
  expect(names).toContain('Será que es muy parecida')
})
test('a valid phone can be added', async () => {
  const newNote = {
    name: 'Testing Ok',
    number: '123456789',
  }
  await api
    .post('/api/persons')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  //comprobación ok de verdad
  const response = await api.get('/api/persons')
  const names = response.body.map((pers) => pers.name)
  expect(names).toContain(newNote.name)

  //tmb podemos mirar la longitud
  expect(response.body).toHaveLength(testPhones.length + 1)
})

test('a pers without name cant be added', async () => {
  const newNote = {
    // name: 'Testing Ok',
    number: '123456789',
  }
  await api.post('/api/persons').send(newNote).expect(400)
  //comprobación ko de verdad
  const response = await api.get('/api/persons')
  expect(response.body).toHaveLength(testPhones.length)
})

test('a pers without number cant be added', async () => {
  const newNote = {
    // name: 'Testing Ok',
    number: '123456789',
  }
  await api.post('/api/persons').send(newNote).expect(400)
  //comprobación ko de verdad
  const response = await api.get('/api/persons')
  expect(response.body).toHaveLength(testPhones.length)
})
test('a pers without number cant be added', async () => {
  const newNote = {
    // name: 'Testing Ok',
    number: '123456789',
  }
  await api.post('/api/persons').send(newNote).expect(400)
  //comprobación ko de verdad
  const response = await api.get('/api/persons')
  expect(response.body).toHaveLength(testPhones.length)
})
test('a pers can be deleted', async () => {
  const { response } = await getAllPers
})
afterAll(() => {
  theServer.close()
  mongoose.connection.close()
})
