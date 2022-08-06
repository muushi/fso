import { useState } from "react"

const Blog = ({blog}) => {
  const [collapse, setCollapse] = useState(true)
  const hideWhenCollapsed = { display: collapse ? 'none' : '' }
  const blogStyle = {
    border: '1px solid',
    margin: '2px',
    padding: '2px'
  }
  return (
  <div onClick={() => setCollapse(!collapse)} style={blogStyle}>
  <div>
    {blog.title} <button>{collapse ? 'view' : 'hide'}</button>
  </div>
  <div style={hideWhenCollapsed}>
    {blog.url} <br />
    likes {blog.likes} <button>like</button> <br />
    {blog.author} <br />
  </div>
  </div>  
)}

export default Blog