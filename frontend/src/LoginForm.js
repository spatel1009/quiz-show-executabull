import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {Notification} from 'bulma/css/bulma.css'
import data from './data'

class LoginForm extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      errorMsg: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const { username, password } = this.state
    data.login(username, password)
      .then(user => this.props.setCurrentUser(user))
      .catch(err => {
        this.setState({
          errorMsg: err.message
        })
      })
  }

  render () {
    const { username, password, errorMsg } = this.state
    return (
      <div>
        <section className='sidebar'>
          <div className='sidebar-container'>
            <h3>Welcome to QuizzaBull!</h3>
            <div>Please Log In or Register</div>
          </div>
        </section>
        <section className='main-container'>
          {errorMsg && <Notification isColor='danger'>
            {errorMsg}
          </Notification>}
          <form className='login-form' onSubmit={this.handleSubmit}>
            <h2 id='login-title'>Log In</h2>
            <label className='label username'>Username</label>
            <div className='control'>
              <input type='text' className='input username' value={username} required onChange={(e) => this.setState({ username: e.target.value })} />
            </div>
            <label className='label password'>Password</label>
            <div className='control'>
              <input type='password' className='input password' value={password} required onChange={(e) => this.setState({ password: e.target.value })} />
            </div>
            <div className='register-info'>
              <span className='register'>Click here to</span>&nbsp;
              <NavLink to='/register' className='register'>Register</NavLink>
            </div>
            <button type='submit' className='button is-primary login-button'>Sign In</button>
          </form>
        </section>
      </div>
    )
  }
}

export default LoginForm

// #Login
// Post:
//   Username
//   Password
// Return:
//   Name
//   Token
//   Admin?
