import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import ProfileCreate from './components/ProfileCreate/ProfileCreate'
import Profile from './components/Profile/Profile'
import Match from './components/Match/Match'
import Matches from './components/Matches/Matches'

const backgroundImageUrl = 'https://i.imgur.com/cQegYk3.jpg'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <div style={{
          // add background image, using url
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100vh'
        }}>
          <main className="container">
            <Route path='/sign-up' render={() => (
              <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
            )} />
            <Route path='/sign-in' render={() => (
              <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
            )} />
            <AuthenticatedRoute user={user} path='/sign-out' render={() => (
              <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/change-password' render={() => (
              <ChangePassword msgAlert={this.msgAlert} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/create-profile' render={() => (
              <ProfileCreate msgAlert={this.msgAlert} user={user} setUser={this.setUser} />
            )} />
            <AuthenticatedRoute user={user} path='/profile' render={() => (
              <Profile msgAlert={this.msgAlert} user={user} setUser={this.setUser} />
            )} />
            <AuthenticatedRoute user={user} path='/match' render={() => (
              <Match msgAlert={this.msgAlert} user={user} setUser={this.setUser} />
            )} />
            <AuthenticatedRoute user={user} path='/matches' render={() => (
              <Matches msgAlert={this.msgAlert} user={user} setUser={this.setUser} />
            )} />
          </main>
        </div>
      </Fragment>
    )
  }
}

export default App
