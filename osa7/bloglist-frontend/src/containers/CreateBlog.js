import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { create } from '../services/blogs'

import CreateBlogInput from '../components/CreateBlogInput'

const CreateBlog = ({notifSetter, addBlogToState}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogFormVisibility, setBlogFormVisibility] = useState(false)

  const handleTitleChange = e => {
    e.preventDefault()
    setTitle(e.target.value)
  }
  const handleAuthorChange = e => {
    e.preventDefault()
    setAuthor(e.target.value)
  }
  const handleUrlChange = e => {
    e.preventDefault()
    setUrl(e.target.value)
  }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const newBlog = await create({title, author, url})
      notifSetter('success', `A new blog ${newBlog.title} by ${newBlog.author} added`)
      addBlogToState(newBlog)
    } catch (err) {
      notifSetter('error', `Failed to add blog ${err.message}`)
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if(!blogFormVisibility) return <button onClick={() => setBlogFormVisibility(true)} >new note</button>
  return( 
    <form>
      <h2>create new</h2>
      <CreateBlogInput handler={handleTitleChange} value={title} text={'title: '} />
      <CreateBlogInput handler={handleAuthorChange} value={author} text={'author: '} />
      <CreateBlogInput handler={handleUrlChange} value={url} text={'url: '} />
      <div>
        <button onClick={handleSubmit} >create</button>
        <button type="button" onClick={() => setBlogFormVisibility(false)} >cancel</button>
      </div>
    </form>
  )
}

CreateBlog.propTypes = {
  notifSetter: PropTypes.func,
  addBlogToState: PropTypes.func
}

export default CreateBlog