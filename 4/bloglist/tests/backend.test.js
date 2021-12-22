const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../utils/testHelper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initBlogs)
})

test('blog info is returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('there is correct amount of blogs', async () => {
  const resp = await api.get('/api/blogs')
  expect(resp.body).toHaveLength(6)
})
test('identifier field is correctly id and not _id', async () => {
  const resp = await api.get('/api/blogs')
  resp.body.forEach(k => expect(k.id).toBeDefined())
})
test('blog addition works correctly', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test McTestFace',
    url: 'localhost',
    likes: 0,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initBlogs.length + 1)

  const contents = blogs.map(b => b.title)
  expect(contents).toContain('Test Blog')
})
test('blog addition without likes forces likes to 0', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test McTestFace',
    url: 'localhost',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  expect(blogs[blogs.length-1].likes).toBe(0)

})

afterAll(() => {
  mongoose.connection.close()
})