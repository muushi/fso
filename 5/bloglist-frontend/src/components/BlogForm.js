import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  createBlog
}) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setBlogUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const requestBody = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    createBlog(requestBody)
    setBlogAuthor('')
    setBlogTitle('')
    setBlogUrl('')
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={blogUrl}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm