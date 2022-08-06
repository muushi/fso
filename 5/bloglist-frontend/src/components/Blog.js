import { useState } from "react"

const Blog = ({blog, updateBlog}) => {
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
    const newLikes = parseInt(blog.likes) + 1
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

  return (
  <div style={blogStyle}>
  <div onClick={() => setCollapse(!collapse)}>
    {blog.title} <button>{collapse ? 'view' : 'hide'}</button>
  </div>
  <div style={hideWhenCollapsed}>
    {blog.url} <br />
    likes {likes} <button onClick={addLike}>like</button> <br />
    {blog.author} <br />
  </div>
  </div>  
)}

export default Blog