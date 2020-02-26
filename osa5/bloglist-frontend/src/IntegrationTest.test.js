import React from 'react'
import { 
  render, waitForElement 
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    
    // expectations here

    const blogs = component.container.querySelectorAll('.blogs')
    expect(blogs.length).toBe(0)
  })
})