import React from 'react'
import PropTypes from 'prop-types'

const DumbBlog = ({blog, makeTheLike, setVisibility, blogStyle, removeBlog, likes, userIsOwner, 
  visibility }) => {
  return visibility ? 
    <div className='bloggers' onClick={() => setVisibility(false)} style={blogStyle}>
      {blog.title}
      <br/> by {blog.author}
      <br/> {blog.url}
      <br/> {likes} likes <button className='nappi' onClick={(e) => makeTheLike(e, blog.id, {
        ...blog,
        likes: likes + 1
      })} >like</button>
      <br/> added by {blog.user.username}
      <br/>{userIsOwner ? 
        <button onClick={() => removeBlog(blog.id)} >remove</button>
        : null
      } 
    </div>
    :<div onClick={() => setVisibility(true)} >
      {blog.title} {blog.author}
    </div> 
}
  
  
DumbBlog.propTypes = {
  blog: PropTypes.object,
  setVisibility: PropTypes.func,
  blogStyle: PropTypes.object,
  removeBlog: PropTypes.func,
  makeTheLike: PropTypes.func,
  likes: PropTypes.number,
  userIsOwner: PropTypes.bool,
  visibility: PropTypes.bool

}

export { DumbBlog }