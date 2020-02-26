const Blog = require('../models/blog')
const User = require('../models/user')

const nonExistingId = async () => {
  const note = new Blog({
    title: '4THOT said if this post gets 1k upvotes we become a MrMouton themed sub',
    author: 'xxonemodog',
    url: 'https://www.reddit.com/r/Destiny/comments/d4cqbq/4thot_said_if_this_post_gets_1k_upvotes_we_become/',
    likes: 2700
  })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  nonExistingId, blogsInDb, usersInDb
}