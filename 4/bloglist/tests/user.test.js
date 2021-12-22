const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
})

describe('user POST operations', () => {
  test('too short username should lead to 400 response', async () => {
    const newUser = {
      username: 'te',
      name: 'Test McTestFace',
      password: 'pass',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const users = await api.get('/api/users')
    expect(users.body).toHaveLength(0)
  })
  test('missing url field should lead to 400 response', async () => {
    const newUser = {
      username: 'testface',
      name: 'Test McTestFace',
      password: 'pw',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const users = await api.get('/api/users')
    expect(users.body).toHaveLength(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})