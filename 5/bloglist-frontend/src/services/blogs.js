import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = (body, user) => {
  // error handling?
  const request = axios.post(baseUrl, {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0
  }, {
    headers: {
      'Authorization': `bearer ${user.token}`
    }
  })
  return request.then(response => response.data)
}

const updateBlog = (body, user) => {
  const request = axios.put(`${baseUrl}/${body.id}`, {
    user: body.user,
    likes: body.likes,
    author: body.author,
    title: body.title,
    url: body.url
  }, {
    headers: {
      'Authorization': `bearer ${user.token}`
    }
  })
  return request.then(response => response.data)
}

export default { getAll, createBlog, updateBlog }