/* eslint no-console: ["error", { allow: ["log"] }] */

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { addBlog } from '../actions/blogs'

import CreateBlogInput from '../components/CreateBlogInput'

import Form from 'react-bootstrap/Form'

const CreateBlog = ({ notifSetter }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogFormVisibility, setBlogFormVisibility] = useState(false)

  const { user } = useSelector(state => state)

  const dispatch = useDispatch()

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
    console.log('handleSubmit called')
    try {
      dispatch(addBlog({ title, author, url }, user))
      notifSetter('success', `A new blog ${title} by ${author} added`)
    } catch (err) {
      notifSetter('danger', `Failed to add blog ${err.message}`)
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if (!blogFormVisibility)
    return <button onClick={() => setBlogFormVisibility(true)}>new blog</button>
  return (
    <Form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <CreateBlogInput
        handler={handleTitleChange}
        value={title}
        text={'title: '}
      />
      <CreateBlogInput
        handler={handleAuthorChange}
        value={author}
        text={'author: '}
      />
      <CreateBlogInput handler={handleUrlChange} value={url} text={'url: '} />
      <div>
        <button type='submit'>create</button>
        <button type='button' onClick={() => setBlogFormVisibility(false)}>
          cancel
        </button>
      </div>
    </Form>
  )
}

CreateBlog.propTypes = {
  notifSetter: PropTypes.func,
  addBlogToState: PropTypes.func,
}

export default CreateBlog
