import React, { Component } from "react";

class FeedbackAddForm extends Component {
  render() {
    return ( 
      <div className="container">
      {
      this.props.add ?
      (<div className="btn-group-vertical">
      <button type="button" className="btn btn-primary" 
        onClick={() => this.props.onAdd("THE BEST")}>
            THE BEST   
            <span className="badge badge-light">{this.props.values[0]}</span>
        </button>
        <button type="button" className="btn btn-primary"
        onClick={() => this.props.onAdd("GOOD")}>
            GOOD   
            <span className="badge badge-light">{this.props.values[1]}</span>
        </button>
        <button type="button" className="btn btn-primary"
        onClick={() => this.props.onAdd("NORMAL")}>
            NORMAL   
            <span className="badge badge-light">{this.props.values[2]}</span>
        </button>
        <button type="button" className="btn btn-primary"
        onClick={() => this.props.onAdd("POOR")}>
            POOR   
            <span className="badge badge-light">{this.props.values[3]}</span>
        </button>
        <button type="button" className="btn btn-primary"
        onClick={() => this.props.onAdd("VERY BAD")}>
            VERY BAD   
            <span className="badge badge-light">{this.props.values[4]}</span>
        </button></div>) : 
      (<div className="btn-group-vertical">
        <button type="button" className="btn btn-primary" >THE BEST   
        <span className="badge badge-light">{this.props.values[0]}</span>
        </button>
        <button type="button" className="btn btn-primary">GOOD   
        <span className="badge badge-light">{this.props.values[1]}</span>
        </button>
        <button type="button" className="btn btn-primary">NORMAL   
        <span className="badge badge-light">{this.props.values[2]}</span>
        </button>
        <button type="button" className="btn btn-primary">POOR   
        <span className="badge badge-light">{this.props.values[3]}</span>
        </button>
        <button type="button" className="btn btn-primary">VERY BAD   
        <span className="badge badge-light">{this.props.values[4]}</span>
        </button></div>)
      }
          
        </div>
    )
  }
}

export default FeedbackAddForm;
