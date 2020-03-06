import { EventEmitter } from "fbemitter";

const SERVER = "http://localhost:3000";
class FeedbackStore {
  constructor() {
    this.feedbacks = [];
    this.emitter = new EventEmitter();
  }

  async getAll(eid) {
    try {
      let response = await fetch(`${SERVER}/feedback-api/feedbacks/${eid}`);
      let data = await response.json();
      this.feedbacks = data;
      this.emitter.emit("GET_FEEDBACKS_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("GET_FEEDBACKS_ERROR");
    }
  }

  async addOne(feedback, eid) {
    try {
      await fetch(`${SERVER}/feedback-api/feedbacks/${eid}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(feedback)
      });
      this.getAll(eid)
      this.emitter.emit("ADD_FEEDBACK_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("ADD_FEEDBACK_ERROR");
    }
  }
}
export default FeedbackStore;
