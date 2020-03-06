import React, { Component } from 'react'
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom'
import EventList from './EventList'
import Navbar from './Navbar'
import UserList from './UserList'
import Landing from './Landing'
import Register from './Register'
import Profile from './Profile'
import Firebase from './Firebase'
import FeedbackList from './FeedbackList'
import Footbar from './Footbar'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={UserList} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/events" component={EventList} />
            <Route exact path="/signin" component={Firebase} />
            <Route exact path="/feedbacks" component={FeedbackList} />
            <Route exact path="/history" component={FeedbackList} />
          </div>
          <Footbar />
        </div>
      </Router>
    )
  }
}
export default App