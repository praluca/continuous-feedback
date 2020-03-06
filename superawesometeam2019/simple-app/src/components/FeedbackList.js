import React, { Component } from "react";
import FeedbackStore from "../stores/FeedbackStore";
import FeedbackAddForm from "./FeedbackAddForm"

class FeedbackList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feedbacks: [],
      last_feedback:'',
      types: ['THE BEST','GOOD','NORMAL','POOR','VERY BAD'],
      counter: [0,0,0,0,0],
      eid: this.props.location.state.eid,
      add: this.props.location.state.add ? false : true
    };
    this.store = new FeedbackStore();

    this.add = code => {
      let feedback = {
        date: this.state.last_feedback,
        type: code
      };
      this.store.addOne(feedback, this.state.eid);
      let diffMs = Date.now() - this.state.last_feedback;
      let diffMins = Math.floor(((diffMs % 86400000) % 3600000) / 60000);
      if (diffMins > 0) {
        this.setState({
          last_feedback: Date.now()
        })
      }
      this.store.getAll(this.state.eid);
      this.store.emitter.addListener("GET_FEEDBACKS_SUCCESS", () => {
        this.setState({
          feedbacks: this.store.feedbacks
        })
      })
    }

    this.countType = type => {
      let index = this.state.types.indexOf(type) 
      if(index > -1) {
        this.state.counter[index]++
      }
    }

    this.restoreCounter = () => { this.state.counter=[0,0,0,0,0] }
  }

  componentDidMount() {
    this.store.getAll(this.state.eid)
    this.store.emitter.addListener("GET_FEEDBACKS_SUCCESS", () => {
      this.setState({
        feedbacks: this.store.feedbacks
      })
    })
  }

  render() {
      return (
        <div>
          {this.state.feedbacks.map((e, i) => (
            this.countType(e.type)
          ))}
          <FeedbackAddForm onAdd={this.add} values={this.state.counter} add={this.state.add}/>
          {this.restoreCounter()}
        </div>
      );
  }
}
export default FeedbackList;
