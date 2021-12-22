const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((acc, cur) => acc + cur, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, cur) => (prev.likes > cur.likes) ? prev : cur, {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}