const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

// test('blogs are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

describe('addition of a new blog', () => {
  test('new blog can be posted', async () => {
    const newBlog = {
      title: 'Congratulations to the Champions of The International 2019!',
      author: 'TheZett',
      url: 'https://www.reddit.com/r/DotA2/comments/cv7wwd/congratulations_to_the_champions_of_the/',
      likes: 20000
    }
    
    const blogsAtStart = await helper.blogsInDb()

    console.log(blogsAtStart)

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)

    const authors = blogsAtEnd.map(blog => blog.author)
    expect(authors).toContain('TheZett')

  })
})

describe('make sure likes exist', () => {
  test('likes attribute will be set', async () => {
    const newBlog = {
      title: 'Congratulations to the Champions of The International 2019!',
      author: 'TheZett',
      url: 'https://www.reddit.com/r/DotA2/comments/cv7wwd/congratulations_to_the_champions_of_the/'
    }

    await api 
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const likesOfLastBlog = blogs[blogs.length -1].likes
    expect(likesOfLastBlog).toBe(0)

  })
})

describe('make sure title or url exist', () => {
  test('url attributes will be set', async () => {
    const newBlog = {
      title: 'Congratulations to the Champions of The International 2019!',
      author: 'TheZett',
      likes: 20000
    }

    await api 
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })
  test('title attribute will be set', async () => {
    const newBlog = {
      author: 'TheZett',
      url: 'https://www.reddit.com/r/DotA2/comments/cv7wwd/congratulations_to_the_champions_of_the/',
      likes: 20000
    }
    await api 
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('make sure removing works', () => {
  test('deleting works', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length -1)
  })
})




afterAll(() => {
  mongoose.connection.close()
})