import React, { Component } from "react";

class EventAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      title: "",
      date: "",
      theme: ""
    };

    this.handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };
    
  }
  render() {
    return (
      <tr>
        <td></td>
      <td>
        <input className="form-control"
          type="text"
          placeholder="code"
          onChange={this.handleChange}
          name="code"
        />
      </td>
      <td>
        <input className="form-control"
          type="text"
          placeholder="title"
          onChange={this.handleChange}
          name="title"
        />
      </td>
      <td>
        <input className="form-control"
          type="text"
          placeholder="date (yyyy-mm-dd)"
          onChange={this.handleChange}
          name="date"
        />
      </td>
      <td>
        <input className="form-control"
          type="text"
          placeholder="theme"
          onChange={this.handleChange}
          name="theme"
        />
      </td>
      <td colSpan="3">
        <input
          className="btn btn-outline-primary btn-block"
          type="button"
          value="Add"
          onClick={() => {
            this.props.onAdd({
              code: this.state.code,
              title: this.state.title,
              date: this.state.date,
              theme: this.state.theme
            });
          }}
        />
      </td>
      </tr>
    );
  }
}

export default EventAddForm;
