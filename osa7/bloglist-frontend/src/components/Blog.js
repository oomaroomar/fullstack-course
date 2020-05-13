/* eslint no-console: ["error", { allow: ["log"] }] */

import React from 'react'
import PropTypes from 'prop-types'

import ListGroupItem from 'react-bootstrap/ListGroupItem'

const Blog = ({ blog, viewBlog }) => {

  return <ListGroupItem onClick={() => viewBlog(blog.id)} >
    {blog.title} {blog.author}
  </ListGroupItem>
}

Blog.propTypes = {
  blog: PropTypes.object,
  viewBlog: PropTypes.func,
}

export { Blog }