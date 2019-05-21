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
      message: this.state.message
    };

    if (data.name === "" || data.subject === "" || data.message === "") {
      this.setState({
        feedback: `Ops! You need to fill all the fields to send`
      });
      setTimeout(() => {
        this.setState({
          feedback: null
        });
      }, 5000);
    } else {
      api
      .sendEmail(this.props.match.params.libraryId, data)
      .then(response => {
        console.log("THIS IS THE RESPONSEEEE", response);
        this.setState({
          feedback: `Your email was sent! You'll be redirected`
        });
        setTimeout(() => {
          this.setState({
            feedback: null
          });
        this.props.history.push('/profile')
        }, 2000);
      })
      .catch(err => this.setState({ message: err.toString() }));
    }
  }

  render() {
    return (
      <div className="AddBook">
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
        {this.state.feedback && (
          <div className="info">{this.state.feedback}</div>
        )}
      </div>
    );
  }
}
