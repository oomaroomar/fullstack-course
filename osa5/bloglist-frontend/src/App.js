/* eslint no-console: ["error", { allow: ["log"] }] */

import React, { useState, useEffect } from 'react'

import CreateBlog from './containers/CreateBlog'

import { loginRequest } from './services/login'
import { getAll, setToken } from './services/blogs'
import { newAccountRequest } from './services/newAccountRequest'

import { useField } from './hooks/index'

import { Login } from './components/Login'
import { CreateAccount } from './components/CreateAccount'
import { Blog } from './components/Blog'
import { BlogScreen } from './components/BlogScreen'
import { Notification } from './components/Notification'

import './index.css'

const App = () => {

  const username = useField('text')
  const password = useField('text')
  const newUsername = useField('text')
  const newPassword = useField('text')
  
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notif, setNotif] = useState({type: null, message: null})

  useEffect(() => {
    getAll()
      .then(res => setBlogs(res.sort((a, b) => b - a)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }}, [])

  const login = async (e) => {
    e.preventDefault()
    try {
      const they = await loginRequest(username.value, password.value)
      setUser(they)
      window.localStorage.setItem('user', JSON.stringify(they))
      setToken(they.token)
    } catch (err) {
      notifSetter('error', 'Wrong username or password')
    }
    password.reset()
  }
  const logout = (e) => {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem('user')
  }
  const createAccount = async (e) => {
    e.preventDefault()
    try {
      await newAccountRequest(newUsername.value, newPassword.value)
      notifSetter('success', 'account created')
    } catch (err) {
      notifSetter('error', 'account creatoin failed')
    }
  }

  const notifSetter = (type, message) => {
    setNotif({type, message})
    setTimeout(() => {
      setNotif({type: null, message: null})
    }, 5000)
  }

  const removeBlogFromState = id => {
    setBlogs(blogs.filter(blog => blog.id !== id))
  }
  const addBlogToState = blog => {
    const newBlogList = blogs.concat(blog)
    console.log(blog)
    setBlogs(newBlogList.sort((a, b) => b - a))
  }
  const renderContent = () => {
    const formattedBlogs = blogs ? 
      blogs.map(blog => <Blog userIsOwner={ blog.user.name === user.name } removeBlogFromState={removeBlogFromState} key={blog.id} blog={blog} />)
      : null
    return <div className='renderedContent'>
      {formattedBlogs}
      <CreateBlog addBlogToState={(blog) => addBlogToState(blog)} notifSetter={(t, m) => notifSetter(t, m)} />
    </div>
  }
  const renderNoAccoScreen = () => <div>
    <Login loginName={username.value} handleNameChange={username.onChange} loginPassword={password.value} 
      handlePasswordChange={password.onChange} login={login} />
    <CreateAccount accountName={newUsername.value} handleNameChange={newUsername.onChange} accountPassword={newPassword.value}
      handlePasswordChange={newPassword.onChange} createAccount={createAccount} />
  </div>

  return (
    <div className="App">
      <Notification message={notif.message} notifType={notif.type} />
      {user ?
        <BlogScreen logout={logout} content={renderContent()} name={user.name} />
        : renderNoAccoScreen()
      }
    </div>
  )
}

export default App
