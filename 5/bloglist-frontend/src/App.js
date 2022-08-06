import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [errorClass, setErrorClass] = useState('error')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const authenticatedUserJSON = window.localStorage.getItem('authenticatedUser')
    if (authenticatedUserJSON) {
      const user = JSON.parse(authenticatedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login credentials:', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'authenticatedUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMsg(
        `Welcome, ${user.name}`
      )
      setErrorClass('info')
      setTimeout(() => {
        setErrorMsg(null)
      }, 3000)
    } catch (ex) {
      setErrorMsg(
        `wrong username or password`
      )
      setErrorClass('error')
      setTimeout(() => {
        setErrorMsg(null)
      }, 3000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('authenticatedUser')
    setUser(null)
    console.log('Logged out.')
  }

  const addBlog = (blogObject) => {
    blogService.createBlog(blogObject, user)
    .then(resp => {
      setBlogs(blogs.concat(resp))
    })
    setErrorMsg(
      `a new blog ${blogObject.title} by ${blogObject.author} added`
    )
    setErrorClass('info')
    setTimeout(() => {
      setErrorMsg(null)
    }, 3000)
  }

  const modifyBlog = (blogObject) => {
    blogService.updateBlog(blogObject, user)
    .then(resp => console.log(JSON.stringify(resp)))
  }

  const sortBlogs = (a,b) => {
    return b.likes - a.likes
  }

  console.log(JSON.stringify(blogs))
  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={errorMsg} errClass={errorClass} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMsg} errClass={errorClass} />
      <div>
        {user.name} logged in&nbsp;
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="new blog">
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.sort(sortBlogs).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={modifyBlog} />
      )}
    </div>
  )
}

export default App
