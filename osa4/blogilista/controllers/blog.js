const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  res.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    blog ?
      res.json(blog.toJSON())
      : res.status(404).end()
  } catch (err) {
    next(err)
  }
})


blogRouter.put('/:id', async (req, res, next) => {
  const { likes } = req.body
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { likes } , { new: true })
    res.json(updatedBlog)   
  } catch (err) {
    next(err)
  }
})

blogRouter.post('/', async (req, res, next) => {
  
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if(!req.token || !decodedToken.id) return res.status(401).json({error: 'token missing or invalid'})
    
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      ...req.body,
      user: user._id
    })
    const savedBlog = await blog.save()
    res.json(savedBlog)
    try {
      await User.findByIdAndUpdate(user._id, { $push: {'blogs': savedBlog._id} })
    } catch (err) {
      next(err)
    }
    res.json(savedBlog.toJSON)
  } catch (err) {
    next(err)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if(!req.token || !decodedToken.id) return res.status(401).json({error: 'token missing or invalid'})
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = blogRouter