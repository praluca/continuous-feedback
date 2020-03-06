import React, { Component } from 'react'
import { MDBCol, MDBFormInline, MDBBtn } from 'mdbreact'
import {
    HashRouter as Router,
    Route,
  } from 'react-router-dom'
import EventList from './EventList'
import EventStore from '../stores/EventStore'

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebase-config';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class Firebase extends Component {
    constructor() {
        super()
        this.state = {
            events:null,
            eventCode : ''
        }
        this.store = new EventStore()

        this.handleChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    
        this.click = (code, e) => {
            try {
              this.store.getOne(code)
              this.store.emitter.addListener('FIND_EVENT_SUCCESS', () => {
                  this.setState({
                      events: this.store.events
                    })
                })
              e.preventDefault()
            } catch(err) {
              console.log(err)
            }
        }
    }

    render() {
      const { user, signInWithGoogle } = this.props;
  
      return (
        <Router>
          <div className="a">
            <div className="row justify-content-md-center">
              {
                user ? <p>Hello, {user.displayName}</p> : <p>Please sign in.</p>
              }
            </div>
            <div className="row justify-content-md-center">
            {
                user
                  ? (
                  <Route path="/events" exact={true} >
                    <EventList />
                  </Route>
                  )
                  : (<button onClick={signInWithGoogle}>Sign in with Google</button>)
            }
              {
                  user ?
                  <div className="row justify-content-md-center">
                  <MDBCol md="12">
                      <MDBFormInline className="md-form mr-auto mb-4">
                      <input className="form-control mr-sm-2" name="eventCode" type="text" placeholder="Search" aria-label="Search" onChange={this.handleChange}/>
                      <MDBBtn gradient="aqua" rounded size="sm" type="submit" className="mr-auto" onClick={e => {this.click(this.state.eventCode, e)}}>
                      Search
                      </MDBBtn>
                      </MDBFormInline>
                  </MDBCol> </div> : null
              }
              {
                  (this.state.events && typeof(this.state.events[0]) !== 'undefined') ?
                  (<table className="table table-hover table-bordered">
                      <tbody>
                      <tr>
                          <th>{this.state.events[0].id}</th>
                          <td>{this.state.events[0].code}</td>
                          <td>{this.state.events[0].title}</td>
                          <td>{this.state.events[0].date.toString().substr(0,10)}</td>
                          <td>{this.state.events[0].theme}</td>
                          <td>
                          <button className="btn btn-outline-info btn-block" onClick={() => {
                            let date = (new Date(this.state.events[0].date)).getTime()
                            if(date > Date.now() - 86400000 && date < Date.now()) {
                              this.props.history.push({
                                  pathname: '/feedbacks', 
                                  state : { eid: this.state.events[0].id }
                              })
                          }}}> Join </button>
                          </td>
                      </tr>
                      </tbody>
                  </table>) : null
                  
              }
              </div>
          </div>
        </Router>
      )
    }
}

export default withFirebaseAuth({
      providers,
      firebaseAppAuth,
    })(Firebase);