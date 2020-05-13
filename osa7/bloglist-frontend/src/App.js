/* eslint no-console: ["error", { allow: ["log"] }] */

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useHistory, Redirect } from 'react-router-dom'

import CreateBlog from './containers/CreateBlog'

import { loginRequest } from './services/login'
import { setToken } from './services/blogs'
import { newAccountRequest } from './services/newAccountRequest'

import { useField } from './hooks/index'

import { Login } from './components/Login'
import { CreateAccount } from './components/CreateAccount'
import { Blog } from './components/Blog'
import { BlogScreen } from './components/BlogScreen'
import { Notification } from './components/Notification'
import { UsersView } from './components/UsersView'
import { UserView } from './components/UserView'
import { BlogView } from './components/BlogView'

import { initUsers } from './actions/users'
import { initBlogs, addBlog, removeBlog } from './actions/blogs'
import { runNotification } from './actions/notification'
import { setUser } from './actions/user'

import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const App = () => {

  const username = useField('text')
  const password = useField('text')
  const newUsername = useField('text')
  const newPassword = useField('text')

  const dispatch = useDispatch()
  const { notification, blogs, user } = useSelector(state => state)

  const history = useHistory()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      setToken(user.token)
      route('/')
    }
  }, [])

  const login = async (e) => {
    e.preventDefault()
    try {
      const they = await loginRequest(username.value, password.value)
      dispatch(setUser(they))
      window.localStorage.setItem('user', JSON.stringify(they))
      setToken(they.token)
      route('/')
    } catch (err) {
      notifSetter('danger', 'Wrong username or password')
    }
    password.reset()
  }

  const route = dest => {
    history.push(dest)
  }

  const logout = (e) => {
    e.preventDefault()
    dispatch(setUser(null))
    window.localStorage.removeItem('user')
  }

  const createAccount = async (e) => {
    e.preventDefault()
    try {
      await newAccountRequest(newUsername.value, newPassword.value)
      notifSetter('success', 'account created')
    } catch (err) {
      notifSetter('danger', 'account creatoin failed')
    }
  }

  const notifSetter = (type, message) => {
    dispatch(runNotification(message, type))
  }

  const removeBlogFromState = id => {
    dispatch(removeBlog(id))
  }
  const addBlogToState = blog => {
    dispatch(addBlog(blog))
  }

  const renderContent = () => {
    const formattedBlogs = blogs ?
      blogs.map(blog => <Blog viewBlog={(id) => route(`/blog/${id}`)} userIsOwner={blog.user.name === user.name}
        key={blog.id} blog={blog} />)
      : null
    return <div className='renderedContent'>
      <ListGroup>
        {formattedBlogs}
      </ListGroup>
      <CreateBlog addBlogToState={(blog) => addBlogToState(blog)} notifSetter={(t, m) => notifSetter(t, m)} />
    </div>
  }

  console.log(history)
  return (
    <Container className="App">
      <Notification message={notification.message} notifType={notification.success} />
      <Switch>
        <Route path='/login' >
          <div >
            <Login loginName={username.value} handleNameChange={username.onChange} loginPassword={password.value}
              handlePasswordChange={password.onChange} login={login} />
            <CreateAccount accountName={newUsername.value} handleNameChange={newUsername.onChange} accountPassword={newPassword.value}
              handlePasswordChange={newPassword.onChange} createAccount={createAccount} />
          </div>
        </Route>
        {user ?
          <>
            <div>{user.username} logged in <Button variant='outline-danger' onClick={logout}>logout</Button></div>
            <div><button onClick={() => route('/users')}>Users</button><button onClick={() => route('/')}>Blogs</button></div>
            <Route path='/' exact >
              <BlogScreen content={renderContent()} />
            </Route>
            <Route path='/users' exact >
              <UsersView route={route} />
            </Route>
            <Route path={`/user/:id`} exact>
              <UserView />
            </Route>
            <Route path={`/blog/:id`} exact>
              <BlogView removeBlogFromState={removeBlogFromState} route={route} />
            </Route>
          </>
          : <Redirect to='/login' />
        }
      </Switch>
    </Container>
  )
}

export default App
