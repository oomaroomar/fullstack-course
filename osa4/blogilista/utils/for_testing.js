const dummy = (blogs) => {
  
  console.log(blogs)

  return 1
}

const totalLikes = (blogs) => {

  return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {

  if(blogs.length === 0) return null

  return blogs.reduce((mostLiked, cur) => cur.likes >= mostLiked.likes ? cur : mostLiked, {likes: 0})
}

const mostBlogs = (blogs) => {

  if(blogs.length === 0) return null

  const bloggers = []

  blogs.forEach(blog => {
    const indexOfBlogger = bloggers.findIndex(blogger => blogger.author === blog.author) 
    indexOfBlogger === -1 ?
      bloggers.push({author: blog.author, blogs: 1})
      : bloggers[indexOfBlogger].blogs += 1
  })

  console.log(bloggers)

  return bloggers.reduce((largest, blogger) => {
    return blogger.blogs >= largest.blogs ? blogger : largest 
  }, {blogs: 0})

}

const mostLikes = (blogs) => {
  if(blogs.length === 0) return null

  const bloggers = []

  blogs.forEach(blog => {
    const indexOfBlogger = bloggers.findIndex(blogger => blogger.author === blog.author) 
    indexOfBlogger === -1 ?
      bloggers.push({author: blog.author, likes: blog.likes})
      : bloggers[indexOfBlogger].likes += blog.likes
  })

  return bloggers.reduce((largest, blogger) => {
    return blogger.likes >= largest.likes ? blogger : largest 
  }, {likes: 0})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}