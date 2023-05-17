import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = (updatedToken) => {
  token = updatedToken
}

const getToken = () => token

const createBlog = async (body) => {
  // error handling?
  const request = await axios.post(baseUrl, {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0
  }, {
    headers: {
      'Authorization': `bearer ${token}`
    }
  })
  return request.data
}

const updateBlog = async (body) => {
  const request = await axios.put(`${baseUrl}/${body.id}`, {
    user: body.user,
    likes: body.likes,
    author: body.author,
    title: body.title,
    url: body.url
  }, {
    headers: {
      'Authorization': `bearer ${token}`
    }
  })
  return request.data
}

const deleteBlog = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      'Authorization': `bearer ${token}`
    }
  })
  return request.data
}

export default { setToken, getToken, getAll, createBlog, updateBlog, deleteBlog }