import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Form from './Form'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
           <Route path='/training' render={() => (
            <Form setUser={this.setUser} page={'training'} user={user}/>
          )} />

          <Route path='/capacity_building' render={() => (
            <Form setUser={this.setUser} page={'capacity_building'} user={user}/>
          )} />

          <Route path='/entrepreneurship' render={() => (
            <Form setUser={this.setUser} page={'entrepreneurship'} user={user}/>
          )} />

          <Route path='/points_of_encounter' render={() => (
            <Form setUser={this.setUser} page={'points_of_encounter'} user={user}/>
          )} />

          <Route path='/news' render={() => (
            <Form setUser={this.setUser} page={'news'} user={user}/>
          )} />

          <Route path='/resources' render={() => (
            <Form setUser={this.setUser} page={'resources'} user={user}/>
          )} />



          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
