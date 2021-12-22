const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  if (blogs) {
    res.json(blogs)
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', async (req, res) => {
  if (req.body.title === undefined || req.body.url === undefined) {
    res.status(400).end()
  } else {
    const blog = new Blog(req.body)
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
  }
})

module.exports = blogsRouter