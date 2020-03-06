import React, { Component } from "react"
import {withRouter} from 'react-router-dom'

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      code: this.props.item.code,
      title: this.props.item.title,
      date: this.props.item.date,
      theme: this.props.item.theme
    }
    this.handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };
    this.save = () => {
      this.props.onSave(this.props.item.id, {
        id: this.state.id,
        code: this.state.code,
        title: this.state.title,
        date: this.state.date,
        theme: this.state.theme
      });
      this.setState({
        isEditing: false
      });
    }
    this.history = () => {
      this.props.history.push({pathname: '/history', state: {eid: this.props.item.id, add:true}})
    }
  }

  render() {
    if (this.state.isEditing) {
      return (
        <tr>
          <td></td>
          <td>
            <input
              type="text"
              name="code"
              onChange={this.handleChange}
              value={this.state.code}
            />
          </td>
          <td>
            <input
              type="text"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
            />
          </td>
          <td>
            <input
              type="text"
              name="date"
              onChange={this.handleChange}
              value={this.state.date.toString().substr(0,10)}
            />
          </td>
          <td>
            <input
              type="text"
              name="theme"
              onChange={this.handleChange}
              value={this.state.theme}
            />
          </td>
          <td>
            <input
              className="btn btn-outline-warning btn-block"
              type="button"
              value="Cancel"
              onClick={() =>
                this.setState({
                  isEditing: false
                })
              }
            />
          </td>
          <td><input className="btn btn-outline-success btn-block" 
            type="button" value="Save" onClick={this.save} /></td>
        </tr>
      );
    } else {
        return(
          <tr>
            <th>{this.props.item.id}</th>
            <td>{this.props.item.code}</td>
            <td>{this.props.item.title}</td>
            <td>{this.props.item.date.toString().substr(0, 10)}</td>
            <td>{this.props.item.theme}</td>
            <td className="text-right">
              <button className="btn btn-outline-info " onClick={() => this.setState({
                        isEditing : true
                    })}> Edit </button>
            </td>
            <td className="text-right">
              <button className="btn btn-outline-danger " onClick={() => 
                this.props.onDelete(this.props.item.id)}> Delete </button>
            </td>
          <td><input className="btn btn-outline-info btn-block" 
            type="button" value="History" onClick={this.history} /></td>
          </tr>
        )
    }
  }
}
export default withRouter(Event)
