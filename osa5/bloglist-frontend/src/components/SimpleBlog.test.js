/* eslint no-console: ["error", { allow: ["log"] }] */

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'

import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    likes: 3400,
    title: 'Clarifying some previous events',
    author: 'Destiny',
    url: 'https://www.reddit.com/r/Destiny/comments/dmjb18/clarifying_some_previous_events/'
  }

  const component = render(
    <SimpleBlog blog={blog} onClick={() => console.log('painettu')} />
  )
  

  expect(component.container).toHaveTextContent('Clarifying some previous events')
  expect(component.container).toHaveTextContent('Destiny')
  expect(component.container).toHaveTextContent(3400)


})
test.only('button clicks', () => {

  const blog = {
    likes: 3400,
    title: 'Clarifying some previous events',
    author: 'Destiny',
    url: 'https://www.reddit.com/r/Destiny/comments/dmjb18/clarifying_some_previous_events/'
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})