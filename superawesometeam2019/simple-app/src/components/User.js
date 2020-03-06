import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password : '',
            email : ''
        }

        this.handleChange = (e) => {
            this.setState({
                [e.target.name] : e.target.value
            })
        }

        this.save = () => {
            this.props.onSave(this.props.item.id, {
                username : this.state.username,
                password : this.state.password,
                email : this.state.email
            })
        }
        this.submit = e => {
          this.props.onSubmit({
            password: this.state.password,
            email: this.state.email
          });
          e.preventDefault();
        };
    }
render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.submit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(User)