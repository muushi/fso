const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((acc, cur) => acc + cur, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, cur) => (prev.likes > cur.likes) ? prev : cur, {})
}

const mostBlogs = (blogs) => {
  const grouped = _.groupBy(blogs, 'author')
  Object.keys(grouped).forEach((key) => {
    grouped[key] = grouped[key].length
  })
  const resArr = Object.entries(grouped)[Object.values(grouped).indexOf(Math.max(...Object.values(grouped)))]
  return {
    author: resArr[0],
    blogs: resArr[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}