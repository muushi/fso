import { useState } from "react"

const Blog = ({blog, updateBlog, removeBlog, user}) => {
  const [collapse, setCollapse] = useState(true)
  const [likes, setLikes] = useState(blog.likes)
  const hideWhenCollapsed = { display: collapse ? 'none' : '' }
  const blogStyle = {
    border: '1px solid',
    margin: '2px',
    padding: '2px'
  }
  const addLike = (event) => {
    event.preventDefault()
    const newLikes = parseInt(likes) + 1
    const requestBody = {
      id: blog.id,
      user: blog.user.id,
      likes: newLikes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateBlog(requestBody)
    setLikes(newLikes)
  }
  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }
  return (
  <div style={blogStyle}>
  <div onClick={() => setCollapse(!collapse)}>
    {blog.title} <button>{collapse ? 'view' : 'hide'}</button>
  </div>
  <div style={hideWhenCollapsed}>
    {blog.url} <br />
    likes {likes} <button onClick={addLike}>like</button> <br />
    {blog.author} <br />
    {user && user.username === blog.user.username ? (<button onClick={deleteBlog}>remove</button>) : ''}
  </div>
  </div>  
)}

export default Blog