import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    id: 'qwe321',
    user: 'abc123',
    likes: 2,
    author: 'author mcAuthorface',
    title: 'title of the blog',
    url: 'domain'
  }

  render(<Blog blog={blog} updateBlog={null} removeBlog={null} user={null} />)

  const element = screen.getByText('title of the blog author mcAuthorface')
  expect(element).toBeDefined()
})

test('clicking the button exposes all info', async () => {
  const blog = {
    id: 'qwe321',
    user: 'abc123',
    likes: 2,
    author: 'author mcAuthorface',
    title: 'title of the blog',
    url: 'domain'
  }

  render(<Blog blog={blog} updateBlog={null} removeBlog={null} user={null} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.getByText('domain likes 2')
  expect(element).toBeDefined()
})

test('clicking the button exposes all info', async () => {
  const blog = {
    id: 'qwe321',
    user: 'abc123',
    likes: 2,
    author: 'author mcAuthorface',
    title: 'title of the blog',
    url: 'domain'
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} updateBlog={mockHandler} removeBlog={null} user={null} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = container.querySelector('.likebtn')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
})