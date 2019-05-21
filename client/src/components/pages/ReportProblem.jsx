import React, { Component } from "react";
import { Button, Input } from "reactstrap";
import api from "../../api";

export default class ReportProblem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      subject: "",
      message: "",
      feedback: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    let data = {
      name: this.state.name,
      subject: this.state.subject,
      message: this.state.message,
    }

    api
      .sendEmail(this.props.match.params.libraryId, data)
      .then(response => {
        console.log('THIS IS THE RESPONSEEEE', response)
        this.setState({
          feedback: `Your email was sent!`
        });
        setTimeout(() => {
          this.setState({
            feedback: null
          });
        }, 5000);
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  render() {
    return (
      <div className="ReportProblem">
        <h2>Report a problem with this book</h2>
        <form>
          Name:{" "}
          <Input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />{" "}
          <br />
          Subject:{" "}
          <Input
            type="text"
            name="subject"
            value={this.state.subject}
            onChange={this.handleInputChange}
          />{" "}
          <br />
          Message:{" "}
          <Input
            type="textarea"
            name="message"
            cols="20"
            rows="5"
            value={this.state.message}
            onChange={this.handleInputChange}
          />{" "}
          <br />
          <Button color="primary" onClick={e => this.handleSubmit(e)}>
            Send
          </Button>
        </form>
        {this.state.feedback && <div className="info">{this.state.feedback}</div>}
      </div>
    );
  }
}
