
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'

import {DumbBlog} from './DumbBlog'

afterEach(cleanup)

test('initial render only shows title and author', () => {
  const blog = {
    likes: 3400,
    title: 'Clarifying some previous events',
    author: 'Destiny',
    url: 'https://www.reddit.com/r/Destiny/comments/dmjb18/clarifying_some_previous_events/',
    user: {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      id: '5e0ba26dcfa5f02da76730a6'
    }
  }

  const component = render(
    <DumbBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent('Clarifying some previous events')
  expect(component.container).toHaveTextContent('Destiny')

})
test.only('button clicked', () => {

  const blog = {
    likes: 3400,
    title: 'Clarifying some previous events',
    author: 'Destiny',
    url: 'https://www.reddit.com/r/Destiny/comments/dmjb18/clarifying_some_previous_events/',
    user: {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      id: '5e0ba26dcfa5f02da76730a6'
    }
  }
  const mockHandler = jest.fn()

  const component = render(
    <DumbBlog likes={blog.likes} blog={blog} onClick={mockHandler} visibility={true} />
  )

  expect(component.container).toHaveTextContent('Clarifying some previous events')
  expect(component.container).toHaveTextContent('Destiny')
  expect(component.container).toHaveTextContent(3400)
  expect(component.container).toHaveTextContent('https://www.reddit.com/r/Destiny/comments/dmjb18/clarifying_some_previous_events/')

})