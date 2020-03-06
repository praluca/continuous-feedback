import React, {Component} from 'react'
import UserStore from '../stores/UserStore'
import User from './User'

class UserList extends Component {
    constructor() {
        super()
        this.state = {
            users : []
        }

        this.store = new UserStore()

        this.submit = (user) => {
            try {
              this.store.login(user).then(res => {
              if (res) {
                this.props.history.push(`/profile`)
              }
            })
          } catch(err) {
            console.warn(err)
          }
        }
    }

    render() {
        return <div>
            <User onSubmit={this.submit} />
        </div>
    }
}

export default UserList