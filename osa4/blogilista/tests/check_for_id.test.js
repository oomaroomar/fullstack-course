const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs have an id field', async () => {

  const response = await api.get('/api/blogs')

  const blogs = response.body

  console.log(blogs)

  blogs.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})